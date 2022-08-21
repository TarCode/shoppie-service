FROM node:18-alpine3.15 AS builder
WORKDIR /app
COPY ./ ./
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
RUN npm run build

FROM node:18-alpine3.15 AS server
WORKDIR /app
COPY package*.json ./
COPY --from=builder ./app/dist ./dist
COPY --from=builder ./app/public ./dist/public
RUN npm install --production
EXPOSE 9001
CMD ["npm", "start"]