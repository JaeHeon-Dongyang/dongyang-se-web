/**
 * 기술자료 데이터.
 *
 * ⚠️ 현재 항목은 레이아웃 확인용 예시(placeholder)다. 실제 기술문서·PF3D 사용 매뉴얼은
 * 사용자 제공 예정이며 수령 시 교체한다. 날짜·첨부·버전은 가짜 값이므로 대외 공개 전
 * 반드시 실제 자료로 대체할 것. (docs/PLAN.md — M1.5)
 */

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; id: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; tone: "info" | "warning"; text: string }
  | { type: "table"; headers: string[]; rows: string[][] };

export type Attachment = {
  name: string;
  size: string;
  type: string;
};

export type Resource = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  updatedAt: string;
  attachments?: Attachment[];
  body: ContentBlock[];
  related?: string[];
  version?: string;
};

export const resourceCategories = [
  "전체",
  "기술 문서",
  "기술 가이드",
  "참고자료",
  "프로그램 매뉴얼",
] as const;

export const resources: Resource[] = [
  {
    slug: "pf3d-manual",
    category: "프로그램 매뉴얼",
    title: "PF3D 사용 매뉴얼",
    summary: "PF3D의 설치, 모델링, 해석 및 결과 확인 방법을 안내합니다.",
    updatedAt: "2025-03-12",
    version: "v3.2",
    attachments: [{ name: "PF3D_사용매뉴얼_v3.2.pdf", size: "8.4MB", type: "PDF" }],
    body: [
      {
        type: "paragraph",
        text: "본 매뉴얼은 PF3D 사용 절차를 안내하기 위한 예시 문서입니다. 정식 매뉴얼은 준비 중이며, 수령 후 이 자리에 게시됩니다.",
      },
      { type: "heading", text: "설치 및 초기 설정", id: "install" },
      {
        type: "paragraph",
        text: "프로그램 설치 파일을 실행한 뒤 안내에 따라 설치를 완료합니다. 최초 실행 시 단위계와 기본 재료 물성을 확인하고 프로젝트 저장 경로를 지정합니다.",
      },
      {
        type: "list",
        items: [
          "설치 파일 실행 및 사용권 계약 확인",
          "단위계(SI/일반) 및 기본 설정 확인",
          "재료 물성 데이터베이스 확인",
          "프로젝트 저장 경로 지정",
        ],
      },
      { type: "heading", text: "모델링", id: "modeling" },
      {
        type: "paragraph",
        text: "절점과 부재를 정의하여 구조 모델을 구성합니다. 하중 조건과 지지 조건은 실제 설계 조건과 일치하도록 신중히 입력해야 합니다.",
      },
      {
        type: "callout",
        tone: "info",
        text: "모델링 단계에서 지지 조건과 하중 조합을 실제 설계 기준과 다시 한 번 대조하는 것을 권장합니다.",
      },
      { type: "heading", text: "해석 실행 및 결과 확인", id: "analysis" },
      {
        type: "paragraph",
        text: "해석을 실행한 뒤 변위, 부재력, 응력 결과를 확인합니다. 결과 값이 예상 범위를 벗어나는 경우 모델링 조건을 재검토합니다.",
      },
      {
        type: "table",
        headers: ["확인 항목", "점검 내용"],
        rows: [
          ["변위", "허용 변위 기준 대비 결과 검토"],
          ["부재력", "주요 부재의 축력·전단력·모멘트 검토"],
          ["응력", "재료 허용응력 대비 여유율 검토"],
        ],
      },
    ],
    related: ["seismic-guide", "field-inspection-checklist"],
  },
  {
    slug: "inspection-cycle-guide",
    category: "기술 문서",
    title: "3종시설물 정기안전점검 주기 안내",
    summary: "시설물 종류별 정기안전점검 및 정밀안전점검 주기를 정리했습니다.",
    updatedAt: "2025-01-20",
    body: [
      {
        type: "paragraph",
        text: "시설물의 안전 및 유지관리에 관한 특별법에 따라 시설물의 종류와 등급에 따라 점검 주기가 다르게 적용됩니다. 아래는 대표적인 점검 유형과 주기를 정리한 참고 자료입니다.",
      },
      {
        type: "table",
        headers: ["점검 유형", "점검 주기(참고)"],
        rows: [
          ["정기안전점검", "반기 1회 이상"],
          ["정밀안전점검", "시설물 등급에 따라 상이"],
          ["정밀안전진단", "시설물 등급에 따라 상이"],
        ],
      },
      {
        type: "callout",
        tone: "warning",
        text: "실제 점검 주기와 세부 기준은 관련 법령 및 시설물 등급에 따라 달라질 수 있으므로, 정확한 적용을 위해 사전 확인이 필요합니다.",
      },
    ],
    related: ["seismic-guide"],
  },
  {
    slug: "seismic-guide",
    category: "기술 가이드",
    title: "내진성능평가 기본 절차 가이드",
    summary: "기존 건축물의 내진성능평가 절차와 검토 항목을 소개합니다.",
    updatedAt: "2024-11-08",
    body: [
      {
        type: "paragraph",
        text: "내진성능평가는 기존 건축물이 지진에 대해 갖는 저항 능력을 확인하고, 필요한 경우 보강 방향을 제시하기 위한 절차입니다.",
      },
      { type: "heading", text: "평가 절차", id: "process" },
      {
        type: "list",
        items: [
          "기초 자료 조사 및 현장조사",
          "구조 모델링 및 내진성능 해석",
          "성능 평가 및 취약부 판정",
          "보강 필요성 검토 및 방향 제시",
        ],
      },
    ],
    related: ["pf3d-manual", "inspection-cycle-guide"],
  },
  {
    slug: "field-inspection-checklist",
    category: "참고자료",
    title: "공사 중 현장 안전점검 체크리스트",
    summary: "공사 단계별 구조 안전점검 시 확인해야 할 주요 항목을 정리했습니다.",
    updatedAt: "2024-09-02",
    attachments: [{ name: "현장안전점검_체크리스트.pdf", size: "1.2MB", type: "PDF" }],
    body: [
      {
        type: "paragraph",
        text: "공사 중 안전점검은 가설구조물과 위험공사 구간을 중심으로 진행됩니다. 아래 항목은 현장점검 시 참고할 수 있는 주요 확인 사항입니다.",
      },
      {
        type: "list",
        items: [
          "가설구조물(비계, 동바리 등)의 설치 상태",
          "흙막이 및 굴착 구간의 변위 계측 결과",
          "인접 구조물에 대한 영향 여부",
          "안전관리계획서와 실제 시공 현황의 일치 여부",
        ],
      },
    ],
    related: ["pf3d-manual"],
  },
  {
    slug: "reinforcement-methods",
    category: "기술 문서",
    title: "구조 보강 공법 개요",
    summary: "노후 구조물에 적용되는 대표적인 보강 공법의 개념을 소개합니다.",
    updatedAt: "2024-06-14",
    body: [
      {
        type: "paragraph",
        text: "구조 보강은 기존 부재의 성능을 높이거나 새로운 부재를 추가하여 구조물 전체의 안전성을 확보하는 것을 목표로 합니다. 보강 공법의 선택은 구조물의 상태와 사용 조건에 따라 달라집니다.",
      },
    ],
    related: ["seismic-guide"],
  },
];

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}
