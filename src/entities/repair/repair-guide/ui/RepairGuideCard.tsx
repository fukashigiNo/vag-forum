"use client"

import { useState } from "react"
import { ChevronDown, Clock3, Wrench } from "lucide-react"
import type { IRepairGuide, RepairDifficulty } from "../types"

const difficultyStyles: Record<RepairDifficulty, string> = {
    Легко: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    Средне: "border-amber-400/20 bg-amber-400/10 text-amber-300",
    Сложно: "border-red-400/20 bg-red-400/10 text-red-300",
}

export default function RepairGuideCard({ guide }: { guide: IRepairGuide }) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <article className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-800/80 transition-colors hover:border-blue-500/50">
            <div className="p-5 md:p-6">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-200">
                        {guide.category}
                    </span>
                    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${difficultyStyles[guide.difficulty]}`}>
                        {guide.difficulty}
                    </span>
                </div>

                <h2 className="mt-4 text-xl font-semibold text-white md:text-2xl">
                    {guide.title}
                </h2>
                <p className="mt-2 leading-6 text-zinc-400">{guide.summary}</p>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-400">
                    <span className="inline-flex items-center gap-2">
                        <Clock3 size={15} />
                        {guide.duration}
                    </span>
                    <span className="inline-flex items-center gap-2">
                        <Wrench size={15} />
                        {guide.steps.length} этапов
                    </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                    {guide.vehicles.map((vehicle) => (
                        <span
                            key={`${vehicle.brand}-${vehicle.model}-${vehicle.generation}`}
                            className="rounded-full border border-white/10 bg-zinc-900/70 px-2.5 py-1 text-xs text-zinc-400"
                        >
                            {vehicle.brand} · {vehicle.model} · {vehicle.generation}
                        </span>
                    ))}
                </div>

                <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={`repair-steps-${guide.id}`}
                    onClick={() => setIsExpanded((expanded) => !expanded)}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-blue-400 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                    {isExpanded ? "Свернуть инструкцию" : "Открыть инструкцию"}
                    <ChevronDown
                        size={16}
                        className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                </button>
            </div>

            {isExpanded && (
                <div
                    id={`repair-steps-${guide.id}`}
                    className="space-y-6 border-t border-white/10 bg-zinc-900/50 p-5 md:p-6"
                >
                    <div className="rounded-xl border border-amber-400/15 bg-amber-400/5 p-4">
                        <h3 className="font-semibold text-amber-200">Безопасность</h3>
                        <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm leading-6 text-zinc-300">
                            {guide.safety.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <section>
                            <h3 className="font-semibold text-white">Инструменты</h3>
                            <ul className="mt-2 space-y-1.5 text-sm text-zinc-400">
                                {guide.tools.map((item) => <li key={item}>• {item}</li>)}
                            </ul>
                        </section>
                        {guide.materials.length > 0 && (
                            <section>
                                <h3 className="font-semibold text-white">Материалы</h3>
                                <ul className="mt-2 space-y-1.5 text-sm text-zinc-400">
                                    {guide.materials.map((item) => <li key={item}>• {item}</li>)}
                                </ul>
                            </section>
                        )}
                    </div>

                    <section>
                        <h3 className="font-semibold text-white">Порядок работ</h3>
                        <ol className="mt-3 space-y-3">
                            {guide.steps.map((step, index) => (
                                <li key={step} className="flex gap-3 text-sm leading-6 text-zinc-300">
                                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-xs font-semibold text-blue-300">
                                        {index + 1}
                                    </span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </section>
                </div>
            )}
        </article>
    )
}
