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
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# При желании в next.config.js можно включить: output: 'standalone'
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


# # gemini:
# # === Этап 1: Сборщик (Builder) ===
# # Используем официальный образ Node.js 20 на базе Alpine Linux.
# # Alpine - это легковесный дистрибутив, что уменьшает размер образа.
# FROM node:20-alpine AS builder

# # Устанавливаем рабочую директорию внутри контейнера.
# WORKDIR /app

# # Копируем файлы с зависимостями.
# # Звездочка (*) используется, чтобы скопировать и package.json, и package-lock.json.
# COPY package*.json ./

# # Устанавливаем зависимости проекта.
# RUN npm install

# # Копируем все остальные файлы проекта в рабочую директорию.
# COPY . .

# # Собираем Next.js приложение для продакшена.
# # Эта команда создает оптимизированную сборку в папке .next.
# RUN npm run build

# # === Этап 2: Продакшн (Production) ===
# # Используем тот же базовый образ для финального контейнера.
# FROM node:20-alpine

# # Устанавливаем рабочую директорию.
# WORKDIR /app

# # Копируем package.json и package-lock.json для установки только продакшн-зависимостей.
# COPY --from=builder /app/package*.json ./

# # Устанавливаем только те зависимости, которые нужны для работы приложения (не для сборки).
# # Это значительно уменьшает размер итогового образа.
# RUN npm install --omit=dev

# # Копируем собранное приложение из этапа "builder".
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/next.config.js ./next.config.js

# # Next.js слушает порт 3000 по умолчанию.
# # Мы "открываем" этот порт, чтобы Docker мог связать его с портами хост-машины.
# EXPOSE 3000

# # Команда для запуска приложения.
# # `npm start` обычно запускает `next start`.
# CMD ["npm", "start"]