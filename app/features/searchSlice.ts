import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import searchService from '../services/searchService';

export interface ResultItem {
  cityName: string;
  description: string;
  imageCode: number;
  temperature: number;
  humidity: number;
  precipitation: number;
}

export interface SearchState {
  data: Readonly<ResultItem>[];
  cityName: string;
  error: string;
}

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (city: string, thunkApi) => {
    try {
      const response = searchService.getCurrentWeather(city);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const initialState: SearchState = {
  data: [],
  cityName: '',
  error: '',
};

const searchSlice = createSlice({
  name: 'Search',
  initialState,
  reducers: {
    fetchDataRequest: (state: SearchState, action: PayloadAction<string>) => {
      state.cityName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.data = [];
    });
    // builder.addCase(
    //   fetchData.fulfilled,
    //   (state, action: PayloadAction<IResultItem[]>) => {
    //     state.isLoading = false;
    //     state.data = action.payload;
    //   }
    // );
    builder.addCase(
      fetchData.fulfilled,
      (state: SearchState, action: PayloadAction<any>) => {
        state.data = action.payload;
      }
    );
    builder.addCase(fetchData.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    });
  },
});
export const searchActions = searchSlice.actions;
export default searchSlice;
