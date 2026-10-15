import { CircleCheck } from "lucide-react"
import { useState } from "react"
import { Icon } from "@/shared/ui"

interface IForumCard {
    letter: string,
    status: boolean,
    enterprise: string,
    title: string,
    user: string,
    time: string,
    answers: number,
    views: number,
}

export default function ForumCard({
    //letter,
    //status,
    //enterprise,
    //title,
    //user,
    //time,
    //answers,
    //views
}) {
    const [status, setStatus] = useState<boolean>(true)
    return (
        <div className="flex items-center bg-zinc-800 w-[98%] mx-auto rounded-xl p-5 border border-white/30">
            <div className="bg-blue-500 py-3 px-4 rounded-[12px] text-white font-bold">
                A
            </div>
            <div className="ml-3 flex flex-row justify-between">
                <div className="gap-3">
                    <div className="flex gap-4">
                        { status && 
                            <span className="flex items-center gap-1">
                                <Icon icon={CircleCheck} size={14} color="white"/>
                                <p className="text-white">SOLVED</p>
                            </span>
                        }
                        <p className="text-white">Engine</p>
                    </div>
                    <span className="text-white w-50%">Lorem ipsum dolor sit amet consectetur adipisicing elit. ipsa molestias eveniet. Maxime, molestias.</span>
                    <div>
                        <span className="text-white">@Rozik911</span>
                        <span className="text-white">5 h. ago</span>
                    </div>
                </div>
                <div className="flex gap-4 justify-start ml-10">
                    <div className="flex flex-col items-center">
                        <p className="text-white">47</p>
                        <p  className="text-white">answers</p>
                    </div>
                    <div>
                        <p className="text-white">1290</p>
                        <p className="text-white">views</p>
                    </div>
                </div>
            </div>
        </div>
    )
}