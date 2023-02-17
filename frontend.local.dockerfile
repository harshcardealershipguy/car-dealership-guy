FROM node:18-alpine
RUN apk add --no-cache libc6-compat

WORKDIR /var/www/frontend

ENV NEXT_TELEMETRY_DISABLED 1



CMD ["npm", "run", "dev"]

#CMD ["tail", "-f", "/dev/null"]