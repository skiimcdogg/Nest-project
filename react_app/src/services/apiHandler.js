import axios from 'axios';

const service = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
})

function errorHandler(error) {
    if(error.response.data) {
        console.error(error.response.data);
        throw error;
    }
    throw error;
}

const apiHandler = {
    service,

    getAllExtensions() {
        return service
        .get("/extensions")
        .then((response) => response.data)
        .catch(errorHandler)
    },

    getExtensionCards(selectedExtension) {
        return service
        .get(`/cards/extensions/${selectedExtension}`)
        .then((response) => response.data)
        .catch(errorHandler) 
    },

    toggleFavorite(cardId) {
        return service
        .patch(`/cards/favorites/${cardId}`)
        .then((response) => response.data)
        .catch(errorHandler) 
    },

    getAllFavorites() {
        return service
        .get("/cards/favorites")
        .then((response) => response.data)
        .catch(errorHandler) 
    },

    createExtension(formFields) {
        return service
        .post("/extensions", formFields)
        .then((response) => response.data)
        .catch(errorHandler) 
    },

    getOneCard(cardId) {
        return service
        .get(`/cards/${cardId}`)
        .then((response) => response.data)
        .catch(errorHandler) 
    },
}

export default apiHandler;