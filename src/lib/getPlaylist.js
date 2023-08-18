import axios from "axios";

export default (setState, albumId) => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/playlists/${ albumId }`).then(data => {
        setState(data?.data);
    });
}
