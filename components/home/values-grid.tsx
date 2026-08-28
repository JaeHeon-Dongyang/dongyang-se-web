const values = [
  {
    title: "안전성",
    description:
      "모든 판단의 기준은 구조적 안전입니다. 타협 없는 검토로 위험을 사전에 차단합니다.",
  },
  {
    title: "전문성",
    description: "구조 전문 엔지니어의 정확한 해석과 축적된 경험을 바탕으로 판단합니다.",
  },
  {
    title: "신뢰성",
    description:
      "근거 있는 결론과 명확한 문서로 고객이 신뢰할 수 있는 결과를 제공합니다.",
  },
  {
    title: "지속적인 소통",
    description: "프로젝트 전 과정에서 진행 상황과 판단 근거를 투명하게 공유합니다.",
  },
];

export function ValuesGrid() {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
      {values.map((value, index) => (
        <div
          key={value.title}
          className="border-border flex flex-col gap-3 border-t pt-5"
        >
          <span className="text-accent-green font-mono text-xs font-medium tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-heading text-xl font-bold">{value.title}</h3>
          <p className="text-body-text text-sm leading-relaxed text-pretty">
            {value.description}
          </p>
        </div>
      ))}
    </div>
  );
}
