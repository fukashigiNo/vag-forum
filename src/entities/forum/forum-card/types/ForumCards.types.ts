export interface IForumReply {
    id: string
    user: string
    time: string
    role?: "author" | "moderator" | "member"
    body: string
}

export interface IForumCardProps {
    id?: string
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
    replies?: IForumReply[]
    helpful?: number
    helpfulByCurrentUser?: boolean
    onClick?: () => void
}

export interface IForumPost extends IForumCardProps {
    id: string
    brand: string
    model: string
    body: string
}

export interface IForumThreadProps extends IForumPost {
    replies?: IForumReply[]
}

export interface IStatProps {
    value: number
    label: string
}