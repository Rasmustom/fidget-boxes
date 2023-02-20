let boxPositions = [];

export function start() {
    getBoxes();
    document.onmousemove = moveCursor;
}

function getBoxes() {
    let boxes = document.querySelectorAll('.box > a');
    let tempPositions = [];

    for (const i of boxes) {
        const rect = i.getBoundingClientRect();
        const x = (rect.left + rect.right) / 2;
        const y = (rect.top + rect.bottom) / 2;

        const boxPosition = { id: i.getAttribute('id'), x: x, y: y };
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
