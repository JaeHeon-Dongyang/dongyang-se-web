/**
 * 조건부 className 결합 유틸.
 * 의존성을 늘리지 않기 위해 clsx 대신 최소 구현을 사용한다.
 */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}
