"use client"
import { Icon } from "@/shared/ui"
import { Plus } from "lucide-react"

interface IForumHeaderProps {
    onCreatePost: () => void
}

export default function ForumHeader({ onCreatePost }: IForumHeaderProps) {
    return (
    <div className="mb-6 flex flex-col justify-between gap-4 py-2 sm:flex-row sm:items-center">
        <header className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                    Страница обсуждения
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-5xl">
                        Форум
                </h1>
            </header>
        <div className="sm:mb-8">
            <button className="flex items-center justify-center gap-2 rounded-xl border border-blue-500 bg-blue-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-blue-500"
            onClick={onCreatePost}
            >
                <Icon icon={Plus} color="white" size={18} />
                Создать тему
            </button>
        </div>
    </div>
    )
}