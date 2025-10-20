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
    image = db.Column(db.String(255), nullable=True)
    types = db.relationship('Type', backref='category', lazy=True)

    def __repr__(self):
        return f'{self.nombre}'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "image": self.image
        }


class Type(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), unique=True, nullable=False)
    image = db.Column(db.String(255), nullable=True) 
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    subtypes = db.relationship('Subtype', backref='type', lazy=True)
    
    def __repr__(self):
        return f'{self.nombre}'
    
    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "image": self.image,
            "category_id": self.category_id
        }


class Subtype(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), unique=True, nullable=False)
    image = db.Column(db.String(255), nullable=True)
    type_id = db.Column(db.Integer, db.ForeignKey('type.id'), nullable=False)
    items = db.relationship('Item', backref='subtype', lazy=True)

    def __str__(self):
        return f'{self.nombre}'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "image": self.image,
            "type_id": self.type_id
        }


class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), unique=True, nullable=False)
    descripcion = db.Column(db.String(255), nullable=True)
    subtype_id = db.Column(db.Integer, db.ForeignKey('subtype.id'), nullable=False)

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

    image1 = db.Column(db.String(255), nullable=True)
    image2 = db.Column(db.String(255), nullable=True)
    image3 = db.Column(db.String(255), nullable=True)
    image4 = db.Column(db.String(255), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "subtype_id": self.subtype_id,
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
            "image1": self.image1,
            "image2": self.image2,
            "image3": self.image3,
            "image4": self.image4
        }
