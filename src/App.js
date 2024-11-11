import React, { useEffect, useState } from 'react'
import AppRouter from './router'
import {useDispatch} from "react-redux"
import { getMe } from './api/auth-service'
import { login, logout } from './store/slices/auth-slice'
import LoadingSpinner from './components/common/loading-spinner'
import { removeLocalStorage } from './helpers/encrypted-storage'

const App = () => {
  const [loading, setLoading] = useState(true); //hatali ya da hatasiz backenden cevap gelene kadar true olur--> arada kullaniciyi oyalamak icin ekleidk
  const dispatch = useDispatch();

  const loadData = async () => { //eger kullanici ilk girdiginde zaten tokeni varsa her islemde login olmasina gerek yok 
    try {
      const token = getLocalStorage("token"); //kullanicin login oldugunda kullanidigi token
      if(!token) throw new Error("No token"); //henuz tokeni yoksa hata firlatcak ve o zaman asagidaki kodalri calistircak
      const user = await getMe();
      dispatch(login(user));
    } catch (err) {
      console.log(err);
      dispatch(logout());
      removeLocalStorage("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  if (loading) return <LoadingSpinner />;

  return <AppRouter/>;
};

export default App;
/*
ilk yuklemede render oluyor
biz kullanicinin her render oldugunda logout yapmasini istemiyoruz
login olmus kullanicnin yani tokenin sahibi olan kullanicinin bilgilerini getircek!!!     
BUrda biz token girecegiz o da bize kullaniciyi vercek (auth-service de yaziyoruz yine bu fonksiyonu) 

NOT -> login olayinda auth-service --> biz kullanici adi ve password giriyoruz bize kullaniciyi donuyor 
NOT --> burdan StoreProvider i kaldirdik cunku sayfa henuz render olmadan yukardaki kodlar calisiyor
bunu engellemk yerine yani oncelikle render olmasini istedigmizden StoreProvider i index.js e aldik.#

sayfyi yenileyince once login sonra root root gozukme nedeni useEffekt asenkron calsitigi icin uygulama 
acilir acilmaz bir kez render oluyor henuz backendden cevap gelmedigi icin. 
*/