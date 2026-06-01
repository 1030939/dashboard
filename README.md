# 🎮 게임 서비스 운영 KPI 대시보드 (Game Service KPI Dashboard)

가상의 게임 서비스 운영을 위한 핵심 성과 지표(KPI) 대시보드 프론트엔드 프로젝트입니다. 
본 프로젝트는 순수 Mock 데이터를 활용하여 구현되었으며, Cursor AI와의 체계적인 프롬프트 엔지니어링 협업을 통해 완성되었습니다.

## 🛠 Tech Stack
- **Framework:** React 18 (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Data Visualization:** Recharts

---

## 🚀 Getting Started (실행 방법)

새로운 환경에서 프로젝트를 실행하기 위한 방법입니다. (Node.js 18 이상 권장)

### 1. 패키지 설치
\`\`\`bash
npm install
\`\`\`

### 2. 개발 서버 실행
\`\`\`bash
npm run dev
\`\`\`
서버가 실행되면 브라우저에서 `http://localhost:5173/` 으로 접속하여 대시보드를 확인할 수 있습니다.

---

## 📁 Directory Structure
- `.cursor/`: AI 환각 통제 및 재생산성을 위한 프롬프트 룰(Context, Rule, Skill)
- `/src/data/kpiData.ts`: 대시보드 렌더링을 위한 Mock 데이터
- `/src/components/`: 재사용 가능한 UI 컴포넌트 (Zone별 분리)
- `/src/pages/Dashboard.tsx`: 최상단 상태 관리 및 대시보드 레이아웃

---

## 🤖 AI 프롬프트 엔지니어링 

본 프로젝트는 단순한 코드 생성을 넘어, AI(Cursor)의 환각을 통제하고 데이터 주도적(Data-driven)인 설계를 달성하기 위해 꼼꼼하게 설계되었습니다. `.cursor` 디렉토리의 룰을 기반으로 새로운 Cursor 환경(Clean Room)에서도 아래 4개의 프롬프트를 순서대로 입력하면 완벽히 동일한 대시보드를 재생산할 수 있습니다.

### Phase 1: 기본 레이아웃 및 동적 데이터 렌더링 구축
> **Prompt:** 
"과제 명세서와 .cursor 규칙을 기반으로 전체 대시보드의 기본 레이아웃(A, B, C)을 잡아줘. 우선 Zone A의 핵심 KPI 카드 3개(매출, DAU, MAU)를 만들 건데, 데이터 연동 방식을 고도화할 거야.
[Zone A 데이터 렌더링 규칙]
매출 카드 (동적 합산): /data/kpiData.ts의 summary 매출값을 무시해. 대신 revenueTrend 배열을 import해서, 배열 안에 있는 모든 객체의 매출 항목(monthlyPass + package + paidCurrency)을 reduce로 합산하여 '총매출'을 동적으로 계산해서 화면에 렌더링해 줘.
DAU 및 MAU 카드: 현재 revenueTrend에는 접속자 데이터가 없으므로, 이 두 카드는 기존처럼 summary 배열에서 값을 가져와서 렌더링해.
3개의 카드 모두 숫자는 천 단위 콤마를 찍고, 전일 대비 증감률(상승은 초록색, 하락은 빨간색 등 UI 색상 구분)을 표시해 줘.
(추가로 프로젝트 뼈대를 잡기 위한 Tailwind 초기 세팅(tailwind.config.js 생성 및 index.css 설정)도 네가 완벽하게 다 해줘.)"

### Phase 2: 차트 데이터 시각화 (폰트 겹침 방어 로직)
> **Prompt:** 
"Zone B에 Recharts를 사용하여 3가지 차트를 구현할 건데, 이전의 텍스트 겹침 및 라벨 누락 문제를 완벽히 해결해서 그려줘.
[차트별 필수 데이터 및 형태]
Multi-Line Chart: /data/kpiData.ts의 revenueTrend 데이터 사용. monthlyPass, paidCurrency, package 3개의 선 렌더링 (제목: '전체 매출 변화 (상품별)').
Stacked Bar Chart: revenueTrend 데이터 사용. existingUserRevenue와 newUserRevenue 막대 쌓기(<Bar stackId="a" />) (제목: '전체 매출 구성 (유저 유형)').
Donut Chart: countryRatio 데이터 사용. 가운데가 뚫린 도넛 형태(innerRadius={60}) (제목: '국가별 매출 비율').
[차트 디테일 및 폰트 겹침/누락 완벽 방어 로직] (가장 중요)
각 차트에 제목, <Tooltip />, <Legend />를 포함해.
Y축 라벨('일 매출') 겹침 방지: Y축 라벨 텍스트가 Y축 숫자(4,000, 8,000 등)와 딱 붙지 않도록, 차트의 상위 래퍼에 좌측 마진(margin={{ left: 20 }})을 넉넉히 확보하고, YAxis 속성에서 라벨 위치를 살짝 왼쪽으로 밀어줘(offset={10} 등 조정).
도넛 차트 퍼센트 복구: 도넛 차트 외곽에 각 국가별 퍼센트와 이름이 다시 나타나도록, <Pie label /> 속성을 반드시 추가해. 텍스트가 캔버스 밖으로 잘리지 않게 좌우 마진을 충분히 줘.
X축 라벨('날짜') 및 범례 간격: 상위 래퍼에 하단 마진(margin={{ bottom: 40 }})을 주고, <Legend wrapperStyle={{ paddingTop: "20px" }} /> 속성을 추가해서 X축 텍스트와 범례 간격을 무조건 넓혀줘.
X축 날짜 겹침 방지: 데이터 길이에 비례해 **5~7개 날짜만 추출(interval={0})**하는 스마트 렌더링 로직을 반드시 유지해.
[레이아웃 및 배치 필수 조건]
기존에 완성된 Zone A 레이아웃 코드는 절대 건드리지 마.
Dashboard.tsx의 Zone B 영역은 Tailwind CSS Grid를 사용하되, 데스크톱 기준 3개의 차트가 1줄에 동일선상으로 나란히 배치되도록 해 (grid grid-cols-1 lg:grid-cols-3 gap-6).
Line, Bar, Pie 차트가 각각 정확히 1칸씩 차지하도록 배치해."

### Phase 3: 데이터 테이블 및 드롭다운 필터 구현
> **Prompt:**
"Zone C에 최근 구매 내역 테이블을 구현해. 테이블 필수 요구사항인 데이터 정렬, 텍스트 필터, 페이지네이션을 추가하고, .cursor/skill.md 규칙에 따라 데이터 길이에 상관없이 테이블 너비가 흔들리지 않게 <colgroup>을 사용하여 열 비율을 고정해 줘." 
[테이블 필터 및 UI 조건]
1. 필터 기능: 직접 타이핑하는 텍스트 검색창은 절대 쓰지 마. 대신 '상품명(item)'을 드롭다운(Select tag)으로 클릭해서 선택할 수 있는 필터 기능을 구현해. (예: 전체, VIP 주간 패스, 영웅 소환 패키지 등 데이터를 기반으로 옵션 생성)
2. 테이블 안정성: .cursor/skill.md 규칙에 따라 필터링이나 페이지네이션으로 인해 데이터 길이가 변해도 테이블 너비와 헤더가 절대 흔들리지 않게 <colgroup>을 사용하여 열 비율(%)을 명시적으로 고정해 줘."

### Phase 4: 전역 상태 관리 및 실시간 데이터 연동
> **Prompt:** 
"기간 필터(전체 / 오늘 / 7일 / 30일)를 추가하고, 이를 최상단 Dashboard.tsx로 끌어올려(Lifting State Up) 전역 상태로 관리해 줘. 
[필터링 및 데이터 연동 조건] 1. 선택된 기간 필터에 따라 /data/kpiData.ts의 revenueTrend 배열을 알맞게 잘라서(Slice) 하위 컴포넌트에 내려줘. 2. 이렇게 필터링된 배열이 내려가면, Zone A의 매출 카드가 배열을 다시 reduce로 합산하여 필터 기간에 맞는 '총매출'로 자동 갱신되어야 하고, Zone B의 차트들도 잘려진 날짜만큼만 렌더링되어야 해. 
추가로 보너스 요구사항인 다크 모드 토글, 반응형 1 Column 배치(모바일 뷰), 그리고 Bar 차트 클릭 시 합산 매출과 비중(%)을 보여주는 인터랙션을 추가해." 
