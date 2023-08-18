import axios from "axios";

export default (setState, limit) => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/top/artists/`, { params: { limit: limit } }).then(data => {
        setState(data.data);
    })
}
