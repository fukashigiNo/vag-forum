"use client"
import { Icon } from "@/shared/ui"
import { Plus } from "lucide-react"

interface IForumHeaderProps {
    onCreatePost: () => void
}

export default function ForumHeader({ onCreatePost }: IForumHeaderProps) {
    return (
    <div className="flex justify-between items-center px-4 py-2">
        <header className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                    Страница обсуждения
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-5xl">
                        Форум
                </h1>
            </header>
        <div>
            <button className="flex gap-2 items-center bg-blue-600/30 
            text-white px-3 py-1 rounded-[13px] border border-blue-500 cursor-pointer
            hover:bg-blue-600/50 transition-colors"
            onClick={onCreatePost}
            >
                <Icon icon={Plus} color="white" size={18} />
                Create Post
            </button>
        </div>
    </div>
    )
}