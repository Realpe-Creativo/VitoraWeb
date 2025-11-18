import {useLocation, useNavigate, Link, useParams} from "react-router-dom";
import moment from "moment";
import {blogData, BlogItem} from "../data/blog";
import DOMPurify from "dompurify";
import {useEffect, useState} from "react";

export default function NewsDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const {id} = useParams<{ id: string }>();

    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Detectar dispositivo
    useEffect(() => {
        const checkDevice = () => setIsMobile(window.innerWidth < 768);
        checkDevice();
        window.addEventListener("resize", checkDevice);
        return () => window.removeEventListener("resize", checkDevice);
    }, []);

    const statePost = location.state as BlogItem | undefined;
    const current =
        statePost ??
        blogData.find((n) => n.id === id) ??
        (null as unknown as BlogItem);

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

    const safeHtml = DOMPurify.sanitize(current.body);

    // Elegir imagen dependiendo del dispositivo
    const mainImageToShow = isMobile
        ? current.mainImageMobile || current.mainImage
        : current.mainImageDesktop || current.mainImage;

    return (
        <div className="flex flex-col items-center mt-4 mb-8 px-4">
            <div className="w-full max-w-5xl">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-stone-700 hover:text-stone-500 flex items-center"
                >
                    ← Volver
                </button>

                {mainImageToShow && (
                    <img
                        src={mainImageToShow}
                        alt="Imagen principal"
                        className="w-full h-96 object-cover mb-8 rounded-lg"
                    />
                )}

                <h1 className="text-3xl md:text-4xl font-title-bold text-center mb-8">
                    {current.title}
                </h1>
                {/*<p className="text-sm text-stone-500 text-center mb-8">
                    {moment.utc(current.created_at).format("DD/MM/YYYY")}
                </p>*/}

                <article
                    className="prose prose-stone max-w-none mb-12
                    prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
                    prose-h1:font-bold prose-h2:font-bold prose-h3:font-bold
                    prose-p:text-lg prose-p:leading-relaxed
                    prose-ul:pl-6 prose-li:marker:text-stone-500 text-justify"
                    dangerouslySetInnerHTML={{__html: safeHtml}}
                />

                {/* Resto del componente continúa igual... */}
            </div>
        </div>
    );
}
