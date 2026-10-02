"use client"
import { Icon } from "@/shared/ui"
import { useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"

const mockData = [
    {
        id: 0,
        car: "All"
    },{
        id: 1,
        car: "Volkswagen",
    },{
        id: 2,
        car: "Audi",
    },{
        id: 3,
        car: "Skoda",
    },{
        id: 4,
        car: "SEAT",
    },{
        id: 5,
        car: "CUPRA",
    },{
        id: 6,
        car: "Porsche",
    }
]

export default function ForumHero() {
    const [activeCar, setActiveCar] = useState("All")
    const [active, setActive] = useState(false)
    return (
        <div className="mt-6">
            <div className="flex  px-4">
                <label
                    className="relative flex w-[60%] items-center rounded-[12px] border-2 border-zinc-700 bg-zinc-800 p-2 focus-within:border-blue-500"
                >
                    <Icon 
                        icon={Search}
                        size={16}
                        color="white"
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                    />
                    <input 
                        type="text" 
                        placeholder="Search themes or models of your car..."
                        className="w-full bg-transparent pl-8 text-white outline-none placeholder:text-zinc-400"
                    />
                </label>

                <div className="flex items-center">
                    {mockData.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveCar(item.car)}
                            aria-pressed={activeCar === item.car}
                            className={`ml-4 rounded-full border border-zinc-700 px-2 py-1 text-[14px] 
                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                                activeCar === item.car
                                    ? "bg-blue-500 text-white"
                                    : "text-white/70 hover:text-white"
                            }`}
                        >
                            {item.car}
                        </button>
                    ))}
                        <button 
                            className="ml-4 cursor-pointer"
                            onClick={() => setActive(prevState => prevState = true)}
                        >
                            <Icon icon={SlidersHorizontal} color="white" size={18} />
                        </button>
                        
                </div>
            </div>
                <span className="text-white text-xl px-4 mt-5">
                    All threads
                </span>
        </div>
    )
}