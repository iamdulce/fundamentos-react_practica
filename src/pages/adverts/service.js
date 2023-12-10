import client from "../../api/client";

const advertsURL = "/api/v1/adverts";

export const getAdverts = () => {
    return client.get(advertsURL);
};

export const getAdvertDetail = advertId => {
    const url = `${advertsURL}/${advertId}`;
    return client.get(url);
};

export const createAdvert = advert => {
    const url = advertsURL;
    return client.post(url, advert);
};