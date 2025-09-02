import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .models import db, User, Category, Type, Item


class UserAdmin(ModelView):
    column_labels = {
        'username': 'Nombre de usuario',
        'email': 'Correo electrónico',
        'password': 'Contraseña'
    }
    form_labels = column_labels
    create_modal = True
    edit_modal = True

class CategoryAdmin(ModelView):
    column_labels = {
        'name': 'Nombre de categoría',
        'description': 'Descripción'
    }
    form_labels = column_labels

class TypeAdmin(ModelView):
    column_labels = {
        'name': 'Nombre del tipo'
    }
    form_labels = column_labels

class ItemAdmin(ModelView):
    column_labels = {
        'name': 'Nombre del producto',
        'category': 'Categoría',
        'type': 'Tipo',
        'price': 'Precio'
    }
    form_labels = column_labels
    can_export = True
    can_port = True

# Función de configuración de admin
def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'yeti'
    admin = Admin(app, name='Apiculturas Admin', template_mode='bootstrap4')
    
    admin.add_view(UserAdmin(User, db.session, name='Usuarios'))
    admin.add_view(CategoryAdmin(Category, db.session, name='Categorías'))
    admin.add_view(TypeAdmin(Type, db.session, name='Tipos'))
    admin.add_view(ItemAdmin(Item, db.session, name='Productos'))
