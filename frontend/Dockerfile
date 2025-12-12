# เปลี่ยนจาก node:18-alpine เป็น node:22-alpine
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN if [ -f package.json ]; then npm install; fi

COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]