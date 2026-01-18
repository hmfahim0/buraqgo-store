import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <section className="relative h-screen w-full">
        <Image
          src="/home/hero.jpg"
          alt="BuraqGo Hero"
          fill
          priority
          className="object-cover"
        />
      </section>
    </main>
  );
}
