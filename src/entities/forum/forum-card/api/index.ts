import { apiRequest } from "@/shared/api/apiRequest"
import type { IForumPost, IForumReply } from "../types"

export interface IForumPostDraft {
    title: string
    enterprise: string
    description: string
    brand: string
    model: string
    body: string
    vehicle?: string
}

export const forumPostApi = {
    getAll: () => apiRequest<IForumPost[]>("/forum/posts"),
    getById: (id: string) => apiRequest<IForumPost>(`/forum/posts/${encodeURIComponent(id)}`),
    create: (post: IForumPostDraft) => apiRequest<IForumPost>("/forum/posts", {
        method: "POST",
        body: JSON.stringify(post),
    }),
    addReply: (id: string, body: string) => apiRequest<IForumReply>(
        `/forum/posts/${encodeURIComponent(id)}/replies`,
        { method: "POST", body: JSON.stringify({ body }) },
    ),
    toggleHelpful: (id: string) => apiRequest<IForumPost>(
        `/forum/posts/${encodeURIComponent(id)}/helpful`,
        { method: "POST" },
    ),
}