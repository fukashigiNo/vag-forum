"use client"
import { Icon } from "@/shared/ui"
import Link from "next/link"
import {ShieldCheck  } from "lucide-react"
import { HeaderNavigation } from "../header-nav"


export default function Header() {
    return (
        <header className="flex justify-between items-center fixed bg-zinc-800 h-15 w-screen z-50 p-4 px-20">
            <div className="flex items-center gap-3">
                <span 
                    className="text-[18px] text-blue-500 tracking-tighter 
                    font-bold bg-blue-900/60 py-2 px-1 rounded-[13px] border border-blue-500"
                    >
                        VAG
                    </span>
                <span 
                    className="flex text-[18px] text-white tracking-tighter font-bold"
                    >
                        FORUM 
                        <p className="text-blue-500">.</p>
                </span>
            </div>
            <div className="flex gap-10 mr-10" >
                <HeaderNavigation />
            </div>
            <div>
                <Link 
                    href={"/login"}
                    className="flex items-center justify-center gap-2 
                    text-white tracking-tighter font-semibold
                    bg-blue-600 px-3 py-2 rounded-[13px]"
                >
                    <Icon icon={ShieldCheck} color="white" size={18} strokeWidth={2}/>
                    Sign Up
                </Link>
            </div>
        </header>
    )
}