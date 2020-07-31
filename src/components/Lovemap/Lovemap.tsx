import * as React from 'react';
import 'leaflet/dist/leaflet.css';
import Leaflet from '../../common/leaflet/leaflet';
import DeckGl from '../DeckGl/DeckGl';

import getRandomCoords from '../../utils/getRandomCoords';
import coordsJSON from '../../common/data/coords.json';

import './Lovemap.scss';

const Lovemap = () => {
    const mapRef = React.useRef(null);

    const [data, setData] = React.useState(getRandomCoords(coordsJSON));

    React.useEffect(() => {
        const {current: mapEl} = mapRef;
        let leafletInstance: Leaflet;

        if (mapEl) {
            leafletInstance = new Leaflet({ domNode: mapEl });
            console.log('[zaytsev] leafletInstance: ', leafletInstance);
        }

        return () => {
            leafletInstance.destroy();
        };
    }, [mapRef]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setData(getRandomCoords(coordsJSON));
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, [data, setData]);

    const renderLeaflet = () => {
        return <div ref={mapRef} className="love-map"/>;
    };

    return (
        <div>
            <h1>Lovemap</h1>
            {/* @ts-ignore */}
            <DeckGl data={data} />
        </div>
    );
};

export default Lovemap;