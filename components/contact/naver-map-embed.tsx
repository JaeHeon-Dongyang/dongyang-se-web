"use client";

import Script from "next/script";
import { useRef, useState } from "react";

type NaverMapsGlobal = {
  maps: {
    LatLng: new (lat: number, lng: number) => unknown;
    Map: new (el: HTMLElement, options: { center: unknown; zoom: number }) => unknown;
    Marker: new (options: { position: unknown; map: unknown }) => unknown;
  };
};

declare global {
  interface Window {
    naver?: NaverMapsGlobal;
  }
}

type NaverMapEmbedProps = {
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

export function NaverMapEmbed({ address, location }: NaverMapEmbedProps) {
  const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
  const mapRef = useRef<HTMLDivElement>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  if (!clientId) return null;

  function initializeMap() {
    const { naver } = window;
    if (!naver || !mapRef.current) {
      setLoadFailed(true);
      return;
    }

    const position = new naver.maps.LatLng(location.latitude, location.longitude);
    const map = new naver.maps.Map(mapRef.current, {
      center: position,
      zoom: 16,
    });
    new naver.maps.Marker({ position, map });
    setLoadFailed(false);
  }

  return (
    <div className="border-border relative h-64 w-full overflow-hidden border">
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`}
        strategy="afterInteractive"
        onReady={initializeMap}
        onError={() => setLoadFailed(true)}
      />
      <div
        ref={mapRef}
        role="img"
        aria-label={`지도: ${address}`}
        className="h-full w-full"
      />
      {loadFailed ? (
        <div className="bg-surface text-body-text absolute inset-0 flex items-center justify-center px-6 text-center text-sm leading-relaxed">
          지도를 불러오지 못했습니다. 아래 버튼을 눌러 네이버 지도에서 위치를 확인해
          주세요.
        </div>
      ) : null}
    </div>
  );
}
