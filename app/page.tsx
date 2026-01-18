import Image from "next/image";

export default function Home() {
  return (
    <section className="relative w-full h-[80vh]">
      <Image
        src="/home/hero.jpg"
        alt="BuraqGo Toy Cars"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
    </section>
  );
}
