import imgDefault from '../assets/img/icons/account-white-filled-72.png';

import cssProfilePicture from "../assets/css/auth/profile-picture.module.css";

const ProfilePicture = (props) => {
    const getPicture = () => {
        if (props.user?.profile?.picture){
            return props.user.profile.picture;
        } else {
            return imgDefault;
        }
    }

    return (
        <div className = { cssProfilePicture["profile-picture"] } style = {{ '--width': props.width, '--height': props.height }} onClick = { props.onClick }>
            <img src = { getPicture() } />
        </div>
    );
}

export default ProfilePicture;