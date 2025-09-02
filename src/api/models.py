from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.usuario}>'

    def serialize(self):
        return {
            "id": self.id,
            "usuario": self.usuario,
        }

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), unique=True, nullable=False)
    descripcion = db.Column(db.String(255), nullable=True)
    image = db.Column(db.String(255), nullable=True)
    types = db.relationship('Type', backref='category', lazy=True)

    def __repr__(self):
        return f'{self.nombre}'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "image": self.image
        }

class Type(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), unique=True, nullable=False)
    descripcion = db.Column(db.String(255), nullable=True)
    image = db.Column(db.String(255), nullable=True)  # <-- añadir
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    items = db.relationship('Item', backref='type', lazy=True)
    
    def __repr__(self):
        return f'{self.nombre}'
    
    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "image": self.image,  # <-- incluir en serialize
            "category_id": self.category_id
        }


class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), unique=True, nullable=False)  # <-- mantenido
    descripcion = db.Column(db.String(255), nullable=True)           # <-- mantenido
    image = db.Column(db.String(255), nullable=True)                 # <-- nueva imagen opcional
    type_id = db.Column(db.Integer, db.ForeignKey('type.id'), nullable=False)

    # Nuevos campos opcionales
    numero_registro_general = db.Column(db.String(120), nullable=True)
    articulo = db.Column(db.String(120), nullable=True)
    nombre_local_tradicional = db.Column(db.String(120), nullable=True)
    referencia_topografica = db.Column(db.String(120), nullable=True)
    numero_piezas = db.Column(db.Integer, nullable=True)
    fecha_origen = db.Column(db.String(120), nullable=True)
    fecha_adquisicion = db.Column(db.String(120), nullable=True)
    procedencia = db.Column(db.String(120), nullable=True)
    autor = db.Column(db.String(120), nullable=True)
    aportado_por = db.Column(db.String(120), nullable=True)
    propietario = db.Column(db.String(120), nullable=True)
    precio_compra = db.Column(db.Float, nullable=True)
    valoracion_actual = db.Column(db.Float, nullable=True)
    materiales = db.Column(db.String(255), nullable=True)
    medidas = db.Column(db.String(120), nullable=True)
    estado_general = db.Column(db.String(120), nullable=True)
    restauraciones = db.Column(db.String(255), nullable=True)
    uso_funcion = db.Column(db.String(255), nullable=True)
    observaciones = db.Column(db.String(255), nullable=True)
    exposiciones = db.Column(db.String(255), nullable=True)
    referencias_bibliograficas = db.Column(db.String(255), nullable=True)
    prestamos = db.Column(db.String(255), nullable=True)
    foto = db.Column(db.String(255), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "image": self.image,
            "type_id": self.type_id,
            "numero_registro_general": self.numero_registro_general,
            "articulo": self.articulo,
            "nombre_local_tradicional": self.nombre_local_tradicional,
            "referencia_topografica": self.referencia_topografica,
            "numero_piezas": self.numero_piezas,
            "fecha_origen": self.fecha_origen,
            "fecha_adquisicion": self.fecha_adquisicion,
            "procedencia": self.procedencia,
            "autor": self.autor,
            "aportado_por": self.aportado_por,
            "propietario": self.propietario,
            "precio_compra": self.precio_compra,
            "valoracion_actual": self.valoracion_actual,
            "materiales": self.materiales,
            "medidas": self.medidas,
            "estado_general": self.estado_general,
            "restauraciones": self.restauraciones,
            "uso_funcion": self.uso_funcion,
            "observaciones": self.observaciones,
            "exposiciones": self.exposiciones,
            "referencias_bibliograficas": self.referencias_bibliograficas,
            "prestamos": self.prestamos,
        }
