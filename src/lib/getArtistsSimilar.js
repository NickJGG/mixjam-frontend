import axios from "axios";

export default (setState, artistId) => {
    axios.get(`/api/artists/${ artistId }/similar`).then(data => {
        setState(data?.data);
    });
}
