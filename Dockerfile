FROM node:20 AS base
WORKDIR /app
RUN npm i -g pnpm
COPY package.json ./
# copy env file
COPY .env .env

RUN pnpm install

COPY . .
RUN pnpm build

FROM node:20-alpine3.19 as release
WORKDIR /app
RUN npm i -g pnpm

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/.next ./.next
# copy env file
COPY --from=base /app/.env ./.env

EXPOSE 3000

CMD ["pnpm", "start"]