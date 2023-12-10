import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getAdverts } from "./service";
import Button from "../../components/shared/Button";
import { Link } from "react-router-dom";
import "./styles/AdvertsPage.css";

const AdvertsPage = () => {
    const [adverts, setAdverts] = useState([]);

    useEffect(() => {
        const fetchAdverts = async () => {
            const adverts = await getAdverts();
            setAdverts(adverts);
        };
        fetchAdverts();
    }, []);

    return (
        <Layout title="Latest adds">
            <div className="advertsPage">
                {adverts.length ? (
                    <ul className="advertsList">
                        {adverts.map(advert => (
                            <li className="advertItem" key={advert.id}>
                                <Link to={"/adverts/" + advert.id}>
                                    {advert.name}
                                    <br />
                                    <b>buy or sell:</b>
                                    {advert.sale ? " buying" : " selling"}
                                    <br />
                                    <b>tags:</b>
                                    {advert.tags.map((tag, index) => (
                                        <span key={index}> {tag} </span>
                                    ))}
                                    <br />
                                    <b>price: </b>
                                    {advert.price}€
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <Button $variant="primary">Upload your add!</Button>
                )}
            </div>
        </Layout>
    );
};

export default AdvertsPage;
