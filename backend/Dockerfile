FROM docker.io/library/python:3.13-slim
ENV PYTHONUNBUFFERED=1
WORKDIR /backend

# Install libmagic and wget requirements
RUN apt-get update
RUN apt-get install wget -y

# Copy requirements file (cached if not changed)
COPY requirements.txt .

# Install pip requirements
RUN pip install --no-cache-dir --disable-pip-version-check -r requirements.txt

# Copy all files (this respects .dockerignore)
COPY . .

# Apply missing database migrations and serve application
EXPOSE 80
CMD ["/bin/sh", "-c", "python manage.py migrate;python manage.py runserver 0.0.0.0:80"]

# Define healthcheck
HEALTHCHECK --interval=5s --timeout=1s --retries=10 \
    CMD wget --no-verbose --tries=1 --spider http://127.0.0.1/healthcheck
