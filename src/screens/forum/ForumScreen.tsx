"use client"

import { useState } from "react"
import { ForumCreatePostModal } from "@/entities/forum/forum-create-post"
import type { IForumPost } from "@/entities/forum/forum-card/types"
import { ForumHeader } from "@/widgets/forum/forum-header"
import { ForumHero } from "@/widgets/forum/forum-hero"

const INITIAL_POSTS: IForumPost[] = [
    {
        id: "mock-engine-topic",
        letter: "A",
        solved: true,
        enterprise: "Engine",
        title: "Lorem ipsum dolor sit amet consectetur",
        brand: "Audi",
        model: "A4",
        body: "B8",
        user: "Rozik911",
        time: "5 h. ago",
        answers: 47,
        views: 1290,
    },
]

export default function Forum() {
    const [posts, setPosts] = useState(INITIAL_POSTS)
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)

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
        setPosts((currentPosts) => [
            {
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
            },
            ...currentPosts,
        ])
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