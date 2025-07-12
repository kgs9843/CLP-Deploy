# 🥗 ClearPlate

> 환경을 위한 작은 실천, 음식 공유/기부 플랫폼  
> 👉 **배포 주소**: (https://www.clearplate.store)

---
ㅋ
## 📌 소개

ClearPlate는 음식점/소상공인의 음식 쿠폰 발급, 기부 내역 관리,  
그리고 지도 기반 탐색 기능을 통해 **남는 자원을 효율적으로 공유**하고  
소비자가 **환경을 위한 기부 활동에 참여**할 수 있도록 돕는 웹 애플리케이션입니다.

---

## ✨ 주요 기능

- ✅ **쿠폰 시스템**  
  - 쿠폰 발급, 사용, 잔여 수량 확인  
  - 기부 참여 시 자동 쿠폰 발급

- 🗺 **지도 기반 탐색**  
  - 주변 가게/기부처를 Kakao Map SDK로 확인
  - Carousel UI로 편리하게 선택

- 🧾 **기부 내역 관리**  
  - 기부 결정 팝업, 기부 내역 페이지
  - 사용자별 기부 히스토리 제공

- 🎨 **깔끔한 UI/UX**  
  - Tailwind CSS로 반응형 UI
  - 모달, 팝업, 캐러셀, 경고창 등 인터랙션

---

## ⚙️ 기술 스택

- **Frontend**: React + Vite
- **스타일링**: Tailwind CSS, Framer Motion
- **지도**: Kakao Map SDK
- **상태 관리**: Zustand
- **빌드 & 배포**: Vercel

---

## 🛠️ 설치 및 개발

```bash
# 의존성 설치
npm install

# 로컬 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
