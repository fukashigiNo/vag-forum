"use client"
import { Icon } from "@/shared/ui"
import { Plus } from "lucide-react"

export default function ForumHeader() { 
    return (
    <div className="flex justify-between items-center px-4 py-2">
        <span className="text-3xl text-white font-bold">
            Forum
        </span>
        <div>
            <button className="flex gap-2 items-center bg-blue-600/30 
            text-white px-3 py-1 rounded-[13px] border border-blue-500 cursor-pointer
            hover:bg-blue-600/50 transition-colors"
            >
                <Icon icon={Plus} color="white" size={18} />
                Create Post
            </button>
        </div>
    </div>
    )
}