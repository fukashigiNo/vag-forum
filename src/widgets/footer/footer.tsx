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
        <footer className=" bg-zinc-800 p-10 border-t border-t-white/30">
            <div className="flex justify-between w-[80%]">
                <div>
                    <div className="flex items-center gap-3 mb-4">
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
                    <span className="text-white/60 text-[14px] tracking-tighter ">
                        Independent communities of owners and enthusiasts <br />
                        of VAG Group vehicles — Volkswagen, Audi, Škoda, <br />
                        SEAT, Porsche, Bentley, Lamborghini, and Bugatti.
                    </span>
                </div>
                <div>
                    <span className="text-14px font-bold tracking-tighter dark:text-white">Navigation</span>
                    {mockData.map((item) =>(
                        <Link 
                            href={item.path}
                            key={item.id}
                            className="flex text-gray-300 items-center hover:text-white"
                        >
                        <p className="mt-2"> {item.name}</p>
                        </Link> 
                    ))}
                </div>
                <div>
                    <span className="text-14px font-bold tracking-tighter mb-4 dark:text-white">Comunity</span>
                        {comunity.map((item) => (
                            <p
                                className="flex text-gray-300  mt-2 items-center hover:text-white"
                                key={item}
                            >
                                {item}
                            </p>
                        ))}
                </div>
            </div>
            <div className="mt-4">
                <div className="w-[95%] mx-auto h-[1px] border border-t-white/30 mb-4" />
                <span 
                    className="text-white/60 text-[12px]"
                >
                    © 2026 VAG-FORUM. Не аффилирован с Volkswagen AG.
                </span>
            </div>
        </footer>
    )
}