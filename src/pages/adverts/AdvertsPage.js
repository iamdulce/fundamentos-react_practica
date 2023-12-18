import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getAdverts, getTags } from "./service";
import Button from "../../components/shared/Button";
import { Link } from "react-router-dom";
import "./styles/AdvertsPage.css";

const AdvertsPage = () => {
    const [adverts, setAdverts] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [filteredAdverts, setFilteredAdverts] = useState([]);

    useEffect(() => {
        const fetchAdvertsAndTags = async () => {
            const fetchedAdverts = await getAdverts();
            const fetchedTags = await getTags();
            setAdverts(fetchedAdverts);
            setTags(fetchedTags);

            setFilteredAdverts(fetchedAdverts);
        };
        fetchAdvertsAndTags();
    }, []);

    const handleTagChange = event => {
        setSelectedTag(event.target.value);
    };

    const handleFilterClick = () => {
        const newFilteredAdverts = selectedTag
            ? adverts.filter(advert => advert.tags.includes(selectedTag))
            : adverts;
        setFilteredAdverts(newFilteredAdverts);
    };

    const handleClearFilterClick = () => {
        setSelectedTag(null);
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
                    <button onClick={handleFilterClick}>Filter</button>
                    <button onClick={handleClearFilterClick}>
                        Clear Filter
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
