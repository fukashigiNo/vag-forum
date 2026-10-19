import { configureStore } from "@reduxjs/toolkit";
import { forumFilterSlice } from "./slices/forum-filter-slice";

export const Store = configureStore({
    reducer: {
        forumFilter: forumFilterSlice.reducer
    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch