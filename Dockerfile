FROM node:20-alpine
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --ignore-scripts
COPY backend/ .
EXPOSE 1337
RUN mkdir -p /app/src
CMD ["sh", "-c", "npm run build && npm run start"]
