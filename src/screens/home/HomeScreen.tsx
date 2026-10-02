"use client"
import { Hero } from "@/widgets/home/home-hero"
import { HomeForum } from "@/widgets/home/home-forum"
import { HomeRate } from "@/widgets/home/home-rates"
import { HomeRepair } from "@/widgets/home/home-repair"

export default function Home() {
    return (
        <>
            <Hero />
            <HomeForum />
            <HomeRate />
            <HomeRepair />
        </>
    )
}