import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { getAdverts, getTags } from "./service";
import Button from "../../components/shared/Button";
import { Link } from "react-router-dom";
import "./styles/AdvertsPage.css";

const AdvertsPage = () => {
    const [adverts, setAdverts] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState("");

    useEffect(() => {
        getTags()
            .then(tags =>
                setTags(() => {
                    return tags;
                })
            )
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        console.log("Fetching adverts with tag", selectedTag);
        getAdverts(selectedTag)
            .then(adverts => setAdverts(adverts || []))
            .catch(err => console.error(err));
    }, [selectedTag]);

    const filterByTag = event => {
        const tagFromEvent = event.target.value;
        setSelectedTag(tagFromEvent);
    };

    return (
        <Layout title="Latest adds">
            <div className="advertsFilters">
                <label htmlFor="select-tag">
                    Filter by Tag
                    <select
                        id="select-tag"
                        name="select-tag"
                        onChange={filterByTag}
                    >
                        {tags.map(tag => {
                            return (
                                <option key={`option-${tag}`} value={tag}>
                                    {tag}
                                </option>
                            );
                        })}
                    </select>
                </label>
            </div>
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
