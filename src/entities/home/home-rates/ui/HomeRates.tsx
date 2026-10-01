import { Star } from "lucide-react"
import { Icon } from "@/shared/ui"
import { useRouter } from "next/navigation"

interface IHomeRate {
    rate: number
    model: string
    title: string
    engine: string
    horsePower: number
    year: number
    subtitle: string
    user: string
    date: string
}

export default function HomeRateCard({
    rate,
    model,
    title,
    engine,
    horsePower,
    year,
    subtitle,
    user,
    date
}: IHomeRate) {
    const router = useRouter()
    const handleClick = () => {
        router.push("/rates")
    }
    return ( 
        <div 
            className="h-[400px] w-[400px] bg-[#222224] border border-white/30 
            rounded-[16px] mt-6 hover:border-blue-600 transition-colors 
            overflow-hidden flex flex-col"
            onClick={handleClick}
        >
            
            <div className="relative h-[220px] w-full bg-[#2e3136] shrink-0">
                <div className="absolute bottom-3 left-0 w-full flex justify-between px-4">
                    <div className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded-[20px] backdrop-blur-sm">
                        <Icon icon={Star} size={16} color="yellow" fill="yellow" />
                        <span className="text-white text-sm font-semibold">
                            {rate.toFixed(1)}
                        </span>
                    </div>
                    <span className="text-white flex items-center text-[12px] tracking-tight font-bold bg-blue-600 px-3 py-1 rounded-full uppercase">
                        {model}
                    </span>
                </div>
            </div>

            <div className="flex flex-col flex-1 p-4 justify-between">
                <div>
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="text-white text-lg font-bold line-clamp-1">{title}</h3>
                        <span className="text-gray-400 text-sm font-medium">{year}</span>
                    </div>
                    
                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                        {subtitle}
                    </p>
                    
                    <div className="flex gap-2">
                        <span className="text-[12px] font-medium bg-white/10 text-white px-2 py-1 rounded-md">
                            {engine}
                        </span>
                        <span className="text-[12px] font-medium bg-white/10 text-white px-2 py-1 rounded-md">
                            {horsePower} HP
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-2 pb-3 border-t border-white/10">
                    <span className="text-blue-400 text-sm font-medium">{user}</span>
                    <span className="text-gray-500 text-xs">{date}</span>
                </div>
            </div>

        </div>
    )
}