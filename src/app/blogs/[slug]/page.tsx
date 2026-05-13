import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Image from "next/image";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await connectDB();

  const blog = await Blog.findOne({ slug }).lean();

  if (!blog) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Blog Image */}
        {blog.imageId && (
          <div className="relative w-full aspect-video bg-gray-100">
            <Image
              src={`/api/image/${blog.imageId.toString()}`}
              alt={blog.title}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 1024px"
              unoptimized
            />
          </div>
        )}

        {/* Content Wrapper */}
        <div className="p-6 md:p-10">
          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-black text-slate-800 leading-tight mb-4">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-8 border-b pb-5">
            <span>{new Date(blog.createdAt).toLocaleDateString("en-IN")}</span>

            {blog.category && (
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                {blog.category}
              </span>
            )}
          </div>

          {/* Blog Content */}
          <div
            className="blog-content max-w-none overflow-x-auto"
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          />
        </div>
      </div>
    </div>
  );
}
