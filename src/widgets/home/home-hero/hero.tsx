"use client"
import Link from "next/link"
import { Icon } from "@/shared/components"
import { ArrowRight, User } from "lucide-react"
import { motion } from "framer-motion"

export default function Hero() {
    return (
        <div className="pt-20 flex justify-between items-center relative overflow-hidden w-full">
            
            <div className="w-full md:w-1/2 z-10 relative">
                <h1 className="text-6xl text-white tracking-tight">All about your <br /> VAG-car in —  one <br /> site</h1>
                <div className="mt-5">
                    <p className="text-zinc-400">
                        A forum, reviews, and guides on repairs and personal garages for owners <br />
                        of Volkswagen, Audi, Škoda, SEAT, Porsche, and Bentley vehicles. Real-world experience shared <br />
                        by actual owners.
                    </p>
                </div>
                <div className="flex gap-8 mt-5">
                    <Link 
                        href={"/forum"} 
                        className="flex items-center text-white gap-3 bg-blue-500 px-3 py-2 rounded-[13px]"
                    >
                        To the forum 
                        <Icon icon={ArrowRight} size={16} color="white" />
                    </Link>

                    <Link 
                        href={"/forum"} 
                        className="flex items-center justify-center text-white gap-3 border border-zinc-500 bg-zinc-800 px-3 py-2 rounded-[13px]"
                    >
                        <Icon icon={User} size={16} color="white" />
                        Join us
                    </Link>
                </div>
            </div>

            <div className="hidden md:flex w-1/2 justify-end absolute right-0 pointer-events-none z-0">
                <motion.img
                    src="/Audi-A5.png" /* Замени на путь к твоей картинке в папке public */
                    alt="VAG Car"
                    initial={{ x: '50vw', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                        type: 'spring',  // Эффект пружины для имитации подвески/тормозов
                        stiffness: 15,   // Жесткость пружины
                        duration: 5,
                        delay: 0.1       // Легкая задержка перед стартом анимации
                    }}
                    className="w-full max-w-[800px] object-contain"
                />
            </div>
        </div>
    )
}