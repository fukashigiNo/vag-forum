"use client"

import { useMemo, useState } from "react"
import { Plus, Search, ShieldCheck, Wrench } from "lucide-react"
import {
    repairGuides,
    repairVehicles,
    RepairGuideCard,
    type IRepairGuide,
} from "@/entities/repair/repair-guide"
import { CreateRepairGuideModal } from "@/features/repair/create-guide"
import { filterRepairGuides, type RepairDifficultyFilter } from "@/features/repair/filter-guides"

const DIFFICULTIES: RepairDifficultyFilter[] = ["Все", "Легко", "Средне", "Сложно"]

export default function RepairCatalog() {
    const [guides, setGuides] = useState<IRepairGuide[]>(repairGuides)
    const [query, setQuery] = useState("")
    const [category, setCategory] = useState("Все")
    const [difficulty, setDifficulty] = useState<RepairDifficultyFilter>("Все")
    const [brand, setBrand] = useState("Все")
    const [model, setModel] = useState("Все")
    const [generation, setGeneration] = useState("Все")
    const [isCreateGuideOpen, setIsCreateGuideOpen] = useState(false)
    const categories = useMemo(
        () => ["Все", ...new Set(guides.map((guide) => guide.category))],
        [guides],
    )
    const brands = useMemo(
        () => ["Все", ...new Set(repairVehicles.map((vehicle) => vehicle.brand))],
        [],
    )
    const models = useMemo(
        () => ["Все", ...new Set(
            repairVehicles
                .filter((vehicle) => brand === "Все" || vehicle.brand === brand)
                .map((vehicle) => vehicle.model),
        )],
        [brand],
    )
    const generations = useMemo(
        () => ["Все", ...new Set(
            repairVehicles
                .filter((vehicle) =>
                    (brand === "Все" || vehicle.brand === brand)
                    && (model === "Все" || vehicle.model === model),
                )
                .map((vehicle) => vehicle.generation),
        )],
        [brand, model],
    )
    const visibleGuides = useMemo(
        () => filterRepairGuides({
            guides,
            query,
            category,
            difficulty,
            brand,
            model,
            generation,
        }),
        [brand, category, difficulty, generation, guides, model, query],
    )

    const handleCreateGuide = (guide: IRepairGuide) => {
        setGuides((currentGuides) => [guide, ...currentGuides])
        setQuery("")
        setCategory("Все")
        setDifficulty("Все")
        setBrand("Все")
        setModel("Все")
        setGeneration("Все")
        setIsCreateGuideOpen(false)
    }

    const handleBrandChange = (nextBrand: string) => {
        setBrand(nextBrand)
        setModel("Все")
        setGeneration("Все")
    }

    const handleModelChange = (nextModel: string) => {
        setModel(nextModel)
        setGeneration("Все")
    }

    return (
        <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
            <header className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                        Практические руководства
                    </p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-5xl">
                        Ремонт и обслуживание
                    </h1>
                </div>
                <button
                    type="button"
                    onClick={() => setIsCreateGuideOpen(true)}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                    <Plus size={18} />
                    Добавить совет
                </button>
            </header>

            <aside className="mb-6 grid gap-4 rounded-2xl border border-amber-400/15 bg-amber-400/5 p-4 sm:grid-cols-[auto_1fr] sm:items-start">
                <ShieldCheck size={22} className="text-amber-300" aria-hidden="true" />
                <p className="text-sm leading-6 text-zinc-300">
                    Безопасность прежде всего: если работа связана с тормозами, топливом,
                    подушками безопасности, высоковольтными системами или требует подъёма
                    автомобиля, обратитесь к квалифицированному специалисту.
                </p>
            </aside>

            <div className="mb-6 space-y-4 rounded-2xl border border-white/10 bg-zinc-800/50 p-4 md:p-5">
                <label className="relative block">
                    <Search
                        size={18}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    />
                    <span className="sr-only">Поиск инструкций по ремонту</span>
                    <input
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Найти инструкцию, деталь или автомобиль"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-10 pr-4 text-white outline-none placeholder:text-zinc-500 focus:border-blue-500"
                    />
                </label>

                <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
                        Система автомобиля
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((item) => (
                            <button
                                key={item}
                                type="button"
                                aria-pressed={category === item}
                                onClick={() => setCategory(item)}
                                className={`rounded-full border px-3 py-2 text-sm transition ${
                                    category === item
                                        ? "border-blue-500 bg-blue-500 text-white"
                                        : "border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white"
                                }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
                        Сложность
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {DIFFICULTIES.map((item) => (
                            <button
                                key={item}
                                type="button"
                                aria-pressed={difficulty === item}
                                onClick={() => setDifficulty(item)}
                                className={`rounded-full border px-3 py-2 text-sm transition ${
                                    difficulty === item
                                        ? "border-blue-500 bg-blue-500 text-white"
                                        : "border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white"
                                }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                    <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                        Марка
                        <select
                            value={brand}
                            onChange={(event) => handleBrandChange(event.target.value)}
                            className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm normal-case tracking-normal text-white outline-none focus:border-blue-500"
                        >
                            {brands.map((item) => <option key={item} value={item}>{item}</option>)}
                        </select>
                    </label>
                    <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                        Модель
                        <select
                            value={model}
                            onChange={(event) => handleModelChange(event.target.value)}
                            className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm normal-case tracking-normal text-white outline-none focus:border-blue-500"
                        >
                            {models.map((item) => <option key={item} value={item}>{item}</option>)}
                        </select>
                    </label>
                    <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                        Поколение
                        <select
                            value={generation}
                            onChange={(event) => setGeneration(event.target.value)}
                            className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm normal-case tracking-normal text-white outline-none focus:border-blue-500"
                        >
                            {generations.map((item) => <option key={item} value={item}>{item}</option>)}
                        </select>
                    </label>
                </div>
            </div>

            <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="inline-flex items-center gap-2 text-lg font-semibold text-white">
                    <Wrench size={18} className="text-blue-400" />
                    Инструкции по ремонту
                </h2>
                <span className="text-sm text-zinc-400">Найдено: {visibleGuides.length}</span>
            </div>

            {visibleGuides.length > 0 ? (
                <div className="grid gap-4">
                    {visibleGuides.map((guide) => (
                        <RepairGuideCard key={guide.id} guide={guide} />
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-zinc-700 px-6 py-12 text-center">
                    <p className="font-medium text-white">Инструкции не найдены</p>
                    <p className="mt-2 text-sm text-zinc-400">
                        Измените запрос или выберите другую категорию.
                    </p>
                </div>
            )}
            {isCreateGuideOpen && (
                <CreateRepairGuideModal
                    onClose={() => setIsCreateGuideOpen(false)}
                    onCreate={handleCreateGuide}
                />
            )}
        </section>
    )
}
