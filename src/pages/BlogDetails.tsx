import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import moment from "moment";
import { blogData, BlogItem } from "../data/blog";
import DOMPurify from "dompurify";

export default function NewsDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams<{ id: string }>();

    // 1) Prioriza el estado que viene del Link; 2) fallback a buscar por :id
    const statePost = location.state as BlogItem | undefined;
    const current =
        statePost ??
        blogData.find((n) => n.id === id) ??
        (null as unknown as BlogItem); // para mantener tipado exacto del código original

    if (!current) {
        return (
            <div className="flex flex-col items-center mt-32 mb-20 px-4">
                <div className="w-full max-w-5xl">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-6 text-stone-700 hover:text-stone-500 flex items-center"
                    >
                        ← Volver
                    </button>
                    <p className="text-stone-700">No se encontró la noticia.</p>
                    <Link to="/news" className="text-blue-600 underline mt-2 inline-block">
                        Ir al listado de noticias
                    </Link>
                </div>
            </div>
        );
    }

    const relatedArticles = blogData
        .filter((item) => item.id !== current.id)
        .slice(0, 3); // Mostrar solo 3 artículos

    // Si quieres sanitizar el HTML, descomenta:
    const safeHtml = DOMPurify.sanitize(current.body);
    /*const safeHtml = current.body;*/

    return (
        <div className="flex flex-col items-center mt-32 mb-20 px-4">
            <div className="w-full max-w-5xl">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-stone-700 hover:text-stone-500 flex items-center"
                >
                    ← Volver
                </button>

                {current.mainImage && (
                    <img
                        src={current.mainImage}
                        alt="Imagen principal"
                        className="w-full h-96 object-cover mb-8"
                    />
                )}

                <h1 className="text-3xl md:text-4xl font-title-bold text-center mb-2">
                    {current.title}
                </h1>
                <p className="text-sm text-stone-500 text-center mb-8">
                     {moment.utc(current.created_at).format("DD/MM/YYYY")}
                </p>

                <article
                    className="prose prose-stone max-w-none mb-12
             prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
             prose-h1:font-bold prose-h2:font-bold prose-h3:font-bold
             prose-p:text-lg prose-p:leading-relaxed
             prose-ul:pl-6 prose-li:marker:text-stone-500"
                    dangerouslySetInnerHTML={{ __html: safeHtml }}
                />

                {Array.isArray(current.images) && current.images.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                        {current.images.map((src, idx) => (
                            <img
                                key={idx}
                                src={src}
                                alt={`Imagen de apoyo ${idx + 1}`}
                                className="w-full h-64 object-cover rounded"
                            />
                        ))}
                    </div>
                )}

                {current.conclusion && (
                    <section className="mb-20">
                        <h2 className="text-2xl font-bold mb-4">Conclusión</h2>
                        <p className="text-lg text-stone-700 leading-relaxed">
                            {current.conclusion}
                        </p>
                    </section>
                )}

                <hr className="my-16 border-t border-stone-800" />

                <section>
                    <h2 className="text-2xl font-bold text-center mb-8">
                        También te podría interesar
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {relatedArticles.map((article) => (
                            <Link
                                key={article.id}
                                to={`/news/newsDetail/${article.id}`}
                                state={article}
                                className="bg-white border rounded-lg overflow-hidden hover:shadow transition-shadow block"
                            >
                                <img
                                    src={article.imageUrl}
                                    alt={article.title}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <p className="text-sm text-stone-500 mb-1">
                                        Publicado: {moment.utc(article.created_at).format("DD/MM/YYYY")}
                                    </p>
                                    <h3 className="text-md font-semibold mb-2">{article.title}</h3>
                                    <p className="text-sm text-stone-600">
                                        {article.body.replace(/<[^>]+>/g, "").slice(0, 100)}...
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}