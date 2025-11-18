import React from "react";

interface PromoItem {
    text: string;
    href?: string; // opcional
}

interface PromoMarqueeProps {
    items: PromoItem[];
    speed?: number; // segundos del scroll
}

export const PromoMarquee: React.FC<PromoMarqueeProps> = ({
                                                              items,
                                                              speed = 20,
                                                          }) => {
    return (
        <div className="w-full overflow-hidden bg-[#9ACD65] text-black">
            <div
                className="flex whitespace-nowrap animate-marquee gap-10 px-10"
                style={{ animationDuration: `${speed}s` }}
            >
                {/** Bloque original */}
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 text-sm md:text-base"
                    >
                        {item.href ? (
                            <a
                                href={item.href}
                                className="underline hover:opacity-80 transition"
                            >
                                {item.text}
                            </a>
                        ) : (
                            <span>{item.text}</span>
                        )}
                        <span className="text-xl leading-none">•</span>
                        {/*{index < items.length - 1 && (
                            <span className="text-xl leading-none">•</span>
                        )}*/}
                    </div>
                ))}

                {/** Duplicado para scroll infinito */}
                {items.map((item, index) => (
                    <div
                        key={`dup-${index}`}
                        className="flex items-center gap-3 text-sm md:text-base"
                    >
                        {item.href ? (
                            <a
                                href={item.href}
                                className="underline hover:opacity-80 transition"
                            >
                                {item.text}
                            </a>
                        ) : (
                            <span>{item.text}</span>
                        )}
                        {index < items.length - 1 && (
                            <span className="text-xl leading-none">•</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
