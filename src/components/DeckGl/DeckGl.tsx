import React from 'react';
import { StaticMap } from 'react-map-gl';
// @ts-ignore
import DeckGL from '@deck.gl/react';
// @ts-ignore
import {ScreenGridLayer} from '@deck.gl/aggregation-layers';
// @ts-ignore
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
// @ts-ignore
import {isWebGL2} from '@luma.gl/core';

// @ts-ignore
import sampleJSON from '../../common/data/sample.json';
import coordsJSON from '../../common/data/coords.json';

// @ts-ignore
import getGeoData from "../../utils/getGeoData";
import getRandomCoords from "../../utils/getRandomCoords";

// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYm9iYnktbGF0ZWxlYW4iLCJhIjoiY2ticnFqbWh6MjE5djJ5cG80Y29raGljZyJ9.V4TEhPk8-75-MSXMR5K5zg'; // eslint-disable-line

// Source data CSV
const DATA_URL =
    'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/screen-grid/uber-pickup-locations.json'; // eslint-disable-line

const INITIAL_VIEW_STATE = {
    longitude: -73.75,
    latitude: 40.73,
    zoom: 9.6,
    maxZoom: 16,
    pitch: 0,
    bearing: 0
};

const colorRange = [
    // [189, 0, 38, 255],
    // [189, 0, 38, 255],
    // [189, 0, 38, 255],
    // [189, 0, 38, 255],
    // [189, 0, 38, 255],
    // [189, 0, 38, 255],

    [255, 255, 178, 25],
    [254, 217, 118, 85],
    [254, 178, 76, 127],
    [253, 141, 60, 170],
    [240, 59, 32, 212],
    [189, 0, 38, 255]
];

type DeckGlProps = {
    data?: string;
    cellSize?: number;
    gpuAggregation?: boolean;
    aggregation?: string;
    disableGPUAggregation?: () => void;
    mapStyle?: string;
};

const DeckGl: React.FunctionComponent<DeckGlProps> = (props) => {
    // const { features = [] } = sampleJSON;
    // const geoJSON = getGeoData(features);
    // console.log('[zaytsev] geoJSON: ', geoJSON);

    const coords = getRandomCoords(coordsJSON);

    const {
        // data = DATA_URL,
        data = coords,
        cellSize = 10,
        gpuAggregation = true,
        aggregation = 'SUM',
        disableGPUAggregation,
        mapStyle = 'mapbox://styles/mapbox/dark-v9'
    } = props;

    const heatmapLayer = new HeatmapLayer({
        id: 'grid',
        data,
        opacity: 0.8,
        getPosition: (d: any) => [d.lg, d.lt],
        getWeight: (d: any) => {
            const weight = Number(d.v);
            return weight >= 0 ? weight : 0;
        },
        cellSizePixels: cellSize,
        colorRange,
        gpuAggregation,
        aggregation,
        intensity: 1,
        threshold: 0.03,
        radiusPixels: 30,
    });

    const layers = [heatmapLayer];

    const onInitialized = (gl: any) => {
        if (!isWebGL2(gl)) {
            console.warn('GPU aggregation is not supported'); // eslint-disable-line
            if (disableGPUAggregation) {
                disableGPUAggregation();
            }
        }
    };

    return (
        <DeckGL
            layers={layers}
            initialViewState={INITIAL_VIEW_STATE}
            onWebGLInitialized={onInitialized}
            controller={true}
        >
            {/* @ts-ignore */}
            <StaticMap
                reuseMaps
                mapStyle={mapStyle}
                preventStyleDiffing={true}
                mapboxApiAccessToken={MAPBOX_TOKEN}
            />
        </DeckGL>
    );
};

export default DeckGl;