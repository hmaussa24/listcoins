import { createSlice } from "@reduxjs/toolkit";
import { IGeneral } from "./model/general.model";

const initialState: IGeneral = {
  criptomonedas: 0,
  dark: false,
  idCoin: 0,
};

const GeneralSlice = createSlice({
  name: "general slice",
  initialState,
  reducers: {
    setGeneral: (state: IGeneral, action: { payload: number }): any => {
      state.criptomonedas = action.payload;
    },
    setDark: (state: IGeneral, action: { payload: boolean }): any => {
      state.dark = action.payload;
    },
    setIdCoins: (state: IGeneral, action: { payload: number }): any => {
      state.idCoin = action.payload;
    },
  },
});

export const { setGeneral, setDark, setIdCoins } = GeneralSlice.actions;
export default GeneralSlice.reducer;
