import React from 'react';
import { StaticMap } from 'react-map-gl';
// @ts-ignore
import DeckGL from '@deck.gl/react';
// @ts-ignore
import {ScreenGridLayer} from '@deck.gl/aggregation-layers';
// @ts-ignore
import {isWebGL2} from '@luma.gl/core';

import sampleJSON from '../../common/data/sample.json';
import getGeoData from "../../utils/getGeoData";

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
    [189, 0, 38, 255],
    [189, 0, 38, 255],
    [189, 0, 38, 255],
    [189, 0, 38, 255],
    [189, 0, 38, 255],
    [189, 0, 38, 255],

    // [255, 255, 178, 25],
    // [254, 217, 118, 85],
    // [254, 178, 76, 127],
    // [253, 141, 60, 170],
    // [240, 59, 32, 212],
    // [189, 0, 38, 255]
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
    const { features = [] } = sampleJSON;
    const geoJSON = getGeoData(features);
    console.log('[zaytsev] geoJSON: ', geoJSON);
    const {
        // data = DATA_URL,
        data = geoJSON,
        cellSize = 10,
        gpuAggregation = true,
        aggregation = 'SUM',
        disableGPUAggregation,
        mapStyle = 'mapbox://styles/mapbox/light-v8'
    } = props;

    const layers = [
        new ScreenGridLayer({
            id: 'grid',
            data,
            opacity: 0.8,
            getPosition: (d: any) => [d.lng, d.lat],
            getWeight: (d: any) => d.count,
            cellSizePixels: cellSize,
            colorRange,
            gpuAggregation,
            aggregation
        })
    ];

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