## TEMP BUILD
FROM node:18-slim as builder

COPY package.json /srv/package.json
COPY yarn.lock /srv/yarn.lock


COPY backend /srv/backend/

WORKDIR /srv
RUN yarn install --frozen-lockfile

WORKDIR /srv/backend
RUN yarn build


RUN yarn install --frozen-lockfile --production --ignore-scripts

## BUILD APP
FROM node:18-slim
COPY --from=builder /srv /srv

WORKDIR /srv/backend

ENV NODE_ENV=production

EXPOSE 8080

CMD [ "node" , "./build/index.js"]