import PostCard from "@/components/post-card";
import Link from "next/link";

async function getPost() {
  const randomId = Math.floor(Math.random() * 100) + 1;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${randomId}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}
export const runtime = "edge"; // Add this line
export default async function SSRPage() {
  const post = await getPost();

  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Server-Side Rendering (SSR)</h1>
        <p className="text-xl text-gray-600">
          Data fetched and rendered on the server
        </p>
        <PostCard post={post} />
        <p className="text-sm text-gray-500">
          This content was rendered server-side. Refresh to see a different
          post.
        </p>
        <Link href="/" className="block text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
