import React from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4">Post ID: {post.id}</p>
      <p>{post.body}</p>
    </div>
  );
}
