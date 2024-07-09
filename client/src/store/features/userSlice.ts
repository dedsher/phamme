import { IUser } from "@interfaces/entities";
import { UserState } from "@interfaces/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: UserState = {
  user: {} as IUser,
  status: "idle",
  error: null as string | null,
};

const fetchUser = createAsyncThunk("film/fetchUser", async (userId: number) => {
  // try {
  //   const user = await requestUser(userId);
  // }
});

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
  },
});

export { fetchUser };

export default userSlice.reducer;
