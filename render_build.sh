#!/usr/bin/env bash
# exit on error
set -o errexit

# Instala dependencias del frontend
npm install
npm run build

# Instala pipenv (Render no lo trae por defecto)
pip install pipenv

# Instala dependencias del backend
pipenv install --deploy --ignore-pipfile

# Ejecuta cualquier comando adicional (opcional)
# pipenv run python manage.py migrate
# pipenv run python manage.py collectstatic --noinput
# pipenv run python app.py
