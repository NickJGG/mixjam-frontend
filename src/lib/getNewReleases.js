import axios from "axios";

export default (setState, limit) => {
    axios.get(`/api/releases/`, { params: { limit: limit } }).then(data => {
        setState(data.data);
    })
}
