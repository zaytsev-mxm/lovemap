import * as React from 'react';
import 'leaflet/dist/leaflet.css';
import Leaflet from '../../common/leaflet/leaflet';
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

    return (
        <div>
            <h1>Lovemap</h1>
            <div ref={mapRef} className="love-map"/>
        </div>
    );
};

export default Lovemap;