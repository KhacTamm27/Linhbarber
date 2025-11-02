#!/bin/bash

# Script để chạy Frontend React App riêng biệt
# Frontend sẽ chạy trên port 3000 (mặc định của react-scripts)

echo "🎨 Đang khởi động Frontend React App..."
echo "📍 Frontend sẽ chạy trên: http://localhost:3000"
echo "📍 API Backend: http://localhost:8000/api"
echo ""
echo "⚠️  Lưu ý: Đảm bảo Backend đang chạy trên port 8000 trước!"
echo ""

npm run client

