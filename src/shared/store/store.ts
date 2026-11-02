import { configureStore } from "@reduxjs/toolkit";
import { forumFilterSlice } from "./slices/forum-filter-slice";
import { forumThreadsSlice } from "./slices/forum-thread-slice"
import { rateReviewsSlice } from "./slices/rate-review-slice"


export const Store = configureStore({
    reducer: {
        forumFilter: forumFilterSlice.reducer,
        forumThreads: forumThreadsSlice.reducer,
        rateReviews: rateReviewsSlice.reducer,
    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch