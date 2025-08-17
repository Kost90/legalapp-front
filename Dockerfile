# ---------- 1) deps: ставим все зависимости для сборки ----------
FROM node:20-alpine AS deps
WORKDIR /app
# Для некоторых нативных модулей нужен совместимый libc
RUN apk add --no-cache libc6-compat
COPY package*.json ./
# ИСПРАВЛЕНО: Используем npm install, так как он не требует package-lock.json
RUN npm install

# ---------- 2) builder: билдим Next ----------
FROM node:20-alpine AS builder
WORKDIR /app

ARG NEXT_PUBLIC_API_DOMAIN
ARG NEXT_API_ADMIN_KEY
ARG NEXT_JWT_SECRET

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Передаём build-args в ENV, чтобы Next.js увидел их при сборке
ENV NEXT_PUBLIC_API_DOMAIN=$NEXT_PUBLIC_API_DOMAIN
ENV NEXT_API_ADMIN_KEY=$NEXT_API_ADMIN_KEY
ENV NEXT_JWT_SECRET=$NEXT_JWT_SECRET

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------- 3) prod-deps: только прод-зависимости ----------
FROM node:20-alpine AS prod-deps
WORKDIR /app
COPY package*.json ./
# ИСПРАВЛЕНО: Используем npm install, так как он не требует package-lock.json
RUN npm install --omit=dev

# ---------- 4) runner: минимальный рантайм ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Необязательный непривилегированный пользователь
RUN addgroup -g 1001 nodejs && adduser -S nextjs -u 1001

# Копируем только нужное
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package*.json ./
# Если используешь next.config.js или .env.production — скопируй по необходимости
# COPY next.config.js ./

EXPOSE 3000
USER nextjs
# "start" в package.json должен быть "next start"
CMD ["npm", "run", "start"]
