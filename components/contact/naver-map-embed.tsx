"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

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
    naverMapInitCallback?: () => void;
  }
}

/** 지도 SDK 의 `callback=` 파라미터가 호출할 전역 함수명 (인스턴스 무관 고정값). */
const CALLBACK_NAME = "naverMapInitCallback";

/**
 * 네이버 지도 임베드. `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` 미설정 시 아무것도 렌더링하지
 * 않는다 — 주소 링크(ContactInfo)만으로도 위치 확인이 되어야 한다는 요건(AGENTS.md) 유지.
 *
 * `submodules=geocoder` 는 메인 스크립트 실행 후 비동기로 추가 로드되므로, `<Script onReady>`
 * (메인 스크립트 onload) 시점엔 아직 `naver.maps.Service` 가 없을 수 있다(레이스 컨디션).
 * SDK 가 서브모듈까지 전부 로드된 뒤 호출해 주는 `callback=` 쿼리파라미터를 대신 쓴다.
 */
export function NaverMapEmbed({ address }: { address: string }) {
  const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!clientId) return;

    window[CALLBACK_NAME] = () => {
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
    };

    return () => {
      delete window[CALLBACK_NAME];
    };
  }, [clientId, address]);

  if (!clientId) return null;

  return (
    <>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}&submodules=geocoder&callback=${CALLBACK_NAME}`}
        strategy="afterInteractive"
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
