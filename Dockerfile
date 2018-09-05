FROM node:10-alpine as builder
WORKDIR /code
COPY package.json yarn.lock /code/
RUN yarn install
COPY src /code/src
RUN yarn build

FROM node:10-alpine
WORKDIR /code
ENV NODE_ENV=production
COPY package.json yarn.lock /code/
RUN yarn install && \
    yarn cache clean
COPY --from=builder /code/dist /code/dist
CMD ["yarn", "start:prod"]