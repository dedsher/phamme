import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@interfaces/entities";
import { UserState } from "@interfaces/store";

const initialState: UserState = {
  user: {} as IUser,
  status: "idle",
  error: null as string | null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = {} as IUser;
    },
    setWallet: (state, action) => {
      state.user.wallet = action.payload;
    },
  },
});

export const { setUser, clearUser, setWallet } = userSlice.actions;
export default userSlice.reducer;
