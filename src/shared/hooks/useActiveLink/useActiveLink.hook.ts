"use client"
import { usePathname } from "next/navigation";

export default function useActiveLink(href: string): boolean {
    const pathname = usePathname()
    return pathname ?  pathname === href : false
}