import axios from "axios";

export default (setState, albumId) => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/albums/${ albumId }`).then(data => {
        setState(prevState => ({
            ...prevState,
            ...data?.data,
        }));
    });
}
