import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-label text-primary">404</p>
      <h1 className="text-h1 mt-3">페이지를 찾을 수 없습니다</h1>
      <p className="text-body mt-4">
        요청하신 주소가 변경되었거나 삭제되었을 수 있습니다.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button href="/" size="lg">
          홈으로
        </Button>
        <Button href="/contact" size="lg" variant="secondary">
          문의하기
        </Button>
      </div>
    </Container>
  );
}
