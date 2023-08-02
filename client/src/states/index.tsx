import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../utils/interface";

interface InitialStates {
  user: User | null;
  token: string | null;
}

interface LoginPayload {
  token: string;
  user: User;
}

const initialState: InitialStates = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<LoginPayload>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setLogin, setLogout } =
  authSlice.actions;
export default authSlice.reducer;