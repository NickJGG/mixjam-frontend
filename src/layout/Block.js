import BlockSection from "./BlockSection";

import cssFromArray from "utils/cssFromArray";

import cssBlock from "../assets/css/auth/block.module.css";

const Block = (props) => {
    return (
        <div className = { cssFromArray([cssBlock["block"], props.classes ? props.classes : ""]) }>
            <p className = { cssBlock.block__label }>{ props.label }</p>
            <div className = { cssBlock.block__body }>
                { props.children }
            </div>
        </div>
    );
}

export default Block;