import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Callback = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        let code = searchParams.get('code');
        let accessToken = searchParams.get('access_token');
        let refreshToken = searchParams.get('refresh_token');

        axios.post('http://localhost:8000/api/connect/', {
            code: code,
            accessToken: accessToken,
            refreshToken: refreshToken
        })
        .then(data => {
            console.log(data);
        });
    }, []);

    return (
        <div></div>
    );
}

export default Callback;