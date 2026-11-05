import type { IRepairGuide, RepairDifficulty } from "@/entities/repair/repair-guide"

export type RepairDifficultyFilter = RepairDifficulty | "Все"

interface FilterRepairGuidesOptions {
    guides: IRepairGuide[]
    query: string
    category: string
    difficulty: RepairDifficultyFilter
    brand: string
    model: string
    generation: string
}

export default function filterRepairGuides({
    guides,
    query,
    category,
    difficulty,
    brand,
    model,
    generation,
}: FilterRepairGuidesOptions): IRepairGuide[] {
    const normalizedQuery = query.trim().toLocaleLowerCase()

    return guides.filter((guide) => {
        const matchesCategory = category === "Все" || guide.category === category
        const matchesDifficulty = difficulty === "Все" || guide.difficulty === difficulty
        const matchesVehicle = guide.vehicles.some((vehicle) =>
            (brand === "Все" || vehicle.brand === brand)
            && (model === "Все" || vehicle.model === model)
            && (generation === "Все" || vehicle.generation === generation),
        )
        const searchableText = [
            guide.title,
            guide.category,
            guide.summary,
            ...guide.tools,
            ...guide.materials,
            ...guide.vehicles.flatMap((vehicle) => [
                vehicle.brand,
                vehicle.model,
                vehicle.generation,
            ]),
        ].join(" ").toLocaleLowerCase()

        return matchesCategory
            && matchesDifficulty
            && matchesVehicle
            && searchableText.includes(normalizedQuery)
    })
}
