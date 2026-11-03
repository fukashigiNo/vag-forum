export interface ICarReview {
    id: string
    brand: string
    model: string
    year: number
    engine: string
    horsePower: number
    mileage: number
    rating: number
    title: string
    review: string
    pros: string[]
    cons: string[]
    author: string
    date: string
    createdAt: string
    ownershipDuration: string
    photoDataUrls?: string[]
}
