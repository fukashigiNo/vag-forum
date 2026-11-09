import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CalendarDays, Gauge, Star, UserRound } from "lucide-react"
import type { ICarReview } from "@/entities/rate/rate-review"

export default function ReviewDetail({ review }: { review: ICarReview }) {
    return (
        <main className="mx-auto min-h-full w-full max-w-5xl flex-1 bg-zinc-900 px-4 pb-20 pt-24 text-white md:px-8">
            <Link
                href="/rates"
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-zinc-800 px-4 py-2 text-sm text-zinc-200 transition hover:border-blue-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
                <ArrowLeft size={16} />
                Ко всем отзывам
            </Link>

            <article className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-800/80">
                <header className="border-b border-white/10 p-5 md:p-8">
                    <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-zinc-400">
                        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-blue-200">
                            {review.brand}
                        </span>
                        <span>{review.year}</span>
                    </div>
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                                {review.model}
                            </h1>
                            <p className="mt-2 text-zinc-400">
                                {review.engine} · {review.horsePower} л.с.
                            </p>
                        </div>
                        <div
                            className="inline-flex w-fit items-center gap-2 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-amber-300"
                            aria-label={`Оценка ${review.rating} из 5`}
                        >
                            <Star size={20} fill="currentColor" />
                            <span className="text-xl font-semibold">{review.rating.toFixed(1)}</span>
                            <span className="text-sm text-amber-200/70">/ 5</span>
                        </div>
                    </div>
                </header>

                <div className="space-y-8 p-5 md:p-8">
                    <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-zinc-400">
                        <span className="inline-flex items-center gap-2">
                            <Gauge size={16} />
                            Пробег: {review.mileage.toLocaleString("ru-RU")} км
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <CalendarDays size={16} />
                            Во владении: {review.ownershipDuration}
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <UserRound size={16} />
                            @{review.author}
                        </span>
                        <time>{review.date}</time>
                    </div>

                    <section>
                        <h2 className="text-2xl font-semibold">{review.title}</h2>
                        <p className="mt-4 whitespace-pre-line leading-8 text-zinc-300">
                            {review.review}
                        </p>
                    </section>

                    {review.photoDataUrls && review.photoDataUrls.length > 0 && (
                        <section>
                            <h2 className="mb-4 text-xl font-semibold">Фото автомобиля</h2>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {review.photoDataUrls.map((photo, index) => (
                                    <Image
                                        key={`${review.id}-photo-${index}`}
                                        src={photo}
                                        alt={`${review.brand} ${review.model}, фото ${index + 1}`}
                                        width={1200}
                                        height={900}
                                        unoptimized
                                        className="aspect-[4/3] w-full rounded-xl object-cover"
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-2">
                        <section>
                            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-300">
                                Плюсы
                            </h2>
                            {review.pros.length > 0 ? (
                                <ul className="flex flex-wrap gap-2">
                                    {review.pros.map((pro) => (
                                        <li
                                            key={pro}
                                            className="rounded-full border border-emerald-400/15 bg-emerald-400/5 px-3 py-1.5 text-sm text-emerald-100"
                                        >
                                            {pro}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-zinc-500">Не указаны</p>
                            )}
                        </section>
                        <section>
                            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-orange-300">
                                Минусы
                            </h2>
                            {review.cons.length > 0 ? (
                                <ul className="flex flex-wrap gap-2">
                                    {review.cons.map((con) => (
                                        <li
                                            key={con}
                                            className="rounded-full border border-orange-400/15 bg-orange-400/5 px-3 py-1.5 text-sm text-orange-100"
                                        >
                                            {con}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-zinc-500">Не указаны</p>
                            )}
                        </section>
                    </div>
                </div>
            </article>
        </main>
    )
}
