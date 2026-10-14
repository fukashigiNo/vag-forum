"use client"

import Link from "next/link";
import { useActiveLink } from "@/shared/hooks";
import { motion } from "framer-motion";

interface INavLink {
    href: string;
    title: string
}

export default function NavLink({
    href,
    title,
}: INavLink) {
    const isActive = useActiveLink(href)

    return (
        <Link href={href} className="relative px-4 py-2 text-[14px]">
            
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
