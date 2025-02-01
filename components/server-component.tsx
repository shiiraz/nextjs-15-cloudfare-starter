async function getData() {
  const randomId = Math.floor(Math.random() * 100) + 1;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${randomId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function ServerComponent() {
  const post = await getData();

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
      <p className="text-gray-600 mb-4">Post ID: {post.id}</p>
      <p className="mb-4">{post.body}</p>
      <p className="text-sm text-gray-500">
        This content was rendered server-side. Refresh to see a different post.
      </p>
    </div>
  );
}
