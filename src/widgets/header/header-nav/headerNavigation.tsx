import { NavLink } from "@/shared/ui"
import { House, MessagesSquare, Star, Wrench} from "lucide-react"

const mockData = [
    {
        id: 1,
        path: "/",
        name: "Home",
        icon: House, 
    },    {
        id: 2,
        path: "/forum",
        name: "Forum",
        icon: MessagesSquare, 
    },    {
        id: 3,
        path: "/rates",
        name: "Rates",
        icon: Star, 
    },    {
        id: 4,
        path: "/repair",
        name: "Repair",
        icon: Wrench, 
    }
]

interface HeaderNavigationProps {
    mobile?: boolean
    onNavigate?: () => void
}

export default function HeaderNavigation({
    mobile = false,
    onNavigate,
}: HeaderNavigationProps) {
    return (
        <nav aria-label={mobile ? "Основная навигация" : undefined}>
            <ul className={`flex ${mobile ? "flex-col gap-1" : "flex-row"}`}>
                {mockData.map((item) => (
                    <li key={item.id}>
                        <NavLink
                            title={item.name}
                            href={item.path}
                            onClick={onNavigate}
                            className={mobile ? "block rounded-lg px-4 py-3" : "block px-4 py-2"}
                        />
                    </li>
                ))}
            </ul>
        </nav>
    )
}