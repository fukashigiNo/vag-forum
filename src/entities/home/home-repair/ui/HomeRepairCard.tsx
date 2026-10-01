import { Icon } from "@/shared/ui"
import { Gauge, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

interface IHomeRepairCard {
    type: string,
    dificuilty: "Easy" | "Normal" | "Hard",
    title: string,
    duration: string,
    steps: number
}

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
            className="flex flex-col gap-2 bg-[#222224] p-4 w-[400px] h-[150px] rounded-[16px] border border-white/30 
            hover:border-blue-600 mt-3 transition-colors"
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
            <span className="text-white tracking-tight font-bold">{title}</span>
            <div className="flex gap-2 mt-4">
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