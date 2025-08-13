#!/bin/bash

echo "🚀 Booklighthouse 배포 시작..."

# 의존성 설치
echo "📦 의존성 설치 중..."
npm install

# 프로덕션 빌드
echo "🔨 빌드 중..."
npm run build

# PM2로 앱 시작/재시작
echo "▶️ PM2로 앱 실행 중..."
pm2 start ecosystem.config.js

echo "✅ 배포 완료! http://localhost:3000 에서 확인하세요"