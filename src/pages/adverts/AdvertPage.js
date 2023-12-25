import Layout from "../../components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAdvertDetail, deleteAdvert } from "./service";
import Button from "../../components/shared/Button";
import "./styles/AdvertPage.css";
import Modal from "../../components/shared/Modal";

const AdvertPage = () => {
    const navigate = useNavigate();
    //Obtengo el id
    const params = useParams();
    //Hago llamada a api
    const [advert, setAdvert] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getAdvertDetail(params.advertId)
            .then(advert => setAdvert(advert))
            .catch(error => {
                if (error.response.status === 404) {
                    navigate("/404");
                }
            });
    }, [navigate, params.advertId]);

    const handleDeleteAdd = () => {
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteAdvert(params.advertId);
            navigate("/adverts");
        } catch (err) {
            console.error(err);
        } finally {
            setShowModal(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const defaultImg = require("../../assets/no-img.png");

    return (
        <Layout title="Advert details">
            <div className="advertContainer">
                <div className="advertDetail">
                    {advert && (
                        <div>
                            <img
                                src={advert.photo || defaultImg}
                                alt={advert.name}
                                width={400}
                            />
                            <br />
                            <h3>{advert.name}</h3>
                            <b>price:</b> {advert.price}€<br />
                            <b>buy or sell:</b>{" "}
                            {advert.sale ? "For sale" : "To buy"}
                            <br />
                            <b>tags:</b>
                            {advert.tags.map((tag, index) => (
                                <span key={index}> {tag} </span>
                            ))}
                            <br />
                        </div>
                    )}
                </div>
                <div className="advertDeleteBtn">
                    <Button $variant="primary" onClick={handleDeleteAdd}>
                        Delete ad
                    </Button>
                </div>
                <Modal
                    show={showModal}
                    onConfirm={handleConfirmDelete}
                    onClose={handleCloseModal}
                />
            </div>
        </Layout>
    );
};

export default AdvertPage;
