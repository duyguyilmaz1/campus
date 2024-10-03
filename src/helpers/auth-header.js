import { getLocalStorage } from "./encrypted-storage";


export const getAuthHeader = () => {

  const token= getLocalStorage("token"); // token ı aldık
  let header={};

  if(token){
    header= {
        Authorization: `${token}` //normalde başına "Bearer " ${token} yazmalıyız
    }
  }
  return header;
}
