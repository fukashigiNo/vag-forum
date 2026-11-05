"use client"

import { useEffect, useState, type FormEvent } from "react"
import Image from "next/image"
import type { ICarReview } from "@/entities/rate/rate-review"

interface CreateReviewModalProps {
    onClose: () => void
    onCreate: (review: ICarReview) => void
}

const BRANDS = ["Volkswagen", "Audi", "Skoda", "SEAT", "CUPRA", "Porsche"]

const fieldClassName =
    "w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-blue-500"

export default function CreateReviewModal({
    onClose,
    onCreate,
}: CreateReviewModalProps) {
    const [brand, setBrand] = useState(BRANDS[0])
    const [model, setModel] = useState("")
    const [year, setYear] = useState("")
    const [engine, setEngine] = useState("")
    const [horsePower, setHorsePower] = useState("")
    const [mileage, setMileage] = useState("")
    const [rating, setRating] = useState("5")
    const [ownershipDuration, setOwnershipDuration] = useState("")
    const [title, setTitle] = useState("")
    const [reviewText, setReviewText] = useState("")
    const [pros, setPros] = useState("")
    const [cons, setCons] = useState("")
    const [photoDataUrls, setPhotoDataUrls] = useState<string[]>([])
    const [photoError, setPhotoError] = useState("")

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose()
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [onClose])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const now = new Date()
        const createdAt = now.toISOString().slice(0, 10)
        const splitTags = (value: string) =>
            value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)

        onCreate({
            id: `review-${now.getTime()}`,
            brand,
            model: model.trim(),
            year: Number(year),
            engine: engine.trim(),
            horsePower: Number(horsePower),
            mileage: Number(mileage),
            rating: Number(rating),
            title: title.trim(),
            review: reviewText.trim(),
            pros: splitTags(pros),
            cons: splitTags(cons),
            author: "you",
            date: "Сегодня",
            createdAt,
            ownershipDuration: ownershipDuration.trim(),
            photoDataUrls,
        })
    }

    const handlePhotosChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? [])
        event.target.value = ""
        setPhotoError("")

        if (photoDataUrls.length + files.length > 5) {
            setPhotoError("Можно прикрепить не более 5 фотографий.")
            return
        }

        const invalidFile = files.find((file) => !["image/jpeg", "image/png", "image/webp"].includes(file.type))
        if (invalidFile) {
            setPhotoError("Поддерживаются только JPG, PNG и WebP.")
            return
        }

        const oversizedFile = files.find((file) => file.size > 5 * 1024 * 1024)
        if (oversizedFile) {
            setPhotoError("Размер каждой фотографии не должен превышать 5 МБ.")
            return
        }

        try {
            const loadedPhotos = await Promise.all(
                files.map((file) => new Promise<string>((resolve, reject) => {
                    const reader = new FileReader()
                    reader.onload = () => {
                        if (typeof reader.result === "string") {
                            resolve(reader.result)
                        } else {
                            reject(new Error("Не удалось прочитать файл изображения."))
                        }
                    }
                    reader.onerror = () => reject(new Error("Не удалось прочитать файл изображения."))
                    reader.readAsDataURL(file)
                })),
            )
            setPhotoDataUrls((currentPhotos) => [...currentPhotos, ...loadedPhotos])
        } catch (error) {
            setPhotoError(error instanceof Error ? error.message : "Не удалось загрузить фотографии.")
        }
    }

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose()
            }}
        >
            <section
                aria-labelledby="create-review-title"
                aria-modal="true"
                className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-zinc-700 bg-zinc-950 p-5 shadow-2xl md:p-7"
                role="dialog"
            >
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-blue-400">
                            Опыт владельца
                        </p>
                        <h2 id="create-review-title" className="mt-1 text-2xl font-semibold text-white">
                            Новый отзыв
                        </h2>
                        <p className="mt-2 text-sm text-zinc-400">
                            Расскажите о машине честно и подробно.
                        </p>
                    </div>
                    <button
                        type="button"
                        aria-label="Закрыть форму"
                        className="rounded-lg px-3 py-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="review-brand" className="mb-2 block text-sm text-zinc-300">
                                Марка
                            </label>
                            <select
                                id="review-brand"
                                required
                                value={brand}
                                onChange={(event) => setBrand(event.target.value)}
                                className={fieldClassName}
                            >
                                {BRANDS.map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="review-model" className="mb-2 block text-sm text-zinc-300">
                                Модель
                            </label>
                            <input
                                id="review-model"
                                required
                                maxLength={60}
                                value={model}
                                onChange={(event) => setModel(event.target.value)}
                                placeholder="Например, Golf GTI"
                                className={fieldClassName}
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <label htmlFor="review-year" className="mb-2 block text-sm text-zinc-300">
                                Год выпуска
                            </label>
                            <input
                                id="review-year"
                                required
                                type="number"
                                min={1950}
                                max={new Date().getFullYear() + 1}
                                value={year}
                                onChange={(event) => setYear(event.target.value)}
                                placeholder="2022"
                                className={fieldClassName}
                            />
                        </div>
                        <div>
                            <label htmlFor="review-engine" className="mb-2 block text-sm text-zinc-300">
                                Двигатель
                            </label>
                            <input
                                id="review-engine"
                                required
                                maxLength={40}
                                value={engine}
                                onChange={(event) => setEngine(event.target.value)}
                                placeholder="2.0 TSI"
                                className={fieldClassName}
                            />
                        </div>
                        <div>
                            <label htmlFor="review-horsepower" className="mb-2 block text-sm text-zinc-300">
                                Мощность, л.с.
                            </label>
                            <input
                                id="review-horsepower"
                                required
                                type="number"
                                min={1}
                                max={2500}
                                value={horsePower}
                                onChange={(event) => setHorsePower(event.target.value)}
                                placeholder="245"
                                className={fieldClassName}
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                            <label htmlFor="review-mileage" className="mb-2 block text-sm text-zinc-300">
                                Пробег, км
                            </label>
                            <input
                                id="review-mileage"
                                required
                                type="number"
                                min={0}
                                max={2_000_000}
                                value={mileage}
                                onChange={(event) => setMileage(event.target.value)}
                                placeholder="38000"
                                className={fieldClassName}
                            />
                        </div>
                        <div>
                            <label htmlFor="review-rating" className="mb-2 block text-sm text-zinc-300">
                                Оценка
                            </label>
                            <select
                                id="review-rating"
                                required
                                value={rating}
                                onChange={(event) => setRating(event.target.value)}
                                className={fieldClassName}
                            >
                                {[5, 4, 3, 2, 1].map((value) => (
                                    <option key={value} value={value}>{value} из 5</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="review-ownership" className="mb-2 block text-sm text-zinc-300">
                                Срок владения
                            </label>
                            <input
                                id="review-ownership"
                                required
                                maxLength={40}
                                value={ownershipDuration}
                                onChange={(event) => setOwnershipDuration(event.target.value)}
                                placeholder="2 года"
                                className={fieldClassName}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="review-title" className="mb-2 block text-sm text-zinc-300">
                            Заголовок отзыва
                        </label>
                        <input
                            id="review-title"
                            required
                            minLength={5}
                            maxLength={100}
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Коротко о главном впечатлении"
                            className={fieldClassName}
                        />
                    </div>

                    <div>
                        <label htmlFor="review-text" className="mb-2 block text-sm text-zinc-300">
                            Ваш отзыв
                        </label>
                        <textarea
                            id="review-text"
                            required
                            minLength={20}
                            maxLength={3000}
                            rows={5}
                            value={reviewText}
                            onChange={(event) => setReviewText(event.target.value)}
                            placeholder="Расскажите о расходе, комфорте, надежности и обслуживании..."
                            className={`${fieldClassName} resize-y`}
                        />
                        <p className="mt-1 text-right text-xs text-zinc-500">
                            {reviewText.length}/3000
                        </p>
                    </div>

                    <div>
                        <label htmlFor="review-photos" className="mb-2 block text-sm text-zinc-300">
                            Фотографии автомобиля
                        </label>
                        <input
                            id="review-photos"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            multiple
                            onChange={handlePhotosChange}
                            className="block w-full rounded-xl border border-zinc-700 bg-zinc-900 text-sm text-zinc-300 file:mr-4 file:border-0 file:bg-blue-600 file:px-4 file:py-3 file:font-medium file:text-white hover:file:bg-blue-500"
                        />
                        <p className="mt-1 text-xs text-zinc-500">
                            До 5 изображений JPG, PNG или WebP, не более 5 МБ каждое.
                        </p>
                        {photoError && (
                            <p role="alert" className="mt-2 text-sm text-red-400">{photoError}</p>
                        )}
                        {photoDataUrls.length > 0 && (
                            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {photoDataUrls.map((photo, index) => (
                                    <div key={`${photo.slice(0, 40)}-${index}`} className="relative">
                                        <Image
                                            src={photo}
                                            alt={`Предпросмотр фото ${index + 1}`}
                                            width={800}
                                            height={600}
                                            unoptimized
                                            className="aspect-[4/3] w-full rounded-xl object-cover"
                                        />
                                        <button
                                            type="button"
                                            aria-label={`Удалить фото ${index + 1}`}
                                            onClick={() => setPhotoDataUrls((currentPhotos) =>
                                                currentPhotos.filter((_, photoIndex) => photoIndex !== index),
                                            )}
                                            className="absolute right-2 top-2 rounded-full bg-black/75 px-2 py-1 text-xs text-white hover:bg-black"
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="review-pros" className="mb-2 block text-sm text-zinc-300">
                                Плюсы
                            </label>
                            <input
                                id="review-pros"
                                value={pros}
                                onChange={(event) => setPros(event.target.value)}
                                placeholder="Динамика, комфорт, расход"
                                className={fieldClassName}
                            />
                            <p className="mt-1 text-xs text-zinc-500">Перечислите через запятую</p>
                        </div>
                        <div>
                            <label htmlFor="review-cons" className="mb-2 block text-sm text-zinc-300">
                                Минусы
                            </label>
                            <input
                                id="review-cons"
                                value={cons}
                                onChange={(event) => setCons(event.target.value)}
                                placeholder="Шумоизоляция, стоимость сервиса"
                                className={fieldClassName}
                            />
                            <p className="mt-1 text-xs text-zinc-500">Перечислите через запятую</p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 border-t border-zinc-800 pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-zinc-700 px-4 py-2.5 text-sm text-zinc-200 transition hover:bg-zinc-800"
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                        >
                            Опубликовать отзыв
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}
