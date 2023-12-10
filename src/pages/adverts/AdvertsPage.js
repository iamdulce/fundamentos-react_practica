import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getAdverts } from "./service";
import Button from "../../components/shared/Button";
import { Link } from "react-router-dom";

const AdvertsPage = () => {
    const [adverts, setAdverts] = useState([]);

    useEffect(() => {
        const fetchAdverts = async () => {
            const adverts = await getAdverts();
            setAdverts(adverts);
        };
        fetchAdverts();
    }, []);

    const defaultImageURL = "../assets/no-img.jpeg";

    return (
        <Layout title="Latest adds">
            <div className="advertsPage">
                {adverts.length ? (
                    <ul>
                        {adverts.map(advert => (
                            <li
                                key={advert.id}
                                style={{
                                    listStyle: "none",
                                    border: "1px solid red",
                                }}
                            >
                                <Link to={"/adverts/" + advert.id}>
                                    {advert.name}
                                    <b>
                                        <br />
                                        buy or sell:
                                    </b>
                                    {advert.sale ? "buying" : "selling"}
                                    <b>
                                        <br />
                                        tags:
                                    </b>
                                    {advert.tags.map((tag, index) => (
                                        <span key={index}> {tag} </span>
                                    ))}
                                    <b>
                                        <br />
                                        price:
                                    </b>
                                    {advert.price}€
                                    <br />
                                    <img
                                        src={advert.photo || defaultImageURL}
                                        alt="advertisement product"
                                        width="200"
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <Button variant="primary">Upload your add!</Button>
                )}
            </div>
        </Layout>
    );
};

export default AdvertsPage;
