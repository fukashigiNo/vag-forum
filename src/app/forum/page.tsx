import {ForumScreen} from "@/screens/forum"

export default function Forum() {
    return (
        <main className="min-h-full flex-1 overflow-hidden bg-zinc-900 px-4 pb-16 pt-24 text-white sm:px-6 lg:px-10">
            <div className="mx-auto w-full max-w-7xl">
                <ForumScreen />
            </div>
        </main>
    )
}