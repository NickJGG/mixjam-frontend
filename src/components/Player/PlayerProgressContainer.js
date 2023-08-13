import { useEffect, useRef, useState } from "react";

import PlayerCSS from "./Player.module.css";
import cssFromArray from "utils/cssFromArray";

const PlayerProgressContainer = (props) => {
    const [pos, setPos] = useState(0);
    const [size, setSize] = useState(0);

    const refPos = useRef(0);
    const refSize = useRef(0);

    const getClasses = () => {
        let classes = [
            PlayerCSS["progress-container"],
        ].concat(props.classes || []);

        if (props.row) classes.push(PlayerCSS["progress-container--row"]);
        else classes.push(PlayerCSS["progress-container--column"]);

        return cssFromArray(classes);
    }

    const onProgressDown = (e) => {
        e.preventDefault();
        e.stopPropagation();

        var clientPos = props.row ? e.nativeEvent.clientX : e.nativeEvent.clientY,
            offsetPos = props.row ? e.nativeEvent.offsetX : -(e.nativeEvent.target.clientHeight - e.nativeEvent.offsetY),
            progressSize = props.row ? e.target.offsetWidth : e.target.offsetHeight;
        
        if (e.nativeEvent.target.className == 'progress-thumb'){
            if (props.row){
                progressSize = e.nativeEvent.target.offsetParent.offsetParent.offsetWidth;
                offsetPos = e.nativeEvent.target.offsetParent.offsetWidth;
            } else{
                progressSize = e.nativeEvent.target.offsetParent.offsetParent.offsetHeight;
                offsetPos = -e.nativeEvent.target.offsetParent.offsetHeight;
            }
        } else if (e.nativeEvent.target.classList.contains('progress-complete')){
            progressSize = props.row ? e.nativeEvent.target.offsetParent.offsetWidth : e.nativeEvent.target.offsetParent.offsetHeight;
        }

        var elementPos = clientPos - offsetPos;

        refPos.current = elementPos;
        refSize.current = progressSize;

        setPos(elementPos);
        setSize(progressSize);

        document.addEventListener('mousemove', updatePercentage);
        document.addEventListener('mouseup', onProgressUp);
    }
    const onProgressUp = (e) => {
        updatePercentage(e, true);

        document.removeEventListener('mousemove', updatePercentage);
        document.removeEventListener('mouseup', onProgressUp);

        e.preventDefault();
    }

    const updatePercentage = (e, mouseUp = false) => {
        let tempPos = props.row ? e.clientX : e.clientY;
        let diff = props.row ? tempPos - refPos.current : refPos.current - tempPos;

        if (diff < 0)
            diff = 0;
        else if (diff > refSize.current)
            diff = refSize.current;

        let percentage = diff / refSize.current || 0;

        props.onPercentageUpdate(Math.ceil(percentage * 100), mouseUp);
    }

    return (
        <div className = { getClasses() } onMouseDown = { onProgressDown }>
            <div className = { PlayerCSS["progress-container__incomplete"] }></div>
            <div className = { PlayerCSS["progress-container__complete"] } style = {{ '--progress': props.percentage + '%' }}>
                <div className = { PlayerCSS["progress-container__thumb"] }></div>
            </div>
        </div>
    );
}

export default PlayerProgressContainer;
