"use client";

import Script from "next/script";
import { useRef } from "react";

/** 네이버 지도 JS SDK 로 로드되는 전역 객체. 타입 패키지 없이 최소 형태만 선언. */
type NaverMapsGlobal = {
  maps: {
    LatLng: new (lat: number, lng: number) => unknown;
    Map: new (el: HTMLElement, options: { center: unknown; zoom: number }) => unknown;
    Marker: new (options: { position: unknown; map: unknown }) => unknown;
    Service: {
      geocode: (
        options: { query: string },
        callback: (
          status: string,
          response: { v2: { addresses: Array<{ x: string; y: string }> } },
        ) => void,
      ) => void;
      Status: { OK: string };
    };
  };
};

declare global {
  interface Window {
    naver?: NaverMapsGlobal;
  }
}

/**
 * 네이버 지도 임베드. `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` 미설정 시 아무것도 렌더링하지
 * 않는다 — 주소 링크(ContactInfo)만으로도 위치 확인이 되어야 한다는 요건(AGENTS.md) 유지.
 */
export function NaverMapEmbed({ address }: { address: string }) {
  const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
  const mapRef = useRef<HTMLDivElement>(null);

  if (!clientId) return null;

  function initMap() {
    const { naver } = window;
    if (!naver || !mapRef.current) return;

    naver.maps.Service.geocode({ query: address }, (status, response) => {
      if (status !== naver.maps.Service.Status.OK) return;
      const result = response.v2.addresses[0];
      if (!result || !mapRef.current) return;

      const position = new naver.maps.LatLng(Number(result.y), Number(result.x));
      const map = new naver.maps.Map(mapRef.current, { center: position, zoom: 16 });
      new naver.maps.Marker({ position, map });
    });
  }

  return (
    <>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}&submodules=geocoder`}
        strategy="afterInteractive"
        onReady={initMap}
      />
      <div
        ref={mapRef}
        role="img"
        aria-label={`지도: ${address}`}
        className="border-border h-64 w-full overflow-hidden rounded-2xl border"
      />
    </>
  );
}
