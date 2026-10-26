"use client"
import { useRouter, useSearchParams } from "next/navigation"

export default function useFilter(url: string) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const activeFilter = searchParams.get("type") ?? "All"

    const setFilter = (filter: string) => {
        router.push(`/${url}?type=${filter}`)
    }

    return {
        activeFilter,
        setFilter
    }
}