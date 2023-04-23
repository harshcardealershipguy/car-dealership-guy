#Production dockerfile

FROM node:18-alpine
RUN apk add --no-cache libc6-compat

WORKDIR /var/www/frontend

ENV NEXT_TELEMETRY_DISABLED 1

COPY package*.json ./
RUN npm install

COPY . .

ARG FRONTEND_ENVIRONMENT_ARG
RUN ["sh", "-c", "node bin/create-nextjs-env-file.js"]

RUN npm run build

EXPOSE 80

CMD ["npm", "run", "start"]

#CMD ["tail", "-f", "/dev/null"]
