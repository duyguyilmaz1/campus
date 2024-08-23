//buraya merkezi state yapımızı oluşturuyoruz. 

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth-slice"

export default configureStore({
    reducer:{
        auth:authSlice
    }
})