"use client";
import React, { useRef } from "react";
import Radar from "radar-sdk-js";
import "radar-sdk-js/dist/radar.css";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import RadarMap from "radar-sdk-js/dist/ui/RadarMap";
import RadarMarker from "radar-sdk-js/dist/ui/RadarMarker";
import AutocompleteUI from "radar-sdk-js/dist/ui/autocomplete";
import { RadarAddress } from "radar-sdk-js/dist/types";

interface MapProps {
  className?: string;
  onAddressChange?: (address: RadarAddress) => void;
  defaultLat?: number;
  defaultLng?: number;
}

const Map = ({
  className,
  onAddressChange,
  defaultLat = 40.7342,
  defaultLng = -73.9911,
}: MapProps) => {
  const radarInitialized = useRef(null);
  const mapRef = useRef<RadarMap | null>(null);
  const markerRef = useRef<RadarMarker | null>(null);
  const autocompleteRef = useRef<AutocompleteUI | null>(null);

  useEffect(() => {
    Radar.initialize(process.env.NEXT_PUBLIC_RADAR_LIVE_PUBLISHABLE_KEY!);

    const map = Radar.ui.map({
      container: "radar-map",
      style: "radar-default-v1",
      zoom: 10,
      center: [defaultLng, defaultLat],
    });
    mapRef.current = map;
    const marker = Radar.ui
      .marker({ text: "Hello, world!" })
      .setLngLat([defaultLng, defaultLat])
      .addTo(map);
    markerRef.current = marker;

    autocompleteRef.current = Radar.ui.autocomplete({
      container: "autocomplete",
      width: "400px",
      placeholder: "Search For Your City Name",
      onSelection: (address: RadarAddress) => {
        const { latitude, longitude } = address;
        onAddressChange && onAddressChange(address);
        markerRef.current?.setLngLat([longitude, latitude]);
        mapRef.current?.flyTo({ center: [longitude, latitude], zoom: 14 });
      },
    });
    return () => {
      autocompleteRef.current?.remove();
    };
  }, []);
  return (
    <div className={cn("w-full h-full absolute", className)} id="map-container">
      <div id="autocomplete" className="w-[400px] p-[10px] text-white " />
      <div className="h-full absolute w-full" id="radar-map" />
    </div>
  );
};
export default Map;
