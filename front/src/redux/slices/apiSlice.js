import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; // toolkit
import {
  GET_REVENUE_API_URL,
  GET_SALES_MAP_API_URL,
  GET_VISITORS_API_URL,
  GET_VOLUME_SERVICES_API_URL,
} from '../../constants/apiUrl'; // API Url
import { getRequest } from '../../constants/requestMethods'; // API Get method

// 공통된 비동기 액션 생성 로직을 별도의 함수로 분리
const createFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async () => {
    return await getRequest(apiURL);
  });
};

export const fetchRevenueData = createFetchThunk(
  'fetchRevenue',
  GET_REVENUE_API_URL
);

export const fetchVisitorsData = createFetchThunk(
  'fetchVisitors',
  GET_VISITORS_API_URL
);

export const fetchSalesMapData = createFetchThunk(
  'fetchSalesMap',
  GET_SALES_MAP_API_URL
);

export const fetchVolumeServiceData = createFetchThunk(
  'fetchVolumeService',
  GET_VOLUME_SERVICES_API_URL
);

const handleFullfilled = (stateKey) => (state, action) => {
  state[stateKey] = action.payload;
};

const handleRejected = (state, action) => {
  console.log(action.payload);
  state.isError = true;
};

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    revenuData: null,
    visitors: null,
    salesmapData: null,
    volumeserviceData: null,
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchRevenueData.fulfilled, handleFullfilled('revenueData'))
      .addCase(fetchRevenueData.rejected, handleRejected)
      .addCase(fetchVisitorsData.fulfilled, handleFullfilled('visitorsData'))
      .addCase(fetchVisitorsData.rejected, handleRejected)
      .addCase(fetchSalesMapData.fulfilled, handleFullfilled('salesmapData'))
      .addCase(fetchSalesMapData.rejected, handleRejected)
      .addCase(
        fetchVolumeServiceData.fulfilled,
        handleFullfilled('volumeserviceData')
      )
      .addCase(fetchVolumeServiceData.rejected, handleRejected);
  },
});

export default apiSlice.reducer;
