"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { forumPostApi } from "@/entities/forum/forum-card"
import { useAppSelector } from "@/shared/store/hooks/app-selector"
import { useAppDispatch } from "@/shared/store/hooks/app-dispatch"
import { setForumPost } from "@/shared/store/slices/forum-thread-slice/forumThreads.slice"
import { ForumThreadPage } from "@/widgets/forum/forum-thread"

export default function ForumThreadRoute() {
    const { id } = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [loadError, setLoadError] = useState("")
    const thread = useAppSelector((state) =>
        state.forumThreads.posts.find((post) => post.id === id),
    )

    useEffect(() => {
        let isActive = true
        forumPostApi.getById(id)
            .then((post) => { if (isActive) dispatch(setForumPost(post)) })
            .catch((error: unknown) => {
                if (isActive) setLoadError(error instanceof Error ? error.message : "Unable to load this discussion.")
            })
            .finally(() => { if (isActive) setIsLoading(false) })
        return () => { isActive = false }
    }, [dispatch, id])

    if (isLoading) {
        return <main className="mx-auto max-w-5xl px-4 py-20 text-zinc-400">Loading discussion...</main>
    }

    if (loadError) {
        return <main role="alert" className="mx-auto max-w-5xl px-4 py-20 text-red-300">Unable to load discussion: {loadError}</main>
    }

    if (!thread) {
        return (
            <main className="mx-auto max-w-5xl px-4 py-20 text-white">
                <p className="text-xl font-semibold">Thread not found</p>
                <p className="mt-2 text-zinc-400">
                    This thread may have been removed or is not available in this session.
                </p>
            </main>
        )
    }

    return <ForumThreadPage {...thread} />
}