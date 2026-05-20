# Ecommerce microservices

## Yêu cầu

- Docker Desktop / Docker Engine
- Docker Compose
- Windows: PowerShell hoặc CMD

## Khởi chạy nhanh

Từ thư mục gốc repo:

```powershell
docker compose up --build
```

Sau khi chạy xong:

- Frontend: `http://localhost:3000`
- API gateway: `http://localhost:8000`
- Product service: `http://localhost:8001`
- Catalog service: `http://localhost:8002`
- User service: `http://localhost:8003`
- Order service: `http://localhost:8004`
- Payment service: `http://localhost:8005`
- Shipping service: `http://localhost:8006`
- Cart service: `http://localhost:8007`

## Cấu trúc chính

- `docker-compose.yml`: cấu hình tất cả service và Postgres
- `api-gateway/nginx.conf`: proxy routes tới từng service
- `ecommerce-home-page/`: frontend Next.js
- `product-service/`, `catalog-service/`, `user-service/`, `order-service/`, `payment-service/`, `shipping-service/`, `cart-service/`: Django microservices
- `ai-service/`: dịch vụ AI (recommend/chatbot)
- `model/`: nơi chứa weights model local, không commit vào Git

## Tạo project Django mới

Nếu bạn muốn thêm dịch vụ Django mới, làm theo các bước sau trong thư mục gốc repo hoặc trong thư mục dịch vụ mới:

```powershell
mkdir new-service
cd new-service
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install django djangorestframework requests
django-admin startproject new_service .
python manage.py startapp app
```

Sau đó, trong `new_service/settings.py`:

- thêm `rest_framework` và `app` vào `INSTALLED_APPS`
- cấu hình `DATABASES` để dùng Postgres từ `docker-compose.yml`
- cấu hình `ALLOWED_HOSTS = ['*']` cho dev local

Tạo file `new-service/requirements.txt` chứa:

```text
django
djangorestframework
requests
psycopg2-binary
```

Tạo `new-service/app/views.py`, `urls.py`, `admin.py` theo mẫu service hiện có.

Trong `docker-compose.yml`, thêm service mới với `build`, `volumes`, `ports`, và `environment` tương tự các service Django khác.

## AI service và model weights

Repository không lưu trực tiếp các file model `.pth` để tránh nặng. Nếu bạn có model weights, hãy đặt vào thư mục `model/`:

- `model/model_best_RNN.pth`
- `model/model_best_LSTM.pth`
- `model/model_best_biLSTM.pth`

`.gitignore` đã loại trừ các file này, vì vậy bạn cần copy/mount file model vào folder này khi triển khai.

## Dọn dẹp

Khi muốn dừng và xóa volume tạm:

```powershell
docker compose down -v
```

## Lưu ý

- Postgres được chạy trong một container và khởi tạo nhiều database cho từng service.
- Nếu muốn chạy riêng từng service mà không cần Docker, bạn có thể tạo virtualenv và cài các package trong `requirements.txt`, nhưng hiện repo ưu tiên Docker.
