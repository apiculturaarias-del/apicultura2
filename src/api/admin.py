import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from wtforms import TextAreaField
from .models import db, User, Category, Type, Subtype, Item


class UserAdmin(ModelView):
    column_labels = {
        'usuario': 'Nombre de usuario',
        'password': 'Contraseña'
    }
    form_labels = column_labels
    create_modal = True
    edit_modal = True


class CategoryAdmin(ModelView):
    column_labels = {
        'nombre': 'Nombre de categoría',
        'image': 'Imagen'
    }
    form_labels = column_labels


class TypeAdmin(ModelView):
    column_labels = {
        'nombre': 'Nombre del tipo',
        'category': 'Categoría',
        'image': 'Imagen'
    }
    form_labels = column_labels


class SubtypeAdmin(ModelView):
    column_labels = {
        'nombre': 'Nombre del subtipo',
        'type': 'Tipo',
        'image': 'Imagen'
    }
    form_labels = column_labels


class ItemAdmin(ModelView):
    column_labels = {
        'nombre': 'Nombre del producto',
        'subtype': 'Subtipo',
        'description': 'Descripción',
        'numero_registro_general': 'Número registro',
        'articulo': 'Artículo',
        'precio_compra': 'Precio',
        'image1': 'Imagen 1',
        'image2': 'Imagen 2',
        'image3': 'Imagen 3',
        'image4': 'Imagen 4'
    }
    form_labels = column_labels
    column_searchable_list = ['nombre', 'descripcion', 'articulo', 'numero_registro_general']
    column_filters = ['subtype', 'precio_compra']
    column_default_sort = 'nombre'
    column_exclude_list = ['descripcion']
    can_export = True
    form_overrides = {
        'descripcion': TextAreaField
    }
    form_widget_args = {
        'descripcion': {
            'rows': 8,
            'style': 'width: 100%; resize: vertical;'
        }
    }


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'yeti'
    admin = Admin(app, name='Apiculturas Admin', template_mode='bootstrap4')
    
    admin.add_view(UserAdmin(User, db.session, name='Usuarios'))
    admin.add_view(CategoryAdmin(Category, db.session, name='Categorías'))
    admin.add_view(TypeAdmin(Type, db.session, name='Tipos'))
    admin.add_view(SubtypeAdmin(Subtype, db.session, name='Subtipos'))
    admin.add_view(ItemAdmin(Item, db.session, name='Productos'))
