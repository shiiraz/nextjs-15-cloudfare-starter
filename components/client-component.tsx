"use client";

import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};

export function ClientComponent() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const randomId = Math.floor(Math.random() * 100) + 1;
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${randomId}`
        );
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[300px] bg-gray-200 animate-pulse rounded-lg"></div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-2">{post?.title}</h3>
      <p className="text-gray-600 mb-4">Post ID: {post?.id}</p>
      <p className="mb-4">{post?.body}</p>
      <p className="text-sm text-gray-500">
        This content was fetched client-side. Refresh to see a different post.
      </p>
    </div>
  );
}
