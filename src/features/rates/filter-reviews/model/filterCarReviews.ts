import type { ICarReview } from "@/entities/rate/rate-review"

export type CarReviewSort = "newest" | "highest" | "lowest"

interface FilterCarReviewsOptions {
    reviews: ICarReview[]
    query: string
    brand: string
    sort: CarReviewSort
}

export default function filterCarReviews({
    reviews,
    query,
    brand,
    sort,
}: FilterCarReviewsOptions): ICarReview[] {
    const normalizedQuery = query.trim().toLocaleLowerCase()

    return reviews
        .filter((review) => {
            const matchesBrand = brand === "All" || review.brand === brand
            const searchableText = [
                review.brand,
                review.model,
                review.engine,
                review.title,
                review.review,
                review.author,
            ]
                .join(" ")
                .toLocaleLowerCase()

            return matchesBrand && searchableText.includes(normalizedQuery)
        })
        .sort((first, second) => {
            if (sort === "highest") return second.rating - first.rating
            if (sort === "lowest") return first.rating - second.rating
            return second.createdAt.localeCompare(first.createdAt)
        })
}
