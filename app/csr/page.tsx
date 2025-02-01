"use client";

import { useState, useEffect } from "react";
import PostCard from "@/components/post-card";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function CSRPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const randomId = Math.floor(Math.random() * 100) + 1;
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${randomId}`
      );
      const data = await res.json();
      setPost(data);
      setLoading(false);
    };

    fetchPost();
  }, []);

  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Client-Side Rendering (CSR)</h1>
        <p className="text-xl text-gray-600">
          Data fetched and rendered on the client
        </p>
        {loading ? (
          <div className="w-full h-48 bg-gray-200 animate-pulse rounded-lg"></div>
        ) : (
          post && <PostCard post={post} />
        )}
        <p className="text-sm text-gray-500">
          This content was fetched client-side. Refresh to see a different post.
        </p>
        <Link href="/" className="block text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
