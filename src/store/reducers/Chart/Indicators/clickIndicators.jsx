import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SMA: false,
  WMA: false,
  EMA: false,
  BBANDS: false,
  SAR: false,
  MACD: false,
  STOCHF: false,
  STOCH: false,
  RSI: false,
  CCI: false,
  MOM: false,
  ROC: false,
  AD: false,
  ATR: false,
  MFI: false,
  OBV: false,
  ADOSC: false,
  TRIX: false,
  WILLR: false,
  DX: false,
  ADX: false,
  ADXR: false,
  AROON: false,
  AROONOSC: false,
  STOCHRSI: false,
  ULTOSC: false,
  PPO: false,
};

const clickSubSlice = createSlice({
  name: "subChart",
  initialState: initialState,
  reducers: {
    setActiveSub(state, action) {
      state[action.payload] = true;
    },
    setDisactiveSub(state, action) {
      state[action.payload] = false;
    },
  },
});

const { setActiveSub, setDisactiveSub } = clickSubSlice.actions;
export { setActiveSub, setDisactiveSub };

export default clickSubSlice.reducer;