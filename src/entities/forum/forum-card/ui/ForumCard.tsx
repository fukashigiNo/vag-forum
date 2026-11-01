import { CircleCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import type { KeyboardEvent } from "react"
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
    id,
    letter,
    solved,
    enterprise,
    title,
    user,
    time,
    answers,
    views,
    vehicle,
    description,
    onClick,
}: IForumCardProps) {
    const router = useRouter()

    const handleClick = () => {
        if (onClick) {
            onClick()
            return
        }

        if (id) {
            router.push(`/forum/${id}`)
        }
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            handleClick()
        }
    }

    return (
        <article
            role="button"
            tabIndex={0}
            className="mx-auto mt-5 flex w-[98%] cursor-pointer items-center gap-4 rounded-xl border border-white/30 bg-zinc-800 p-5 text-white transition-colors hover:border-blue-600 focus:outline-none focus-visible:border-blue-600"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            <div className="shrink-0 rounded-xl bg-blue-500 px-4 py-3 font-bold">
                {letter}
            </div>

            <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
                <div className="min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-2 sm:gap-4">
                        {solved && (
                            <span className="flex items-center gap-1 rounded-[12px] bg-blue-500 px-2">
                                <Icon icon={CircleCheck} size={12} color="white" />
                                <span className="text-[13px] text-white">SOLVED</span>
                            </span>
                        )}
                        <span className="text-white/60">{enterprise}</span>
                        {vehicle && <span className="text-sm text-white/50">{vehicle}</span>}
                    </div>
                    <h3 className="truncate">{title}</h3>
                    {description && (
                        <p className="mt-1 line-clamp-2 text-sm text-white/60">{description}</p>
                    )}
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