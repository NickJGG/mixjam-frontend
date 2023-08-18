import axios from "axios";

export default (setState, limit) => {
    axios.get(`/api/top/artists/`, { params: { limit: limit } }).then(data => {
        setState(data.data);
    })
}
