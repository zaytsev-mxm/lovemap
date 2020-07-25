import * as React from 'react';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Lovemap.scss';

const Lovemap = () => {
    const mapRef = React.useRef(null);

    React.useEffect(() => {
        const {current: mapEl} = mapRef;

        if (!mapEl) return;

        // const osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const osmUrl = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
        const osmAttribution = `Map data <a target="_blank" href="http://www.openstreetmap.org">OpenStreetMap.org</a>
            contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>`;
        const osmLayer = new Leaflet.TileLayer(osmUrl, {
            maxZoom: 18,
            attribution: osmAttribution
        });

        // @ts-ignore check for mapEl existing added above
        const map = Leaflet.map(mapEl, {
            center: [51.505, -0.09],
            zoom: 13,
            layers: [osmLayer]
        });

        console.log('[zaytsev] map: ', map);
    }, [mapRef]);

    return (
        <div>
            <h1>Lovemap</h1>
            <div ref={mapRef} className="love-map"/>
        </div>
    );
};

export default Lovemap;