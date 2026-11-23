"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ApiError } from "@/shared/api/apiRequest"
import { carReviewApi } from "@/entities/rate/rate-review"
import { useAppDispatch } from "@/shared/store/hooks/app-dispatch"
import { useAppSelector } from "@/shared/store/hooks/app-selector"
import { setRateReview } from "@/shared/store/slices/rate-review-slice"
import { ReviewDetail } from "@/widgets/rates/review-detail"

const pageClassName = "mx-auto min-h-full w-full max-w-5xl bg-zinc-900 px-4 pb-20 pt-24 text-white md:px-8"

export default function RateReviewRoute() {
    const { id } = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const review = useAppSelector((state) =>
        state.rateReviews.reviews.find((item) => item.id === id),
    )
    const [isLoading, setIsLoading] = useState(!review)
    const [loadError, setLoadError] = useState("")

    useEffect(() => {
        let isActive = true
        carReviewApi.getById(id)
            .then((loadedReview) => { if (isActive) dispatch(setRateReview(loadedReview)) })
            .catch((error: unknown) => {
                if (!isActive || (error instanceof ApiError && error.status === 404)) return
                setLoadError(error instanceof Error ? error.message : "Не удалось загрузить отзыв.")
            })
            .finally(() => { if (isActive) setIsLoading(false) })
        return () => { isActive = false }
    }, [dispatch, id])

    if (review) return <ReviewDetail review={review} />

    if (isLoading) {
        return <main className={`${pageClassName} text-zinc-400`}>Загрузка отзыва...</main>
    }

    if (loadError) {
        return (
            <main role="alert" className={`${pageClassName} text-red-300`}>
                Не удалось загрузить отзыв: {loadError}
            </main>
        )
    }

    return (
        <main className={pageClassName}>
            <h1 className="text-2xl font-bold">Отзыв не найден</h1>
            <p className="mt-2 text-zinc-400">Возможно, он был удалён.</p>
        </main>
    )
}
