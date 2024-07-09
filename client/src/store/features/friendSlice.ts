import { getUser } from "@api/api";
import { IFriend } from "@interfaces/entities";
import { FriendState } from "@interfaces/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: FriendState = {
  currentFriendId: null,
  friend: {} as IFriend,
  status: "idle",
  error: null as string | null,
};

const fetchFriend = createAsyncThunk(
  "film/fetchFriend",
  async (userId: number) => {
    try {
      const user = await getUser(userId);
      return user;
    } catch (error: any) {
      throw Error(error.message);
    }
  }
);

const friendSlice = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {
    setCurrentFriendId: (state, action) => {
      state.currentFriendId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriend.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFriend.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.friend = action.payload;
      })
      .addCase(fetchFriend.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export const { setCurrentFriendId } = friendSlice.actions;

export { fetchFriend };

export default friendSlice.reducer;
