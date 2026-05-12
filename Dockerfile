FROM node:20-alpine AS build
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --ignore-scripts
COPY backend/ .

# strapi build requires these env vars during image build (dummy values only)
ARG APP_KEYS
ARG ADMIN_JWT_SECRET
ARG API_TOKEN_SALT
ARG TRANSFER_TOKEN_SALT
RUN APP_KEYS=${APP_KEYS:-dummy,dummy,dummy,dummy} \
    ADMIN_JWT_SECRET=${ADMIN_JWT_SECRET:-dummy} \
    API_TOKEN_SALT=${API_TOKEN_SALT:-dummy} \
    TRANSFER_TOKEN_SALT=${TRANSFER_TOKEN_SALT:-dummy} \
    npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/config ./config
COPY --from=build /app/package.json ./package.json
EXPOSE 1337
CMD ["npm", "run", "start"]
