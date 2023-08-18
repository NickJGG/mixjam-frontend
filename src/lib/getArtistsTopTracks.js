import axios from "axios";

export default (setState, artistId) => {
    axios.get(`/api/artists/${ artistId }/top`).then(data => {
        setState(data?.data);
    });
}
