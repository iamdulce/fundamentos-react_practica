import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getAdverts, getTags } from "./service";
import Button from "../../components/shared/Button";
import { Link } from "react-router-dom";
import "./styles/AdvertsPage.css";
import { useAuth } from "../auth/context";

import { useLocation, useNavigate } from "react-router-dom";

const AdvertsPage = () => {
    const { isLogged } = useAuth();

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

            if (isLogged) {
                try {
                    const fetchedAdverts = await getAdverts({
                        tags: tagFromQuery,
                        sale: saleFromQuery,
                    });
                    setAdverts(fetchedAdverts);
                    setFilteredAdverts(fetchedAdverts);
                } catch (error) {
                    console.error("Error fetching adverts:", error);
                    setAdverts([]);
                    setFilteredAdverts([]);
                }
            } else {
                setAdverts([]);
                setFilteredAdverts([]);
            }
            const fetchedTags = await getTags();
            setTags(fetchedTags);
            setSelectedTag(tagFromQuery);
            setSelectedSale(saleFromQuery);
        };
        fetchAdvertsAndFilters();
    }, [isLogged, location.search]);

    const handleTagChange = event => {
        setSelectedTag(event.target.value);
    };

    const handleSaleChange = event => {
        const newValue =
            event.target.value === "" ? null : event.target.value === "true";
        setSelectedSale(newValue);
    };

    const handleFilterSubmit = () => {
        const queryParams = {};
        if (selectedTag) {
            queryParams.tags = selectedTag;
        }

        if (selectedSale !== null) {
            queryParams.sale = selectedSale.toString();
        }

        // Se actualiza la URL con la nueva query de filtrado
        const queryString = new URLSearchParams(queryParams).toString();
        console.log("Query Params:", queryParams);

        navigate(`/adverts?${queryString}`);

        // Filtrar anuncios segúnn 'tags' y/o 'sale'
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
        <Layout title="Latest ads">
            <div className="advertsPage">
                <div className="advertsFilters">
                    <div className="advertsFiltersInputs">
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
                        <select
                            name="saleFilter"
                            value={
                                selectedSale === null
                                    ? ""
                                    : selectedSale.toString()
                            }
                            onChange={handleSaleChange}
                        >
                            <option value="" defaultChecked>
                                Choose an option
                            </option>
                            <option value="true">For Sale</option>
                            <option value="false">To Buy</option>
                        </select>{" "}
                    </div>
                    <div className="advertsFiltersButtons">
                        <Button onClick={handleFilterSubmit}>Filter</Button>
                        <Button onClick={handleClearFilterSubmit}>
                            Clear Filters
                        </Button>
                    </div>
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
