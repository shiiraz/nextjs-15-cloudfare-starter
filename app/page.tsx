import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">
          Next.js Rendering Patterns Demo 🚀
        </h1>
        <p className="text-xl text-center text-gray-600">
          Explore different rendering strategies with the App Router
        </p>
        <div className="flex flex-col space-y-4">
          <Link
            href="/csr"
            className="p-4 bg-blue-500 text-white rounded-lg text-center hover:bg-blue-600 transition"
          >
            Client-Side Rendering (CSR)
          </Link>
          <Link
            href="/ssr"
            className="p-4 bg-green-500 text-white rounded-lg text-center hover:bg-green-600 transition"
          >
            Server-Side Rendering (SSR)
          </Link>
          <Link
            href="/isr"
            className="p-4 bg-purple-500 text-white rounded-lg text-center hover:bg-purple-600 transition"
          >
            Incremental Static Regeneration (ISR)
          </Link>
        </div>
      </div>
    </main>
  );
}
