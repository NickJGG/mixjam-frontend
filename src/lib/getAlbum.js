import axios from "axios";

export default (setState, albumId) => {
    axios.get(`/api/albums/${ albumId }`).then(data => {
        setState(prevState => ({
            ...prevState,
            ...data?.data,
        }));
    });
}
