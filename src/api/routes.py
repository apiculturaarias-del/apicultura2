from flask import Blueprint, request, jsonify, session
from api.models import db, User, Category, Type, Item
from flask_cors import CORS

api = Blueprint("api", __name__)
CORS(api)  # CORS para este blueprint

# Hello
@api.route("/hello")
def hello():
    return jsonify({"message": "Hola! API funcionando"}), 200

# Login
@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    usuario = data.get("usuario")
    password = data.get("password")
    user = User.query.filter_by(usuario=usuario).first()
    if not user or user.password != password:
        return jsonify({"message": "Usuario o contraseña incorrectos"}), 401

    # Guardar el usuario en la sesión
    session["user_id"] = user.id
    return jsonify({"message": "Login exitoso", "user": user.serialize()}), 200

# Obtener sesión actual
@api.route("/session")
def get_session():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"user": None}), 200

    user = User.query.get(user_id)
    if not user:
        return jsonify({"user": None}), 200

    return jsonify({"user": user.serialize()}), 200

# Logout
@api.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"message": "Sesión cerrada"}), 200

# Categories
@api.route("/categories")
def get_categories():
    categories = Category.query.all()
    return jsonify([c.serialize() for c in categories]), 200

# Types por categoría
@api.route("/categories/<int:category_id>/types")
def get_types(category_id):
    types = Type.query.filter_by(category_id=category_id).all()
    return jsonify([t.serialize() for t in types]), 200

# Items por type
@api.route("/types/<int:type_id>/items")
def get_items(type_id):
    items = Item.query.filter_by(type_id=type_id).all()
    return jsonify([i.serialize() for i in items]), 200

@api.route("/items/<int:item_id>")
def get_item(item_id):
    item = Item.query.get(item_id)
    if not item:
        return jsonify({"message": "Item no encontrado"}), 404
    return jsonify(item.serialize()), 200

@api.route("/items")
def get_all_items():
    search = request.args.get("search", "")
    if search:
        items = Item.query.filter(Item.nombre.ilike(f"%{search}%")).all()
    else:
        items = Item.query.all()
    return jsonify([i.serialize() for i in items]), 200