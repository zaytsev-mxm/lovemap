import { getRandomInt } from './number-utils';

type CoordsItem = {
    lt: number;
    lg: number;
    v: string;
};

const getRandomCoords = (coords: CoordsItem[]): CoordsItem[] => {
    return coords.map(coords => {
        const { lt, lg, v: vInit } = coords;
        const vNum = Number(vInit);
        const randomDiff = getRandomInt(10, 100);
        const numV = Math.random() > 0.5 ? vNum + randomDiff : vNum - randomDiff;
        const v = numV >= 0 ? String(numV) : '0';

        return { lt, lg, v };
    });
};

export default getRandomCoords;