import { Star } from "lucide-react"
import { Icon } from "@/shared/ui"
import { useRouter } from "next/navigation"
import type { IHomeRate } from "../types"

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
           className="mt-4 flex h-full min-h-[22rem] w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-800/80 transition-colors hover:border-blue-500"
           onClick={handleClick}
        >
            
           <div className="relative h-36 w-full shrink-0 bg-gradient-to-br from-zinc-700 to-zinc-900 sm:h-44">
               <div className="absolute bottom-3 left-0 flex w-full justify-between px-3 sm:px-4">
                   <div className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 backdrop-blur-sm">
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

            <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="text-white text-lg font-bold line-clamp-1">{title}</h3>
                        <span className="text-gray-400 text-sm font-medium">{year}</span>
                    </div>
                    
                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                        {subtitle}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
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