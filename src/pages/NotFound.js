import Layout from "../components/layout/Layout";

const NotFound = () => {
    return (
        <Layout title="Ups!">
            <div>
                <img
                    src={require("../assets/not-found.png")}
                    alt="Page Not Found page illustration"
                    style={{ width: "100%", margin: "auto" }}
                />
            </div>
        </Layout>
    );
};

export default NotFound;
