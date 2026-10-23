export interface IForumCreatePostModalProps {
    onClose: () => void
    onCreatePost: (post: {
        title: string
        enterprise: string
        description: string
        vehicle?: string
    }) => void
}
