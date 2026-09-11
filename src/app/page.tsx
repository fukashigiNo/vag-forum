import { Hero } from "@/widgets/home/home-hero";
import { HomeForum } from "@/widgets/home/home-forum";
export default function Home() {
  return (
    <main className="p-20 bg-zinc-900 w-screen flex-1">
      <Hero />
      <HomeForum />
    </main>
  );
}
