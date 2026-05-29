"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Blog = {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  description: string;
  keywords: string[];
  hashtags: string[];
  content: string;
  imageId?: string;
  createdAt?: string;
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/blogs");
        const data = await res.json();

        setBlogs(data.blogs || []);
      } catch (error) {
        console.log("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen py-12 px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-slate-800">Travel Blogs</h1>
        <p className="text-slate-500 mt-2">
          Explore routes, tips & travel guides
        </p>
      </div>

      {loading && <p className="text-center text-gray-400">Loading blogs...</p>}

      {!loading && blogs.length === 0 && (
        <p className="text-center text-gray-400">No blogs available</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {blogs.map((blog) => {
          const categorySlug = blog.category
            ?.toLowerCase()
            .trim()
            .replace(/\s+/g, "-");

          return (
            <div
              key={blog._id}
              className="group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition bg-white"
            >
              {/* Image */}
              <Link href={`/blogs/${blog.slug}`}>
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={
                      blog.imageId
                        ? `/api/image/${blog.imageId}`
                        : "/default-blog.jpg"
                    }
                    alt={blog.title}
                    fill
                    unoptimized
                    className="object-cover transition"
                  />
                </div>
              </Link>

              {/* Content */}
              <div className="p-5">
                {blog.category && (
                  <Link href={`/blogs/category/${categorySlug}`}>
                    <p className="text-sm text-primary font-semibold mb-2 hover:underline">
                      {blog.category}
                    </p>
                  </Link>
                )}

                <Link href={`/blogs/${blog.slug}`}>
                  <h2 className="text-lg font-bold text-slate-800 line-clamp-2 hover:text-primary">
                    {blog.title}
                  </h2>
                </Link>

                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {blog.description}
                </p>

                <p className="text-xs mt-3 text-gray-400">
                  {blog.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString("en-IN")
                    : "Recently"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
