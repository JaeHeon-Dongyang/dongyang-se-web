"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO(M4): 에러 추적 서비스로 전송
    console.error(error);
  }, [error]);

  return (
    <Container className="py-24 text-center">
      <h1 className="text-h1">문제가 발생했습니다</h1>
      <p className="text-body mt-4">
        일시적인 오류일 수 있습니다. 잠시 후 다시 시도해 주세요.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button size="lg" onClick={reset}>
          다시 시도
        </Button>
        <Button href="/" size="lg" variant="secondary">
          홈으로
        </Button>
      </div>
    </Container>
  );
}
