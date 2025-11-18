import React, { useEffect, useMemo, useState } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { Branch } from '../types';

interface BranchSelectorProps {
    branches: Branch[];
}

export const BranchSelector: React.FC<BranchSelectorProps> = ({ branches }) => {
    // 1) Ciudades estables
    const cities = useMemo(
        () => Array.from(new Set(branches.map(b => b.city))).sort(),
        [branches]
    );

    // 2) selectedCity se inicializa una sola vez desde sessionStorage
    const [selectedCity, setSelectedCity] = useState<string>('');

    useEffect(() => {
        const saved = sessionStorage.getItem('selectedCity');
        if (saved) {
            setSelectedCity(saved);
        }
    }, []);

    // 3) Si cambia el catálogo de ciudades, solo corrige si la actual no existe
    useEffect(() => {
        if (!cities.length) {
            if (selectedCity) setSelectedCity(''); // no hay ciudades
            return;
        }
        if (!selectedCity || !cities.includes(selectedCity)) {
            setSelectedCity(cities[0]); // escoger la primera disponible
        }
        // ⚠️ Importante: NO sobrescribimos selectedCity si ya es válida
        // eso evita el "rebote"
    }, [cities]); // intencionalmente sin selectedCity en deps

    // 4) Persistir selección cuando cambie
    useEffect(() => {
        if (selectedCity) sessionStorage.setItem('selectedCity', selectedCity);
    }, [selectedCity]);

    // 5) Derivar sucursales filtradas (sin estado extra)
    const filteredBranches = useMemo(
        () => branches.filter(b => b.city === selectedCity),
        [branches, selectedCity]
    );

    const handleCityChange = (city: string) => setSelectedCity(city);

    return (
        <div className="text-center">
            <h2 className="text-4xl font-avenir font-bold mb-6">También lo puedes comprar en estas tiendas</h2>

            <div className="mb-8 flex flex-col items-center">
                <label htmlFor="city-select" className="block text-sm font-avenir text-gray-700 mb-2">
                    Selecciona una ciudad:
                </label>
                <select
                    id="city-select"
                    value={selectedCity}
                    onChange={(e) => handleCityChange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9acd65] focus:border-transparent min-w-48"
                >
                    {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {filteredBranches.map(branch => (
                    <div key={branch.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow w-full max-w-sm">
                        <h3 className="text-lg font-avenir font-bold text-gray-900 mb-4">{branch.name}</h3>

                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                <address className="text-sm font-avenir text-gray-600 not-italic">
                                    {branch.address}
                                </address>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                <a
                                    href={`tel:${branch.phone}`}
                                    className="text-sm font-avenir text-[#9acd65] hover:text-[#9acd65] transition-colors"
                                >
                                    {branch.phone}
                                </a>
                            </div>

                            <div className="flex items-start space-x-3">
                                <Clock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-600">{branch.hours}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
