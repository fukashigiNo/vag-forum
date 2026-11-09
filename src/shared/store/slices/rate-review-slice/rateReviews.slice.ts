import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { carReviews, type ICarReview } from "@/entities/rate/rate-review"

interface RateReviewsState {
    reviews: ICarReview[]
}

const initialState: RateReviewsState = {
    reviews: carReviews,
}

export const rateReviewsSlice = createSlice({
    name: "rateReviews",
    initialState,
    reducers: {
        addRateReview(state, action: PayloadAction<ICarReview>) {
            state.reviews.unshift(action.payload)
        },
    },
})

export const { addRateReview } = rateReviewsSlice.actions
export default rateReviewsSlice.reducer
