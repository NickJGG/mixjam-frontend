import { useContext } from "react";

import PageContext from "contexts/PageContext";

import cssFromArray from "utils/cssFromArray";

import Listing from "components/Listing/Listing";
import PlayableListing from "components/Listing/PlayableListing/PlayableListing";

import BlockCSS from "./Block.module.css";
import ListingCSS from "components/Listing/Listing.module.css";
import cssGradientBg from "assets/css/gradient-bg.module.css";

const BlockSection = (props) => {
    const getClasses = () => {
        let classes = [
            BlockCSS["section"]
        ].concat(props.classes || []);

        if (props.vertical) classes.push(BlockCSS["section--vertical"]);
        if (props.columns) classes.push(BlockCSS[`section--col-${props.columns}`]);

        return cssFromArray(classes);
    }

    const getBody = () => {
        if (props.playables != undefined && props.playables.length != 0){
            return props.playables?.map(playable => (
                <PlayableListing 
                    key = { `listing-${ playable.name }` }
                    playable = { playable }
                    contextUri = { props.contextUri }
                    vertical = { props.vertical }
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
                            classes: cssFromArray([
                                ListingCSS["listing--placeholder"],
                                props.vertical ? ListingCSS["listing--vertical"] : "",
                            ]),
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
        <div className = { getClasses() }>
            <div className = { BlockCSS["section__body"] }>
                { getBody() }
            </div>
        </div>
    );
}

export default BlockSection;