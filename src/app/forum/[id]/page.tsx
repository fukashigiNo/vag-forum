"use client"

import { useParams } from "next/navigation"
import { useAppSelector } from "@/shared/store/hooks/app-selector"
import { ForumThreadPage } from "@/widgets/forum/forum-thread"

export default function ForumThreadRoute() {
    const { id } = useParams<{ id: string }>()
    const thread = useAppSelector((state) =>
        state.forumThreads.posts.find((post) => post.id === id),
    )

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