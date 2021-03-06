import L from 'leaflet';
import LovemapHeatmapLayer from './heatmap-layer';

type LeafletParams = {
    domNode?: HTMLElement | null;
    osmUrl?: string;
    osmAttribution?: string;
};

interface ILeaflet {
    destroy(): void;
}

class Leaflet implements ILeaflet {
    private readonly rootEl: HTMLElement | null;
    private readonly osmUrl: string;
    private readonly osmAttribution: string;
    protected map: L.Map | null;

    static DEFAULTS = {
        // OSM_URL: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';,
        OSM_URL: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
        // OSM_URL: 'http://a.tile.stamen.com/toner/{z}/{x}/{y}.png',
        OSM_ATTRIBUTION: `Map data <a target="_blank" href="http://www.openstreetmap.org">OpenStreetMap.org</a>
            contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>`,
    };

    constructor(params: LeafletParams = {}) {
        this.rootEl = params.domNode || null;
        this.osmUrl = params.osmUrl || Leaflet.DEFAULTS.OSM_URL;
        this.osmAttribution = params.osmAttribution || Leaflet.DEFAULTS.OSM_ATTRIBUTION;

        this.map = null;

        this.init();
    }

    private init() {
        const osmLayer = new L.TileLayer(this.osmUrl, {
            maxZoom: 18,
            attribution: this.osmAttribution
        });

        const heatmapLayerInstance = new LovemapHeatmapLayer();
        const heatmapLayer = heatmapLayerInstance.overlay;

        if (!this.rootEl) return;

        this.map = new L.Map(this.rootEl, {
            center: new L.LatLng(25.6586, -80.3568),
            zoom: 4,
            layers: [osmLayer, heatmapLayer]
        });

        setInterval(() => {
            heatmapLayer.setData(LovemapHeatmapLayer.getRandomData());
        }, 5000);
    }

    destroy() {
        this.map?.remove();
    }
}

export default Leaflet;