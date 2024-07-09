import { Transaction } from "@interfaces/entities";
import { TransactionsState } from "@interfaces/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: TransactionsState = {
  transactions: [] as Transaction[],
  status: "idle",
  error: null as string | null,
};

const fetchTransactions = createAsyncThunk(
  "film/fetchFilm",
  async (filmId: number) => {
    //   try {
    //     const film = await requestFilm(filmId);
    //     return film;
    //   } catch (error) {
    //     throw Error("Failed to fetch film");
    //   }
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
  },
});

export { fetchTransactions };

export default transactionsSlice.reducer;
