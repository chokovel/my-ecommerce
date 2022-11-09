FROM node:16-alpine AS dependencies

WORKDIR /app

COPY . .

RUN yarn

RUN yarn tsc

FROM node:16-alpine AS server

WORKDIR /app

COPY . .

COPY --from=dependencies /app/lib ./lib

RUN yarn --production

# RUN ls -ah
EXPOSE 3200

CMD ["yarn", "dev"]
