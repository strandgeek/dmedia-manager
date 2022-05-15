FROM node:16 AS builder
# Create app directory
WORKDIR /usr/src/app
COPY . .
# Setup Web
WORKDIR /usr/src/app/web
RUN npm install
# Setup API & Build App Bundle
WORKDIR /usr/src/app/api
RUN npm install && npm run build && npx prisma generate


FROM node:16
WORKDIR /root/
COPY --from=builder /usr/src/app/api ./
CMD ["npm", "start"]  