import { arcDegree } from '../../config';
import * as d3 from "d3";


const config = {
    deskWidth: 60,
    deskHeight: 36,
    seatWidth: 24,
    seatHeight: 16,
    crossSide: 13
}

export const getDeskPath = (posX, posY, scale = 1, radius = 4) => {
    const width = config.deskWidth * scale
    const height = config.deskHeight * scale
    let x = posX
    let y = posY+config.seatHeight
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

export const getSeatPath = (posX, posY, scale = 1, radius = 4) => {
    const dWidth = config.deskWidth * scale
    const sWidth = config.seatWidth * scale
    const sHeight = config.seatHeight * scale
    let x = posX + dWidth / 2 - sWidth / 2
    let y = posY+config.seatHeight


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
   let x = posX + 10 * scale
   let y = posY + config.deskHeight / 2 - config.crossSide / 2+config.seatHeight

    const crossPath = d3.path();
    crossPath.moveTo(x, y);
    x += config.crossSide
    crossPath.lineTo(x, y + config.crossSide);
    crossPath.moveTo(x, y);
    crossPath.lineTo(x - config.crossSide, y + config.crossSide);

    return crossPath
}

export const getText = (scale) => {

}