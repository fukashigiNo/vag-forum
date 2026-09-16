"use client"
import { Icon, HeroLogo } from "@/shared/components"
import { MessageSquare, ArrowRight } from "lucide-react"
import { HomeForumCard } from "@/entities/home/home-forum"
import Link from "next/link"

export const forumThreads = [
  {
    id: "thread-1",
    enterprise: "Engine",
    title: "2.0 TFSI no power what is would be?",
    model: "V",
    user: "@kraskal",
    answerCount: 1,
    views: 89,
    postDate: "2 days ago",
    status: "open" 
  },
  {
    id: "thread-2",
    enterprise: "Transmission",
    title: "DSG7 jerky shifting between 1st and 2nd",
    model: "A",
    user: "@gearhead99",
    answerCount: 14,
    views: 342,
    postDate: "5 hours ago",
    status: "resolved"
  },
  {
    id: "thread-3",
    enterprise: "Electronics",
    title: "Dashboard screen randomly turning off",
    model: "S",
    user: "@sparky_auto",
    answerCount: 0,
    views: 12,
    postDate: "Just now",
    status: "open"
  },
  {
    id: "thread-4",
    enterprise: "Suspension",
    title: "Squeaking noise from front left wheel over bumps",
    model: "P",
    user: "@ride_smooth",
    answerCount: 3,
    views: 156,
    postDate: "1 week ago",
    status: "open"
  }
];

export default function HomeForum() {
    return (
        <section className="mt-20">
            <HeroLogo 
                title="Hot in the forum" 
                subTitle="Fresh titles from comunity" 
                url="/forum"
                urlTitle=" To the forum" 
                icon={MessageSquare}
            />
            
            <div className="mt-5 grid grid-cols-2 gap-4">
                {forumThreads.map((item) => (
                    <HomeForumCard
                    key={item.id}
                    enterprise={item.enterprise}
                    title={item.title}
                    model={item.model}
                    user={item.user}
                    answerCount={item.answerCount}
                    views={item.views}
                    postDate={item.postDate}
                />
                ))}
            </div>
        </section>
    )
}