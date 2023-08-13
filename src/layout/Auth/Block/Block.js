import cssFromArray from "utils/cssFromArray";

import BlockCSS from "./Block.module.css";

const Block = (props) => {
    return (
        <div className = { cssFromArray([BlockCSS["block"], props.classes ? props.classes : ""]) }>
            <p className = { BlockCSS["block__label"] }>{ props.label }</p>
            <div className = { BlockCSS["block__body"] }>
                { props.children }
            </div>
        </div>
    );
}

export default Block;
