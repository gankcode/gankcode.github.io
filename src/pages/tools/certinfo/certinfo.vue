<template>
  <div class="container mx-auto p-4">
    <div class="max-w-3xl mx-auto">
      <!-- 证书卡片 -->
      <div
        class="bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-xl shadow-lg p-6 backdrop-blur-sm"
      >
        <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          证书信息查看器
        </h2>

        <!-- 证书输入区域 -->
        <div class="mb-6" @dragover.prevent @drop.prevent="handleDrop">
          <UTextarea
            v-model="certContent"
            :rows="10"
            class="w-full font-mono bg-white/80 dark:bg-gray-800/80 rounded-lg cursor-pointer"
            placeholder="拖拽打开文件或点击输入证书文本内容..."
            @click="focusTextarea"
            @update:model-value="analyzeCert"
          />
        </div>
      </div>

      <!-- 证书信息显示区域 -->
      <div
        v-if="certInfo"
        class="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <pre class="whitespace-pre-wrap font-mono text-sm">{{ certInfo }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Buffer } from "buffer"; // 确保您已安装 buffer 库
import forge from "node-forge"; // 引入 node-forge 库

const certContent = ref("");
const certInfo = ref("");
const loading = ref(false);

const analyzeCert = async () => {
  loading.value = true;
  try {
    // 解析证书内容
    if (certContent.value.startsWith("-----BEGIN CERTIFICATE-----")) {
      certInfo.value = parsePem(certContent.value); // 解析 PEM 格式证书
    } else if (certContent.value.startsWith("-----BEGIN PRIVATE KEY-----")) {
      certInfo.value = parsePrivateKey(certContent.value); // 解析私钥
    } else if (certContent.value.match(/^[0-9A-Fa-f]+$/)) {
      certInfo.value = parseDer(certContent.value); // 解析 DER 格式
    } else if (
      certContent.value.startsWith("-----BEGIN ENCRYPTED PRIVATE KEY-----") ||
      certContent.value.startsWith("-----BEGIN PKCS12-----")
    ) {
      certInfo.value = await parseP12(certContent.value); // 解析 P12 格式
    } else {
      certInfo.value = "未识别的证书格式";
    }
  } catch (error) {
    console.error("证书解析错误:", error); // 记录错误信息
    certInfo.value = `证书解析错误: ${error.message || "未知错误"}`; // 显示具体错误信息
  } finally {
    loading.value = false;
  }
};

// 解析 PEM 格式证书
const parsePem = (pem) => {
  const base64 = pem
    .replace(/-----BEGIN CERTIFICATE-----/g, "")
    .replace(/-----END CERTIFICATE-----/g, "")
    .replace(/\s+/g, "");
  const der = Buffer.from(base64, "base64"); // 将 Base64 转换为 DER
  const cert = forge.pki.certificateFromAsn1(
    forge.asn1.fromDer(der.toString("binary"))
  ); // 解析 DER

  const subjectAttributes = cert.subject.attributes.reduce((acc, attr) => {
    acc[attr.name] = attr.value;
    return acc;
  }, {});

  const issuerAttributes = cert.issuer.attributes.reduce((acc, attr) => {
    acc[attr.name] = attr.value;
    return acc;
  }, {});

  const validity = cert.validity;
  const remainingDays = Math.ceil(
    (validity.notAfter.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  const info = {
    serialNumber: cert?.serialNumber, // 序列号
    signature: cert?.signature, // 签名
    validityNotBefore: validity.notBefore.toISOString(), // 证书生效时间
    validityNotAfter: validity.notAfter.toISOString(), // 证书过期时间
    validityRemainingDays: remainingDays, // 有效期剩余天数
    keyAlgorithm: "", // 秘钥算法
    keyLength: cert.publicKey.n.bitLength(), // 秘钥长度
    signatureAlgorithm: "", // 签名算法

    subject: {
      // 主体
      CN: subjectAttributes["CN"], // 通用名称
      C: subjectAttributes["C"], // 国家
      L: subjectAttributes["L"], // 地区
      O: subjectAttributes["O"], // 组织
      OU: subjectAttributes["OU"], // 部门
    },
    issuer: {
      // 签发者
      CN: issuerAttributes["CN"], // 通用名称
      C: issuerAttributes["C"], // 国家
      O: issuerAttributes["O"], // 组织
      OU: issuerAttributes["OU"], // 部门
    },
    chain: [],
  };
  return JSON.stringify(info, null, 4);
};

// 解析 DER 格式证书
const parseDer = (der: string) => {
  const buffer = Buffer.from(der, "hex"); // 将十六进制字符串转换为 Buffer
  return parsePem(buffer.toString("binary")); // 直接调用 parsePem
};

// 解析私钥
const parsePrivateKey = (privateKey: string) => {
  const base64 = privateKey
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\s+/g, "");
  const der = Buffer.from(base64, "base64"); // 将 Base64 转换为 DER
  const privateKeyObj = forge.pki.privateKeyFromAsn1(
    forge.asn1.fromDer(der.toString("binary"))
  ); // 解析私钥

  return (
    `私钥信息:\n` +
    `  加密算法: ${privateKeyObj.algorithm}\n` +
    `  模数: ${privateKeyObj.n.toString(16)}\n` +
    `  指数: ${privateKeyObj.e.toString(16)}\n`
  );
};

// 解析 P12 格式证书
const parseP12 = async (p12Pem) => {
  const p12Asn1 = forge.asn1.fromDer(
    forge.util.decode64(p12Pem.split("\n").slice(1, -1).join(""))
  );
  const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, ""); // 这里可以传入密码

  const certs = p12.getBags({ bagType: forge.pki.oids.certBag });
  const privateKeys = p12.getBags({ bagType: forge.pki.oids.keyBag });

  let certInfo = "P12 证书信息:\n";

  // 处理证书
  for (const cert of Object.values(certs)) {
    const certificate = cert[0].cert;
    certInfo += `证书主题: ${forge.pki.getSubject(certificate)}\n`;
    certInfo += `签名算法: ${certificate.siginfo ? certificate.siginfo.algorithm : "未知算法"}\n`;
  }

  // 处理私钥
  for (const key of Object.values(privateKeys)) {
    const privateKey = key[0].key;
    certInfo += `私钥算法: ${privateKey.algorithm}\n`;
  }

  return certInfo;
};

// 处理文件拖拽
const handleDrop = (event: DragEvent) => {
  const file = event.dataTransfer.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      certContent.value = e.target.result;
      analyzeCert(file?.name); // 自动解析证书
    };
    reader.readAsText(file);
  } else {
    alert("请上传有效的证书文件");
  }
};

// 聚焦文本区域
const focusTextarea = () => {
  const textarea = document.querySelector("textarea");
  textarea.focus();
};
</script>
