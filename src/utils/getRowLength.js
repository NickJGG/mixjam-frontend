import BlockCSS from "layout/Auth/Block/Block.module.css";

const getRowLength = () => {
    let grid = document.getElementsByClassName(BlockCSS["section__body"])[0];

    if (grid == null)
        return 6;

    let gridComputedStyle = window.getComputedStyle(grid);
    let rowLength = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;
    
    if (rowLength < 6)
        rowLength = 6;
    
    return rowLength;
}

export default getRowLength;
