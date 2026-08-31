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
  {
    slug: "ai-adoption-concept",
    category: "기술 가이드",
    title: "AI에게 일을 맡긴다는 것",
    summary:
      "AI(Claude)에게 일을 시킬 때의 기본 원리 — 무엇을 왜 명확히 해야 하는지, 어떻게 쪼개고 확인하는지 정리했습니다.",
    updatedAt: "2026-08-31",
    body: [
      {
        type: "paragraph",
        text: "아이들이 '샌드위치 만드는 방법'을 종이에 적고, 아빠는 그 종이에 적힌 대로만 정확히 따라 합니다. 결과는 엉망이 됩니다. 잼을 다른 손에 바르고, 빵을 통째로 뭉개고, 아이들은 답답해서 소리를 지릅니다. 아빠가 방법을 몰라서가 아닙니다. 아이들 머릿속에 있는 것과 종이에 적힌 것이 달랐기 때문입니다.",
      },
      {
        type: "callout",
        tone: "info",
        text: "AI가 딱 이 아빠 상태입니다. 우리 사무실 관행도, '적당히'도, '알아서'도 모릅니다. 애매하게 시키면 애매하게 하는 게 아니라 엉뚱하게 하거나 아예 멈춥니다.",
      },
      { type: "heading", text: "왜 지금 배우는가", id: "why" },
      {
        type: "paragraph",
        text: "AI는 결제하면 바로 쓸 수 있는 장비가 아니라, 사람이 익히는 데 시간이 걸리는 역량입니다. 개인이 AI를 업무에 붙이기까지 보통 2~3개월이 걸립니다. 필요해진 시점에 시작하면 이미 늦습니다.",
      },
      {
        type: "paragraph",
        text: "목표는 거창하지 않습니다. 검색 대신 질문하는 습관을 들이고, 무엇을 물어보면 되는지 감을 잡는 것 — 딱 여기까지가 첫 단계 목표입니다.",
      },
      { type: "heading", text: "AI에게 일을 시키는 원리", id: "principle" },
      {
        type: "paragraph",
        text: "후배에게 일을 시킬 때를 생각해 봅시다. '이 도면 보고 기둥 일람표 좀 뽑아줘.' 이 한 문장으로 대체로 일이 됩니다. 후배가 알아서 채워 넣기 때문입니다. 어느 레이어를 볼지, 표 양식은 뭘 쓸지 — 말하지 않아도 공유되는 것들이 있습니다. 같은 사무실에서 같은 일을 해왔으니까요.",
      },
      {
        type: "paragraph",
        text: "AI에게는 그게 없습니다. 우리 사무실 관행을 모르고, 도면을 본 적도 없습니다. AI에게 일을 맡기는 일의 절반 이상은, 머릿속에만 있던 것을 전부 밖으로 꺼내 적는 일입니다. 어려운 것도 여기입니다 — 내가 무엇을 원하는지 정확히 아는 것.",
      },
      {
        type: "paragraph",
        text: "AI의 답변 방식에 대해서도 하나 더 알아둘 것이 있습니다. AI는 정답을 찾아주는 기계가 아니라, 사람이 만족할 만한 다음 말을 예측하도록 학습된 모델입니다. 그래서 기본값이 예스맨입니다 — 물어보면 대체로 좋은 아이디어라고 답합니다. 이 특성을 알아두면, 뒤에 나올 검증 습관이 왜 필요한지 이해가 됩니다.",
      },
      { type: "heading", text: "일을 쪼개는 세 가지 질문", id: "split" },
      {
        type: "paragraph",
        text: "'기둥 일람표 뽑아줘'처럼 시작부터 끝까지 한 번에 시키면 막막합니다. AI에게 일을 맡길 때는 작업을 잘게 나누고, 각 단계마다 받는 것 / 내놓는 것 / 확인 방법 세 가지를 명확히 해야 합니다. '이 도면에서 기둥 목록 뽑기'를 쪼개면 이렇게 됩니다.",
      },
      {
        type: "table",
        headers: ["단계", "받는 것", "내놓는 것", "확인"],
        rows: [
          ["1", "DXF 파일", "지정 레이어의 폐합 사각형 목록", "개수가 도면과 맞는가"],
          ["2", "사각형 목록", "각각의 중심좌표와 크기", "임의로 3개 캐드에서 대조"],
          ["3", "좌표·크기 목록", "통과번호를 붙인 표", "눈으로 훑어 누락 확인"],
        ],
      },
      {
        type: "paragraph",
        text: "한 번에 '기둥 일람표 뽑아줘'라고 하면 막막하지만, 이렇게 나누면 1단계는 오늘 오후에 시켜볼 만한 크기가 됩니다. 그리고 이 표가 그대로 AI에게 줄 지시문이 됩니다 — 'DXF 파일을 열어서 지정한 레이어의 폐합 사각형만 골라내고, 결과는 목록으로 내놓고 몇 개를 찾았는지 보여줘.'",
      },
      { type: "heading", text: "확인 습관 — 진짜 사고는 조용히 옵니다", id: "verify" },
      {
        type: "paragraph",
        text: "세 칸 중 가장 자주 빠지는 게 확인입니다. 그런데 우리 일에서는 이 칸이 제일 중요합니다.",
      },
      {
        type: "callout",
        tone: "info",
        text: "오류 메시지 다루는 법 — 화면에 빨간 오류가 뜨면 위축될 필요 없습니다. 오류는 '어디서, 왜 멈췄는지'를 알려주는 가장 친절한 신호입니다. 메시지를 통째로 복사해서 AI에게 그대로 붙여넣으면, 대부분 스스로 원인을 찾아 고쳐줍니다.",
      },
      {
        type: "paragraph",
        text: "진짜 무서운 건 오류가 아닙니다. 오류는 멈추기라도 하니 알아챌 수 있습니다. 그런데 기둥이 24개인데 22개만 세고 조용히 표를 뽑아내면, 아무도 모르는 채로 넘어갑니다. 우리 일에서는 이쪽이 진짜 사고입니다. 각 단계마다 결과가 맞는지 볼 방법을 정해 두어야, 조용히 틀리는 걸 잡아낼 수 있습니다.",
      },
      {
        type: "callout",
        tone: "warning",
        text: "오류는 반갑게, 조용한 결과는 의심스럽게.",
      },
    ],
    related: ["ai-adoption-practice"],
  },
  {
    slug: "ai-adoption-practice",
    category: "기술 가이드",
    title: "Claude로 실무 시작하기",
    summary:
      "설계기준 조회, 보고서 초안, 검토 시트 자동화까지 — Claude를 우리 업무에 붙이는 실전 가이드입니다.",
    updatedAt: "2026-08-31",
    body: [
      {
        type: "paragraph",
        text: "앞선 글 'AI에게 일을 맡긴다는 것'에서 AI에게 일을 시키는 기본 원리를 다뤘습니다. 이번 글은 그 원리를 우리 업무에 실제로 적용하는 방법입니다.",
      },
      { type: "heading", text: "AI가 하는 일, 내가 하는 일", id: "roles" },
      {
        type: "paragraph",
        text: "요즘은 코드를 직접 쓰지 않고도 프로그램을 만들 수 있습니다. '만들고 싶은 걸 말한다 → 만들어진다' 방식, 이른바 바이브 코딩입니다. 문법을 몰라도 검토 시트나 자동화 스크립트를 만들 수 있게 됐다는 뜻입니다.",
      },
      {
        type: "paragraph",
        text: "다만 착각하기 쉬운 게 하나 있습니다. AI가 코드를 대신 써주는 것이지, 생각을 대신해주는 것이 아닙니다. 무엇을 만들지, 어떻게 쪼갤지, 잘 됐는지 어떻게 확인할지는 여전히 사람의 몫입니다.",
      },
      { type: "heading", text: "AI에게 맡기는 부분", id: "delegate-ai" },
      {
        type: "list",
        items: [
          "서술부·개요 초안, 반복 문장 정리",
          "설계기준 조항 검색과 개정 이력 정리",
          "검토 시트·자동화 스크립트의 코드 작성",
          "완료라고 말한 것에 대한 재확인 요청",
        ],
      },
      { type: "heading", text: "사람이 반드시 하는 부분", id: "keep-human" },
      {
        type: "list",
        items: [
          "현장 판단, 결함 등급, 최종 서명",
          "조문 원문 대조, 가정의 공학적 타당성 판단",
          "구조 해석 결과의 타당성 판단",
          "산출물을 성과품에 반영할지 결정",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "AI가 '다 됐습니다'라고 말하는 건 완료의 증거가 아니라 주장입니다. 원문과 대조하거나 직접 눈으로 확인했을 때 비로소 완료입니다. 신입 직원을 대하듯 — 보고를 듣는 걸로 끝내지 말고 결과물을 확인하는 습관을 들이세요.",
      },
      { type: "heading", text: "실전에서 막히지 않는 세 가지 습관", id: "habits" },
      {
        type: "list",
        items: [
          "명시적으로 지시하세요 — '알아서 잘 해줘'는 통하지 않습니다. 원하는 형식, 분량, 기준을 구체적으로 적을수록 결과가 정확해집니다.",
          "한 대화는 한 가지 일만 — 이전 시도가 실패한 기록이 대화에 남아있으면 AI가 계속 그 영향을 받습니다. 방향을 완전히 바꿀 땐 새 대화로 시작하세요.",
          "칭찬은 검증이 아닙니다 — AI에게 아이디어를 물으면 대체로 좋다고 답합니다. 중요한 판단 앞에서는 '이 방법의 허점을 비판적으로 짚어줘'처럼 반대 방향으로도 한 번 물어보세요.",
        ],
      },
      { type: "heading", text: "우리 업무에서 바로 써볼 것", id: "use-cases" },
      {
        type: "paragraph",
        text: "사내에서 반복적으로 발생하며, 지금 바로 시도해 볼 수 있는 여섯 가지 업무 영역입니다.",
      },
      {
        type: "table",
        headers: ["영역", "내용"],
        rows: [
          [
            "보고서 작성",
            "정밀안전점검·내진성능평가 보고서의 반복 서술부, 개요·결론 초안",
          ],
          ["설계기준 조회", "KDS·KBC 조항 확인과 개정 이력 추적, 근거 조문 인용 정리"],
          ["계산 검토", "배근·단면 검토 로직의 교차 확인, 검토 체크리스트 생성"],
          ["데이터 처리", "엑셀 데이터 정리·취합, 도면 데이터 추출, 결과 표 정리"],
          ["사내 툴 제작", "엑셀 검토 시트, Python·VBA 자동화 스크립트 작성과 검증"],
          ["대외 문서", "제안서·견적 설명·공문·회의록 초안 작성과 문장 다듬기"],
        ],
      },
      { type: "heading", text: "지켜야 할 세 원칙", id: "principles" },
      {
        type: "callout",
        tone: "warning",
        text: "편하게 쓰되, 아래 세 가지는 예외 없이 지킵니다. 위반 시 사용이 중지됩니다.",
      },
      {
        type: "table",
        headers: ["원칙", "내용"],
        rows: [
          [
            "대외비 원본 업로드 금지",
            "발주처 도면·계약서·미공개 성과품은 그대로 올리지 않습니다. 필요하면 식별 정보를 지운 뒤 사용합니다.",
          ],
          [
            "개인정보 입력 금지",
            "직원·발주처 담당자의 개인정보는 어떤 형태로도 입력하지 않습니다.",
          ],
          [
            "산출물 검토 의무",
            "AI가 만든 문장·수치·조항은 담당자가 원문과 대조한 뒤에만 성과품에 반영합니다.",
          ],
        ],
      },
      { type: "heading", text: "오늘의 실습", id: "practice" },
      {
        type: "paragraph",
        text: "본인 업무에서 가장 짜증나는 반복 작업 하나를 정하고, 앞선 글의 '받는 것 / 내놓는 것 / 확인' 표를 채워보세요. 거창할 필요 없습니다 — 작을수록 좋습니다. 다음 주간회의에서 무엇을 시켰고 결과가 쓸 만했는지 1인 3분씩 공유합니다. 이 공유가 우리 팀 전체의 자산이 됩니다.",
      },
    ],
    related: ["ai-adoption-concept"],
  },
];

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}
