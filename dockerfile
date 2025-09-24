# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código y construir
COPY . .
RUN npm run build

# Etapa 2: Producción
FROM node:18-alpine AS production

WORKDIR /app

# Copiar solo lo necesario desde el builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/.env 
EXPOSE 3000

# Usar Next.js en modo producción
CMD ["npx", "next", "start"]