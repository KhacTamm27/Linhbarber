#!/bin/bash

# Script để kill process trên port cụ thể
# Usage: ./kill-port.sh 5000

PORT=${1:-5000}

echo "🔍 Tìm process trên port $PORT..."

PID=$(lsof -ti:$PORT)

if [ -z "$PID" ]; then
    echo "✅ Port $PORT đã free!"
else
    echo "🔪 Đang kill process $PID..."
    kill -9 $PID
    echo "✅ Đã kill process trên port $PORT!"
fi

# Kill nodemon nếu có
pkill -f nodemon 2>/dev/null && echo "✅ Đã kill nodemon" || true

# Verify
sleep 1
if lsof -ti:$PORT > /dev/null 2>&1; then
    echo "⚠️  Vẫn còn process trên port $PORT, thử lại..."
    lsof -ti:$PORT | xargs kill -9 2>/dev/null
else
    echo "🎉 Port $PORT hoàn toàn free!"
fi

