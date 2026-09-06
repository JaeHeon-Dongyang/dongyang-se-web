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
    <ol className="border-heading bg-input grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-px border-t">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="bg-background flex flex-col gap-3.5 px-[clamp(1.125rem,2vw,1.75rem)] pt-[clamp(1.5rem,2.6vw,2.125rem)] pb-[clamp(1.75rem,3vw,2.5rem)]"
        >
          <span className="text-brand text-[clamp(1.75rem,3vw,2.375rem)] leading-none font-normal tracking-[-0.03em] tabular-nums opacity-80">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-heading text-[17px] font-bold tracking-[-0.025em]">
            {step.title}
          </h3>
          <p className="text-body-text text-sm leading-[1.75]">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
