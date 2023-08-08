import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProfilePicture from "../components/ProfilePicture";
import Block from "../layout/Block";
import LayoutButton from "../components/buttons/LayoutButton";

import cssProfile from "../assets/css/auth/pages/profile.module.css";
import cssContentContainer from "../assets/css/auth/content-container.module.css";
import cssGradientBg from "../assets/css/gradient-bg.module.css";

import imgParty from "../assets/img/icons/musicrecord-white-outline-96.png";
import imgAdd from "../assets/img/icons/adduser-white-outline-96.png";
import axios from "axios";

const Profile = (props) => {
    const [user, setUser] = useState(props.user);

    const { username } = useParams(); 

    useEffect(() => {
        if (props.user && username == null) return;
        
        axios.get(`http://localhost:8000/api/user/${ username }`)
            .then(data => {
                if (data.data.success == false) return;

                setUser(data.data.user);
            });
    }, []);

    let actions = [
        {
            label: "Add",
            defaultImagePath: imgAdd,
            color: "green",
            classes: cssGradientBg["gradient-bg--default"]
        },
        {
            label: "Invite",
            defaultImagePath: imgParty,
            color: "blue",
            classes: cssGradientBg["gradient-bg--default"]
        }
    ]
    const getBlocks = () => {
        return [
            
        ]
    }

    return (
        <div id = { cssProfile["page--profile"] } className = { cssContentContainer["content-container"] }>
            <div id = { cssProfile["container"] }>
                <div id = { cssProfile["header"] }>
                    <ProfilePicture user = { user } 
                        width = "fit-content"
                        height = "100%"
                    />
                    <p id = { cssProfile["header__username"] }>{ user?.username }</p>
                </div>
                <div id = { cssProfile["actions"] }>
                    { actions.map(action => (
                        <LayoutButton 
                            button = { action }
                        />
                    )) }
                </div>
            </div>
            { getBlocks().map(block => {
                return (<Block
                    key = { block.key }
                    block = { block }
                />);
            }) }
        </div>  
    );
}

export default Profile;