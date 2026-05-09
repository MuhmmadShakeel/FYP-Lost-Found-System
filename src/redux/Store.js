import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./UserApi";
import { reviewsApi } from "./Reviews";
import { lostPostApi } from "./LostPost";
import { foundPostApi } from "./FoundPost";
export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [reviewsApi.reducerPath]: reviewsApi.reducer,
        [lostPostApi.reducerPath]: lostPostApi.reducer,
        [foundPostApi.reducerPath]: foundPostApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware, reviewsApi.middleware, lostPostApi.middleware, foundPostApi.middleware),
});