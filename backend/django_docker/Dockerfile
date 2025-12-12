FROM python:3.9-slim

WORKDIR /app

# ลง Library สำหรับต่อ MySQL
RUN apt-get update && apt-get install -y default-libmysqlclient-dev gcc pkg-config

# Copy requirements และ Install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# (โค้ดจะถูก Mount เข้ามาผ่าน Volume ใน docker-compose)
EXPOSE 8001