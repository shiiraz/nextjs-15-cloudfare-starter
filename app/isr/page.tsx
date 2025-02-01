import PostCard from "@/components/post-card";
import Link from "next/link";

// async function getPost() {
//   const randomId = Math.floor(Math.random() * 100) + 1;
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${randomId}`,
//     { next: { revalidate: 30 } }
//   );
//   if (!res.ok) throw new Error("Failed to fetch data");
//   return res.json();
// }
interface CacheStorage {
  default: Cache;
}
interface RequestInitCF extends RequestInit {
  cf?: {
    cacheTtl?: number;
    cacheEverything?: boolean;
  };
}
declare const caches: CacheStorage;
async function getPost() {
  const randomId = Math.floor(Math.random() * 100) + 1;
  const url = `https://jsonplaceholder.typicode.com/posts/${randomId}`;

  // Use environment check for Cloudflare
  if (process.env.NEXT_RUNTIME === "edge") {
    try {
      const cacheKey = new Request(url);
      const cache = caches.default;
      let response = await cache.match(cacheKey);

      if (!response) {
        const init: RequestInitCF = {
          cf: {
            cacheTtl: 30,
            cacheEverything: true,
          },
        };
        response = await fetch(url, init);
        await cache.put(cacheKey, response.clone());
      }

      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    } catch (error) {
      console.error("Cache error:", error);
      // Fallback to normal fetch
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    }
  }

  // Fallback for non-edge runtime
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}
export const runtime = "edge"; // Add this line
export default async function ISRPage() {
  const post = await getPost();

  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">
          Incremental Static Regeneration (ISR)
        </h1>
        <p className="text-xl text-gray-600">
          Static data revalidated every 30 seconds
        </p>
        <PostCard post={post} />
        <p className="text-sm text-gray-500">
          This content was statically generated and revalidates every 30
          seconds.
        </p>
        <Link href="/" className="block text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
