import client from "../../api/client";

const advertsURL = "/api/v1/adverts";

export const getTags = () => {
    const url = `${advertsURL}/tags`;
    return client.get(url);
};

export const getAdverts = queryParams => {
    return client.get(advertsURL, { params: queryParams });
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
