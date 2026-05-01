# API Gateway

This gateway uses NGINX to reverse-proxy service requests to each backend service.

## Assigned ports

- API Gateway: `8000`
- product-service: `8001`
- catalog-service: `8002`
- user-service: `8003`
- order-service: `8004`
- payment-service: `8005`
- shipping-service: `8006`
- cart-service: `8007`

## Gateway routes

- `http://localhost:8000/products/` -> product-service
- `http://localhost:8000/categories/` -> catalog-service
- `http://localhost:8000/catalog/` -> catalog-service
- `http://localhost:8000/users/` -> user-service
- `http://localhost:8000/orders/` -> order-service
- `http://localhost:8000/payments/` -> payment-service
- `http://localhost:8000/shipping/` -> shipping-service
- `http://localhost:8000/cart/` -> cart-service

## Run services

Start each Django service on its assigned port, for example:

```powershell
cd .\product-service
.venv\Scripts\activate
python manage.py runserver 0.0.0.0:8001
```

```powershell
cd .\catalog-service
.venv\Scripts\activate
python manage.py runserver 0.0.0.0:8002
```

Repeat for the other services with their assigned ports.

## Run API Gateway

### Option 1: Docker

```powershell
docker run --rm -p 8000:8000 -v ${PWD}:/workspace -w /workspace nginx:stable-alpine nginx -c /workspace/api-gateway/nginx.conf
```

### Option 2: Local NGINX installation

Point NGINX to `api-gateway/nginx.conf` and start it.

## Notes

- The gateway expects backends available at `127.0.0.1` on the configured ports.
- If a backend service uses a different path prefix, update `api-gateway/nginx.conf` accordingly.
