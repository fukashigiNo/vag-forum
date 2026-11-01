import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { IForumPost, IForumReply } from "@/entities/forum/forum-card/types"

interface ForumThreadsState {
    posts: IForumPost[]
}

const initialState: ForumThreadsState = {
    posts: [],
}

export const forumThreadsSlice = createSlice({
    name: "forumThreads",
    initialState,
    reducers: {
        addForumPost(state, action: PayloadAction<IForumPost>) {
            state.posts.unshift(action.payload)
        },
        addForumReply(
            state,
            action: PayloadAction<{ postId: string; reply: IForumReply }>,
        ) {
            const post = state.posts.find(({ id }) => id === action.payload.postId)
            if (!post) return

            post.replies ??= []
            post.replies.push(action.payload.reply)
            post.answers = post.replies.length
        },
        toggleHelpful(state, action: PayloadAction<string>) {
            const post = state.posts.find(({ id }) => id === action.payload)
            if (!post) return

            const isHelpful = post.helpfulByCurrentUser ?? false
            post.helpfulByCurrentUser = !isHelpful
            post.helpful = Math.max(0, (post.helpful ?? 0) + (isHelpful ? -1 : 1))
        },
    },
})

export const { 
    addForumPost, 
    addForumReply, 
    toggleHelpful 
} = forumThreadsSlice.actions
export default forumThreadsSlice.reducer
