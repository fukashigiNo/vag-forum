export interface IForumCardProps {
    letter: string
    solved: boolean
    enterprise: string
    title: string
    user: string
    time: string
    answers: number
    views: number
    vehicle?: string
    description?: string
}

export interface IForumPost extends IForumCardProps {
    id: string
}

export interface IStatProps {
    value: number
    label: string
}