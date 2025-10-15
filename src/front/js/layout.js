import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Categories } from "./pages/categorias";
import { Articulos } from "./pages/articulos";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Types } from "./pages/types"; // <-- importa el componente Types
import { Items } from "./pages/items";
import { ItemPage } from "./pages/itempage";  // importa la nueva página


//create your first component
const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div className="d-flex flex-column min-vh-100">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <main className="flex-fill">
                        <Routes>
                            <Route element={<Home />} path="/" />
                            <Route element={<Categories />} path="/categorias" />
                            <Route element={<Articulos />} path="/articulos" />
                            <Route path="/categorias/:categoryId/types" element={<Types />} />
                            <Route path="/types/:typeId/items" element={<Items />} />
                            <Route path="/items/:itemId" element={<ItemPage />} />
                            <Route element={<Single />} path="/single/:theid" />
                            <Route element={<h1>Not found!</h1>} />
                        </Routes>
                    </main>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
