"use client"
import Icon from "./Icon"
import Link from "next/link"
import { MessageSquare, ArrowRight, LucideIcon } from "lucide-react"

interface IHeroLogo {
    title: string,
    subTitle: string,
    url: string,
    urlTitle: string,
    icon: LucideIcon
}

export default function HeroLogo({
    title,
    subTitle,
    url,
    urlTitle,
    icon
}: IHeroLogo) {
    return (
        <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
                <div className="flex items-center h-[40px] bg-blue-700/60 px-2 rounded-[16px] border border-blue-600">
                    <Icon icon={icon} size={24} color="White" className="" />
                </div>
                <div className="flex flex-col  justify-start">
                    <span className="text-white text-[20px] tracking-tighter font-bold">{title}</span>
                    <span className="text-white/60 text-[15px] tracking-tight">{subTitle}</span>
                </div>      
            </div>
            <div>
                <Link 
                    href={url}
                    className="flex items-center text-[14px] text-blue-600 mr-8 "
                >
                    {urlTitle}
                    <Icon icon={ArrowRight} size={16} color="blue" />
                </Link>
            </div>
        </div>
    )
}