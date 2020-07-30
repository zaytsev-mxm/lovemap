import * as React from 'react';
import 'leaflet/dist/leaflet.css';
import Leaflet from '../../common/leaflet/leaflet';
import DeckGl from '../DeckGl/DeckGl';

import './Lovemap.scss';

const Lovemap = () => {
    const mapRef = React.useRef(null);

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

    const renderLeaflet = () => {
        return <div ref={mapRef} className="love-map"/>;
    };

    return (
        <div>
            <h1>Lovemap</h1>
            <DeckGl />
        </div>
    );
};

export default Lovemap;