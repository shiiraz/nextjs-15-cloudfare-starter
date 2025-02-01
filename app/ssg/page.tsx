import PostCard from "@/components/post-card";
import Link from "next/link";

async function getPost() {
  // Using a fixed ID for SSG since it's built at build time
  const postId = 1; // Fixed ID for consistent static content
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export const runtime = "edge";

export default async function SSGPage() {
  const post = await getPost();

  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Static Site Generation (SSG)</h1>
        <p className="text-xl text-gray-600">Content generated at build time</p>
        <PostCard post={post} />
        <p className="text-sm text-gray-500">
          This content was statically generated at build time and will remain
          constant until the next deployment.
        </p>
        <Link href="/" className="block text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
