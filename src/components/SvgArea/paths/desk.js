import { arcDegree, sizesConfig } from '../../config';
import * as d3 from "d3";

export const getDeskPath = (scale = 1, radius = 4) => {
    const width = sizesConfig.deskWidth * scale
    const height = sizesConfig.deskHeight * scale
    let x = 0
    let y = sizesConfig.seatHeight
    let deskPath = d3.path();
    x += radius
    y += radius
    deskPath.arc(x, y, radius, arcDegree.d180, arcDegree.d270);
    y -= radius
    x += width - radius * 2
    deskPath.lineTo(x, y);
    y += radius
    deskPath.arc(x, y, radius, arcDegree.d270, arcDegree.d0);
    x += radius
    y += height - radius * 2
    deskPath.lineTo(x, y);
    x -= radius
    deskPath.arc(x, y, radius, arcDegree.d0, arcDegree.d90);
    x -= width - radius * 2
    y += radius
    deskPath.lineTo(x, y);
    y -= radius
    deskPath.arc(x, y, radius, arcDegree.d90, arcDegree.d180);
    x -= radius
    y -= height - radius * 2
    deskPath.lineTo(x, y);
    return deskPath
}

export const getSeatPath = (scale = 1, radius = 4) => {
    const dWidth = sizesConfig.deskWidth * scale
    const sWidth = sizesConfig.seatWidth * scale
    const sHeight = sizesConfig.seatHeight * scale
    let x = dWidth / 2 - sWidth / 2
    let y = sizesConfig.seatHeight


    const seatPath = d3.path();

    seatPath.moveTo(x, y);
    y -= sHeight - radius * 2
    seatPath.lineTo(x, y);
    x += radius
    seatPath.arc(x, y, radius, arcDegree.d180, arcDegree.d270);
    y -= radius
    x += sWidth - radius * 2
    seatPath.lineTo(x, y);
    y += radius
    seatPath.arc(x, y, radius, arcDegree.d270, arcDegree.d0);
    y += sHeight - radius * 2
    x += radius
    seatPath.lineTo(x, y);

    return seatPath
}

export const getCrossPath = (posX, posY, scale) => {
    console.log(`Desk coord: x:${posX} y:${posY}`)
    let x = posX + 10 * scale
    let y = posY + sizesConfig.deskHeight / 2 - sizesConfig.crossSide / 2+sizesConfig.seatHeight
    console.log(`Cross coord: x:${x} y:${y}`)

    const crossPath = d3.path();
    crossPath.moveTo(x, y);
    x += sizesConfig.crossSide
    crossPath.lineTo(x, y + sizesConfig.crossSide);
    crossPath.moveTo(x, y);
    crossPath.lineTo(x - sizesConfig.crossSide, y + sizesConfig.crossSide);

    return crossPath
}

export const getText = (scale) => {

}