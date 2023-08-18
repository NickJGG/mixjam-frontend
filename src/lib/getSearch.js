import axios from "axios";

export default (types, limit, query) => {
    axios.get(`/api/search/`, { params: { limit: limit, query: query } }).then(data => {
        types.forEach(type => {
            console.log(type);
            console.log(type.name);
            type.setState(data.data[type["name"].toLowerCase()]); 
        });
    })
}