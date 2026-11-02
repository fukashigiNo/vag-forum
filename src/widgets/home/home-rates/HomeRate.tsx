import { HeroLogo } from "@/shared/ui"
import { HomeRatesCard } from "@/entities/home/home-rates";
import { carReviews } from "@/entities/rate/rate-review"
import { Star } from "lucide-react"

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
            {carReviews.slice(0, 3).map((item) => (
                <HomeRatesCard
                    key={item.id}
                    rate={item.rating}
                    model={item.brand.toUpperCase()}
                    title={`${item.model} ${item.year}`}
                    engine={item.engine}
                    horsePower={item.horsePower}
                    year={item.year}
                    subtitle={item.review}
                    user={`@${item.author}`}
                    date={item.date}
                />
            ))}
            </div>
        </section>
    )
}