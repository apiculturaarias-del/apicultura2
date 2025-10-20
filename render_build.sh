#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build

pip install pipenv
pipenv install --deploy --ignore-pipfile

# 🚀 Asegurar que Python encuentre los módulos
export PYTHONPATH=$PYTHONPATH:/opt/render/project/src

# 📦 Crear tablas automáticamente si no existen
echo "📦 Creando tablas en la base de datos si no existen..."
pipenv run python -c "from src.app import app; from api.models import db; app.app_context().push(); db.create_all(); print('✅ Tablas creadas o ya existentes.')"
