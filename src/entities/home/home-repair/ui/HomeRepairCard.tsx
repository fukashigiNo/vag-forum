import { Icon } from "@/shared/ui"
import { Gauge, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import type { IHomeRepairCard } from "../types"

export default function HomeRepairCard({
    type,
    dificuilty,
    title,
    duration,
    steps
}: IHomeRepairCard) {
    const router = useRouter()
    const handleClick = () => {
        router.push('/repair')
    }

    const difficultyStyles = {
        Easy: "text-green-500",
        Normal: "text-yellow-500",
        Hard: "text-red-500"
    }

    return (
        <div 
            className="mt-3 flex h-full min-h-40 w-full min-w-0 cursor-pointer flex-col gap-3 rounded-2xl border border-white/10 bg-zinc-800/80 p-4 transition-colors hover:border-blue-500"
            onClick={handleClick}
            >
            <div className="flex justify-between items-center">
                <span 
                    className="text-blue-400 text-[12px] tracking-tighter font-semibold 
                    px-2 bg-blue-600/30 rounded-full flex items-center "
                >
                    {type}
                </span>
                <span 
                    className={`text-[12px] font-semibold px-2 flex items-center ${difficultyStyles[dificuilty]}`}
                >
                    {dificuilty}
                </span>
            </div>
            <span className="text-white font-bold tracking-tight">{title}</span>
            <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-2">
                <span className="flex gap-1 items-center text-white/50 text-[12px]">
                    <Icon icon={Gauge} color="gray" size={13} />
                    {duration}
                </span>
                <span className="flex gap-1 items-center text-white/50 text-[12px]">
                    <Icon icon={Zap} color="gray" size={13} />
                    {steps} steps
                </span>
            </div>
        </div>
    )
}