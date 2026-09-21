import "server-only";
import { geoMercator, geoPath, type GeoProjection } from "d3-geo";
import type { Feature, FeatureCollection, Geometry, MultiPolygon } from "geojson";
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

/** A Mercator projection fitted to Africa at the given size, with its path generator. */
export function africaProjection(width: number, height: number): { projection: GeoProjection; path: ReturnType<typeof geoPath> } {
  const projection = geoMercator().fitSize([width, height], { type: "FeatureCollection", features: africaCountries });
  return { projection, path: geoPath(projection).digits(1) };
}

/** Flag code and display name for a Natural Earth feature. */
export function countryInfo(f: Feature<Geometry, CountryProps>) {
  if (f.id !== undefined) return africanCountries[String(f.id)];
  return unnumberedAfrica[f.properties.name];
}
