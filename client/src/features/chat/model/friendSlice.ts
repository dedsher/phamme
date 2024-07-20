import { createSlice } from "@reduxjs/toolkit";
import { FriendState } from "@interfaces/store";

const initialState: FriendState = {
  currentFriendId: null,
  status: "idle",
  error: null as string | null,
};

const friendSlice = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {
    setCurrentFriendId: (state, action) => {
      state.currentFriendId = action.payload;
    },
  },
});

export const { setCurrentFriendId } = friendSlice.actions;

export default friendSlice.reducer;
