//miscellaneous" (çeşitli) --> (cesitli yapilari iceren merkezi state)
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentOperation: null, //new, edit gibi operationlari saklar 
  listRefreshToken: null,
  currentRecord: null, //mevcut kaydi saklar   
};

const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setOperation: (state, action) => { //disardan hangi operationi degistirmek istedigimizi actio ile gonderiyoruz 
      state.currentOperation = action.payload;
    },
    refreshToken: (state) => { // yeni admin eklendiginde admin-listin refresh edilerek yeni adminin eklenmisni ve silindiginde silinmeisni saglamak icin olusturudk 
      state.listRefreshToken = Math.random();
    },

    setRecord: (state, action) => { 
      state.currentRecord = action.payload;
    },
  },
});

export const { setOperation, refreshToken, setRecord } = miscSlice.actions;
export default miscSlice.reducer;


/*
not --> setOperation i new e baglayacagiz buttona tiklandiginda currentOperationi null iken "new" operation haline getircek--> yani new islemi olcagini bildirecegiz  

Burda refreshToken yapilan degisikligi getirip listRefreshToken icine koyuyor
Amac --> listRefreshTokeni ratgele (Math.random ile ) eski degerini degistirp  bu state e bagli olan tum componentlerin rerender olmasini sagliyoruz --> yani adminList rerender oldugu icin loadData cagrilcak ve admn listeye eklencek!! ayni islemi silme icin de yapacagiz
*/