const svgLink = 'http://www.w3.org/2000/svg';

let boxPositions = [];

export function start() {
    getBoxes();
    document.onmousemove = moveCursor;
    document.onwheel = moveCursor;
    document.onclick = drawStaticLine;
}

function getBoxes() {
    let boxes = document.querySelectorAll('.box > a');
    let tempPositions = [];

    for (const box of boxes) {
        const rect = box.getBoundingClientRect();
        const x = (rect.left + rect.right) / 2;
        const y = (rect.top + rect.bottom) / 2;

        const boxPosition = { id: box.getAttribute('id'), x: x, y: y };
        tempPositions.push(boxPosition);
    }
    boxPositions = tempPositions;
}

function moveCursor(event) {
    const cursorCoordinates = { x: event.x, y: event.y };
    getBoxes();

    let closestBox = {};
    let distToClosestBox = Number.MAX_SAFE_INTEGER;
    for (const box of boxPositions) {
        const dist = getDistance(box, cursorCoordinates);
        if (dist < distToClosestBox) {
            distToClosestBox = dist;
            closestBox = box;
        }
    }

    drawLine(cursorCoordinates, closestBox);
}

function drawLine(pointA, pointB) {
    const line = document.querySelector('#line');
    line.setAttribute('x1', pointA.x);
    line.setAttribute('y1', pointA.y);
    line.setAttribute('x2', pointB.x);
    line.setAttribute('y2', pointB.y);
}

function getDistance(pointA, pointB) {
    const d1 = Math.pow(pointA.x - pointB.x, 2);
    const d2 = Math.pow(pointA.y - pointB.y, 2);
    return Math.sqrt(d1 + d2);
}

function drawStaticLine(_event) {
    const line = document.querySelector('#line').cloneNode(true);
    const svgContainer = document.querySelector('#static-lines-svg');
    const container = document.createElementNS(svgLink, 'g');

    const linePointCursor = { x: Number(line.getAttribute('x1')), y: Number(line.getAttribute('y1')) };
    const linePointBox = { x: Number(line.getAttribute('x2')), y: Number(line.getAttribute('y2')) };

    const lineLength = Math.round(getDistance(linePointCursor, linePointBox) * 10) / 10;

    // These are needed to account for screen scroll
    const x1 = linePointCursor.x + document.documentElement.scrollLeft;
    const x2 = linePointBox.x + document.documentElement.scrollLeft;
    const y1 = linePointCursor.y + document.documentElement.scrollTop;
    const y2 = linePointBox.y + document.documentElement.scrollTop;
    const xMid = (x1 + x2) / 2;
    const yMid = (y1 + y2) / 2;

    const angle = Math.acos(Math.abs(x1 - x2) / lineLength) * (180 / Math.PI);
    const angleWithSign = Math.sign(x1 - x2) === Math.sign(y1 - y2) ? angle : angle * -1;

    line.setAttribute('id', '');
    line.setAttribute('y1', y1);
    line.setAttribute('y2', y2);
    line.setAttribute('x1', x1);
    line.setAttribute('x2', x2);

    let text = document.createElementNS(svgLink, 'text');
    text.setAttribute('x', xMid);
    text.setAttribute('y', yMid);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('alignment-baseline', 'after-edge');
    text.setAttribute(`transform`, `rotate(${angleWithSign}, ${xMid},${yMid})`);
    text.innerHTML = `Length: ${lineLength}`;

    let circle = document.createElementNS(svgLink, 'circle');
    circle.setAttribute('cx', x1);
    circle.setAttribute('cy', y1);
    circle.setAttribute('r', 3);

    container.appendChild(line);
    container.appendChild(text);
    container.appendChild(circle);
    svgContainer.appendChild(container);
}
