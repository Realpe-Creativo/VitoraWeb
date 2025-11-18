import React from "react";

export const WhatsAppFloatingButton: React.FC = () => {
    return (
        <a
            href="https://wa.me/573158873641?text=Hola%20Vitora%20Colombia%2C%20estoy%20interesado%20en%20sus%20productos" // Cambia por tu número real
            target="_blank"
            rel="noopener noreferrer"
            className="fixed right-4 bottom-4 z-40"
            aria-label="WhatsApp Chat"
        >
            <div className="relative">
                {/* Círculo pulsante */}
                <span className="absolute inline-flex h-32 w-32 rounded-full bg-[#25D366] opacity-75 animate-ping" />

                {/* Botón principal */}
                <div className="relative w-24 h-24 rounded-full bg-[#25D366] shadow-xl flex items-center justify-center hover:scale-105 transition-transform">
                    {/* Logo oficial de WhatsApp */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="white"
                        viewBox="0 0 32 32"
                        className="w-16 h-16"
                    >
                        <path d="M16.001 3.2c-7.063 0-12.8 5.737-12.8 12.8 0 2.257.589 4.452 1.708 6.392L3.2 28.8l6.64-1.731a12.74 12.74 0 0 0 6.161 1.581h.001c7.063 0 12.8-5.737 12.8-12.8S23.063 3.2 16.001 3.2zm0 23.466h-.001a11.6 11.6 0 0 1-5.916-1.63l-.424-.251-3.94 1.028 1.053-3.85-.276-.395a11.56 11.56 0 0 1-1.828-6.342c0-6.408 5.214-11.622 11.622-11.622 3.108 0 6.027 1.21 8.227 3.41a11.53 11.53 0 0 1 3.395 8.212c0 6.408-5.214 11.622-11.622 11.622zm6.381-8.745c-.35-.175-2.074-1.023-2.395-1.14-.32-.117-.553-.175-.786.175-.233.35-.902 1.14-1.107 1.374-.204.233-.408.262-.758.087-.35-.175-1.48-.545-2.819-1.737-1.042-.93-1.744-2.08-1.948-2.43s-.022-.54.153-.715c.158-.158.35-.408.525-.612.175-.204.233-.35.35-.583.117-.233.058-.437-.029-.612-.087-.175-.786-1.897-1.077-2.602-.283-.68-.572-.589-.786-.589-.204 0-.437-.029-.67-.029-.233 0-.612.087-.931.437-.32.35-1.223 1.195-1.223 2.91 0 1.716 1.252 3.372 1.426 3.605.175.233 2.465 3.761 5.976 5.273.836.358 1.488.572 1.993.732.837.266 1.598.229 2.198.139.67-.1 2.074-.848 2.368-1.666.291-.817.291-1.517.204-1.666-.087-.15-.32-.233-.67-.408z" />
                    </svg>
                </div>
            </div>
        </a>
    );
};