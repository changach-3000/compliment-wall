import { Hero } from "@/components/hero/hero";
import { Board } from "@/components/wall/Board";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-4 md:px-8 md:py-6">
      <Hero />
      <Board />
    </main>
  );
}