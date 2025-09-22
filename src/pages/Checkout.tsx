import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { products } from '../data/products';
import { Product, CheckoutData } from '../types';
import { Price } from '../components/Price';

export const Checkout: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSku, setSelectedSku] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [payloadResult, setPayloadResult] = useState<any>(null);

  const [formData, setFormData] = useState<CheckoutData>({
    name: '',
    email: '',
    phone: '',
    document: '',
    address: '',
    city: '',
    notes: ''
  });

  useEffect(() => {
    const productId = searchParams.get('id');
    const sku = searchParams.get('sku');
    const qty = searchParams.get('qty');

    if (productId) {
      const foundProduct = products.find(p => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedSku(sku || '');
        setQuantity(qty ? parseInt(qty) : 1);
      }
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    const selectedVariant = product?.variants.find(v => v.sku === selectedSku);
    const unitPrice = selectedVariant?.price || product?.price || 0;
    const totalAmount = unitPrice * quantity;

    const payload = {
      product: {
        id: product?.id,
        name: product?.name,
        sku: selectedSku,
        variant: selectedVariant?.name
      },
      quantity,
      unitPrice,
      totalAmount,
      currency: product?.currency,
      customer: formData,
      timestamp: new Date().toISOString(),
      orderNumber: `ORD-${Date.now()}`
    };

    setPayloadResult(payload);
    setShowResult(true);
    setIsSubmitting(false);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No product selected</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to store
          </Link>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="bg-gray-50 flex items-center justify-center py-16">
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Orden lista para crear transacción</h2>
              <p className="text-gray-600">Petición a enviar a la pasarela </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold mb-2">Payment Gateway Payload:</h3>
              <pre className="text-sm text-gray-600 overflow-auto max-h-96">
                {JSON.stringify(payloadResult, null, 2)}
              </pre>
            </div>

            <Link 
              to="/"
              className="inline-flex items-center px-6 py-3 bg-[#9acd65] text-white rounded-lg hover:bg-[#9acd65] transition-colors focus:outline-none focus:ring-2 focus:ring-[#9acd65] focus:ring-offset-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a el producto
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const selectedVariant = product.variants.find(v => v.sku === selectedSku);
  const unitPrice = selectedVariant?.price || product.price;
  const totalAmount = unitPrice * quantity;

  return (
    <div className="bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to={`/product/${product.id}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver al producto
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <h2 className="text-2xl font-dunkin text-gray-900 mb-6">Resumen de tu compra</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={product.images.main}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  {/*<p className="text-sm text-gray-600">
                    {selectedVariant?.name} {selectedVariant?.size && `(${selectedVariant.size})`}
                  </p>*/}
                  <p className="text-sm text-gray-600">Cantidad: {quantity}</p>
                </div>
                <Price amount={unitPrice} currency={product.currency} className="font-semibold" />
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <Price amount={totalAmount} currency={product.currency} className="text-lg font-bold text-[#9acd65]" />
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div>
            <h2 className="text-2xl font-dunkin text-gray-900 mb-6">Información de pago</h2>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9acd65] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9acd65] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9acd65] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="document" className="block text-sm font-medium text-gray-700 mb-1">
                    Documento *
                  </label>
                  <input
                    type="text"
                    id="document"
                    name="document"
                    value={formData.document}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9acd65] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9acd65] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9acd65] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notas adicionales
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9acd65] focus:border-transparent"
                  placeholder="Algún comentario sobre la entrega..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#9acd65] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#9acd65] disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-[#9acd65] focus:ring-offset-2"
              >
                {isSubmitting ? 'Procesando...' : 'Completar compra'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};