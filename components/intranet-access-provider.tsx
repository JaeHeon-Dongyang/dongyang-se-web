"use client";

import { createContext, useContext, useEffect, useState } from "react";

const IntranetAccessContext = createContext(false);

export function IntranetAccessProvider({ children }: { children: React.ReactNode }) {
  const [intranet, setIntranet] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    void fetch("/api/intranet", {
      cache: "no-store",
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { intranet?: boolean } | null) => {
        if (data?.intranet) setIntranet(true);
      })
      .catch(() => {
        // 판별 실패 시 사내 전용 메뉴를 숨기는 안전한 기본값을 유지한다.
      });

    return () => controller.abort();
  }, []);

  return (
    <IntranetAccessContext.Provider value={intranet}>
      {children}
    </IntranetAccessContext.Provider>
  );
}

export function useIntranetAccess() {
  return useContext(IntranetAccessContext);
}
