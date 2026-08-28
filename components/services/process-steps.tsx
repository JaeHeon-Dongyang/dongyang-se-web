const steps = [
  {
    title: "상담 및 자료 검토",
    description: "건축물 현황과 요청 사항을 파악하고 기존 도면·점검자료를 검토합니다.",
  },
  {
    title: "현장조사",
    description: "실측과 육안조사를 통해 구조 부재의 실제 상태와 손상 여부를 확인합니다.",
  },
  {
    title: "구조해석 및 검토",
    description:
      "조사 결과를 바탕으로 구조해석을 수행하고 안전성을 정량적으로 평가합니다.",
  },
  {
    title: "보고서 및 자문",
    description:
      "검토 결과와 조치 방안을 담은 보고서를 전달하고, 필요 시 후속 자문을 진행합니다.",
  },
] as const;

export function ProcessSteps() {
  return (
    <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title} className="flex flex-col gap-3">
          <span className="text-brand text-sm font-bold tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-heading text-base font-semibold">{step.title}</h3>
          <p className="text-body-text text-sm leading-relaxed text-pretty">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
