import axios from "axios";

export default (setState, limit) => {
    axios.get(`http://localhost:8000/api/top/artists/`, { params: { limit: limit } }).then(data => {
        setState(data.data);
    })
}
