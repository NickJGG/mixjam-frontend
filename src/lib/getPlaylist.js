import axios from "axios";

export default (setState, albumId) => {
    axios.get(`/api/playlists/${ albumId }`).then(data => {
        setState(data?.data);
    });
}
