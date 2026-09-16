import { HeroLogo } from "@/shared/components"
import { HomeRatesCard } from "@/entities/home/home-rates";
import { Star } from "lucide-react"

export const mockHomeRates = [
  {
    id: 1,
    rate: 4.8,
    model: "VOLKSWAGEN",
    title: "Golf GTI VIII",
    engine: "2.0 TSI",
    horsePower: 245,
    year: 2022,
    subtitle: "Отличный хот-хэтч на каждый день. Полностью обслужен у официального дилера, без ДТП.",
    user: "@gti_lover",
    date: "2 часа назад"
  },
  {
    id: 2,
    rate: 4.5,
    model: "BMW",
    title: "M340i xDrive",
    engine: "3.0 B58",
    horsePower: 387,
    year: 2021,
    subtitle: "Надежный двигатель B58 и полный привод. Идеальное техническое состояние, привезена из Европы.",
    user: "@bimmer_fan",
    date: "Вчера"
  },
  {
    id: 3,
    rate: 3.9,
    model: "AUDI",
    title: "A6 Avant 40 TDI",
    engine: "2.0 TDI",
    horsePower: 204,
    year: 2020,
    subtitle: "Экономичный и вместительный семейный универсал. Есть прозрачная аукционная история.",
    user: "@wagon_king",
    date: "3 дня назад"
  }
];

export default function HomeRate() {
    return (
        <section className="mt-10 py-10 border-t border-t-white/20">
            <HeroLogo
                title="Rates from owners"
                subTitle="Real expierence of usage"
                url="/rates"
                urlTitle="to the rate"
                icon={Star}
            />
            <div className="grid grid-cols-3 ">
            {mockHomeRates.map((item) => (
                <HomeRatesCard
                    key={item.id}
                    rate={item.rate}
                    model={item.model}
                    title={item.title}
                    engine={item.engine}
                    horsePower={item.horsePower}
                    year={item.year}
                    subtitle={item.subtitle}
                    user={item.user}
                    date={item.date}
                />
            ))}
            </div>
        </section>
    )
}