import { HeroLogo } from "@/shared/components"
import { Wrench } from "lucide-react"
import { HomeRepairCard } from "@/entities/home/home-repair"

export const mockHomeRepairs = [
  {
    id: "repair-1",
    type: "Engine",
    dificuilty: "Hard",
    title: "Timing chain replacement on the 2.7 TDI engine",
    duration: "6 H.",
    steps: 23
  },
  {
    id: "repair-2",
    type: "Suspension",
    dificuilty: "Normal",
    title: "Front shock absorber and strut mount replacement",
    duration: "2 H.",
    steps: 14
  },
  {
    id: "repair-3",
    type: "Maintenance",
    dificuilty: "Easy",
    title: "Cabin air filter and engine oil change",
    duration: "45 Min.",
    steps: 6
  }
] as const;

export default function HomeRepair() {
    return (
        <section className="mt-10 border-t border-t-white/30">
            <div className="mt-10">
                <HeroLogo 
                    title="Guide for repair"
                    subTitle="Step-by-step instructions using the tool"
                    url="/repair"
                    urlTitle="to the repair"
                    icon={Wrench}
                />
             </div>
             <div className="mt-10 grid grid-cols-3">
                {mockHomeRepairs.map((item) => (
                    <HomeRepairCard 
                    key={item.id}
                    type={item.type}
                    dificuilty={item.dificuilty}
                    title={item.title}
                    duration={item.duration}
                    steps={item.steps}
                />
                ))}
             </div>
        </section>
    )
}