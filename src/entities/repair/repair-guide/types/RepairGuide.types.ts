export type RepairDifficulty = "Легко" | "Средне" | "Сложно"

export interface IRepairVehicle {
    brand: string
    model: string
    generation: string
}

export interface IRepairGuide {
    id: string
    title: string
    category: string
    difficulty: RepairDifficulty
    duration: string
    vehicles: IRepairVehicle[]
    summary: string
    tools: string[]
    materials: string[]
    safety: string[]
    steps: string[]
}
