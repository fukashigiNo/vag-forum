"use client"
import { Icon } from "@/shared/ui"
import { useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { ForumCard } from "@/entities/forum/forum-card/ui"
import type { IForumPost } from "@/entities/forum/forum-card/types"
import { ForumSettingsModal } from "@/entities/forum/forum-settings/ui"
import { HorizontalList } from "@/shared/ui/horizontal-list"

interface IForumHeroProps {
    posts: IForumPost[]
}

const mockData = [
    {
        id: 0,
        car: "All"
    },{
        id: 1,
        car: "Volkswagen",
    },{
        id: 2,
        car: "Audi",
    },{
        id: 3,
        car: "Skoda",
    },{
        id: 4,
        car: "SEAT",
    },{
        id: 5,
        car: "CUPRA",
    },{
        id: 6,
        car: "Porsche",
    }
]

const mockDataa = ["All", "Volkswagen", "Audi", "Skoda", "SEAT", "CUPRA"]

export default function ForumHero({ posts }: IForumHeroProps) {
    const [activeCar, setActiveCar] = useState("All")
    const [active, setActive] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase()
    const filteredPosts = normalizedQuery
        ? posts.filter((post) =>
            [post.title, post.brand, post.model, post.body]
                .some((value) => value?.toLocaleLowerCase().includes(normalizedQuery))
        )
        : posts
    let index = 0
    return (
        <div className="mt-6">
            <div className="flex mb-5 px-4">
                <label
                    className="relative flex w-[60%] items-center rounded-[12px] border-2 border-zinc-700 bg-zinc-800 p-2 focus-within:border-blue-500"
                >
                    <Icon 
                        icon={Search}
                        size={16}
                        color="white"
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                    />
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Search themes or models of your car..."
                        className="w-full bg-transparent pl-8 text-white outline-none placeholder:text-zinc-400"
                    />
                </label>

                <div className="flex items-center">
                        <HorizontalList
                            key={index++}
                            list={mockDataa}
                            itemClassName={`ml-4 rounded-full text-white border border-zinc-700 px-2 py-1 text-[14px] cursor-pointer
                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400`}
                            activeFilter=""
                            handlePress={() => {}}
                        />

                        {/* <button
                             key={item.id}
                             onClick={() => setActiveCar(item.car)}
                             aria-pressed={activeCar === item.car}
                            className={`ml-4 rounded-full border border-zinc-700 px-2 py-1 text-[14px] cursor-pointer
                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                                    activeCar === item.car
                                     ? "bg-blue-500 text-white"
                                     : "text-white/70 hover:text-white"
                             }`}
                         >
                             {item.car}
                         </button> */}

                        <button 
                            className="ml-4 cursor-pointer"
                            onClick={() => {setActive(prevState => !prevState )}}
                        >
                            <Icon icon={SlidersHorizontal} color="white" size={18} />
                        </button>
                        {
                            active && <ForumSettingsModal setShow={() => setActive(false)}/>
                        }
                </div>
            </div>
                <span className="text-white text-xl px-4 font-semibold ">
                    All threads
                </span>
                <div>
                    {filteredPosts.length > 0 ? filteredPosts.map((post) => (
                        <ForumCard
                            key={post.id}
                            letter={post.letter}
                            solved={post.solved}
                            enterprise={post.enterprise}
                            title={post.title}
                            user={post.user}
                            time={post.time}
                            answers={post.answers}
                            views={post.views}
                            vehicle={post.vehicle}
                            description={post.description}
                        />
                    )) : (
                        <p className="px-4 py-6 text-zinc-400">No matching threads found.</p>
                    )}
                </div>
        </div>
    )
}