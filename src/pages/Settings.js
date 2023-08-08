import Block from "../layout/Block";

import cssContentContainer from "../assets/css/auth/content-container.module.css";

const Settings = (props) => {
    const getBlocks = () => {
        return [
            
        ]
    }

    return (
        <div id = "page--settings" className = { cssContentContainer["content-container"] }>
            { getBlocks().map(block => {
                return (<Block
                    key = { block.key }
                    block = { block }
                />);
            }) }
        </div>  
    );
}

export default Settings;