FROM python:3.10-slim

WORKDIR /app

# Instalamos las dependencias del sistema necesarias para compilar pymysql u otras
RUN apt-get update && apt-get install -y pkg-config default-libmysqlclient-dev build-essential

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "run.py"]