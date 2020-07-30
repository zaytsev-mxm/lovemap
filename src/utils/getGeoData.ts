type ListItem = {
    properties: {
        geoid: string; // "39.467|-78.0241",
        total?: number, // 327
        new?: number; // 7
    }
}

type GeoDataItem = {
    lat: number;
    lng: number;
    count: number;
};

const getGeoData = (list: ListItem[]): GeoDataItem[] => {
    return list.map((listItem: ListItem) => {
        const { properties } = listItem;
        const { total: count = 0, geoid = '' } = properties;
        const [latStr = '', lngStr = ''] = geoid.split('|');
        const lat = Number(latStr);
        const lng = Number(lngStr);

        return { lat, lng, count };
    });
};

export default getGeoData;