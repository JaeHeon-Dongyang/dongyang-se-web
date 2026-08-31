/**
 * 사내 질문하기(AI 노트북) 데이터.
 *
 * 각 항목은 Google Gemini Notebook(구 NotebookLM) 노트북 1개에 대응한다.
 * 노트북은 모두 **비공개 + 이메일 초대** 상태로 운영하며, 초대·해제는 관리자 계정에서만
 * 수행한다(전원 뷰어 권한 — 편집자는 재공유가 가능해 통제가 새기 때문).
 *
 * ⚠️ 이 페이지(/ask)는 사내 전용이다. 외부망에서는 middleware.ts 가 404 를 반환하고,
 * robots.ts 에서 색인도 제외한다.
 */

export type AskNotebook = {
  /** 분야명 */
  title: string;
  /** 어떤 질문을 할 수 있는지 한 줄 설명 */
  description: string;
  /** 근거 법령·기준. 유사 분야를 구분하는 기준이 되므로 반드시 표기한다. */
  basis: string;
  /** 노트북 URL. 빈 문자열이면 "준비 중"으로 표시된다. */
  url: string;
};

export type AskGroup = {
  id: string;
  title: string;
  description: string;
  notebooks: AskNotebook[];
};

export const askGroups: AskGroup[] = [
  {
    id: "design",
    title: "설계",
    description: "구조 계획·해석과 내진설계 관련 기준을 다룹니다.",
    notebooks: [
      {
        title: "구조설계",
        description: "구조 계획, 부재 설계, 하중 산정 등 일반 구조설계 기준",
        basis: "KDS 41 · 건축물 구조기준",
        url: "https://notebook.google.com/notebook/700b4f09-5598-496e-b3ee-0673c5b8aac6",
      },
      {
        title: "성능기반 내진설계",
        description: "비선형 해석 기반 내진설계 절차와 성능목표 설정",
        basis: "KDS 41 17 00 · 성능기반 내진설계 지침",
        url: "https://notebook.google.com/notebook/56b92440-0cf3-4cad-89ff-0c8fdfff4ff5",
      },
    ],
  },
  {
    id: "inspection",
    title: "안전진단 · 점검",
    description:
      "근거 법령이 서로 다릅니다. 대상 시설물과 점검 목적을 먼저 확인하고 선택하세요.",
    notebooks: [
      {
        title: "정밀안전진단 · 정밀안전점검",
        description: "상태평가·안전성평가 절차, 결함 등급 판정, 보고서 작성 기준",
        basis: "시설물안전법",
        url: "https://notebook.google.com/notebook/e33eccb5-d189-4abb-8385-081eb6270104",
      },
      {
        title: "내진성능평가",
        description: "기존 시설물의 내진성능 평가 절차와 판정 기준",
        basis: "지진·화산재해대책법 · 기존시설물 내진성능평가요령",
        url: "https://notebook.google.com/notebook/470f26cb-c822-45c0-ad65-be540dec917e",
      },
      {
        title: "정기안전점검",
        description: "정기안전점검 실시 시기·범위와 점검표 작성",
        basis: "시설물안전법",
        url: "https://notebook.google.com/notebook/8a39b322-d0d9-4950-95d7-ccccb295c031",
      },
      {
        title: "건축물관리점검",
        description: "정기점검·긴급점검 등 건축물관리법상 점검 대상과 절차",
        basis: "건축물관리법",
        url: "https://notebook.google.com/notebook/3bc2fb88-c1a9-4ceb-835e-74595103b553",
      },
    ],
  },
  {
    id: "construction",
    title: "공사 단계",
    description: "시공 중 안전관리와 해체공사 구조검토를 다룹니다.",
    notebooks: [
      {
        title: "공사 중 안전점검",
        description: "가시설·굴착 등 시공 단계 안전점검 대상과 검토 항목",
        basis: "건설기술진흥법",
        url: "https://notebook.google.com/notebook/c58b1ebd-1249-4699-a5e5-4b89d9a4238d",
      },
      {
        title: "해체공사",
        description: "해체계획서 작성과 해체 단계별 구조 안전성 검토",
        basis: "건축물관리법",
        url: "https://notebook.google.com/notebook/fcacca03-a088-4247-a932-9a1e0fc247af",
      },
    ],
  },
  {
    id: "internal",
    title: "사내 규정 · 행정",
    description: "사내 규정과 행정 절차에 대한 질문입니다.",
    notebooks: [
      {
        title: "사내 규정 · 행정",
        description: "복무·경비 처리·문서 양식 등 사내 규정과 행정 절차",
        basis: "사내 문서",
        url: "https://notebook.google.com/notebook/c2da457c-f76f-4255-97cc-24ecede1a1ca",
      },
    ],
  },
];
