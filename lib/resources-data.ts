/**
 * 기술자료 데이터.
 *
 * PF3D 매뉴얼은 원본 설명서 한 편을 카드 1건으로 옮긴다. 편이 늘어나면 카드를 추가하고
 * 카테고리 "PF3D 매뉴얼" 로 묶어 필터에서 함께 정렬되게 한다.
 */

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; id: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; tone: "info" | "warning"; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "video"; label: string; url: string; description?: string }
  | {
      type: "video-story";
      eyebrow: string;
      title: string;
      paragraphs: string[];
      comparison: {
        leftLabel: string;
        leftText: string;
        rightLabel: string;
        rightText: string;
      };
      note?: string;
      video: { label: string; url: string };
    }
  | { type: "image"; src: string; alt: string; caption?: string }
  | {
      // 주석 없는 원본 스크린샷 위에 번호를 CSS 로 얹는다. x·y 는 이미지 기준 백분율.
      type: "annotated-image";
      src: string;
      alt: string;
      width: number;
      caption?: string;
      markers: ImageMarker[];
    }
  | {
      // 이미지 두 장을 화살표로 이어 가로로 배치 (예: 버튼 클릭 → 열리는 창).
      type: "image-pair";
      left: { src: string; alt: string; width: number; markers: ImageMarker[] };
      right: { src: string; alt: string; width: number; markers: ImageMarker[] };
    }
  | { type: "link"; label: string; url: string; description?: string };

// 번호(n)는 데이터에 적지 않는다. 렌더링 시 heading 을 만날 때마다 1 로 초기화하고,
// 같은 heading 안에서는 이미지가 바뀌어도 이어서 증가한다 (resource-body.tsx).
export type ImageMarker = {
  x: number;
  y: number;
  note: string;
  // 번호 원 대신/추가로 영역을 감싸는 테두리 박스. w·h 는 이미지 기준 백분율, x·y 는 박스 중심.
  // borderWidth 는 테두리 굵기(px), 생략 시 기본 2px.
  box?: { w: number; h: number; borderWidth?: number };
  // 번호 배지가 박스의 어느 모서리·변에 붙을지. 기본값은 우하단(bottom-right).
  numberCorner?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  // 이미지가 이미 한 동작만 보여주도록 잘려있어 번호 배지가 불필요할 때 이미지 위 배지만 숨김 (목록의 번호는 유지).
  hideNumber?: boolean;
};

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

export const resourceCategories = ["전체", "PF3D 매뉴얼", "기술 가이드"] as const;

export const resources: Resource[] = [
  {
    slug: "pf3d-ads-to-gen",
    category: "PF3D 매뉴얼",
    title: "01 · ADS·Gen·BeST에서 파일 뽑기",
    summary:
      "ADS 해석 모델을 midas Gen으로 옮기고, PF3D 입력에 맞게 정리한 뒤 BeST에서 벽체 배근 리스트를 뽑기까지의 전 과정입니다.",
    updatedAt: "2026-08-31",
    body: [
      {
        type: "paragraph",
        text: "PF3D 작업의 첫 단계는 입력 파일 세 개를 만드는 일입니다. ADS 해석 모델을 midas Gen으로 변환해 정리하고(mgt), 지진하중을 정의해 저장하고(spf), BeST Pro에서 벽체 배근 리스트를 뽑습니다(TXT). 이 문서는 그 순서를 화면 그대로 따라갑니다.",
      },
      {
        type: "table",
        headers: ["산출물", "만드는 곳", "쓰이는 곳"],
        rows: [
          ["◯◯동.mgt", "midas Gen — 모델링 정리 후 Export", "PF3D 모델 입력"],
          ["◯◯동.spf", "midas Gen — 지진하중 Seismic Load Profile", "지진하중 정보"],
          ["◯◯동 TEXT.TXT", "BeST Pro — 벽부호별 요약 계산결과 출력", "벽체 배근 정보"],
        ],
      },
      {
        type: "callout",
        tone: "warning",
        text: "**이름 규칙과 Wall Mark 두 가지에서 실수가 가장 많이 납니다.** 부재·재료 Name은 **영문과 언더바(_)만** 사용하고, Wall Mark는 **BeST의 Story Name·벽부호와 정확히 일치**시켜야 합니다.",
      },
      { type: "heading", text: "1-1. 슬라브 Plate Bending 해제", id: "plate-bending" },
      {
        type: "paragraph",
        text: "먼저 슬라브의 Plate Bending 을 해제합니다. [Plan] 메뉴에서 Plan Name 창을 엽니다.",
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s1-1-plan-menu.webp",
        alt: "ADS 의 Plan 메뉴에서 Plan > Plan Name 을 선택하는 화면",
        width: 287,
        markers: [
          { x: 4.4, y: 27, note: "[Plan] 메뉴를 엽니다." },
          { x: 5.4, y: 60.5, note: "[Plan] 하위 메뉴로 들어갑니다." },
          { x: 95, y: 60.5, note: "[Plan Name…] 을 클릭합니다." },
        ],
      },
      {
        type: "paragraph",
        text: "Plan Name 창에서 **Level 층만** Plate Bending 을 해제합니다. **Slab 층(Slab Type 이 Diaphragm(Slab) 인 층)은 그대로 둡니다.**",
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s1-1-define-plan-name.webp",
        alt: "Define Plan Name 창의 Diaphragm + Plate Bending 체크박스와 층별 Slab Type 목록",
        width: 418,
        markers: [
          {
            x: 20,
            y: 38,
            note: "[Diaphragm + Plate Bending] 체크를 해제합니다. 층을 하나씩 선택해 해제한 뒤 Modify 로 반영합니다.",
          },
          {
            x: 65,
            y: 71.5,
            note: "**Slab Type 이 Diaphragm(Slab) 인 층은 건드리지 않습니다.** Diaphragm(Level) 인 층만 해제 대상입니다.",
          },
        ],
      },
      { type: "heading", text: "1-2. 해석 후 mgt 파일 Export", id: "ads-export" },
      {
        type: "callout",
        tone: "warning",
        text: "**반드시 해석(F5)을 먼저 돌린 뒤** Export 합니다. 해석하지 않으면 Export가 불가능합니다.",
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s1-2-export-menu.webp",
        alt: "ADS 의 File 메뉴에서 Export > Frame Model to MIDAS/Gen 을 선택하는 화면",
        width: 462,
        markers: [
          {
            x: 4.4,
            y: 3.8,
            note: "[File] 탭을 엽니다.",
            box: { w: 7.8, h: 7, borderWidth: 2 },
          },
          { x: 18, y: 66, note: "[Export] 로 들어갑니다." },
          {
            x: 95,
            y: 79.5,
            note: "[Frame Model to MIDAS/Gen…] 을 클릭해 mgt 파일로 저장합니다.",
          },
        ],
      },
      { type: "heading", text: "2. Gen 모델링 수정", id: "gen-modeling" },
      {
        type: "paragraph",
        text: "변환된 모델은 그대로 쓸 수 없습니다. 지하외벽을 만들고, ADS 에서 따라온 불필요한 데이터를 지우고, 하중·질량·이름·단위를 PF3D 가 읽을 수 있는 형태로 맞춥니다.",
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s2-1-import-menu.webp",
        alt: "midas Gen 의 Import > MGT or MGTX file 메뉴 위치",
        width: 500,
        markers: [
          {
            x: 17.5,
            y: 41.5,
            note: "[Import] 를 클릭합니다.",
          },
          {
            x: 88,
            y: 10,
            note: "[MGT or MGTX file (for GEN/GEN NX)] 을 클릭해 mgt 파일을 Import 합니다.",
          },
        ],
      },
      { type: "heading", text: "2-2. 지하외벽 생성", id: "basement-wall" },
      {
        type: "list",
        items: [
          "골조에서 1스팬(8m) 이격해 생성합니다.",
          "다만 최외곽 구조체가 인접하는 경우, 해당 지하외벽은 도면대로 모델링합니다.",
          "두께는 최하층 지하외벽체 두께를 적용합니다.",
        ],
      },
      {
        type: "image",
        src: "/images/resources/pf3d-ads-to-gen/04-basement-wall.webp",
        alt: "지하외벽을 생성한 평면 모델 화면",
        caption: "2-2. 지하외벽 생성",
      },
      { type: "heading", text: "2-3. 불필요한 데이터 정리", id: "cleanup" },
      {
        type: "list",
        items: [
          "① Boundaries — 모두 삭제한 뒤 다시 생성합니다.",
          "② Rigid link 삭제",
          "③ Nodal mass 삭제",
          "④ 골조 부분의 Nodal loads 삭제 (방법은 아래 참고)",
          "⑤ 지진하중·풍하중 제거",
          "⑥ 노드 정리 — F12 로 불필요한 노드를 삭제합니다.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "순서는 중요하지 않지만 **노드 정리는 반드시 마지막에** 합니다. F12 로도 지워지지 않는 노드는 충분히 확인한 뒤 삭제하세요.",
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s2-3-boundaries-tree.webp",
        alt: "midas Gen 트리 메뉴의 Boundaries > Supports·Rigid Link 항목",
        width: 807,
        markers: [
          {
            x: 40,
            y: 49,
            note: "Supports 를 삭제한 뒤 다시 생성합니다.",
            box: { w: 57, h: 26 },
          },
          {
            x: 40,
            y: 81,
            note: "Rigid Link 를 삭제합니다.",
            box: { w: 57, h: 26 },
          },
        ],
      },
      {
        type: "paragraph",
        text: "Nodal Loads 삭제는 전이층 아래 골조 부분을 선택한 뒤 [Load] 탭 > [Static Loads] > [Nodal Loads] 에서 Delete 로 Apply 하고, Load Case 를 LL 로 바꿔 한 번 더 Apply 합니다.",
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s2-3-nodal-loads-menu.webp",
        alt: "Load 탭에서 Nodal Loads 를 선택하는 화면",
        width: 700,
        markers: [
          {
            x: 66,
            y: 28,
            note: "[Nodal Loads] 를 클릭합니다.",
          },
        ],
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s2-3-nodal-loads-dl.webp",
        alt: "Nodal Loads 창에서 Load Case DL, Delete 옵션을 선택하는 화면",
        width: 400,
        markers: [
          {
            x: 43,
            y: 70,
            note: "Load Case 를 DL 로 두고 Options 에서 Delete 를 선택해 Apply 합니다.",
            box: { w: 80, h: 56 },
            numberCorner: "top-right",
          },
        ],
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s2-3-nodal-loads-ll.webp",
        alt: "Nodal Loads 창에서 Load Case LL, Delete 옵션을 선택하는 화면",
        width: 400,
        markers: [
          {
            x: 42,
            y: 16,
            note: "Load Case 를 LL 로 바꾸고 Delete 로 한 번 더 Apply 합니다.",
            box: { w: 82, h: 30 },
          },
        ],
      },
      { type: "heading", text: "2-4. 골조부분 Floor Beam Loads 입력", id: "floor-loads" },
      {
        type: "list",
        items: [
          "① [Load] 탭 > [Static Loads] > [Assign Floor Loads]",
          "② 실별에 맞는 설계하중을 입력합니다.",
          "③ Allow Polygon Type Unit Area 체크 — 다각형 영역으로 하중을 넣기 위함입니다.",
          "④ **Convert to Beam Load Type 체크** — Floor Loads 를 Beam Loads 로 변환합니다. **이 체크가 있어야 다른 프로그램에서 읽을 수 있습니다.**",
          "⑤ Nodes Defining Loading Area 를 누르고 평면에서 영역을 선택한 뒤 ⑥ Apply.",
        ],
      },
      {
        type: "image",
        src: "/images/resources/pf3d-ads-to-gen/07-floor-beam-loads.webp",
        alt: "Assign Floor Loads 대화상자 설정과 하중이 입력된 3차원 모델",
        caption: "2-4. Convert to Beam Load Type 체크를 빠뜨리지 않도록 주의",
      },
      { type: "heading", text: "2-5. Story 정리 (F10)", id: "story" },
      {
        type: "list",
        items: [
          "① Auto Generate Story Data 클릭 후 ② OK — Seismic·Wind Eccentricity 는 체크된 상태로 둡니다.",
          "③ 층 이름을 **BeST 이름과 일치**시킵니다. **한글은 영문으로** 바꿉니다 (예: 2F상부 → 2FUP).",
          "④ Ground Level 옆 […] 클릭.",
          "⑤ Consider Underground Seismic Loads 체크 후 Bedrock Level 에 최하층 높이를 확인해 기입합니다.",
        ],
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s2-5-story-data-empty.webp",
        alt: "빈 Story Data 창에서 Auto Generate Story Data 버튼",
        width: 700,
        markers: [
          {
            x: 13.2,
            y: 87.2,
            note: "[Auto Generate Story Data…] 를 클릭합니다.",
            box: { w: 24.6, h: 4.8, borderWidth: 3 },
          },
        ],
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s2-5-story-data-auto.webp",
        alt: "Automatic Generation of Story Data 창에서 층을 선택해 넘기는 화면",
        width: 500,
        markers: [
          {
            x: 69.3,
            y: 93.6,
            note: "층을 확인한 뒤 [OK] 를 클릭합니다.",
            box: { w: 20, h: 8.1, borderWidth: 3 },
            numberCorner: "top-right",
          },
        ],
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s2-5-story-data-complete.webp",
        alt: "자동 생성된 Story Data 결과 — Story Name 을 실제 층 이름으로 수정",
        width: 700,
        markers: [
          {
            x: 28.2,
            y: 50.5,
            note: "Story Name 을 **BeST 의 Story Name·벽부호와 일치**하도록 수정합니다.",
            box: { w: 14.5, h: 51.5 },
          },
        ],
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s2-5-building-control.webp",
        alt: "Building Control 창에서 Bedrock Level 을 입력하는 화면",
        width: 500,
        markers: [
          {
            x: 40,
            y: 36,
            note: "[Consider Underground Seismic Loads] 체크 후 Bedrock Level 에 최하층 높이를 확인해 기입합니다.",
            box: { w: 80, h: 18 },
            numberCorner: "top-right",
          },
        ],
      },
      { type: "heading", text: "2-6. Name 정리", id: "naming" },
      {
        type: "callout",
        tone: "warning",
        text: "Name 은 **무조건 영문과 언더바(_)만** 사용합니다. **한글·괄호·하이픈이 남아 있으면 이후 단계에서 읽히지 않습니다.**",
      },
      {
        type: "table",
        headers: ["구분", "규칙", "예"],
        rows: [
          [
            "비탄성 부재 (인방보)",
            "fck + 부재명, 강도별로 분리",
            "17층~옥상층 강도 C30 인 aB101 → 30aB101",
          ],
          [
            "탄성 부재 (기둥·보 등)",
            "fck_하부층_상부층부재명. 배근 리스트에 맞춰 수정하고, 강도가 모두 같으면 fck 는 생략 가능",
            "27_B1_2TC1, 24_2UPTC1",
          ],
          ["한 층에만 있는 부재 (전이보 등)", "부재만 나누면 됨", "TG1, TB1, TCB1"],
          ["재료명", "C 뒤에 바로 강도", "C24, C27, C30"],
        ],
      },
      {
        type: "image",
        src: "/images/resources/pf3d-ads-to-gen/10-name-coupling-beam.webp",
        alt: "인방보 이름을 강도별로 분리해 정리한 목록",
        caption: "2-6-1. 비탄성 부재인 인방보 — 강도별 분리",
      },
      {
        type: "image",
        src: "/images/resources/pf3d-ads-to-gen/11-name-column.webp",
        alt: "기둥 일람표와 그에 맞춰 수정한 Gen 부재 이름 목록",
        caption: "2-6-2. 배근 리스트에 맞춰 fck_하부층_상부층부재명 형식으로",
      },
      {
        type: "image",
        src: "/images/resources/pf3d-ads-to-gen/12-name-transfer-beam.webp",
        alt: "전이보처럼 한 층에만 있는 부재의 이름 목록",
        caption: "2-6-2. 한 층에만 있는 부재는 부재만 나누면 됨",
      },
      {
        type: "paragraph",
        text: "2-6-3. 재료명은 C 뒤에 바로 강도를 붙여 통일합니다 (예: C24, C27, C30).",
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s2-6-material-naming.webp",
        alt: "Material 트리에서 C30·C27 처럼 이름을 통일한 항목과 파란 글자로 표시된 미사용 항목",
        width: 392,
        markers: [
          {
            x: 44,
            y: 25,
            note: "이름은 C 뒤에 바로 강도를 붙입니다 (C30, C27).",
            box: { w: 37, h: 24 },
          },
        ],
      },
      {
        type: "paragraph",
        text: "2-6-4. 부재로 사용되지 않아 파란 글자로 표시된 항목은 위치·종류 상관없이 모두 삭제합니다.",
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s2-6-section-unused.webp",
        alt: "Section 트리에서 파란 글자로 표시된 미사용 항목",
        width: 399,
        markers: [
          {
            x: 48,
            y: 60.5,
            note: "**파란 글자는 미사용 항목 — 모두 삭제 대상입니다.**",
            box: { w: 44, h: 39 },
          },
        ],
      },
      { type: "heading", text: "팁 · 부재 Name 한 번에 만들기", id: "naming-tip" },
      {
        type: "list",
        items: [
          "① 아무 mgt 파일이나 열어 Ctrl+F 로 *SECTION 을 찾습니다.",
          "② 한두 줄을 복사해 엑셀에 붙여넣습니다 (세로줄이 맞는 것으로 복사).",
          "③ [데이터] > [텍스트 나누기](Alt+D+E) 에서 '너비가 일정함' 체크 후 마침.",
          "④ 칸이 나뉘면 필요한 개수만큼 복사해 Section ID·Name·단면 정보를 수정합니다. **쉼표는 지우면 안 됩니다.**",
          "⑤ 전체를 복사해 Gen 의 [Tools] > [MGT Command Shell] 로 옮깁니다.",
          "⑥ Command or Data 에 *SECTION 을 정확히 입력하고 Insert Command → 아래에 엑셀 내용 붙여넣기 → Run.",
        ],
      },
      {
        type: "image",
        src: "/images/resources/pf3d-ads-to-gen/14-tip-mgt-section.webp",
        alt: "MIDAS Text Editor 에서 SECTION 항목을 찾은 화면",
        caption: "① mgt 파일에서 *SECTION 찾기",
      },
      {
        type: "image",
        src: "/images/resources/pf3d-ads-to-gen/15-tip-excel-split.webp",
        alt: "엑셀에 붙여넣은 SECTION 데이터와 텍스트 나누기 메뉴",
        caption: "②③ 엑셀에 붙여넣고 텍스트 나누기",
      },
      {
        type: "image",
        src: "/images/resources/pf3d-ads-to-gen/16-tip-text-wizard.webp",
        alt: "텍스트 마법사에서 너비가 일정함을 선택한 화면",
        caption: "③ '너비가 일정함' 선택 후 마침",
      },
      {
        type: "image",
        src: "/images/resources/pf3d-ads-to-gen/17-tip-excel-columns.webp",
        alt: "칸이 나뉜 엑셀 데이터",
        caption: "④ 나뉜 칸을 필요한 개수만큼 복사",
      },
      {
        type: "image",
        src: "/images/resources/pf3d-ads-to-gen/18-tip-section-edit.webp",
        alt: "Section ID, Name, 단면 정보를 수정한 엑셀 화면",
        caption: "④ Section ID · Name · 단면 정보 수정 (쉼표 유지)",
      },
      {
        type: "image",
        src: "/images/resources/pf3d-ads-to-gen/19-tip-command-shell.webp",
        alt: "midas Gen 의 MGT Command Shell 에서 SECTION 데이터를 실행하는 화면",
        caption: "⑤⑥ MGT Command Shell 에 붙여넣고 Run",
      },
      { type: "heading", text: "2-7. 질량 부여", id: "mass" },
      {
        type: "list",
        items: [
          "Load to Mass — [Load] 탭 > [Static Loads] > [Nodal Masses] > [Loads to Masses]. Mass Direction 은 X, Y, Load Case 는 DL, Scale Factor 1 로 Add.",
          "Self Weight 를 질량으로 — [Structure] 탭 > [Structure Type] 에서 Convert Self-weight into Masses 체크 (Convert to X, Y).",
        ],
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s2-7-loads-to-masses-menu.webp",
        alt: "Load 탭에서 Masses > Loads to Masses 를 선택하는 화면",
        width: 629,
        markers: [
          {
            x: 72,
            y: 32,
            note: "[Masses] 를 클릭합니다.",
          },
          {
            x: 88,
            y: 64,
            note: "[Loads to Masses] 를 선택합니다.",
          },
        ],
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s2-7-loads-to-masses-dialog.webp",
        alt: "Loads to Masses 대화상자에서 DL 하중을 질량으로 변환하는 화면",
        width: 360,
        markers: [
          {
            x: 50,
            y: 14.7,
            note: "Mass Direction 은 X, Y 를 선택합니다.",
            box: { w: 94, h: 18 },
          },
          {
            x: 50,
            y: 56,
            note: "Load Case 는 DL, Scale Factor 는 1 로 입력하고 Add 를 클릭합니다.",
            box: { w: 94, h: 5 },
          },
        ],
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s2-7-structure-type-menu.webp",
        alt: "Structure 탭에서 Structure Type 을 선택하는 화면",
        width: 500,
        markers: [
          {
            x: 28,
            y: 40,
            note: "[Structure Type] 을 클릭합니다.",
          },
        ],
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s2-7-structure-type-dialog.webp",
        alt: "Structure Type 대화상자의 Convert Self-weight into Masses 체크 화면",
        width: 620,
        markers: [
          {
            x: 48,
            y: 56,
            note: "[Convert Self-weight into Masses] 를 체크하고 [Convert to X, Y] 를 선택합니다.",
            box: { w: 94, h: 12 },
          },
        ],
      },
      { type: "heading", text: "2-8. Wall Mark 생성", id: "wall-mark" },
      {
        type: "callout",
        tone: "warning",
        text: "**여기서 실수가 가장 많이 납니다.** BeST 의 **Story Name·벽부호와 Wall Mark 를 일치**시키고, **지하외벽에는 Wall Mark 를 지정하지 않습니다.**",
      },
      {
        type: "list",
        items: [
          "[Design] 탭 > [RC Design] > [Modify Wall Mark Data] 를 엽니다.",
          "① 벽체 리스트와 같은 위치의 Name 을 적고 ② 해당 위치의 벽을 선택한 뒤 ③ Add.",
          "지하외벽과 다른 벽체의 Wall ID 가 겹칠 때는 [Alt+9] > [Change Element Parameters] 에서 Wall ID 를 선택하고, **전혀 겹치지 않는 번호**(예: 5000, 777)를 Fixed No. 로 입력합니다.",
        ],
      },
      {
        type: "image",
        src: "/images/resources/pf3d-ads-to-gen/22-wall-mark.webp",
        alt: "Modify Wall Mark Data 대화상자에서 Wall Mark 를 추가하는 화면",
        caption: "2-8. Wall Mark 추가",
      },
      {
        type: "image",
        src: "/images/resources/pf3d-ads-to-gen/23-wall-id-change.webp",
        alt: "Change Element Parameters 에서 Wall ID 를 Fixed No. 로 바꾸는 화면",
        caption: "2-8. Wall ID 가 겹칠 때",
      },
      { type: "heading", text: "2-9. 단위·좌표 정리", id: "units" },
      {
        type: "list",
        items: [
          "① 단위를 **kN, cm** 로 변환합니다.",
          "② Node Table 을 엽니다 (Ctrl+Alt+N).",
          "③④ 전체를 선택해 복사한 뒤 엑셀에 붙여넣습니다.",
          "⑤⑥ 전체 선택 후 **'자릿수 늘림'** 을 클릭하고 **이어서 '자릿수 줄임'** 을 클릭합니다. **곧바로 줄임만 누르면 반응하지 않습니다.**",
        ],
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s2-8-units-dropdown.webp",
        alt: "단위를 kN, cm 로 변경하는 드롭다운",
        width: 400,
        markers: [
          {
            x: 40,
            y: 93,
            note: "힘 단위는 kN, 길이 단위는 cm 로 맞춥니다.",
            box: { w: 80, h: 14, borderWidth: 3 },
            numberCorner: "top-right",
          },
        ],
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s2-8-nodes-table-menu.webp",
        alt: "Node/Element 탭에서 Nodes Table 을 여는 화면",
        width: 700,
        markers: [
          {
            x: 90,
            y: 20,
            note: "[Nodes Table] 을 클릭합니다 (Ctrl+Alt+N).",
          },
        ],
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s2-8-nodes-excel-paste.webp",
        alt: "Node Table 을 엑셀에 붙여넣고 자릿수를 정리하는 화면",
        width: 700,
        markers: [
          {
            x: 96.5,
            y: 21,
            note: "전체 선택 후 **'자릿수 늘림'** 을 클릭하고 **이어서 '자릿수 줄임'** 을 클릭합니다. **곧바로 줄임만 누르면 반응하지 않습니다.**",
            box: { w: 7, h: 7, borderWidth: 2 },
            numberCorner: "top-left",
          },
        ],
      },
      { type: "heading", text: "2-10. 지진하중", id: "seismic" },
      {
        type: "list",
        items: [
          "① [Load] 탭 > [Lateral] 그룹 > [Seismic Loads] > ② Add.",
          "③ 설계개요 값 입력, EX·EY 두 케이스 생성 (아래 화면 참고).",
          "④ Seismic Load Profile 에서 Make Seismic Load Calc. Sheet 로 spf 파일을 저장합니다.",
        ],
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s2-10-seismic-loads-menu.webp",
        alt: "Load 탭의 Lateral 그룹에서 Seismic Loads 를 선택하는 화면",
        width: 800,
        markers: [
          {
            x: 90,
            y: 38,
            note: "[Seismic Loads] 를 클릭합니다.",
          },
        ],
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s2-10-seismic-loads-dialog.webp",
        alt: "Static Seismic Loads 창에서 Add 버튼을 누르는 화면",
        width: 500,
        markers: [
          {
            x: 88.7,
            y: 14.6,
            note: "[Add] 를 클릭합니다.",
            box: { w: 21.6, h: 7, borderWidth: 3 },
            numberCorner: "top-left",
          },
        ],
      },
      {
        type: "paragraph",
        text: "해당 건물 설계개요의 지진하중 파트(지진구역·지역계수·지반계수·중요도계수·감쇠비·반응수정계수)를 보고 아래 Add/Modify Seismic Load Specification 창에 그대로 입력합니다. 고유주기는 직접 계산하는 대신 Approximate Period 옆 […] 버튼으로 Period Calculator 를 열어 자동 산출합니다.",
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s2-10-seismic-load-spec-01.webp",
        alt: "Add/Modify Seismic Load Specification 창 상단 — Seismic Zone·EPA(S)·Site Class·Importance 입력",
        width: 500,
        markers: [
          {
            x: 50.5,
            y: 66.6,
            note: "Seismic Zone·EPA(S)·Site Class·Importance 를 설계개요와 같은 값으로 입력합니다.",
            hideNumber: true,
          },
        ],
      },
      {
        type: "image-pair",
        left: {
          src: "/images/resources/pf3d-ads-to-gen/s2-10-seismic-load-spec-02.webp",
          alt: "Structural Parameters — Approximate Period 옆 […] 버튼",
          width: 312,
          markers: [
            {
              x: 93,
              y: 48,
              note: "Approximate Period 옆 […] 버튼을 클릭해 Period Calculator 를 엽니다. Response Modification Factor(R) 도 함께 입력합니다.",
              box: { w: 9, h: 16, borderWidth: 2 },
              hideNumber: true,
            },
          ],
        },
        right: {
          src: "/images/resources/pf3d-ads-to-gen/s2-10-period-calculator.webp",
          alt: "KDS 41-17 Period Calculator 창에서 고유주기 산정식을 선택하는 화면",
          width: 312,
          markers: [
            {
              x: 50,
              y: 49.5,
              note: "건물 유형에 맞는 산정식을 선택합니다 (예: 4. T = 0.0488hn^0.75). hn·N 은 자동으로 채워집니다.",
              box: { w: 98, h: 10, borderWidth: 2 },
              numberCorner: "top-center",
            },
            {
              x: 67,
              y: 93,
              note: "[OK] 를 클릭해 계산된 고유주기를 반영합니다.",
              box: { w: 21, h: 12, borderWidth: 2 },
              numberCorner: "top-right",
            },
          ],
        },
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s2-10-seismic-load-spec-03.webp",
        alt: "Seismic Load Direction Factor 입력과 Apply/OK 버튼",
        width: 500,
        markers: [
          {
            x: 49.7,
            y: 7.4,
            note: "Load Case Name 은 EX 로 두고 **X-Direction 1 / Y-Direction 0** 을 입력합니다. (**EY 케이스는 X-Direction 0 / Y-Direction 1**)",
            box: { w: 97, h: 13 },
          },
          {
            x: 85.3,
            y: 95,
            note: "입력 후 Apply. **EX·EY 두 케이스 모두** 입력했다면 OK 로 닫습니다.",
            box: { w: 26.4, h: 9, borderWidth: 3 },
            numberCorner: "top-left",
          },
        ],
      },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s2-10-seismic-spf-save.webp",
        alt: "Seismic Load Profile 창에서 Make Seismic Load Calc. Sheet 로 spf 파일을 저장하는 화면",
        width: 700,
        markers: [
          {
            x: 21.8,
            y: 85.5,
            note: "[Make Seismic Load Calc. Sheet] 를 클릭해 spf 파일로 저장합니다.",
            box: { w: 39.5, h: 4.5, borderWidth: 3 },
          },
        ],
      },
      { type: "heading", text: "2-11. 모델링 mgt 파일 Export", id: "gen-export" },
      {
        type: "annotated-image",
        src: "/images/resources/pf3d-ads-to-gen/s2-11-gen-export-menu.webp",
        alt: "midas Gen 의 Export > MGTX file (for GEN NX) 메뉴 위치",
        width: 600,
        markers: [
          {
            x: 16,
            y: 45,
            note: "[Export] 를 클릭합니다.",
          },
          {
            x: 68,
            y: 11,
            note: "[MGTX file (for GEN NX)] 을 클릭해 mgt 파일로 저장합니다.",
          },
        ],
      },
      { type: "heading", text: "3. Wall 배근 리스트", id: "wall-rebar" },
      {
        type: "callout",
        tone: "info",
        text: "BeST Pro 작업에는 **Lock key 가 필요합니다.**",
      },
      {
        type: "list",
        items: [
          "① BeST Pro 에서 [RC] > [batch Wall] 클릭.",
          "② Excel 로 출력 → ③ 출력할 벽체 선택 창에서 바로 OK.",
          "④ Excel 파일을 저장한 뒤 열어 ⑤ **배근이 '개수'로 표현된 부재**를 찾습니다 (예: 14-D10).",
        ],
      },
      {
        type: "image",
        src: "/images/resources/pf3d-ads-to-gen/29-best-batch-wall.webp",
        alt: "BeST Pro 의 batch Wall 메뉴와 출력할 벽체 선택 창",
        caption: "3-1 ①②③. batch Wall 을 Excel 로 출력",
      },
      {
        type: "image",
        src: "/images/resources/pf3d-ads-to-gen/30-wall-excel-save.webp",
        alt: "출력한 Excel 파일을 저장하는 화면",
        caption: "3-1 ④. Excel 파일 저장",
      },
      {
        type: "image",
        src: "/images/resources/pf3d-ads-to-gen/31-rebar-count-find.webp",
        alt: "배근이 개수로 표현된 벽체 부재를 찾은 표",
        caption: "3-1 ⑤. 개수로 표현된 배근 찾기 (예: 14-D10)",
      },
      { type: "heading", text: "3-2. 벽체 배근 수정", id: "wall-rebar-edit" },
      {
        type: "list",
        items: [
          "① [배근형식 변경] 에서 '간격으로 입력(단부보강근 사용)' 선택.",
          "② **철근 개수를 0 으로** 만듭니다 (Alt+Enter 를 누르면 아래 박스에 복사됩니다).",
          "③ 간격을 계산해 입력합니다.",
        ],
      },
      {
        type: "paragraph",
        text: "**간격 = { L − (2dc + df) } ÷ (N/2 − 1).** 여기서 L 은 벽 길이, dc 는 피복 두께, df 는 전단 철근 직경, N 은 수직 철근 개수입니다. **철근이 2줄로 배근되므로 개수를 2로 나눕니다.**",
      },
      {
        type: "callout",
        tone: "info",
        text: "예) 길이 1,000mm 벽에 14-D10, 피복 40mm, 전단철근 직경 10mm 이면 {1,000 − (2×40 + 10)} ÷ (14/2 − 1) = 151.666mm.",
      },
      {
        type: "image",
        src: "/images/resources/pf3d-ads-to-gen/32-wall-rebar-edit.webp",
        alt: "BeST 벽체 배근 화면과 배근 형식 변경 대화상자, 간격 계산식",
        caption: "3-2. 개수 배근을 간격 배근으로 변경",
      },
      { type: "heading", text: "3-3. 벽체 배근 리스트 Export", id: "wall-rebar-export" },
      {
        type: "list",
        items: [
          "① [출력] > [요약 계산결과 출력(벽부호별)] 클릭 — 벽부호별 TXT 로 출력합니다.",
          "② 출력할 벽체 선택 창에서 OK 후 저장.",
        ],
      },
      {
        type: "image",
        src: "/images/resources/pf3d-ads-to-gen/33-wall-list-export.webp",
        alt: "BeST 의 출력 메뉴에서 요약 계산결과 출력(벽부호별)을 선택한 화면",
        caption: "3-3 ①. 벽부호별 요약 계산결과 출력",
      },
      {
        type: "image",
        src: "/images/resources/pf3d-ads-to-gen/34-wall-export-save.webp",
        alt: "출력할 벽체 선택 창과 TXT 파일 저장 화면",
        caption: "3-3 ②. TXT 파일로 저장",
      },
      {
        type: "paragraph",
        text: "아래 세 파일이 모두 준비되면 이 단계는 완료입니다.",
      },
      {
        type: "image",
        src: "/images/resources/pf3d-ads-to-gen/35-final-files.webp",
        alt: "완성된 TEXT.TXT, mgt, spf 세 파일 목록",
        caption: "완료 — ◯◯동 TEXT.TXT · ◯◯동.mgt · ◯◯동.spf",
      },
    ],
  },
  {
    slug: "ai-adoption-concept",
    category: "기술 가이드",
    title: "개발이란 무엇인가",
    summary:
      "한 번도 개발을 해보지 않은 사람을 위한 첫 번째 이야기 — 개발이 왜 잘게 쪼개는 일인지, 에러 메시지를 어떻게 다뤄야 하는지 정리했습니다. (개발 입문 01)",
    updatedAt: "2026-08-31",
    body: [
      {
        type: "video-story",
        eyebrow: "시작하기 전",
        title: "샌드위치 만들지 못한 아빠",
        paragraphs: [
          "아이들이 '샌드위치 만드는 방법'을 종이에 적고, 아빠는 그 종이에 적힌 대로만 정확히 따라 합니다. 결과는 엉망이 됩니다. 잼을 다른 손에 바르고, 빵을 통째로 뭉개고, 아이들은 답답해서 소리를 지릅니다.",
          "아빠가 방법을 몰라서가 아닙니다. 아이들 머릿속에 있는 것과, 종이에 적힌 것이 달랐기 때문입니다.",
        ],
        comparison: {
          leftLabel: "아이들이 적은 것",
          leftText: "“빵에 잼을 발라주세요.” — 당연히 알아들을 거라 믿고 생략한 말들.",
          rightLabel: "아빠가 실제로 한 일",
          rightText: "봉지째 빵에, 손에 잼을 짜서, 뭉개듯이 바름 — 종이에 적힌 그대로.",
        },
        note: "컴퓨터가 딱 이 아빠 상태입니다. 이 영상이 개발이 무엇인지 가장 짧게 보여줍니다.",
        video: { label: "샌드위치 만들기", url: "https://youtu.be/3VG2OgkRJK0" },
      },
      { type: "heading", text: "A에서 Z로 가지 않는다", id: "a-to-z" },
      {
        type: "paragraph",
        text: "'A에서 Z로 가줘'라고 하면 될 것 같지만 그렇지 않습니다. 개발은 A → B → C → D → … → Z 로 가는 여정이고, 화살표 하나하나마다 세 가지를 정해줘야 합니다 — B는 무엇을 받는지(입력), B는 무엇을 내놓는지(출력), 제대로 됐는지 어떻게 확인하는지(확인).",
      },
      {
        type: "paragraph",
        text: "이 세 가지가 정해지면 B는 완성된 조각입니다. 조각들이 이어지면 전체가 됩니다. 샌드위치로 다시 보면, 아이들이 적어야 했던 건 '샌드위치 만드는 법'이 아니라 이런 것이었습니다.",
      },
      {
        type: "table",
        headers: ["단계", "입력", "출력", "확인"],
        rows: [
          ["1", "봉지에 든 식빵", "접시 위의 빵 두 장", "두 장이 맞는가"],
          ["2", "뚜껑 닫힌 잼병", "뚜껑 열린 잼병", "병이 열렸는가"],
          ["3", "뚜껑 열린 잼병, 칼", "칼끝에 잼 한 스푼", "칼에 잼이 묻었는가"],
          ["4", "잼 묻은 칼, 빵 한 장", "잼 발린 빵", "빵 윗면에 발렸는가"],
        ],
      },
      {
        type: "paragraph",
        text: "이렇게 적으면 아빠가 손에 잼을 바를 수가 없습니다. 3단계의 출력이 '칼끝에 잼'이고, 4단계는 그 칼을 빵에 대는 것이니까요.",
      },
      {
        type: "callout",
        tone: "info",
        text: "답답해 보이지만 이게 개발입니다. 그리고 익숙해지면 답답하지 않습니다.",
      },
      {
        type: "paragraph",
        text: "그래서 개발은 코드를 외우거나 문법을 아는 일이 아닙니다. 그건 도구고, 요즘은 도구를 다루는 부담이 예전보다 훨씬 줄었습니다. 정말 필요한 건 '내가 하는 일을 정확히 설명할 수 있는가'입니다. 그리고 그건 우리가 매일 하는 일이기도 합니다. 후배에게 일을 넘길 때, 도면에 주기를 달 때, 계산서에 가정을 적을 때 — 머릿속에 있는 걸 밖으로 꺼내 적는 일이니까요. 다만 컴퓨터는 후배보다 훨씬 곧이곧대로 알아듣는다는 것, 그 차이 하나뿐입니다.",
      },
      {
        type: "image",
        src: "/images/resources/what-is-dev.jpg",
        alt: "로직 생각 → 코딩 → 프로그램 완성 세 단계를 보여주는 손그림",
        caption: "Step 1. 로직 생각 → Step 2. 코딩 → Step 3. 프로그램 완성",
      },
      { type: "heading", text: '"확인" 칸을 빠뜨리지 마세요', id: "verify" },
      {
        type: "paragraph",
        text: "세 칸 중에 가장 자주 빠지는 게 확인입니다. 받는 것과 내놓는 것만 적고 넘어가기 쉽습니다. 그런데 우리 일에서는 이 칸이 제일 중요합니다. 틀린 결과가 나왔을 때, 어느 단계에서 틀렸는지 찾을 수 있어야 하기 때문입니다. 확인 방법이 없으면 전체가 한 덩어리가 되고, 뭐가 잘못됐는지 알 방법이 없어집니다.",
      },
      {
        type: "callout",
        tone: "info",
        text: "우리가 구조 검토할 때 중간중간 검산하는 것과 같습니다. 마지막 숫자만 보고는 어디가 틀렸는지 모릅니다.",
      },
      { type: "heading", text: "실제로 해보면 이런 느낌입니다", id: "in-practice" },
      {
        type: "list",
        items: [
          "안 되는 게 정상입니다 — 개발하는 시간의 대부분은 안 되는 상태입니다. 되는 순간이 오히려 드뭅니다. 열 번 고쳐서 되면 잘한 겁니다. 처음 한 번에 되면 그게 이상한 겁니다.",
          "부분 점수가 없습니다 — 구조 계산은 여유를 조금 더 두면 대체로 안전측으로 넘어갑니다. 개발은 다릅니다. 쉼표 하나가 빠지면 90%가 아니라 아예 안 됩니다. 어려워서가 아니라 성질이 그렇습니다. 이걸 모르면 처음 막혔을 때 '나는 소질이 없나 보다'라고 생각하게 되는데, 전혀 그렇지 않습니다.",
          "빨간 글씨는 혼내는 게 아닙니다 — 뭔가 잘못되면 화면에 영어로 된 빨간 메시지가 뜹니다. 위축될 필요 없습니다. 아래에서 따로 다룹니다.",
          "되돌릴 수 있습니다 — 망가뜨려도 이전 상태로 돌아갈 수 있는 방법이 있습니다. 그래서 과감하게 이것저것 해볼 수 있습니다. 이게 없으면 뭘 건드리기가 무서워서 아무것도 못 합니다.",
          "한 번에 완성하지 않습니다 — 제일 작은 걸 먼저 동작시키고, 거기서 조금씩 키웁니다. 완성된 그림을 그려놓고 시작하면 대부분 중간에 엎어집니다.",
        ],
      },
      { type: "heading", text: "에러 메시지에 답이 있습니다", id: "error-messages" },
      {
        type: "callout",
        tone: "warning",
        text: "이 글에서 딱 하나만 기억하신다면 이걸 기억해 주세요 — 에러 메시지는 문제가 아니라 답입니다.",
      },
      {
        type: "paragraph",
        text: "처음 개발을 접한 사람이 가장 많이 하는 행동이 있습니다. 빨간 글씨가 뜨면 읽지 않고 닫는 것입니다. 영어라서, 길어서, 무섭게 생겨서. 그리고 코드를 이리저리 바꿔 보며 요행을 바랍니다. 이게 제일 오래 걸리는 길입니다.",
      },
      {
        type: "paragraph",
        text: "에러 메시지는 컴퓨터가 할 수 있는 가장 친절한 행동입니다. 어디서 멈췄는지, 왜 멈췄는지를 알려주고 있는 거니까요. 사람으로 치면 '3층 도면 파일이 없어서 여기서 못 하겠는데요.'라고 말하는 겁니다. 이걸 안 읽고 넘기는 건, 후배가 뭐가 안 된다고 말하는데 듣지 않고 혼자 답답해하는 것과 같습니다.",
      },
      {
        type: "table",
        headers: ["알려주는 것", "뜻"],
        rows: [
          ["어느 줄에서 멈췄는가", "문제가 있는 위치"],
          [
            "어떤 종류의 문제인가",
            "파일이 없다 / 숫자여야 하는데 글자가 왔다 / 이름을 못 찾겠다",
          ],
          ["무엇을 기대했는데 무엇이 왔는가", "원인에 가장 가까운 단서"],
        ],
      },
      {
        type: "paragraph",
        text: "이 세 가지가 모이면 대체로 답이 나옵니다. 개발자들도 에러를 외워서 고치는 게 아닙니다. 메시지를 읽고 찾아서 고칩니다.",
      },
      {
        type: "list",
        items: [
          "하나 · 일단 끝까지 읽습니다 — 길어 보여도 정작 중요한 건 마지막 한두 줄인 경우가 많습니다. 영어라도 파일 이름, 줄 번호, 숫자는 그대로 보입니다.",
          "둘 · 통째로 복사해서 검색하거나 물어봅니다 — 읽고 이해하려고 애쓸 필요 없습니다. 메시지를 그대로 복사해서 검색창에 넣거나 AI에게 붙여넣으면 됩니다. 나만 겪는 문제가 아니라서, 대부분 이미 답이 나와 있습니다.",
          "셋 · 한 번에 하나씩 고칩니다 — 에러가 여러 개 떠도 대개 첫 번째 것 하나만 고치면 나머지가 같이 사라집니다. 앞에서 멈추는 바람에 뒤가 줄줄이 어긋난 경우가 많기 때문입니다.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        text: "진짜 무서운 건 에러가 아닙니다 — 에러는 멈추기라도 하니 알아챌 수 있습니다. 그런데 기둥이 24개인데 22개만 세고 조용히 표를 뽑아내면, 아무도 모르는 채로 넘어갑니다. 우리 일에서는 이쪽이 진짜 사고입니다. 각 단계마다 결과가 맞는지 볼 방법을 정해 두면, 조용히 틀리는 걸 잡아낼 수 있습니다. 에러는 반갑게, 조용한 결과는 의심스럽게. 이게 몸에 붙으면 절반은 넘어온 겁니다.",
      },
      {
        type: "heading",
        text: "덧붙임 · 개발·프로그래밍·코딩, 무엇이 다른가",
        id: "terms-basic",
      },
      {
        type: "paragraph",
        text: "세 단어를 섞어 쓰는 경우가 많은데, 구분해두면 이후 자료가 훨씬 편해집니다.",
      },
      {
        type: "list",
        items: [
          "개발(Development) — 요구사항 분석 → 설계 → 구현 → 테스트 → 배포까지 전 과정 (뒤의 '개발 프로세스' 표 참고).",
          "프로그래밍 언어 — 컴퓨터가 이해하는 언어. Python, Java, JavaScript 등이 있고 쓰임새가 각각 다릅니다.",
          "코딩(Coding) — 그 언어로 컴퓨터에 시킬 명령을 적는 일. 편지를 쓰듯, 상대(컴퓨터)가 알아들을 문법으로 적는 것입니다.",
          "코딩 로직(Logic) — 문제를 푸는 순서를 짜는 것. 라면 끓이기로 치면 '물이 끓었는가(조건) → 안 끓었으면 계속 기다림(반복) → 끓으면 면 넣기(순서)' 같은 흐름입니다.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "이 네 개념을 구분해두면 '코딩'과 '개발'을 같은 말로 오해하지 않게 됩니다. 코딩은 개발의 한 조각(구현 단계)일 뿐입니다.",
      },
      {
        type: "link",
        label: "브런치 · 비개발자를 위한 최소한의 개발 용어",
        url: "https://brunch.co.kr/@belleyejinkim/11",
        description: "이 구분에 참고한 원문입니다.",
      },
      { type: "heading", text: "개발 프로세스", id: "process" },
      {
        type: "paragraph",
        text: "개발이란, 카카오톡·유튜브·엑셀·게임 앱처럼 우리가 매일 쓰는 프로그램이 만들어지는 과정 전체를 말합니다. 보통 아래 다섯 단계를 거칩니다.",
      },
      {
        type: "table",
        headers: ["단계", "뜻"],
        rows: [
          ["1. 요구사항 분석", "무엇을 만들지 결정"],
          ["2. 설계", "어떻게 만들지 기획과 구조 작성"],
          ["3. 구현", "프로그래밍 언어로 실제 프로그램 작성 (흔히 말하는 '코딩')"],
          ["4. 테스트", "의도대로 동작하는지 검증하고 에러 수정"],
          ["5. 배포", "완성된 프로그램을 사용자에게 제공"],
        ],
      },
      {
        type: "paragraph",
        text: "회사에서 '개발 좀 해주세요', '개발 다 됐어요' 라고 말할 때는 보통 이 중 3번(구현) 하나만 가리키는 경우가 많습니다. 하지만 원래 '개발'은 이 다섯 단계 전부를 묶어 부르는 말입니다.",
      },
      {
        type: "callout",
        tone: "info",
        text: '"이 도면 보고 기둥 일람표 좀 뽑아줘."',
      },
      {
        type: "paragraph",
        text: "이 한 문장으로 대체로 일이 됩니다. 후배가 알아서 채워 넣기 때문입니다. 어느 레이어를 볼지, 기둥과 벽을 어떻게 구분할지, 표 양식은 어떤 걸 쓸지, 애매하면 물어볼지 말지. 이 전부가 말하지 않아도 공유되는 것들입니다. 같은 사무실에서 같은 일을 해왔으니까요.",
      },
      {
        type: "paragraph",
        text: "컴퓨터에는 그게 없습니다. 우리 사무실 관행을 모릅니다. 도면을 본 적도 없고, 기둥이 뭔지도 모릅니다. '적당히'나 '알아서'라는 말을 이해하지 못합니다. 애매하게 시키면 애매하게 하는 게 아니라, 엉뚱하게 하거나 아예 멈춥니다.",
      },
      {
        type: "paragraph",
        text: "그래서 개발은 이 다섯 단계 각각을, 컴퓨터가 오해할 수 없을 만큼 촘촘하게 채우는 일입니다.",
      },
      { type: "heading", text: "부록 · 알아두면 편한 말들", id: "appendix" },
      {
        type: "paragraph",
        text: "당장 외울 필요는 없습니다. 나오면 '아 그거' 하는 정도면 충분합니다.",
      },
      {
        type: "table",
        headers: ["용어", "뜻"],
        rows: [
          ["코드", "컴퓨터에게 시킬 일을 적어놓은 글"],
          ["함수", "조각 하나. 무언가를 받아서 무언가를 내놓는 단위"],
          ["입력 / 출력", "받는 것 / 내놓는 것"],
          ["실행", "적어놓은 대로 컴퓨터가 해보는 것"],
          ["에러", "실행하다 멈춘 것. 왜 멈췄는지 메시지가 함께 나옴"],
          ["디버깅", "왜 안 되는지 찾아서 고치는 일. 개발 시간의 대부분"],
          ["버전 관리", "고치기 전 상태를 저장해 두는 것. 언제든 되돌아갈 수 있음"],
          ["배포", "만든 것을 남들이 쓸 수 있게 내놓는 것"],
        ],
      },
      { type: "heading", text: "다음 편에서", id: "next" },
      {
        type: "paragraph",
        text: "요즘은 코드를 직접 쓰지 않고도 프로그램을 만들 수 있게 됐습니다. 바이브 코딩이라고 부르는 방식입니다. 다음 자료에서는 그게 무엇이고 어떻게 시작하는지 다룹니다. 다만 이번 편의 내용이 그때 더 중요해집니다. 도구가 좋아져도 무엇을 만들지, 어떻게 쪼갤지는 여전히 사람이 정해야 하기 때문입니다.",
      },
      {
        type: "callout",
        tone: "info",
        text: "영상 속 아빠가 좋은 요리사로 바뀌어도, 레시피가 엉망이면 샌드위치는 여전히 엉망입니다.",
      },
    ],
    related: ["ai-adoption-practice"],
  },
  {
    slug: "ai-adoption-practice",
    category: "기술 가이드",
    title: "AI로 실무 시작하기",
    summary:
      "설계기준 조회, 보고서 초안, 검토 시트 자동화까지 — AI를 우리 업무에 붙이는 실전 가이드입니다.",
    updatedAt: "2026-08-31",
    body: [
      {
        type: "paragraph",
        text: "앞선 글 '개발이란 무엇인가'에서 일을 잘게 쪼개고 확인하는 기본 원리를 다뤘습니다. 이번 글은 그 원리를 AI를 이용해 우리 업무에 실제로 적용하는 방법입니다.",
      },
      {
        type: "link",
        label: "이전 글 · 개발이란 무엇인가",
        url: "/resources/ai-adoption-concept",
        description: "일을 잘게 쪼개고 확인하는 기본 원리를 먼저 다룬 글입니다.",
      },
      { type: "heading", text: "AI가 하는 일, 내가 하는 일", id: "roles" },
      {
        type: "paragraph",
        text: "착각하기 쉬운 게 하나 있습니다. AI가 일을 대신 해주는 것이지, 생각을 대신해주는 것이 아닙니다. 무엇을 시킬지, 어떻게 쪼갤지, 잘 됐는지 어떻게 확인할지는 여전히 사람의 몫입니다.",
      },
      { type: "heading", text: "AI에게 맡기는 부분", id: "delegate-ai" },
      {
        type: "list",
        items: [
          "서술부·개요 초안, 반복 문장 정리",
          "설계기준 조항 검색과 개정 이력 정리",
          "검토 시트·자동화 스크립트의 코드 작성",
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
      { type: "heading", text: "실전에서 막히지 않는 다섯 가지 습관", id: "habits" },
      {
        type: "list",
        items: [
          "명시적으로 지시하세요 — '알아서 잘 해줘'는 통하지 않습니다. 원하는 형식, 분량, 기준을 구체적으로 적을수록 결과가 정확해집니다.",
          "자료부터 쥐어주세요 — 도면, 기준 조문, 이전 검토 결과를 먼저 붙여넣으세요. AI는 우리 사무실 관행을 모릅니다. 후배와 달리 '알아서' 채워 넣지 못합니다.",
          "긴 작업은 쪼개서 시키세요 — 앞선 글의 '단계 / 입력 / 출력 / 확인' 표처럼, 큰 작업을 한 번에 맡기지 말고 단계별로 나눠 결과를 확인하며 진행하세요.",
          "한 대화는 한 가지 일만 — 이전 시도가 실패한 기록이 대화에 남아있으면 AI가 계속 그 영향을 받습니다. 방향을 완전히 바꿀 땐 새 대화로 시작하세요.",
          "칭찬은 검증이 아닙니다 — AI에게 아이디어를 물으면 대체로 좋다고 답합니다. 중요한 판단은 '이 방법의 허점을 비판적으로 짚어줘'처럼 반대로도 물어보고, 가능하면 다른 대화나 다른 AI에도 같은 질문을 던져 답을 교차검증하세요.",
        ],
      },
      {
        type: "paragraph",
        text: "첫 번째 습관을 예시로 보면 이렇습니다. 같은 요청도 지시가 구체적일수록 결과가 달라집니다.",
      },
      {
        type: "table",
        headers: ["애매한 지시", "명확한 지시"],
        rows: [
          [
            "보고서 정리해줘",
            "정밀안전점검 보고서 결론부를 800자 이내로 요약해줘. 기존 문체를 유지하고, 수치는 첨부한 표를 그대로 인용해줘.",
          ],
          [
            "이 표 좀 만들어줘",
            "첨부한 도면에서 기둥만 뽑아 표로 만들어줘. 열은 '부재명 / 단면 / 층'만 넣어줘.",
          ],
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
        text: "편하게 쓰되, 아래 세 가지는 예외 없이 지킵니다.",
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
      { type: "heading", text: "잘 먹힌 프롬프트는 팀 자산으로", id: "templates" },
      {
        type: "paragraph",
        text: "보고서 결론부 요약, 검토 체크리스트 생성처럼 반복되는 요청은 매번 처음부터 다시 적을 필요가 없습니다. 한 번 잘 먹힌 프롬프트는 그대로 저장해두고 다음에 재사용하세요. 개인이 쌓아두면 개인 자산에서 그치지만, 팀 채널이나 공유 문서에 남겨두면 팀 전체가 같은 시행착오를 반복하지 않습니다.",
      },
      { type: "heading", text: "오늘의 실습", id: "practice" },
      {
        type: "paragraph",
        text: "본인 업무에서 가장 짜증나는 반복 작업 하나를 정하고, 앞선 글의 '단계 / 입력 / 출력 / 확인' 표를 채워보세요. 거창할 필요 없습니다 — 작을수록 좋습니다.",
      },
    ],
    related: ["ai-adoption-concept"],
  },
];

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}
