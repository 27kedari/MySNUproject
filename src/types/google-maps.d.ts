
declare global {
  interface Window {
    google: typeof google;
    initMap?: () => void;
  }

  namespace google {
    namespace maps {
      class Map {
        constructor(mapDiv: Element | null, opts?: MapOptions);
        setCenter(latLng: LatLng | LatLngLiteral): void;
        setZoom(zoom: number): void;
        getZoom(): number | undefined;
      }

      class Marker {
        constructor(opts?: MarkerOptions);
        setMap(map: Map | null): void;
        addListener(eventName: string, handler: () => void): void;
      }

      class InfoWindow {
        constructor(opts?: InfoWindowOptions);
        open(map: Map, anchor?: Marker): void;
        close(): void;
      }

      class Size {
        constructor(width: number, height: number);
      }

      interface MapOptions {
        center?: LatLng | LatLngLiteral;
        zoom?: number;
        styles?: any[];
      }

      interface MarkerOptions {
        position?: LatLng | LatLngLiteral;
        map?: Map;
        title?: string;
        icon?: string | { url: string; scaledSize: Size };
      }

      interface InfoWindowOptions {
        content?: string;
      }

      interface LatLng {
        lat(): number;
        lng(): number;
      }

      interface LatLngLiteral {
        lat: number;
        lng: number;
      }
    }
  }
}

export {};
