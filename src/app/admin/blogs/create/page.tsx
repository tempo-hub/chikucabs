"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-hot-toast";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

export default function CreateBlog() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);


  /* Generate Slug */
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  /* Reset Form */
  const resetForm = () => {
    setTitle("");
    setSlug("");
    setDescription("");
    setKeywords("");
    setHashtags("");
    setContent("");
    setCategory("");
    setImage(null);
    setPreview("");
  };

  /* Handle Image */
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    /* Validate Type */
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }

    /* Validate Size (2MB) */
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadImageToMongoDB = async () => {
    if (!image) return "";

    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      throw new Error(data.error || "Image upload failed");
    }

    return data.imageId;
  };

  /* Submit Blog */
  const handleSubmit = async () => {
    const cleanContent = content
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, "")
      .trim();

    if (
      !title.trim() ||
      !slug.trim() ||
      !description.trim() ||
      !keywords.trim() ||
      !hashtags.trim() ||
      !category.trim() ||
      !image ||
      !cleanContent
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      /* Upload Image */
      const imageId = await uploadImageToMongoDB();

      /* Save Blog */
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim(),
          description: description.trim(),
          category,
          content,
          imageId,

          keywords: keywords
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),

          hashtags: hashtags
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        }),
      });

      const text = await res.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        console.log("Server Response:", text);
        throw new Error("Invalid server response");
      }

      if (!res.ok) {
        throw new Error(data.message || "Publish failed");
      }

      toast.success("Blog Published Successfully 🎉");

      resetForm();
      router.push("/admin/blogs");
      router.refresh();
    } catch (error: unknown) {
      console.log(error);
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-slate-800 mb-8">
          Create New Blog
        </h1>

        {/* Title */}
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setSlug(generateSlug(e.target.value));
          }}
          className="w-full p-3 border rounded-xl mb-4 outline-none focus:ring-2 focus:ring-primary"
        />

        {/* Slug */}
        <input
          type="text"
          placeholder="Blog Slug"
          value={slug}
          onChange={(e) => setSlug(generateSlug(e.target.value))}
          className="w-full p-3 border rounded-xl mb-4 outline-none focus:ring-2 focus:ring-primary"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border rounded-xl mb-4 outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select Category</option>
          <option value="Travel Guide">Travel Guide</option>
          <option value="Taxi Fare">Taxi Fare</option>
          <option value="Tempo Traveller">Tempo Traveller</option>
          <option value="Tour Package">Tour Package</option>
          <option value="Outstation Taxi">Outstation Taxi</option>
        </select>

        {/* Description */}
        <textarea
          rows={4}
          placeholder="Meta Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded-xl mb-4 outline-none focus:ring-2 focus:ring-primary"
        />

        {/* Keywords */}
        <input
          type="text"
          placeholder="keyword1, keyword2, keyword3"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="w-full p-3 border rounded-xl mb-4 outline-none focus:ring-2 focus:ring-primary"
        />

        {/* Hashtags */}
        <input
          type="text"
          placeholder="#travel, #taxi, #varanasi"
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          className="w-full p-3 border rounded-xl mb-4 outline-none focus:ring-2 focus:ring-primary"
        />

        {/* Image */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Blog Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full p-3 border rounded-xl"
          />

          {preview && (
            <div className="relative w-full h-60 mt-4 rounded-xl overflow-hidden border">
              <Image
                src={preview}
                alt="Preview"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Editor */}
        <div className="mb-6 border rounded-xl overflow-hidden">
          <JoditEditor
            value={content}
            config={{
              readonly: false,
              height: 600,
              toolbarAdaptive: false,

              askBeforePasteHTML: false,
              askBeforePasteFromWord: false,
              defaultActionOnPaste: "insert_as_html",

              cleanHTML: {
                removeEmptyElements: false,
                fillEmptyParagraph: false,
              },

              /* Enable HTML mode */
              buttons:
                "source,bold,italic,underline,|,ul,ol,|,image,link,|,align,|,undo,redo",

              /* Image Upload */
              uploader: {
                url: `/api/upload`,
                method: "POST",
                
                filesVariableName: () => "image",

                isSuccess: (resp: { success: boolean }) => {
                  console.log("UPLOAD SUCCESS:", resp);
                  return resp.success === true;
                },

                process: (resp: { imageId: string }) => {
                  console.log("UPLOAD RESPONSE:", resp);

                  return {
                    files: [`/api/image/${resp.imageId}`],
                    isImages: [true],
                    path: "",
                    baseurl: "",
                  };
                },

                error: (e: Error) => {
                  console.log("UPLOAD ERROR:", e);
                },
              },

              /* Prevent HTML cleaning issues */
              disablePlugins: ["clean-html"],
            }}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>

        {/* Submit and Cancel*/}
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={resetForm}
            className="px-5 py-2 border rounded-xl cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-3 bg-primary text-white rounded-xl hover:opacity-90 transition disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </div>
      </div>
    </div>
  );
}
