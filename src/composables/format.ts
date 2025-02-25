
import moment from "moment";

export const useFormat = () => {

  const localDate = (date:Date|undefined|null, fmt: string|undefined|null)=>{
    date = date || new Date();
    fmt = fmt || "YYYY-MM-DD HH:mm:ss"
    return moment(date).format(fmt)
  }

  return {
    localDate
  }
}
