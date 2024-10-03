import React, { useEffect, useState } from 'react'
import AppRouter from './router'
import {useDispatch} from "react-redux"
import { getMe } from './api/auth-service'
import { login, logout } from './store/slices/auth-slice'
import LoadingSpinner from './components/common/loading-spinner'
import { removeLocalStorage } from './helpers/encrypted-storage'

const App = () => {

  const [loading, setLoading] = useState(true)

  //hatali ya da hatasiz backenden cevap gelene kadar true olur--> arada kullaniciyi oyalamak icin ekleidk
  const dispatch= useDispatch();
  
  const loadData = async() => {
    try {
      const user= await getMe(); // kullanıcıyı aldık
      dispatch(login(user))

    } catch (err) {
      console.log(err)
      dispatch(logout())
      removeLocalStorage("token")
    }
    finally{
      setLoading(false)
    }
  }
  
  useEffect(() => { // burası sadece 1 kez ilk renderda çalışacak. 
    loadData();
    // eslint-disable-next-line
  }, [])

  if(loading) return <LoadingSpinner/>

  return <AppRouter/>
}

export default App
