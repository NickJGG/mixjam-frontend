import axios from "axios";

export default (setState, artistId) => {
    axios.get(`/api/artists/${ artistId }/albums`).then(data => {
        setState(data?.data);
    });
}
