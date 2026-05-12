FROM node:20-alpine AS build
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --ignore-scripts
COPY backend/ .
RUN mkdir -p /app/src
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/config ./config
COPY --from=build /app/public ./public
COPY --from=build /app/src ./src
COPY --from=build /app/package.json ./package.json
EXPOSE 1337
CMD ["npm", "run", "start"]
