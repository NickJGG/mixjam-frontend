import PopupUserListCSS from "./PopupUserList.module.css";

const PopupUserList = (props) => {
    return (
        <div className = { PopupUserListCSS["popup__body"] }>
            { props.children }
        </div>
    );
}

export default PopupUserList;
