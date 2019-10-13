FROM node:10 as builder

WORKDIR /tmp

COPY . /tmp
RUN cd functions && npm install && cd .. && npm install @angular/cli && npm install && npm run build:ssr && npm run copy:static && npm run build:sitemap

FROM node:10

EXPOSE 80

COPY --from=builder /tmp/dist /dist
RUN cd dist && npm install firebase

CMD [ "node", "dist/server.js" ]


