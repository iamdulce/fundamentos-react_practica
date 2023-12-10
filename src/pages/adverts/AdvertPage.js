import Layout from "../../components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAdvertDetail } from "./service";

const AdvertPage = () => {
    const navigate = useNavigate();
    //Obtengo el id
    const params = useParams();
    //Hago llamada a api
    const [advert, setAdvert] = useState(null);

    useEffect(() => {
        getAdvertDetail(params.advertId)
            .then(advert => setAdvert(advert))
            .catch(error => {
                if (error.status === 404) {
                    navigate("/404");
                }
            });
    }, [navigate, params.advertId]);

    return (
        <Layout title="Product details">
            <div>
                {advert && (
                    <div>
                        <img
                            src={advert.photo}
                            alt={advert.name}
                            width={200}
                            height={200}
                        />
                        <br />
                        <h3>{advert.name}</h3>
                        <b>price:</b> {advert.price}€<br />
                        <b>buy or sell:</b> {advert.sale ? "buying" : "selling"}
                        <br />
                        <b>tags:</b>
                        {advert.tags.map((tag, index) => (
                            <span key={index}> {tag} </span>
                        ))}
                        <br />
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default AdvertPage;
