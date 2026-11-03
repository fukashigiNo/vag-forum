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
            <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-zinc-800/50 p-4 md:p-5">
                <label
                    className="relative flex w-full items-center rounded-xl border border-zinc-700 bg-zinc-900 p-3 transition-colors focus-within:border-blue-500"
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
                        className="w-full bg-transparent pl-8 text-white outline-none placeholder:text-zinc-500"
                    />
                </label>

                <div className="flex flex-wrap items-center justify-between gap-3">
                    <HorizontalList
                        list={mockDataa}
                        itemClassName="rounded-full border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
                        activeFilter={brand ?? "All"}
                        handlePress={(item) => {
                            dispatch(setBrand(item === "All" ? null : item))
                        }}
                    />

                    <button
                        type="button"
                        aria-expanded={active}
                        onClick={() => setActive((previousState) => !previousState)}
                        className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition-colors hover:border-blue-500 hover:text-white"
                    >
                        <Icon icon={SlidersHorizontal} color="white" size={16} />
                        Автомобиль
                    </button>
                    {active && <ForumSettingsModal setShow={() => setActive(false)} />}
                </div>
            </div>
                <h2 className="mb-3 text-xl font-semibold text-white">
                    All threads
                </h2>
                <div>
                    {ForumFilter.length > 0 ? ForumFilter.map((post: IForumPost) => (
                        <ForumCard
                            key={post.id}
                            id={post.id}
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
                        <p className="rounded-2xl border border-dashed border-zinc-700 px-6 py-12 text-center text-zinc-400">
                            No matching threads found.
                        </p>
                    )}
                </div>
        </div>
    )
}