let boxPositions = [];

export function start() {
    getBoxes();
    document.onmousemove = moveCursor;
    document.onwheel = moveCursor;
    document.onclick = addStaticLine;
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

function addStaticLine(_event) {
    const line = document.querySelector('#line').cloneNode(true);
    const container = document.querySelector('#static-lines-svg');

    const linePointA = { x: Number(line.getAttribute('x1')), y: Number(line.getAttribute('y1')) };
    const linePointB = { x: Number(line.getAttribute('x2')), y: Number(line.getAttribute('y2')) };

    const lineLength = Math.round(getDistance(linePointA, linePointB) * 10) / 10;

    // These are needed to account for screen scroll
    const x1 = linePointA.x + document.documentElement.scrollLeft;
    const x2 = linePointB.x + document.documentElement.scrollLeft;
    const y1 = linePointA.y + document.documentElement.scrollTop;
    const y2 = linePointB.y + document.documentElement.scrollTop;
    const xMid = (x1 + x2) / 2;
    const yMid = (y1 + y2) / 2;

    const angle = Math.acos(Math.abs(x1 - x2) / lineLength) * (180 / Math.PI);
    const angleWithSign = Math.sign(x1 - x2) === Math.sign(y1 - y2) ? angle : angle * -1;

    line.setAttribute('id', '');
    line.setAttribute('y1', y1);
    line.setAttribute('y2', y2);
    line.setAttribute('x1', x1);
    line.setAttribute('x2', x2);

    let newText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    newText.setAttribute('x', xMid);
    newText.setAttribute('y', yMid);
    newText.setAttribute('text-anchor', 'middle');
    newText.setAttribute('alignment-baseline', 'after-edge');
    newText.setAttribute(`transform`, `rotate(${angleWithSign}, ${xMid},${yMid})`);
    newText.innerHTML = `Length: ${lineLength}`;

    container.appendChild(line);
    container.appendChild(newText);
}
