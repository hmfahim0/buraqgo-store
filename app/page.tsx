import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* TOP NAV */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="text-xl font-black tracking-tight">
            <span className="text-yellow-400">BURAQ</span>GO
          </div>

          <nav className="flex items-center gap-6 text-sm text-white/80">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <Link href="/shop" className="hover:text-white">
              Shop
            </Link>
            <Link href="/cart" className="hover:text-white">
              Cart
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        {/* background image */}
        <div className="absolute inset-0">
          <Image
            src="/home/hero.jpg"
            alt="BuraqGo Toy Cars"
            fill
            priority
            className="object-cover"
          />
          {/* overlay */}
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="space-y-5">
              <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
                Creative Toy Cars for <br className="hidden md:block" />
                Kids & Collectors
              </h1>

              <p className="max-w-xl text-white/75 md:text-lg">
                Explore our premium selection of detailed, collectible diecast cars.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-2xl bg-yellow-400 px-6 py-3 text-sm font-bold text-black hover:bg-yellow-300"
                >
                  Shop Now 🚗
                </Link>

                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  View Collection
                </Link>
              </div>
            </div>

            {/* right side spacing like the mock (hero image already covers) */}
            <div className="hidden md:block" />
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS TITLE */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="text-center text-3xl font-black text-black">
            Featured Products
          </h2>

          {/* 3 cards */}
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <FeatureCard
              img="/home/feature-1.jpg"
              title="Fast Delivery"
              subtitle="Get your order quickly and on time."
            />
            <FeatureCard
              img="/home/feature-2.jpg"
              title="High Quality"
              subtitle="Only the best toys for your kids."
            />
            <FeatureCard
              img="/home/feature-3.jpg"
              title="Customer Support"
              subtitle="We’re happy to help anytime."
            />
          </div>

          {/* 3 mini info boxes like the mock */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <MiniInfo icon="🚚" title="Fast Delivery" text="Get your order quickly and on time." />
            <MiniInfo icon="🛡️" title="High Quality" text="Only the best toys for your kids." />
            <MiniInfo icon="📞" title="Customer Support" text="Message anytime on WhatsApp." />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-12">
          <div className="grid gap-8 rounded-3xl bg-zinc-50 p-6 md:grid-cols-2 md:p-10">
            <div className="relative min-h-[280px] overflow-hidden rounded-3xl bg-zinc-200">
              <Image
                src="/home/about.jpg"
                alt="About BuraqGo"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-black text-black">About BuraqGo</h3>
              <p className="text-zinc-700">
                At BuraqGo, we’re passionate about bringing the best toy cars to
                children and collectors. With an eye for detail and a love for
                quality, we curate a collection that inspires creativity and fun.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-6">
                <Stat number="5,000+" label="Happy Customers" />
                <Stat number="500+" label="Models in Stock" />
              </div>

              <div className="pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
                >
                  Browse Shop →
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-10 text-center text-xs text-zinc-500">
            © {new Date().getFullYear()} BuraqGo Toys • Bangladesh
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  img,
  title,
  subtitle,
}: {
  img: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/10">
      <div className="relative h-44 w-full bg-zinc-200">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>
      <div className="p-5">
        <div className="text-lg font-black text-black">{title}</div>
        <div className="mt-1 text-sm text-zinc-600">{subtitle}</div>
      </div>
    </div>
  );
}

function MiniInfo({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/10">
      <div className="flex items-start gap-3">
        <div className="text-xl">{icon}</div>
        <div>
          <div className="font-bold text-black">{title}</div>
          <div className="text-sm text-zinc-600">{text}</div>
        </div>
      </div>
    </div>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-black text-black">{number}</div>
      <div className="text-sm text-zinc-600">{label}</div>
    </div>
  );
}
