import { cn } from "@/lib/utils";

/**
 * 핵심 가치 4종. 시안대로 두 줄로 나누고 각 줄에서 넓은 카드와 좁은 카드를 번갈아 둔다.
 * 01 은 브랜드 그린, 03 은 흰 배경 + 보더, 나머지는 연한 그린 틴트.
 */
type Value = {
  no: string;
  title: string;
  description: string;
  tone: "brand" | "tint" | "surface";
  wide: boolean;
};

const values: Value[] = [
  {
    no: "01",
    title: "Safety · 안전성",
    description:
      "모든 판단의 출발점은 안전입니다. 관련 기준과 현장 조건을 면밀히 검토하고, 작은 위험 요소도 놓치지 않도록 책임 있게 업무를 수행합니다.",
    tone: "brand",
    wide: true,
  },
  {
    no: "02",
    title: "Expertise · 전문성",
    description:
      "구조설계, 시공, 안전진단과 내진 분야의 전문 인력이 지식과 경험을 공유합니다. 복합적인 문제를 한 가지 관점으로 판단하지 않습니다.",
    tone: "tint",
    wide: false,
  },
  {
    no: "03",
    title: "Trust · 신뢰성",
    description:
      "근거가 분명한 검토와 일관된 품질을 통해 신뢰를 쌓습니다. 결과만 전달하지 않고 판단의 기준과 이유를 이해하기 쉽게 설명합니다.",
    tone: "surface",
    wide: false,
  },
  {
    no: "04",
    title: "Communication · 소통",
    description:
      "좋은 엔지니어링은 충분한 소통에서 시작됩니다. 관계자의 요구를 정확히 이해하고, 검토 과정과 주요 판단 사항을 투명하게 공유합니다.",
    tone: "tint",
    wide: true,
  },
];

function ValueCard({ value }: { value: Value }) {
  const onBrand = value.tone === "brand";

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-3 p-[clamp(1.625rem,3vw,2.625rem)]",
        value.wide ? "flex-[1.4_1_22.5rem]" : "flex-[1_1_17.5rem]",
        onBrand && "bg-brand",
        value.tone === "tint" && "bg-[#f1f6f2]",
        value.tone === "surface" && "border-border bg-surface border",
      )}
    >
      <span
        className={cn(
          "text-[11.5px] font-bold tracking-[0.1em] tabular-nums",
          onBrand && "text-white/80",
          value.tone === "tint" && "text-[#4a5049]",
          value.tone === "surface" && "text-body-text",
        )}
      >
        {value.no}
      </span>
      <h3
        className={cn(
          "text-lg leading-[1.34] font-bold tracking-[-0.028em] md:text-[22px]",
          onBrand ? "text-white" : "text-heading",
        )}
      >
        {value.title}
      </h3>
      <p
        className={cn(
          "max-w-[34em] text-[15px] leading-[1.85] text-pretty",
          onBrand && "text-white/80",
          value.tone === "tint" && "text-[#4a5049]",
          value.tone === "surface" && "text-body-text",
        )}
      >
        {value.description}
      </p>
    </div>
  );
}

export function ValuesGrid() {
  return (
    <div className="flex flex-col gap-[clamp(0.75rem,1.4vw,1.125rem)]">
      {[values.slice(0, 2), values.slice(2, 4)].map((row) => (
        <div
          key={row[0].no}
          className="flex flex-wrap gap-[clamp(0.75rem,1.4vw,1.125rem)]"
        >
          {row.map((value) => (
            <ValueCard key={value.no} value={value} />
          ))}
        </div>
      ))}
    </div>
  );
}
