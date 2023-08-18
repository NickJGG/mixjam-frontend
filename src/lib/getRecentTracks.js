import axios from "axios";

export default (setState, limit) => {
    axios.get(`/api/recent/tracks/`, { params: { limit: limit } }).then(data => {
        setState(data.data);
    })
}
