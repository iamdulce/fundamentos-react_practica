import Footer from "./Footer";
import Header from "./Header";
import "./styles/Layout.css";

function Layout({ title, children }) {
    return (
        <div>
            <Header />
            <main className="layout-main">
                <h2>{title}</h2>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
