import { useState } from "react";
import { Link } from "react-router-dom";
import { blogData, BlogItem } from "../data/blog";
import NewsSlider from "../components/NewsSlider";
import { formatDateISO } from "../utils/formatDate"; // opcional

export default function NewsList() {
    const [posts] = useState<BlogItem[]>(blogData);

    return (
        <div className="flex flex-col items-center">
            {/* Slider superior */}
            <NewsSlider posts={posts} />

            {/* Grid secundaria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-11/12 md:w-10/12 lg:w-9/12 px-2 md:px-4 mt-4 mb-20">
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        to={`/news/newsDetail/${post.id}`}
                        state={post}
                        className="block bg-white rounded-3xl border border-stone-200 hover:border-stone-500 hover:shadow-md overflow-hidden"
                    >
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-48 object-cover"
                            loading="lazy"
                        />
                        <div className="p-4">
                            <h3 className="text-2xl font-title-bold mb-1">
                                {post.title}
                            </h3>
                            <p className="text-sm text-stone-500">
                                {formatDateISO(post.created_at)}
                            </p>
                            <p className="text-sm text-stone-600 mt-1">
                                {post.body.replace(/<[^>]+>/g, "").slice(0, 100)}...
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
