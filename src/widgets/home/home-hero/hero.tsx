"use client"
import Link from "next/link"
import { Icon } from "@/shared/ui"
import { ArrowRight, User } from "lucide-react"
import { motion } from "framer-motion"

export default function Hero() {
    return (
        <section className="relative isolate flex min-h-[26rem] items-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 px-6 py-12 sm:px-10 lg:min-h-[34rem] lg:px-14">
            <div className="relative z-10 w-full md:max-w-[58%]">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                    Сообщество владельцев VAG
                </p>
                <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Всё о вашем VAG — в одном месте
                </h1>
                <div className="mt-5 max-w-2xl">
                    <p className="leading-7 text-zinc-300">
                        Форум, отзывы и руководства по ремонту для владельцев Volkswagen,
                        Audi, Škoda, SEAT, Porsche и других автомобилей.
                    </p>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                    <Link 
                        href={"/forum"} 
                        className="flex items-center gap-3 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-500"
                    >
                        На форум 
                        <Icon icon={ArrowRight} size={16} color="white" />
                    </Link>

                    <Link 
                        href={"/register"} 
                        className="flex items-center justify-center gap-3 rounded-xl border border-white/15 bg-zinc-800/80 px-5 py-3 font-medium text-white transition-colors hover:border-blue-500"
                    >
                        <Icon icon={User} size={16} color="white" />
                        Присоединиться
                    </Link>
                </div>
            </div>

            <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[55%] items-center justify-end md:flex">
                <motion.img
                    src="/Audi-A5.webp" 
                    alt="VAG Car"
                    initial={{ x: '50vw', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                        type: 'spring',  
                        stiffness: 15,   
                        duration: 5,
                        delay: 0.1       
                    }}
                    className="h-full max-h-[34rem] w-full object-contain object-right opacity-90"
                />
            </div>
        </section>
    )
}