#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build

pip install pipenv
pipenv install --deploy --ignore-pipfile

export PYTHONPATH=$PYTHONPATH:/opt/render/project/src/src

# -------------------------------
# 4️⃣ Crear tablas automáticamente si no existen
# -------------------------------
echo "📦 Creando tablas en la base de datos si no existen..."
pipenv run python -c "from app import app; from api.models import db; app.app_context().push(); db.create_all(); print('✅ Tablas creadas o ya existentes.')"