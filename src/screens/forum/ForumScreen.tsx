"use client"

import { useState } from "react"
import { useAppDispatch } from "@/shared/store/hooks/app-dispatch"
import { useAppSelector } from "@/shared/store/hooks/app-selector"
import { addForumPost } from "@/shared/store/slices/forum-thread-slice/forumThreads.slice"
import { ForumCreatePostModal } from "@/entities/forum/forum-create-post"
import { ForumHeader } from "@/widgets/forum/forum-header"
import { ForumHero } from "@/widgets/forum/forum-hero"

export default function Forum() {
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
    const dispatch = useAppDispatch()
    const posts = useAppSelector((state) => state.forumThreads.posts)

    const handleCreatePost = (post: {
        title: string
        enterprise: string
        description: string
        letter: string
        brand: string
        model: string
        body: string
        vehicle?: string
    }) => {
        dispatch(addForumPost({
                id: `post-${Date.now()}`,
                letter: post.brand.charAt(0).toUpperCase(),
                solved: false,
                enterprise: post.enterprise,
                title: post.title,
                user: "You",
                time: "Just now",
                answers: 0,
                views: 0,
                brand: post.brand,
                model: post.model,
                body: post.body,
                description: post.description,
                vehicle: post.vehicle,
                replies: [],
                helpful: 0,
                helpfulByCurrentUser: false,
            }))
        setIsCreatePostOpen(false)
    }

    return (
        <div>
            <ForumHeader onCreatePost={() => setIsCreatePostOpen(true)} />
            <ForumHero posts={posts} />
            {isCreatePostOpen && (
                <ForumCreatePostModal
                    onClose={() => setIsCreatePostOpen(false)}
                    onCreatePost={handleCreatePost}
                />
            )}
        </div>
    )
}