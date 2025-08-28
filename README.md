# book-lighthouse-front
책바다 서비스를 최소비용으로 이용할 수 있게 도서관 집합을 알려주는 서비스 '책등대'의 프론트 코드

## 실행 관련
```
VITE_API_HOST       // API 서버 호스트
VITE_SENTRY_DSN     // SENTRY 접근 DSN
VITE_BOOKBADA_URL   // 책바다 바로가기를 위한 링크
```
외에도 SENTRY, MS Clarity 관련 속성들이 하드코딩되어있는데 이 부분을 직접 조정해야한다. (시간이 부족한 관계로 하드코딩해 처리했다.)

package.json 의 의존성을 설치합니다.

PM2를 이용해 Nodejs 서버를 구동합니다.

## 프로젝트명 변경
현 프로젝트 '책등대'는 북테크, 책바닷가 등의 이름을 거쳐 지어진 이름입니다. 
따라서 bookshore 같은 이름이 아직 남아있을 수 있습니다.

## 의존성
주로 MIT, Apache-2.0, ISC, BSD 계열로 상업적 이용을 허용.

```
"dependencies": {
    "@sentry/react": "^10.5.0",
    "@types/node": "^20.19.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "clsx": "^2.1.1",
    "lucide-react": "^0.263.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.1",
    "react-scripts": "5.0.1",
    "tailwind-merge": "^2.5.5",
    "typescript": "^4.9.5"
    },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.0.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "serve": "^14.2.1",
    "tailwindcss": "^3.3.6",
    "vite": "^7.1.2",
    "@types/node": "^20.19.0"
}
  ```

## 그 외
일부 소스코드는 v0, Claude를 통해 생성되었습니다.
