"use client"
import { House, MessagesSquare, Star, Wrench } from "lucide-react"
import Link from "next/link"

const mockData = [
    {
        id: 1,
        path: "/",
        name: "Home",
        icon: House, 
    },    {
        id: 2,
        path: "/forum",
        name: "Forum",
        icon: MessagesSquare, 
    },    {
        id: 3,
        path: "/rates",
        name: "Rates",
        icon: Star, 
    },    {
        id: 4,
        path: "/repair",
        name: "Repair",
        icon: Wrench, 
    }
]

const comunity = ["Rules", "Contacts", "Confidentiality", "Feedback"]

export default function Footer() {
    return (
        <footer className="border-t border-white/20 bg-zinc-800 px-5 py-8 sm:px-8 sm:py-10">
            <div className="mx-auto grid max-w-screen-xl gap-8 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
                <section>
                    <Link href="/" aria-label="VAG Forum — на главную" className="mb-4 inline-flex items-center gap-3">
                        <span className="rounded-xl border border-blue-500 bg-blue-900/60 px-2 py-1.5 text-lg font-bold tracking-tighter text-blue-400">
                            VAG
                        </span>
                        <span className="flex text-lg font-bold tracking-tighter text-white">
                            FORUM<span className="text-blue-500">.</span>
                        </span>
                    </Link>
                    <p className="max-w-md text-sm leading-6 text-white/60">
                        Independent communities of owners and enthusiasts of VAG Group vehicles —
                        Volkswagen, Audi, Škoda, SEAT, Porsche, Bentley, Lamborghini, and Bugatti.
                    </p>
                </section>

                <nav aria-label="Footer navigation">
                    <h2 className="mb-3 text-sm font-bold tracking-tight text-white">Navigation</h2>
                    <ul className="space-y-2">
                        {mockData.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href={item.path}
                                    className="text-sm text-gray-300 transition-colors hover:text-white"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <section>
                    <h2 className="mb-3 text-sm font-bold tracking-tight text-white">Community</h2>
                    <ul className="space-y-2">
                        {comunity.map((item) => (
                            <li key={item}>
                                <span className="text-sm text-gray-300">{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            <div className="mx-auto mt-8 max-w-screen-xl border-t border-white/20 pt-4">
                <p className="text-center text-xs leading-5 text-white/60 sm:text-left">
                    © 2026 VAG-FORUM. Не аффилирован с Volkswagen AG.
                </p>
            </div>
        </footer>
    )
}