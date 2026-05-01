- các bước tạo django từng service
python -m venv .venv
.venv\Scripts\activate
pip install django djangorestframework requests
django-admin startproject customer_service .
python manage.py startapp app