"use client"

import { useParams } from "next/navigation"
import { useAppSelector } from "@/shared/store/hooks/app-selector"
import { ReviewDetail } from "@/widgets/rates/review-detail"

export default function RateReviewRoute() {
    const { id } = useParams<{ id: string }>()
    const review = useAppSelector((state) =>
        state.rateReviews.reviews.find((item) => item.id === id),
    )

    if (!review) {
        return (
            <main className="mx-auto min-h-full w-full max-w-5xl bg-zinc-900 px-4 pb-20 pt-24 text-white md:px-8">
                <h1 className="text-2xl font-bold">Отзыв не найден</h1>
                <p className="mt-2 text-zinc-400">
                    Возможно, он был удалён или недоступен в текущем сеансе.
                </p>
            </main>
        )
    }

    return <ReviewDetail review={review} />
}
