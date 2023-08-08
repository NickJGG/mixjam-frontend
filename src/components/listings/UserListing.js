import ProfilePicture from "components/ProfilePicture";
import Listing from "./Listing";

import cssUserListing from "../../assets/css/auth/listings/user-listing.module.css";

const UserListing = (props) => {
    const getListingData = () => {
        return {
            classes: cssUserListing["listing--user"],
            cssModifier: cssUserListing
        };
    }

    return (
        <Listing
            listing = { getListingData() }
        >
            <ProfilePicture 
                user = { props.user }

                width = "4rem"
                height = "4rem"
            />
        </Listing>
    );
}

export default UserListing;