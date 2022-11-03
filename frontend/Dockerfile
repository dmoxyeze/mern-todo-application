## TEMP BUILD
FROM node:18-slim as builder

COPY package.json /srv/package.json
COPY yarn.lock /srv/yarn.lock

COPY frontend /srv/frontend/

WORKDIR /srv
RUN yarn install --frozen-lockfile


WORKDIR /srv/frontend
RUN yarn build

RUN yarn install --frozen-lockfile --production --ignore-scripts

## BUILD APP
FROM node:18-slim
COPY --from=builder /srv /srv

WORKDIR /srv/frontend

ENV NODE_ENV=production


CMD [ "node" , "./build/index.js", "--port", "3000" ]