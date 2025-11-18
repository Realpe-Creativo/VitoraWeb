import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import {Navbar} from './components/Navbar';
import {Footer} from './components/Footer';
import {Home} from './pages/Home';
import {ProductDetail} from './pages/ProductDetail';
import {Checkout} from './pages/Checkout';
import {ThankYou} from "./pages/ThankYou.tsx";
import Login from "./pages/Login.tsx";
import Admin from "./pages/Admin.tsx";
import Pedidos from "./pages/Pedidos.tsx";
import Transacciones from "./pages/Transacciones.tsx";
import BlogList from "./pages/BlogList.tsx";
import BlogDetail from "./pages/BlogDetails.tsx";
import {PromoMarquee} from "./components/PromoMarquee.tsx";
import { WhatsAppFloatingButton } from "./components/WhatsAppFloatingButton";

function Layout() {
    const location = useLocation();

    const hideNavbar = location.pathname.startsWith('/admin');
    const hideMarqueeRoutes = [
        "/admin",
        "/checkout",
        "/finishtx",
    ];
    const hideMarquee = hideMarqueeRoutes.some((path) =>
        location.pathname.startsWith(path)
    );
    const hideWhatsapp = location.pathname.startsWith("/admin");


    return (
        <div className="min-h-screen bg-gray-50">
            {!hideWhatsapp && <WhatsAppFloatingButton />}
            {!hideMarquee && (
                <PromoMarquee
                    speed={22}
                    items={[
                        { text: "Domicilios gratis a todo Colombia ✈🎁"},
                        { text: "Envios gratis para todas tus compras"},
                        { text: "Domicilios gratis a todo Colombia ✈🎁"},
                        { text: "Envios gratis para todas tus compras"},
                    ]}
                />
            )}
            {!hideNavbar && <Navbar/>}
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/product/:id" element={<ProductDetail/>}/>
                    <Route path="/checkout" element={<Checkout/>}/>
                    <Route path="/finishtx" element={<ThankYou/>}/>
                    <Route path="/admin/login" element={<Login/>}/>
                    <Route path="/admin/home" element={<Admin/>}/>
                    <Route path="/admin/pedidos" element={<Pedidos/>}/>
                    <Route path="/admin/trasactions" element={<Transacciones/>}/>
                    <Route path="/news" element={<BlogList />} />
                    <Route path="/news/newsDetail/:id" element={<BlogDetail />} />
                </Routes>
            </main>
            {!hideNavbar && <Footer/>}
        </div>
    );
}

// 🔹 Router principal
export default function AppRouter() {
    return (
        <Router>
            <Layout/>
        </Router>
    );
}