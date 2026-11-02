"use client"

import Link from "next/link";
import { useActiveLink } from "@/shared/hooks";
import { motion } from "framer-motion";
import type { INavLink } from "../types";


export default function NavLink({
    href,
    title,
    className = "relative block px-4 py-2 text-[14px]",
    onClick,
}: INavLink) {
    const isActive = useActiveLink(href)

    return (
        <Link href={href} onClick={onClick} className={`relative text-[14px] ${className}`}>
            
            {isActive && (
                <motion.span
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-blue-500 rounded-lg "
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
            )}

            <span
                className={
                    isActive
                        ? "relative z-10 text-white"
                        : "relative z-10 text-white/60"
                }
            >
                {title}
            </span>
        </Link>
    )
}
