export default function Loading() {
  return (
    <div className="container-site py-16 md:py-20" role="status" aria-live="polite">
      <span className="sr-only">페이지를 불러오는 중입니다.</span>
      <div className="animate-pulse space-y-5" aria-hidden="true">
        <div className="bg-surface-muted h-3 w-28" />
        <div className="bg-surface-muted h-10 max-w-lg" />
        <div className="bg-surface-muted h-4 max-w-2xl" />
        <div className="bg-surface-muted h-4 max-w-xl" />
      </div>
    </div>
  );
}
