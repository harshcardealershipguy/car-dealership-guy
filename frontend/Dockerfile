#Production dockerfile

FROM node:18-alpine
RUN apk add --no-cache libc6-compat

WORKDIR /var/www/frontend

ENV NEXT_TELEMETRY_DISABLED 1

COPY package*.json ./
RUN npm install

COPY . .

RUN bin/create-nextjs-env-file.js


RUN npm run build

EXPOSE 80

CMD ["npm", "run", "start"]

#CMD ["tail", "-f", "/dev/null"]
