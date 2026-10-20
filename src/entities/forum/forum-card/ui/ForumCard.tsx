import { CircleCheck } from "lucide-react"
import { Icon } from "@/shared/ui"
import type { IForumCardProps, IStatProps } from "../types"

function Stat({ value, label }: IStatProps) {
    return (
        <div className="flex flex-col items-center">
            <p className="font-semibold">{value}</p>
            <p className="text-sm text-white/60">{label}</p>
        </div>
    )
}

export default function ForumCard({
    letter,
    solved,
    enterprise,
    title,
    user,
    time,
    answers,
    views,
}: IForumCardProps) {
    return (
        <article 
            className="mx-auto flex w-[98%] items-center gap-4 rounded-xl border 
            border-white/30 bg-zinc-800 p-5 text-white mt-5 cursor-pointer hover:border-blue-600"
            onClick={() => {}}
        >
            <div className="shrink-0 rounded-xl bg-blue-500 px-4 py-3 font-bold">
                {letter}
            </div>

            <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
                <div className="min-w-0">
                    <div className="mb-1 flex items-center gap-4">
                        {solved && (
                            <span className="flex items-center gap-1 bg-blue-500 px-2 rounded-[12px]">
                                <Icon icon={CircleCheck} size={12} color="white" />
                                <span className="text-white text-[13px]">SOLVED</span>
                            </span>
                        )}
                        <span className="text-white/60">{enterprise}</span>
                    </div>
                    <h3 className="truncate">{title}</h3>
                </div>

                <div className="flex shrink-0 flex-col text-sm text-white/60">
                    <span>@{user}</span>
                    <span>{time}</span>
                </div>
            </div>

            <div className="flex shrink-0 gap-6">
                <Stat value={answers} label="answers" />
                <Stat value={views} label="views" />
            </div>
        </article>
    )
}