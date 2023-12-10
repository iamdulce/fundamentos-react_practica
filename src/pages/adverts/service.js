import client from "../../api/client";

const advertsURL = "/api/v1/adverts";

export const getAdverts = async (type, selectedTag) => {
    const queryString = `?type=${type}&tag=${selectedTag}`;

    try {
        const response = await client.get(`${advertsURL}${queryString}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching adverts:", error);
        throw error;
    }
};

export const getAdvertDetail = advertId => {
    const url = `${advertsURL}/${advertId}`;
    return client.get(url);
};

export const deleteAdvert = advertId => {
    const url = `${advertsURL}/${advertId}`;
    return client.delete(url);
};

export const createAdvert = advert => {
    const url = advertsURL;
    return client.post(url, advert);
};

export const getTags = () => {
    const url = `${advertsURL}/tags`;
    return client.get(url);
};
