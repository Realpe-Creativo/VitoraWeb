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

function Layout() {
    const location = useLocation();

    // Si la ruta comienza con "/admin", no mostrar Navbar
    const hideNavbar = location.pathname.startsWith('/admin');

    return (
        <div className="min-h-screen bg-gray-50">
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