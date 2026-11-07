import { RepairCatalog } from "@/widgets/repair/repair-catalog"

export default function RepairScreen() {
    return (
        <main className="min-h-full flex-1 bg-zinc-900 px-4 pb-16 pt-24 text-white sm:px-6 lg:px-10">
            <RepairCatalog />
        </main>
    )
}
