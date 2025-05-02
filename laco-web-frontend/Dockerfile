FROM node:22-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --configuration=production

FROM nginx:stable-alpine
COPY --from=build /app/dist/laco-web-frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
