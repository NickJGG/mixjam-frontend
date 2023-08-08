import cssFromArray from "utils/cssFromArray";

import Listing from "../components/listings/Listing";

import cssBlock from "../assets/css/auth/block.module.css";
import cssListing from "../assets/css/auth/listings/listing.module.css";
import cssGradientBg from "../assets/css/gradient-bg.module.css";
import PlayableListing from "components/listings/PlayableListing";

const BlockSection = (props) => {
    const getBody = () => {
        if (props.playables != undefined && props.playables.length != 0){
            return props.playables.map(playable => (
                <PlayableListing 
                    key = { `listing-${ playable.name }` }
                    playable = { playable }
                    currentlyPlayingURI = { props.currentlyPlayingURI }
                    currentlyPlayingContextURI = { props.currentlyPlayingContextURI }
                    
                    onAddToQueue = { props.onAddToQueue }
                    onPlay = { props.onPlay }
                    openPopupContainer = { props.openPopupContainer }
                    closePopupContainer = { props.closePopupContainer }
                />
            ))
        }

        if (props.children == null || props.children.length == 0){
            let listings = [];

            for (let i = 0; i < props.numPlaceholders; i++){
                listings.push(
                    <Listing 
                        key = { i }
                        listing = {{
                            classes: cssListing["listing--placeholder"],
                            gradientClasses: cssGradientBg["gradient-bg--default"]
                        }}
                    />
                );
            }

            return listings;
        }

        return props.children;
    }

    return (
        <div className = { cssFromArray([cssBlock["section"], props.classes || ""]) }>
            <div className = { cssBlock["section__body"] }>
                { getBody() }
            </div>
        </div>
    );
}

export default BlockSection;