# Use Nginx to serve static content
FROM nginx:alpine

# Copy static files to the default nginx public directory
COPY . /usr/share/nginx/html

EXPOSE 80