import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./UserApi";
import { reviewsApi } from "./Reviews";
import { lostPostApi } from "./LostPost";
import { foundPostApi } from "./FoundPost";
import { ProfileApi } from "./Profile";
import { claimApi } from "./ClaimApi";
import { returnApi } from "./ReturnApi";
export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [reviewsApi.reducerPath]: reviewsApi.reducer,
        [lostPostApi.reducerPath]: lostPostApi.reducer,
        [foundPostApi.reducerPath]: foundPostApi.reducer,
        [ProfileApi.reducerPath]: ProfileApi.reducer,
        [claimApi.reducerPath]: claimApi.reducer,
        [returnApi.reducerPath]: returnApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware, reviewsApi.middleware, lostPostApi.middleware, foundPostApi.middleware, ProfileApi.middleware,claimApi.middleware, returnApi.middleware),
});