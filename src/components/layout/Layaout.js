import Footer from "./Footer";
import Header from "./Header";

function Layout({ title, children }) {
    return (
        <div>
            <Header />
            <main>
                <h2>{title}</h2>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
