import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChatsState } from "@interfaces/store";
import { ChatPreview } from "@interfaces/entities";
import { getUserChats } from "@api/api";

const initialState: ChatsState = {
  chats: [] as ChatPreview[],
  status: "idle",
  error: null as string | null,
};

const fetchChats = createAsyncThunk(
  "film/fetchChats",
  async (userId: number) => {
    try {
      const chats = await getUserChats(userId);
      return chats;
    } catch (error: any) {
      throw Error(error.message);
    }
  }
);

const chatsSlice = createSlice({
  name: "chats",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChats.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.chats = action.payload;
    });
    builder.addCase(fetchChats.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });
  },
});

export { fetchChats };

export default chatsSlice.reducer;
