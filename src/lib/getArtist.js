import axios from "axios";

export default (setState, artistId) => {
    axios.get(`/api/artists/${ artistId }`).then(data => {
        setState(prevState => ({
            ...prevState,
            ...data?.data,
        }));
    });
}
