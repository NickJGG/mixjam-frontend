import Listing from "./Listing";

const ActivityListing = (props) => {
    const getListingData = () => {
        return props.activity;
    }

    return (
        <Listing
            listing = { getListingData() }
        >

        </Listing>
    );
}

export default ActivityListing;