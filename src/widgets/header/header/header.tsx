"use client"

import { useState } from "react"
import { Icon } from "@/shared/ui"
import Link from "next/link"
import { Menu, ShieldCheck, X } from "lucide-react"
import { HeaderNavigation } from "../header-nav"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-zinc-800">
            <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
                <Link
                    href="/"
                    aria-label="VAG Forum — на главную"
                    className="flex shrink-0 items-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <span className="rounded-xl border border-blue-500 bg-blue-900/60 px-2 py-1.5 text-lg font-bold tracking-tighter text-blue-400">
                        VAG
                    </span>
                    <span className="flex text-lg font-bold tracking-tighter text-white">
                        FORUM<span className="text-blue-500">.</span>
                    </span>
                </Link>

                <div className="hidden items-center md:flex">
                    <HeaderNavigation onNavigate={() => setIsMenuOpen(false)} />
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    <Link
                        href="/login"
                        className="hidden items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold tracking-tight text-white transition-colors hover:bg-blue-500 sm:flex"
                    >
                        <Icon icon={ShieldCheck} color="white" size={18} strokeWidth={2} />
                        Sign Up
                    </Link>

                    <button
                        type="button"
                        aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-primary-navigation"
                        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
                        className="inline-flex size-10 items-center justify-center rounded-xl border border-white/15 text-white transition-colors hover:bg-white/10 md:hidden"
                    >
                        {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div
                    id="mobile-primary-navigation"
                    className="border-t border-white/10 bg-zinc-800 px-4 py-3 shadow-xl md:hidden"
                >
                    <HeaderNavigation
                        mobile
                        onNavigate={() => setIsMenuOpen(false)}
                    />
                    <Link
                        href="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 sm:hidden"
                    >
                        <Icon icon={ShieldCheck} color="white" size={18} strokeWidth={2} />
                        Sign Up
                    </Link>
                </div>
            )}
        </header>
    )
}