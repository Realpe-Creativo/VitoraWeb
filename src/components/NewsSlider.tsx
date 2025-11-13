import React, {useRef} from "react";
import {Link} from "react-router-dom";
import {BlogItem} from "../data/blog";

type Props = {
    posts: BlogItem[];
    title?: string;
};

export default function BlogSlider({posts, title = "Noticias y Anuncios"}: Props) {
    const scrollerRef = useRef<HTMLDivElement>(null);

    const scrollBy = (px: number) => {
        const el = scrollerRef.current;
        if (!el) return;
        el.scrollBy({left: px, behavior: "smooth"});
    };

    return (
        <section className="w-full flex flex-col items-center">
            <h2 className="text-3xl font-dunkin mb-6">Visita nuestro blog</h2>

            <div className="relative w-11/12 md:w-10/12 lg:w-9/12 mt-6">
                {/* Flecha Izquierda */}
                <button
                    aria-label="Anterior"
                    onClick={() => scrollBy(-400)}
                    className="hidden md:flex absolute -left-8 top-1/2 -translate-y-1/2 z-10
               h-10 w-10 items-center justify-center
               rounded-full bg-white/90 border border-stone-300 shadow-sm
               hover:bg-white hover:shadow-md transition-all duration-200"
                >
                    <span className="text-2xl text-stone-600 leading-none">‹</span>
                </button>

                {/* Flecha Derecha */}
                <button
                    aria-label="Siguiente"
                    onClick={() => scrollBy(400)}
                    className="hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2 z-10
               h-10 w-10 items-center justify-center
               rounded-full bg-white/90 border border-stone-300 shadow-sm
               hover:bg-white hover:shadow-md transition-all duration-200"
                >
                    <span className="text-2xl text-stone-600 leading-none">›</span>
                </button>

                {/* Carrusel */}
                <div
                    ref={scrollerRef}
                    className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory
               [scrollbar-width:none] [-ms-overflow-style:none]
               px-8 md:px-10 pb-2"
                    style={{ scrollPaddingLeft: "1rem" }}
                >
                    {/* Ocultar scrollbar en Webkit */}
                    <style>
                        {`
        div::-webkit-scrollbar { display: none; }
      `}
                    </style>

                    {/* Cards */}
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            to={`/news/newsDetail/${post.id}`}
                            state={post}
                            className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[32%]
                   bg-white rounded-3xl border border-stone-200 hover:border-stone-500
                   hover:shadow-md overflow-hidden transition-all duration-200"
                        >
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="w-full h-44 md:h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl md:text-2xl font-title-bold mb-1 line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-stone-500">{post.created_at}</p>
                                <p className="text-sm text-stone-600 mt-2 line-clamp-3">
                                    {post.body.replace(/<[^>]+>/g, "").slice(0, 140)}...
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
