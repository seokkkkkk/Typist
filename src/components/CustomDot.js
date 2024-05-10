import React from "react";

export function renderCustomDot(cx, cy, key, color, shape, value, length = 8) {
    if (value === null || value === undefined)
        return <span key={`${key}-${Math.random()}`} />;
    switch (shape) {
        case "triangle":
            return (
                <ChartDotTriangle
                    key={`${key}-${Math.random()}`}
                    cx={cx}
                    cy={cy}
                    fill={color}
                    length={length}
                />
            );
        case "square":
            return (
                <ChartDotSquare
                    key={`${key}-${Math.random()}`}
                    cx={cx}
                    cy={cy}
                    fill={color}
                    length={length}
                />
            );
        default:
            return <span key={`${key}-${Math.random()}`} />;
    }
}

function movePointToNewCoordinates(point, center, centerOld) {
    const x = point[0];
    const y = point[1];
    const xCenter = center[0];
    const yCenter = center[1];
    const xCenterOld = centerOld[0];
    const yCenterOld = centerOld[1];
    return [x - xCenter + xCenterOld, y - yCenter + yCenterOld];
}

function rotatePoint(point, angle) {
    const x = point[0];
    const y = point[1];

    const xNew = x * Math.cos(angle) - y * Math.sin(angle);
    const yNew = x * Math.sin(angle) + y * Math.cos(angle);

    return [xNew, yNew];
}

function calcTrianglePoints(cx, cy, sideLength, angle = 0) {
    const r = (Math.sqrt(3) / 3) * sideLength; // The radius of the circumscribed circle
    const h = (Math.sqrt(3) / 2) * sideLength; // The height of median

    const angleInRadian = (Math.PI * angle) / 180;

    const pointCenter = [cx, cy];
    const pointCenterNew = rotatePoint(pointCenter, angleInRadian);

    // 1st point
    const point1 = movePointToNewCoordinates(
        rotatePoint([cx, cy - r], angleInRadian),
        pointCenterNew,
        pointCenter
    );
    const x1 = point1[0];
    const y1 = point1[1];

    // 2nd point
    const point2 = movePointToNewCoordinates(
        rotatePoint([cx - sideLength / 2, cy + (h - r)], angleInRadian),
        pointCenterNew,
        pointCenter
    );
    const x2 = point2[0];
    const y2 = point2[1];

    // 3rd point
    const point3 = movePointToNewCoordinates(
        rotatePoint([cx + sideLength / 2, cy + (h - r)], angleInRadian),
        pointCenterNew,
        pointCenter
    );
    const x3 = point3[0];
    const y3 = point3[1];

    return `${x1},${y1},${x2},${y2},${x3},${y3}`;
}

function calcSquarePoints(cx, cy, sideLength) {
    const xLeft = cx - sideLength / 2;
    const xRight = cx + sideLength / 2;
    const yTop = cy + sideLength / 2;
    const yBottom = cy - sideLength / 2;

    return `${xLeft},${yTop},${xRight},${yTop},${xRight},${yBottom},${xLeft},${yBottom}`;
}

export function ChartDotTriangle({ cx, cy, fill, length }) {
    length = length || 6;
    const angle = 0;
    return (
        <polygon
            width={length}
            height={length}
            cx={cx}
            cy={cy}
            fill={fill}
            points={calcTrianglePoints(cx, cy, length, angle)}
        />
    );
}

export function ChartDotSquare({ cx, cy, fill, length }) {
    length = length || 4;
    return (
        <polygon
            width={length}
            height={length}
            cx={cx}
            cy={cy}
            fill={fill}
            points={calcSquarePoints(cx, cy, length)}
        />
    );
}
