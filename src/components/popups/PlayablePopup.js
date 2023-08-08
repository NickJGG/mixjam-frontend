import { useEffect } from "react";

import PopupElement from "./PopupElement";
import LayoutButton from "components/buttons/LayoutButton";

import cssPlayablePopup from "../../assets/css/auth/popup-elements/playable-popup.module.css";

const PlayablePopup = (props) => {
    useEffect(() => {
        
    }, []);

    const getTitle = () => {
        return props.playable.name;
    }

    const getHeaderImage = () => {
        switch (props.playable.type) {
            case "artist":
                return props.artist?.images[0].url;
            default:
                break;
        }
    }

    return (
        <PopupElement
            header = {(
                <div className = { cssPlayablePopup["popup__element__header"] }>
                    <div className = { cssPlayablePopup["popup__element__header__image"] }>
                        <img src = { props.image } />
                    </div>
                    <div className = { cssPlayablePopup["popup__element__header__details"] }>
                        <p className = { cssPlayablePopup["popup__element__header__details__name"] }>{ props.title }</p>
                        <div className = { cssPlayablePopup["popup__element__header__details__actions"] }>
                            <LayoutButton 
                                button = {{
                                    label: "Follow",
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
            body = { props.children }

            closePopupContainer = { props.closePopupContainer }
        />
    );
}

export default PlayablePopup;