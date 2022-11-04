## TEMP BUILD
FROM node:18-slim as builder

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

COPY frontend /app/frontend/

WORKDIR /app
RUN yarn install --frozen-lockfile


WORKDIR /app/frontend
ENV REACT_APP_API_URL=http://localhost:8080
RUN yarn build

RUN yarn install --frozen-lockfile --production --ignore-scripts

## BUILD APP
FROM node:18-slim
COPY --from=builder /app /app

WORKDIR /app/frontend


ENV NODE_ENV=production
EXPOSE 3000

CMD [ "/usr/local/bin/yarn", "run", "serve", "--port", "3000" ]