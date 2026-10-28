export interface IForumCardProps {
    letter: string
    solved: boolean
    enterprise: string
    title: string
    user: string
    time: string
    answers: number
    views: number
    brand?: string
    model?: string
    body?: string
    vehicle?: string
    description?: string
}

export interface IForumPost extends IForumCardProps {
    id: string
    brand: string
    model: string
    body: string
}

export interface IStatProps {
    value: number
    label: string
}