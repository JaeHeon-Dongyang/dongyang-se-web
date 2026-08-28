# content/

Git 으로 관리하는 사이트 콘텐츠. 각 파일은 MDX + front matter 이며,
`src/lib/content` 로더를 통해서만 읽는다 (이후 Headless CMS 를 뒤에 붙일 수 있도록 분리).

| 경로 | 용도 |
| --- | --- |
| `company/` | 회사소개 페이지 섹션 본문 |
| `services/` | 4개 사업분야 상세 본문 (`structural-design`, `safety-inspection`, `construction-safety`, `demolition-review`) |
| `resources/` | 기술자료 게시물 (일반) |
| `resources/pf3d-manual/` | PF3D 사용 매뉴얼 (기술자료 게시물 1건, 이후 하위 문서 확장) |

front matter 스키마는 [`../docs/PLAN.md`](../docs/PLAN.md) 8장 참고.
실제 원고는 사용자 제공 예정이며, 미비 항목은 본문에 "콘텐츠 준비 중" 으로 남긴다.
