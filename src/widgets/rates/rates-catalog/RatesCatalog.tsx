"use client"

import { useMemo, useState } from "react"
import { Plus, Search } from "lucide-react"
import { CarReviewCard, type ICarReview } from "@/entities/rate/rate-review"
import { CreateReviewModal } from "@/features/rates/create-review"
import { filterCarReviews, type CarReviewSort } from "@/features/rates/filter-reviews"
import { useAppDispatch } from "@/shared/store/hooks/app-dispatch"
import { useAppSelector } from "@/shared/store/hooks/app-selector"
import { addRateReview } from "@/shared/store/slices/rate-review-slice"

const SORT_OPTIONS: { value: CarReviewSort; label: string }[] = [
    { value: "newest", label: "Сначала новые" },
    { value: "highest", label: "Сначала с высокой оценкой" },
    { value: "lowest", label: "Сначала с низкой оценкой" },
]

export default function RatesCatalog() {
    const reviews = useAppSelector((state) => state.rateReviews.reviews)
    const dispatch = useAppDispatch()
    const [query, setQuery] = useState("")
    const [brand, setBrand] = useState("All")
    const [sort, setSort] = useState<CarReviewSort>("newest")
    const [isCreateReviewOpen, setIsCreateReviewOpen] = useState(false)
    const brands = useMemo(() => ["All", ...new Set(reviews.map((review) => review.brand))], [reviews])
    const visibleReviews = useMemo(
        () => filterCarReviews({ reviews, query, brand, sort }),
        [brand, query, reviews, sort],
    )
    const handleCreateReview = (review: ICarReview) => {
        dispatch(addRateReview(review))
        setBrand("All")
        setQuery("")
        setSort("newest")
        setIsCreateReviewOpen(false)
    }

    return (
        <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
            <header className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                        Опыт владельцев
                    </p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-5xl">
                        Отзывы об автомобилях
                    </h1>
                </div>
                <button
                    type="button"
                    onClick={() => setIsCreateReviewOpen(true)}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                    <Plus size={18} />
                    Написать отзыв
                </button>
            </header>

            <div className="mb-6 space-y-4 rounded-2xl border border-white/10 bg-zinc-800/50 p-4 md:p-5">
                <div className="flex flex-col gap-3 md:flex-row">
                    <label className="relative flex-1">
                        <Search
                            size={18}
                            aria-hidden="true"
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                        />
                        <span className="sr-only">Поиск отзывов</span>
                        <input
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Марка, модель или текст отзыва"
                            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-10 pr-4 text-white outline-none placeholder:text-zinc-500 focus:border-blue-500"
                        />
                    </label>

                    <label className="sr-only" htmlFor="rates-sort">Сортировка отзывов</label>
                    <select
                        id="rates-sort"
                        value={sort}
                        onChange={(event) => setSort(event.target.value as CarReviewSort)}
                        className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-blue-500"
                    >
                        {SORT_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-wrap gap-2" aria-label="Фильтр по марке">
                    {brands.map((item) => (
                        <button
                            key={item}
                            type="button"
                            aria-pressed={brand === item}
                            onClick={() => setBrand(item)}
                            className={`rounded-full border px-4 py-2 text-sm transition ${
                                brand === item
                                    ? "border-blue-500 bg-blue-500 text-white"
                                    : "border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white"
                            }`}
                        >
                            {item === "All" ? "Все марки" : item}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-white">Отзывы владельцев</h2>
                <span className="text-sm text-zinc-400">
                    Найдено: {visibleReviews.length}
                </span>
            </div>

            {visibleReviews.length > 0 ? (
                <div className="grid gap-4">
                    {visibleReviews.map((review) => (
                        <CarReviewCard key={review.id} review={review} />
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-zinc-700 px-6 py-12 text-center">
                    <p className="font-medium text-white">Отзывы не найдены</p>
                    <p className="mt-2 text-sm text-zinc-400">
                        Измените поисковый запрос или выберите другую марку.
                    </p>
                </div>
            )}
            {isCreateReviewOpen && (
                <CreateReviewModal
                    onClose={() => setIsCreateReviewOpen(false)}
                    onCreate={handleCreateReview}
                />
            )}
        </section>
    )
}
