"use client"

import { useEffect, useId, useState, type FormEvent } from "react"
import { repairVehicles, type IRepairGuide, type RepairDifficulty } from "@/entities/repair/repair-guide"

interface CreateRepairGuideModalProps {
    onClose: () => void
    onCreate: (guide: IRepairGuide) => void
}

const fieldClassName =
    "w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-blue-500"

const splitLines = (value: string) =>
    value.split("\n").map((item) => item.trim()).filter(Boolean)

export default function CreateRepairGuideModal({
    onClose,
    onCreate,
}: CreateRepairGuideModalProps) {
    const generatedId = useId().replaceAll(":", "")
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [generation, setGeneration] = useState("")
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [difficulty, setDifficulty] = useState<RepairDifficulty>("Легко")
    const [duration, setDuration] = useState("")
    const [summary, setSummary] = useState("")
    const [tools, setTools] = useState("")
    const [materials, setMaterials] = useState("")
    const [safety, setSafety] = useState("")
    const [steps, setSteps] = useState("")

    const brands = [...new Set(repairVehicles.map((vehicle) => vehicle.brand))]
    const models = [...new Set(
        repairVehicles
            .filter((vehicle) => !brand || vehicle.brand === brand)
            .map((vehicle) => vehicle.model),
    )]
    const generations = repairVehicles.filter(
        (vehicle) => vehicle.brand === brand && vehicle.model === model,
    )

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [onClose])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const selectedVehicle = generations.find((vehicle) => vehicle.generation === generation)
        if (!selectedVehicle) return

        onCreate({
            id: `repair-${generatedId}`,
            title: title.trim(),
            category: category.trim(),
            difficulty,
            duration: duration.trim(),
            vehicles: [selectedVehicle],
            summary: summary.trim(),
            tools: splitLines(tools),
            materials: splitLines(materials),
            safety: splitLines(safety),
            steps: splitLines(steps),
        })
    }

    const handleBrandChange = (nextBrand: string) => {
        setBrand(nextBrand)
        setModel("")
        setGeneration("")
    }

    const handleModelChange = (nextModel: string) => {
        setModel(nextModel)
        setGeneration("")
    }

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose()
            }}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-repair-title"
                className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-zinc-700 bg-zinc-950 p-5 shadow-2xl md:p-7"
            >
                <header className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-blue-400">База знаний</p>
                        <h2 id="create-repair-title" className="mt-1 text-2xl font-semibold text-white">
                            Новый совет по ремонту
                        </h2>
                        <p className="mt-2 text-sm text-zinc-400">
                            Укажите автомобиль, для которого подходит инструкция.
                        </p>
                    </div>
                    <button
                        type="button"
                        aria-label="Закрыть форму"
                        onClick={onClose}
                        className="rounded-lg px-3 py-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                    >
                        ✕
                    </button>
                </header>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <fieldset className="space-y-3">
                        <legend className="text-sm font-semibold text-white">Применимость к автомобилю</legend>
                        <div className="grid gap-3 sm:grid-cols-3">
                            <label className="text-sm text-zinc-300">
                                Марка
                                <select
                                    required
                                    value={brand}
                                    onChange={(event) => handleBrandChange(event.target.value)}
                                    className={`${fieldClassName} mt-2`}
                                >
                                    <option value="" disabled>Выберите марку</option>
                                    {brands.map((item) => <option key={item} value={item}>{item}</option>)}
                                </select>
                            </label>
                            <label className="text-sm text-zinc-300">
                                Модель
                                <select
                                    required
                                    disabled={!brand}
                                    value={model}
                                    onChange={(event) => handleModelChange(event.target.value)}
                                    className={`${fieldClassName} mt-2`}
                                >
                                    <option value="" disabled>Выберите модель</option>
                                    {models.map((item) => <option key={item} value={item}>{item}</option>)}
                                </select>
                            </label>
                            <label className="text-sm text-zinc-300">
                                Поколение
                                <select
                                    required
                                    disabled={!model}
                                    value={generation}
                                    onChange={(event) => setGeneration(event.target.value)}
                                    className={`${fieldClassName} mt-2`}
                                >
                                    <option value="" disabled>Выберите поколение</option>
                                    {generations.map((item) => (
                                        <option key={item.generation} value={item.generation}>
                                            {item.generation}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </fieldset>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="text-sm text-zinc-300">
                            Название инструкции
                            <input
                                required
                                minLength={5}
                                maxLength={120}
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                className={`${fieldClassName} mt-2`}
                            />
                        </label>
                        <label className="text-sm text-zinc-300">
                            Система автомобиля
                            <input
                                required
                                maxLength={50}
                                value={category}
                                onChange={(event) => setCategory(event.target.value)}
                                placeholder="Например, Обслуживание"
                                className={`${fieldClassName} mt-2`}
                            />
                        </label>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="text-sm text-zinc-300">
                            Сложность
                            <select
                                value={difficulty}
                                onChange={(event) => setDifficulty(event.target.value as RepairDifficulty)}
                                className={`${fieldClassName} mt-2`}
                            >
                                <option value="Легко">Легко</option>
                                <option value="Средне">Средне</option>
                                <option value="Сложно">Сложно</option>
                            </select>
                        </label>
                        <label className="text-sm text-zinc-300">
                            Примерное время
                            <input
                                required
                                maxLength={40}
                                value={duration}
                                onChange={(event) => setDuration(event.target.value)}
                                placeholder="Например, 30–45 минут"
                                className={`${fieldClassName} mt-2`}
                            />
                        </label>
                    </div>

                    <label className="block text-sm text-zinc-300">
                        Краткое описание
                        <textarea
                            required
                            minLength={10}
                            maxLength={300}
                            value={summary}
                            onChange={(event) => setSummary(event.target.value)}
                            rows={2}
                            className={`${fieldClassName} mt-2 resize-y`}
                        />
                    </label>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="text-sm text-zinc-300">
                            Инструменты (каждый с новой строки)
                            <textarea required value={tools} onChange={(event) => setTools(event.target.value)} rows={3} className={`${fieldClassName} mt-2 resize-y`} />
                        </label>
                        <label className="text-sm text-zinc-300">
                            Материалы (каждый с новой строки)
                            <textarea value={materials} onChange={(event) => setMaterials(event.target.value)} rows={3} className={`${fieldClassName} mt-2 resize-y`} />
                        </label>
                    </div>

                    <label className="block text-sm text-zinc-300">
                        Меры безопасности (каждая с новой строки)
                        <textarea
                            required
                            minLength={10}
                            value={safety}
                            onChange={(event) => setSafety(event.target.value)}
                            rows={3}
                            className={`${fieldClassName} mt-2 resize-y`}
                        />
                    </label>

                    <label className="block text-sm text-zinc-300">
                        Этапы работ (каждый с новой строки)
                        <textarea
                            required
                            minLength={20}
                            value={steps}
                            onChange={(event) => setSteps(event.target.value)}
                            rows={5}
                            className={`${fieldClassName} mt-2 resize-y`}
                        />
                    </label>

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
                            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                        >
                            Опубликовать совет
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}
