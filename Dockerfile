FROM node:16.15.0
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn
COPY . .
CMD ["yarn","dev"]