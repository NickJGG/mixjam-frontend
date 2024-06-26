import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, Navigate } from "react-router-dom";

const Callback = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        let code = searchParams.get('code');
        let accessToken = searchParams.get('access_token');
        let refreshToken = searchParams.get('refresh_token');

        axios.post(`${process.env.REACT_APP_BASE_URL}/api/connect/`, {
            code: code,
            accessToken: accessToken,
            refreshToken: refreshToken
        })
        .then(data => {
            console.log(data);
            
            setRedirect(true);

            if (data.data.success)
                props.setUser(prevUser => ({
                    ...prevUser,
                    ...data.data.user
                }));
        });
    }, []);

    if (redirect) return <Navigate to = "/home/" />

    return (
        <div></div>
    );
}

export default Callback;
