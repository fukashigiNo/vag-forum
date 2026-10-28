export interface IForumCreatePostModalProps {
    onClose: () => void
    onCreatePost: (post: {
        title: string
        enterprise: string
        description: string
        letter: string
        brand: string
        model: string
        body: string
        vehicle?: string
    }) => void
}
