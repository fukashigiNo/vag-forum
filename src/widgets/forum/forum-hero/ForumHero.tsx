"use client"
import { useState } from "react"
import { Icon } from "@/shared/ui"
import { Search, SlidersHorizontal } from "lucide-react"
// Shared
import { HorizontalList } from "@/shared/ui/horizontal-list"
import { setBrand } from "@/shared/store/slices/forum-filter-slice"
import { useAppSelector } from "@/shared/store/hooks/app-selector"
import { useAppDispatch } from "@/shared/store/hooks/app-dispatch"
// Entites
import { ForumCard } from "@/entities/forum/forum-card/ui"
import { ForumSettingsModal } from "@/entities/forum/forum-settings/ui"
import type { IForumPost } from "@/entities/forum/forum-card/types"
//feature
import { useForumFilter } from "@/features/forum/forum-filter/api"

interface IForumHeroProps {
    posts: IForumPost[]
}

const mockDataa = ["All", "Volkswagen", "Audi", "Skoda", "SEAT", "CUPRA"]

export default function ForumHero({ posts }: IForumHeroProps) {
    const [active, setActive] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const brand = useAppSelector(state => state.forumFilter.brand)
    const model = useAppSelector(state => state.forumFilter.model)
    const generation = useAppSelector(state => state.forumFilter.generation)
    
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase()
    const dispatch = useAppDispatch()
    
    const ForumFilter = useForumFilter({posts, normalizedQuery, brand, model, generation})

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
                            list={mockDataa}
                            itemClassName={`ml-4 rounded-full text-white border border-zinc-700 px-2 py-1 text-[14px] cursor-pointer`}
                            activeFilter={brand ?? "All"}
                            handlePress={(item) => {
                               dispatch(setBrand(item === "All" ? null : item))
                            }}
                        />

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
                    {ForumFilter.length > 0 ? ForumFilter.map((post: any) => (
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