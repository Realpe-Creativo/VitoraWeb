// src/components/AccordionSection.tsx
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const HtmlContent: React.FC<{ html: string; className?: string }> = ({
                                                                                html,
                                                                                className = '',
                                                                            }) => (
    <div
        className={className}
        // Asegúrate de que el HTML venga de una fuente confiable
        dangerouslySetInnerHTML={{ __html: html }}
    />
);

interface AccordionSectionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export const AccordionSection: React.FC<AccordionSectionProps> = ({
                                                                      title,
                                                                      children,
                                                                      defaultOpen = false,
                                                                  }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
                <span className="text-base font-semibold text-gray-900">{title}</span>
                <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {isOpen && (
                <div className="px-4 py-3 bg-white">
                    {children}
                </div>
            )}
        </div>
    );
};
