import type { IForumFilter } from "../types"

    export default function ForumFilter ({
        posts,
        normalizedQuery,
        brand,
        model,
        generation
    }: IForumFilter) {
        const filter = posts.filter((post: any) => {
        const matchesQuery = 
            !normalizedQuery || 
            [post.title, post.brand, post.model, post.body]
                .some((value) => 
                    value?.toLocaleLowerCase().includes(normalizedQuery)
                )
        const matchesBrand = 
        !brand || 
        brand === "All" ||
        post.brand.toLocaleLowerCase() === brand.toLocaleLowerCase()

        const matchesModel = 
        !model || 
        post.model.toLocaleLowerCase() === model.toLocaleLowerCase()

        const matchesGeneration = 
        !generation || 
        post.body.toLocaleLowerCase() === generation.toLocaleLowerCase()

        return matchesQuery && 
        matchesBrand &&
        matchesModel && 
        matchesGeneration
    })
        return filter
    }