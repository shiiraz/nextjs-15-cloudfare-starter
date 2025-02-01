import PostCard from "@/components/post-card";
import Link from "next/link";

// const res = await fetch(
//   `https://jsonplaceholder.typicode.com/posts/${randomId}`,
//   { next: { revalidate: 30 } }
// );
export const revalidate = 10;
async function getPost() {
  const randomId = Math.floor(Math.random() * 100) + 1;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${randomId}`
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}
// export const runtime = "edge"; // Add this line
export default async function ISRPage() {
  const post = await getPost();
  const date = new Date().toLocaleString();
  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">
          Incremental Static Regeneration (ISR)
        </h1>
        <h2 className="text-3xl font-bold">Date: {date}</h2>
        <p className="text-xl text-gray-600">
          Static data revalidated every 10 seconds
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
