"use client"
import { Icon } from "@/shared/ui"
import { MessageSquare, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import type { IHomeForumCard } from "../types"


export default function HomeForumCard({
    enterprise,
    title,
    model,
    user,
    answerCount,
    views,
    postDate
}: IHomeForumCard) {
    const router = useRouter()
    const handleClick = () => {
        router.push("/forum")
    }
    return (
        <div 
            className="flex min-w-0 cursor-pointer flex-col gap-3 rounded-2xl border border-white/10 bg-zinc-800/80 p-4 transition-colors hover:border-blue-500 sm:p-5"
            onClick={handleClick}
         >
            <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <span className="text-white/60 text-[14px]">{enterprise}</span>
                    <h2 className="line-clamp-2 text-lg font-bold tracking-tight text-white sm:text-xl">{title}</h2>
                </div>
                <div className="flex justify-center items-center bg-blue-500 rounded-[13px] w-10 h-10">
                    <span className="text-[20px] text-white font-bold">{model}</span>
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="text-white/80 text-[12px]">{user}</span>
                <div className="flex items-center gap-1">
                    <Icon icon={MessageSquare} size={12} color="gray"  />
                    <span className="text-white/60 text-[12px]">{answerCount}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Icon icon={Eye} size={13} color="gray"  />
                    <span className="text-white/60 text-[12px]">{views}</span>
                </div>
                <span className="text-white/60 text-[12px]">{postDate}</span>
            </div>
        </div>
    )
}