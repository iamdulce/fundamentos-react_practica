import client from "../../api/client";

const advertsURL = "/api/v1/adverts";

export const getAdverts = () => {
    return client.get(advertsURL);
};

export const createAdvert = advert => {
    const url = advertsURL;
    return client.post(url, advert);
};
