import { CalendarDays, Gauge, Star, UserRound } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { ICarReview } from "../types"

export default function CarReviewCard({ review }: { review: ICarReview }) {
    return (
        <Link
            href={`/rates/${review.id}`}
            aria-label={`Открыть отзыв: ${review.brand} ${review.model}`}
            className="block rounded-2xl border border-white/10 bg-zinc-800/80 p-5 transition-colors hover:border-blue-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 md:p-6"
        >
        <article>
            <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-zinc-400">
                        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-blue-200">
                            {review.brand}
                        </span>
                        <span>{review.year}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-white md:text-2xl">
                        {review.model}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-400">{review.engine}</p>
                </div>

                <div
                    className="inline-flex w-fit items-center gap-1.5 rounded-xl border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-amber-300"
                    aria-label={`Оценка ${review.rating} из 5`}
                >
                    <Star size={17} fill="currentColor" />
                    <span className="font-semibold">{review.rating.toFixed(1)}</span>
                    <span className="text-xs text-amber-200/70">/ 5</span>
                </div>
            </header>

            <div className="my-5 flex flex-wrap gap-x-5 gap-y-2 border-y border-white/10 py-3 text-sm text-zinc-400">
                <span className="inline-flex items-center gap-2">
                    <Gauge size={15} />
                    {review.mileage.toLocaleString("ru-RU")} км
                </span>
                <span className="inline-flex items-center gap-2">
                    <CalendarDays size={15} />
                    Во владении {review.ownershipDuration}
                </span>
            </div>

            <h3 className="text-lg font-semibold text-white">{review.title}</h3>
            <p className="mt-2 leading-7 text-zinc-300">{review.review}</p>

            {review.photoDataUrls && review.photoDataUrls.length > 0 && (
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {review.photoDataUrls.slice(0, 3).map((photo, index) => (
                        <Image
                            key={`${review.id}-photo-${index}`}
                            src={photo}
                            alt={`${review.brand} ${review.model}, фото ${index + 1}`}
                            width={800}
                            height={600}
                            unoptimized
                            className="aspect-[4/3] w-full rounded-xl object-cover"
                        />
                    ))}
                </div>
            )}

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-300">
                        Плюсы
                    </h4>
                    <ul className="flex flex-wrap gap-2">
                        {review.pros.map((pro) => (
                            <li
                                key={pro}
                                className="rounded-full border border-emerald-400/15 bg-emerald-400/5 px-3 py-1 text-sm text-emerald-100"
                            >
                                {pro}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-orange-300">
                        Минусы
                    </h4>
                    <ul className="flex flex-wrap gap-2">
                        {review.cons.map((con) => (
                            <li
                                key={con}
                                className="rounded-full border border-orange-400/15 bg-orange-400/5 px-3 py-1 text-sm text-orange-100"
                            >
                                {con}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm text-zinc-400">
                <span className="inline-flex items-center gap-2">
                    <UserRound size={15} />
                    @{review.author}
                </span>
                <time>{review.date}</time>
            </footer>
        </article>
        </Link>
    )
}
