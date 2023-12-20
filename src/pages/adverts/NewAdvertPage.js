import Layout from "../../components/layout/Layout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createAdvert, getTags } from "./service";
import Button from "../../components/shared/Button";

function NewAdvertPage() {
    const [name, setName] = useState("");
    const [sale, setSale] = useState(true);
    const [price, setPrice] = useState(0);
    const [tags, setTags] = useState([]);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        getTags()
            .then(data => {
                setTags(data);
            })
            .catch(error => {
                console.error("Error al obtener las etiquetas:", error);
            });
    }, []);

    const handleNameChange = event => {
        setName(event.target.value);
    };

    const handleSaleChange = event => {
        setSale(event.target.value === "true");
    };

    const handlePriceChange = event => {
        setPrice(event.target.value);
    };

    const handleTagsChange = event => {
        const selectedOptions = Array.from(
            event.target.selectedOptions,
            option => option.value
        );
        setTags(selectedOptions);
    };

    const handlePhotoChange = event => {
        const file = event.target.files[0];
        if (file) {
            setPhoto(file);
        }
    };

    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("sale", sale);
        formData.append("price", price);
        tags.forEach(tag => formData.append("tags", tag));
        if (photo) {
            formData.append("photo", photo);
        }

        try {
            const advert = await createAdvert(formData);

            navigate("/adverts/" + advert.id);
        } catch (error) {
            console.error("Error creating the ad: ", error);
        }
    };

    return (
        <Layout title="Create your add">
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nombre">Name:</label>
                    <input
                        value={name}
                        onChange={handleNameChange}
                        type="text"
                        id="nombre"
                        name="nombre"
                        required
                    />
                    <br />
                    <br />

                    <label htmlFor="price">Price:</label>
                    <input
                        value={price}
                        onChange={handlePriceChange}
                        type="number"
                        id="price"
                        name="price"
                        required
                    />
                    <br />
                    <br />

                    <label htmlFor="sale">Type of product</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="false"
                                value="false"
                                onChange={handleSaleChange}
                            />
                            To Buy
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="true"
                                value="true"
                                onChange={handleSaleChange}
                            />
                            For Sale
                        </label>
                    </div>
                    <br />
                    <br />

                    <label htmlFor="tags-select">Choose a tag:</label>
                    <select
                        multiple
                        id="tags-select"
                        value={tags}
                        onChange={handleTagsChange}
                        required
                    >
                        {tags.map(tag => (
                            <option key={tag} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </select>
                    <br />
                    <br />

                    <label htmlFor="photo">Add a photo of your advert:</label>
                    <br />
                    <input
                        type="file"
                        id="photo"
                        name="photo"
                        onChange={handlePhotoChange}
                    />
                    <br />
                    <br />

                    <Button $variant="primary" type="submit">
                        Create ad
                    </Button>
                </form>
            </div>
        </Layout>
    );
}

export default NewAdvertPage;
