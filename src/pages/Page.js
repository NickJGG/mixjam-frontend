import cssFromArray from "utils/cssFromArray";

import LayoutButton from "components/LayoutButton/LayoutButton";

import PageCSS from "./Page.module.css";

const Page = (props) => {
    const getClasses = () => {
        let classes = [
            PageCSS["content-container"]
        ];

        if (!props.user?.profile?.authorized)
            classes.push(PageCSS["content-container--error"]);
        
        return cssFromArray(classes);
    }

    return (
        <div id = { `page-${props.key}` } className = { getClasses() }>
            {
                (props.user?.profile?.authorized == undefined || props.user?.profile?.authorized)
                ? props.children
                : <>
                    <div className = { PageCSS["error__message"] }>
                        You are not connected to Spotify.
                    </div>
                    <LayoutButton
                        label = "Connect"
                        default = { true }
                        url = { `https://accounts.spotify.com/authorize?response_type=code&client_id=e6a99e3eb8a348f9a4b03d7b106ce150&scope=user-library-modify+user-follow-read+streaming+app-remote-control+user-modify-playback-state+user-read-currently-playing+playlist-read-private+playlist-read-collaborative+user-read-playback-state+user-read-recently-played+user-top-read+user-library-read&redirect_uri=https%3A%2F%2F${window.location.hostname}%2Fcallback%2F&state=null` }
                    />
                </>
            }
        </div>
    );
}

export default Page;
