"use client";

import { ClientComponent } from "@/components/client-component";
import { ServerComponent } from "@/components/server-component";
import { ISRComponent } from "@/components/isr-component";
import { Suspense, useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("csr");

  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">
          Next.js Rendering Patterns Demo 🚀
        </h1>
        <p className="text-xl text-center text-gray-600">
          Explore different rendering strategies with the App Router
        </p>

        <div className="w-full">
          <div className="flex border-b border-gray-200">
            {["csr", "ssr", "isr"].map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-2 px-4 text-center ${
                  activeTab === tab
                    ? "border-b-2 border-blue-500 font-medium text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="mt-4">
            {activeTab === "csr" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  Client-side Rendering
                </h2>
                <p className="text-gray-600">
                  Data fetched and rendered on the client
                </p>
                <ClientComponent />
              </div>
            )}
            {activeTab === "ssr" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  Server-side Rendering
                </h2>
                <p className="text-gray-600">
                  Data fetched and rendered on the server
                </p>
                <Suspense
                  fallback={
                    <div className="w-full h-[300px] bg-gray-200 animate-pulse rounded-lg"></div>
                  }
                >
                  <ServerComponent />
                </Suspense>
              </div>
            )}
            {activeTab === "isr" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  Incremental Static Regeneration
                </h2>
                <p className="text-gray-600">
                  Static data revalidated every 30 seconds
                </p>
                <Suspense
                  fallback={
                    <div className="w-full h-[300px] bg-gray-200 animate-pulse rounded-lg"></div>
                  }
                >
                  <ISRComponent />
                </Suspense>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
