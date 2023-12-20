import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getAdverts, getTags } from "./service";
import Button from "../../components/shared/Button";
import { Link } from "react-router-dom";
import "./styles/AdvertsPage.css";

import { useLocation, useNavigate } from "react-router-dom";

const AdvertsPage = () => {
    const [adverts, setAdverts] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedSale, setSelectedSale] = useState(null);
    const [filteredAdverts, setFilteredAdverts] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdvertsAndFilters = async () => {
            const queryParams = new URLSearchParams(location.search);
            const tagFromQuery = queryParams.get("tags");
            const saleFromQuery = queryParams.get("sale");
            const fetchedAdverts = await getAdverts({ tags: tagFromQuery });
            const fetchedTags = await getTags();
            setAdverts(fetchedAdverts);
            setTags(fetchedTags);
            setSelectedTag(tagFromQuery);
            setSelectedSale(saleFromQuery);
            setFilteredAdverts(fetchedAdverts);
        };
        fetchAdvertsAndFilters();
    }, [location.search]);

    const handleTagChange = event => {
        setSelectedTag(event.target.value);
    };

    const handleSaleChange = event => {
        const newValue = event.target.checked ? event.target.value : null;
        setSelectedSale(newValue);
    };

    const handleFilterSubmit = () => {
        const queryParams = {};
        if (selectedTag) {
            queryParams.tags = selectedTag;
        }

        if (selectedSale !== null) {
            queryParams.sale = selectedSale;
        }

        // Se actualiza la URL con la nueva query de filtrado
        const queryString = new URLSearchParams(queryParams).toString();
        navigate(`/adverts?${queryString}`);

        // Filtrar anuncios basados en 'tags' y 'sale'
        const newFilteredAdverts = adverts.filter(
            advert =>
                (!selectedTag || advert.tags.includes(selectedTag)) && // Filtrar por 'tags'
                (selectedSale === null || advert.sale === selectedSale) // Filtrar por 'sale'
        );
        setFilteredAdverts(newFilteredAdverts);
    };

    const handleClearFilterSubmit = () => {
        // Se limpia la query de filtrado en la URL
        navigate("/adverts");

        setSelectedTag(null);
        setSelectedSale(null);
        setFilteredAdverts(adverts);
    };

    return (
        <Layout title="Latest adds">
            <div className="advertsPage">
                <div className="advertsFilters">
                    <strong>Filter by Tag:</strong>{" "}
                    {tags.map((tag, index) => (
                        <label key={index}>
                            <input
                                type="radio"
                                name="tagFilter"
                                value={tag}
                                checked={selectedTag === tag}
                                onChange={handleTagChange}
                            />
                            {tag}
                        </label>
                    ))}
                    <br />
                    <strong>Filter by Sale:</strong>{" "}
                    <label>
                        <input
                            type="checkbox"
                            name="saleFilter"
                            value="true"
                            onChange={handleSaleChange}
                        />
                        For Sale
                    </label>{" "}
                    <label>
                        <input
                            type="checkbox"
                            name="saleFilter"
                            value="false"
                            onChange={handleSaleChange}
                        />
                        To Buy
                    </label>{" "}
                    <br />
                    <button onClick={handleFilterSubmit}>Filter</button>
                    <button onClick={handleClearFilterSubmit}>
                        Clear Filters
                    </button>
                </div>
                {filteredAdverts.length ? (
                    <ul className="advertsList">
                        {filteredAdverts.map(advert => (
                            <li key={advert.id} className="advertItem">
                                <Link to={"/adverts/" + advert.id}>
                                    {advert.name}
                                    <b>
                                        <br />
                                        buy or sell:
                                    </b>
                                    {advert.sale ? " for sale" : " to buy"}
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
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>
                        <h3>No ads available. Do you want to create yours?</h3>
                        <Link to="/adverts/new">
                            <Button $variant="primary">Upload your ad!</Button>
                        </Link>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default AdvertsPage;
