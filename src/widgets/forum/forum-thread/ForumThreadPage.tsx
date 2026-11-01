"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import {
    ArrowLeft,
    CircleCheck,
    Eye,
    MessageSquareText,
    ThumbsUp,
    UserRound,
} from "lucide-react"
import { Icon } from "@/shared/ui"
import { useAppDispatch } from "@/shared/store/hooks/app-dispatch"
import { addForumReply, toggleHelpful } from "@/shared/store/slices/forum-thread-slice/forumThreads.slice"
import type { IForumThreadProps } from "@/entities/forum/forum-card/types"

export default function ForumThreadPage({
    id,
    letter,
    solved,
    enterprise,
    title,
    user,
    time,
    answers,
    views,
    brand,
    model,
    body,
    vehicle,
    description,
    helpful = 0,
    helpfulByCurrentUser = false,
    replies = [],
}: IForumThreadProps) {
    const [replyBody, setReplyBody] = useState("")
    const dispatch = useAppDispatch()

    const handleReplySubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const normalizedReply = replyBody.trim()
        if (!normalizedReply) return

        dispatch(addForumReply({
            postId: id,
            reply: {
                id: `reply-${Date.now()}`,
                user: "You",
                time: "Just now",
                role: "member",
                body: normalizedReply,
            },
        }))
        setReplyBody("")
    }

    return (
        <main className="mx-auto w-full px-4 py-20 text-white md:px-6 lg:px-8 bg-zinc-900/80">
            <div className="mb-6 flex items-center justify-between gap-4">
                <Link
                    href="/forum"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-zinc-800 px-3 py-2 text-sm text-white/80 transition hover:border-blue-500 hover:text-white"
                >
                    <ArrowLeft size={16} />
                    Back to forum
                </Link>

                <span className="rounded-full border border-white/15 bg-zinc-800 px-3 py-1 text-xs uppercase tracking-[0.12em] text-zinc-300">
                    Thread #{id}
                </span>
            </div>

            <article className="overflow-hidden rounded-2xl border border-white/15 bg-zinc-900 shadow-2xl shadow-black/20">
                <header className="border-b border-white/10 bg-zinc-900 p-6 md:p-8">
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-lg font-bold text-white">
                            {letter}
                        </div>

                        {solved && (
                            <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-blue-200">
                                <Icon icon={CircleCheck} size={12} color="#dbeafe" />
                                Solved
                            </span>
                        )}
                    </div>

                    <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-white/60">
                        <span className="rounded-full border border-white/10 bg-zinc-800 px-2.5 py-1">
                            {enterprise}
                        </span>
                        {brand && (
                            <span className="rounded-full border border-white/10 bg-zinc-800 px-2.5 py-1">
                                {brand}
                            </span>
                        )}
                        {model && (
                            <span className="rounded-full border border-white/10 bg-zinc-800 px-2.5 py-1">
                                {model}
                            </span>
                        )}
                        {vehicle && (
                            <span className="rounded-full border border-white/10 bg-zinc-800 px-2.5 py-1">
                                {vehicle}
                            </span>
                        )}
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-white md:text-4xl">
                        {title}
                    </h1>

                    <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-white/60">
                        <span className="inline-flex items-center gap-2">
                            <UserRound size={16} />
                            @{user}
                        </span>
                        <span>{time}</span>
                        <span className="inline-flex items-center gap-2">
                            <MessageSquareText size={16} />
                            {replies.length || answers} answers
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <Eye size={16} />
                            {views} views
                        </span>
                    </div>
                </header>

                <div className="space-y-8 p-6 md:p-8">
                    <div className="rounded-2xl border border-white/10 bg-zinc-800/60 p-5 md:p-6">
                        <p className="whitespace-pre-line text-base leading-7 text-zinc-200">
                            {body || description || "No description provided for this thread."}
                        </p>
                        <div className="mt-6 border-t border-white/10 pt-4">
                            <button
                                type="button"
                                aria-pressed={helpfulByCurrentUser}
                                onClick={() => dispatch(toggleHelpful(id))}
                                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                                    helpfulByCurrentUser
                                        ? "border-blue-400 bg-blue-500/20 text-blue-200"
                                        : "border-white/15 text-zinc-300 hover:border-blue-400 hover:text-white"
                                }`}
                            >
                                <ThumbsUp size={16} />
                                Helpful
                                <span>{helpful}</span>
                            </button>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-zinc-800/60 p-5 md:p-6">
                        <h2 className="mb-4 text-xl font-semibold text-white">
                            Replies ({replies.length})
                        </h2>

                        {replies.length > 0 ? (
                            <div className="space-y-4">
                                {replies.map((reply) => (
                                    <div
                                        key={reply.id}
                                        className="rounded-xl border border-white/10 bg-zinc-900/80 p-4"
                                    >
                                        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                                            <div className="flex items-center gap-2 text-sm text-white/70">
                                                <span className="font-semibold text-white">@{reply.user}</span>
                                                <span>•</span>
                                                <span>{reply.time}</span>
                                            </div>
                                            {reply.role && (
                                                <span className="rounded-full bg-blue-500/15 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-blue-200">
                                                    {reply.role}
                                                </span>
                                            )}
                                        </div>

                                        <p className="leading-7 text-zinc-200">{reply.body}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-zinc-400">No replies yet. Be the first to answer this thread.</p>
                        )}

                        <form className="mt-6 space-y-3 border-t border-white/10 pt-5" onSubmit={handleReplySubmit}>
                            <label htmlFor="forum-reply" className="block text-sm font-medium text-zinc-200">
                                Add your answer
                            </label>
                            <textarea
                                id="forum-reply"
                                required
                                minLength={2}
                                maxLength={2000}
                                rows={4}
                                value={replyBody}
                                onChange={(event) => setReplyBody(event.target.value)}
                                placeholder="Write a helpful reply..."
                                className="w-full resize-y rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-blue-500"
                            />
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-400"
                                >
                                    Post answer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </article>
        </main>
    )
}
