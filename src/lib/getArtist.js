import axios from "axios";

export default (setState, artistId) => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/artists/${ artistId }`).then(data => {
        setState(prevState => ({
            ...prevState,
            ...data?.data,
        }));
    });
}
