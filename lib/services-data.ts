import { Hammer, PencilRuler, ShieldCheck, Wrench } from "lucide-react";

export type ServiceGroup = {
  slug: string;
  icon: typeof PencilRuler;
  title: string;
  shortDescription: string;
  intro: string;
  items: string[];
  situations: string[];
  scope: string;
};

export const serviceGroups: ServiceGroup[] = [
  {
    slug: "design",
    icon: PencilRuler,
    title: "구조설계",
    shortDescription: "안전성과 시공성을 함께 고려한 합리적인 구조설계를 제공합니다.",
    intro:
      "건축물의 용도와 규모, 시공 여건을 종합적으로 검토하여 안전하면서도 경제적인 구조 대안을 제시합니다. 설계 단계부터 시공 단계까지 일관된 기술적 판단을 유지합니다.",
    items: ["건축구조설계", "구조감리", "구조 보강"],
    situations: [
      "신축 건축물의 구조설계가 필요한 경우",
      "증축·용도변경에 따른 구조 검토가 필요한 경우",
      "노후 구조물의 보강 방안 검토가 필요한 경우",
    ],
    scope:
      "구조 계획 수립, 구조해석 및 부재 설계, 설계도면 작성, 구조감리, 보강 설계 및 시공 자문을 포함합니다.",
  },
  {
    slug: "inspection",
    icon: ShieldCheck,
    title: "안전진단·점검",
    shortDescription: "시설물의 상태를 정확히 진단하고 유지관리 방향을 제시합니다.",
    intro:
      "관련 법령에 따른 정기·정밀 점검부터 내진성능평가까지, 시설물의 현재 상태를 객관적으로 진단하고 필요한 조치를 명확히 제시합니다.",
    items: [
      "정기안전점검(3종시설물)",
      "정밀안전진단 및 정밀안전점검",
      "내진성능평가 및 내진보강",
      "건축물관리점검",
    ],
    situations: [
      "3종시설물 법정 점검 주기가 도래한 경우",
      "균열, 누수 등 구조적 이상이 발견된 경우",
      "내진성능 확인 및 보강이 필요한 경우",
    ],
    scope:
      "현장조사, 재료 및 구조 안전성 평가, 진단 보고서 작성, 보수·보강 방안 제시, 내진성능평가 및 보강 설계를 포함합니다.",
  },
  {
    slug: "construction-safety",
    icon: Wrench,
    title: "공사 중 안전관리",
    shortDescription: "공사 기간 동안의 구조적 위험을 사전에 관리합니다.",
    intro:
      "공사 중 발생할 수 있는 구조적 위험 요소를 사전에 검토하고, 안전관리계획의 적정성을 점검하여 시공 전 과정의 안전을 지원합니다.",
    items: ["공사 중 안전점검", "안전관리계획서 검토"],
    situations: [
      "가설구조물 및 임시시설의 안전성 확인이 필요한 경우",
      "굴착, 흙막이 등 위험공사 구간의 점검이 필요한 경우",
      "안전관리계획서에 대한 전문 검토가 필요한 경우",
    ],
    scope:
      "공사 단계별 현장점검, 가설구조물 안전성 검토, 안전관리계획서 검토 및 의견서 작성을 포함합니다.",
  },
  {
    slug: "demolition-review",
    icon: Hammer,
    title: "해체공사 구조검토",
    shortDescription: "해체 전 구조적 안전성을 검토하여 위험을 예방합니다.",
    intro:
      "해체 대상 건축물의 구조 특성과 해체 공법의 적정성을 검토하여, 해체 공사 전 과정에서 발생할 수 있는 붕괴 위험을 예방합니다.",
    items: ["해체공사 구조검토"],
    situations: [
      "노후 건축물의 해체 계획이 수립되는 경우",
      "인접 건축물에 영향을 미칠 수 있는 해체공사가 예정된 경우",
      "해체계획서에 대한 구조 전문 검토가 필요한 경우",
    ],
    scope:
      "해체 대상물 구조 검토, 해체 순서 및 공법 검토, 인접 구조물 영향 검토, 검토의견서 작성을 포함합니다.",
  },
];
