"use client"
import { Icon } from "@/shared/components"
import { MessageSquare, Eye } from "lucide-react"

interface IHomeForumCard {
    enterprise: string,
    title: string,
    model: string,
    user: string,
    answerCount: number,
    views: number,
    postDate: string
}

export default function HomeForumCard({
    enterprise,
    title,
    model,
    user,
    answerCount,
    views,
    postDate
}: IHomeForumCard) {
    return (
        <div 
            className="flex flex-col gap-2 bg-zinc-800 border
            border-white/20 px-4 pt-4 pb-6 rounded-[16px] w-[95%]
            cursor-pointer hover:border-blue-500"
         >
            <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <span className="text-white/60 text-[14px]">{enterprise}</span>
                    <h2 className="text-white text-xl font-bold tracking-tighter">{title}</h2>
                </div>
                <div className="flex justify-center items-center bg-blue-500 rounded-[13px] w-10 h-10">
                    <span className="text-[20px] text-white font-bold">{model}</span>
                </div>
            </div>
            <div className="flex gap-3">
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