import "server-only";
import { geoMercator, geoPath, type GeoProjection } from "d3-geo";
import type { Feature, FeatureCollection, Geometry, MultiPoint, MultiPolygon } from "geojson";
import { feature, merge } from "topojson-client";
import type { GeometryCollection, MultiPolygon as TopoMultiPolygon, Polygon as TopoPolygon, Topology } from "topojson-specification";
import world from "world-atlas/countries-50m.json";
import { africanCountries, unnumberedAfrica } from "@/config/africa-countries";

// Build-time geography for the Africa maps (Natural Earth 1:50m via world-atlas).

type CountryProps = { name: string };
const topology = world as unknown as Topology<{ countries: GeometryCollection<CountryProps> }>;
const collection = topology.objects.countries;

const isAfrican = (g: { id?: string | number; properties?: { name?: string } }) =>
  (g.id !== undefined && String(g.id) in africanCountries) || (g.id === undefined && g.properties?.name !== undefined && g.properties.name in unnumberedAfrica);

const africanGeometries = collection.geometries.filter(isAfrican);

const africanCollection: GeometryCollection<CountryProps> = { type: "GeometryCollection", geometries: africanGeometries };

export const africaCountries = (feature(topology, africanCollection) as FeatureCollection<Geometry, CountryProps>).features;

/** The whole continent (plus islands) as one outline. */
export const africaOutline: Feature<MultiPolygon> = {
  type: "Feature",
  properties: {},
  geometry: merge(topology, africanGeometries as Array<TopoPolygon | TopoMultiPolygon>),
};

// The frame both maps are fitted to: the continent plus Cabo Verde, Seychelles and Mauritius.
// Remote islands outside it (e.g. South Africa's Prince Edward Islands) fall outside the drawing.
const extent: MultiPoint = { type: "MultiPoint", coordinates: [[-26, 38], [58, 38], [58, -36], [-26, -36]] };

/** A Mercator projection fitted to Africa at the given width; the height follows the continent's shape. */
export function africaProjection(width: number): { projection: GeoProjection; path: ReturnType<typeof geoPath>; width: number; height: number } {
  const projection = geoMercator().fitWidth(width, extent);
  const path = geoPath(projection).digits(1);
  const [[, y0], [, y1]] = path.bounds(extent);
  return { projection, path, width, height: Math.ceil(y1 - y0) };
}

/** Flag code and display name for a Natural Earth feature. */
export function countryInfo(f: Feature<Geometry, CountryProps>) {
  if (f.id !== undefined) return africanCountries[String(f.id)];
  return unnumberedAfrica[f.properties.name];
}
