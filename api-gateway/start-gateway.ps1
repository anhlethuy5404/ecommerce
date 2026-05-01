$conf = Resolve-Path .\nginx.conf
Write-Output "Starting API Gateway on port 8000 using NGINX..."
Write-Output "NGINX config: $conf"

docker run --rm -p 8000:8000 -v "$conf":/etc/nginx/nginx.conf:ro --name api-gateway nginx:stable-alpine nginx -g 'daemon off;'
