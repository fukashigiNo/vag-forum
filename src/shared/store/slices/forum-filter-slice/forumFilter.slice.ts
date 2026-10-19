import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IForumFilterSlice {
    brand: string | null,
    model: string | null,
    generation: string | null,
    category: string | null,
    sort: "latest" | "popular" | "unsolved"
}

const initialState: IForumFilterSlice = {
    brand: null,
    model: null,
    generation: null, 
    category: null,
    sort: "popular"
}

export const forumFilterSlice = createSlice({
    name: "forumFilter",
    initialState: initialState,
    reducers: {
        setBrand(state, action: PayloadAction<string | null>) {
            state.brand = action.payload

            state.model = null
            state.generation = null
        },
        setModel(state, action: PayloadAction<string | null>) {
            state.model = action.payload
            state.generation = null
        },

        setGeneration(state, action: PayloadAction<string | null>) {
            state.generation = action.payload
        },

        setCategory(state, action: PayloadAction<string | null>) {
            state.category = action.payload
        },

        resetFilters: () => initialState
    }
})

export const {
    setBrand,
    setCategory,
    setGeneration,
    setModel,
    resetFilters
} = forumFilterSlice.actions
export default forumFilterSlice.reducer