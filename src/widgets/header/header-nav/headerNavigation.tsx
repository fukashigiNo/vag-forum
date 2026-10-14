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

export default function HeaderNavigation() {
    return (
        <nav>
            <ul className="flex flex-row">
                {mockData.map((item) => (
                    <li key={item.id}>
                        <NavLink  title={item.name} href={item.path} />
                    </li>
                ))}
            </ul>
        </nav>
    )
}