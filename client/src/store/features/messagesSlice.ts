import { getChatMessages } from "@api/api";
import { IMessage } from "@interfaces/entities";
import { MessagesState } from "@interfaces/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: MessagesState = {
  messages: [] as IMessage[],
  status: "idle",
  error: null as string | null,
};

const fetchMessages = createAsyncThunk(
  "film/fetchMessages",
  async (chatId: number) => {
    try {
      const chats = await getChatMessages(chatId);
      return chats;
    } catch (error: any) {
      throw Error(error.message);
    }
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export { fetchMessages };

export default messagesSlice.reducer;
