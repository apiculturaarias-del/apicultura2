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
        'category': 'Familia',
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
        'id': 'Número registro',
        'nombre': 'Nombre del producto',
        'descripcion': 'Descripción',
        'subtype': 'Subtipo',
        'articulo': 'Artículo',
        'nombre_local_tradicional': 'Nombre Local Tradicional',
        'referencia_topografica': 'Referencia Topografica',
        'numero_piezas': 'Numero Piezas',
        'fecha_origen': 'Fecha Origen',
        'fecha_adquisicion': 'Fecha Adquisicion',
        'procedencia': 'Procedencia',
        'autor': 'Autor',
        'aportado_por': 'Aportado Por',
        'propietario': 'Propietario',
        'precio_compra': 'Precio',
        'valoracion_actual': 'Valoracion Actual',
        'materiales': 'Materiales',
        'medidas': 'Medidas',
        'estado_general': 'Estado General',
        'restauraciones': 'Restauraciones',
        'uso_funcion': 'Uso Funcion',
        'observaciones': 'Observaciones',
        'exposiciones': 'Exposiciones',
        'referencias_bibliograficas': 'Referencias Bibliograficas',
        'prestamos': 'Prestamos',
        'image1': 'Imagen 1',
        'image2': 'Imagen 2',
        'image3': 'Imagen 3',
        'image4': 'Imagen 4',
    }
    form_labels = column_labels

    # Columnas visibles en la tabla
    column_list = [
        'id', 'nombre', 'subtype', 'articulo', 'nombre_local_tradicional',
        'referencia_topografica', 'numero_piezas', 'fecha_origen', 'fecha_adquisicion',
        'procedencia', 'autor', 'aportado_por', 'propietario', 'precio_compra',
        'valoracion_actual', 'materiales', 'medidas', 'estado_general', 'restauraciones',
        'uso_funcion', 'exposiciones', 'referencias_bibliograficas',
        'prestamos'
    ]

    # 🔍 Búsqueda
    column_searchable_list = ['nombre', 'articulo', 'id']
    column_default_sort = 'id'

    # 👁️ Columnas visibles en la lista

    # 🧾 Exportación (incluye ID)
    can_export = True
    column_export_list = ['id', 'nombre', 'descripcion', 'subtype', 'articulo', 'nombre_local_tradicional',
        'referencia_topografica', 'numero_piezas', 'fecha_origen', 'fecha_adquisicion',
        'procedencia', 'autor', 'aportado_por', 'propietario', 'precio_compra',
        'valoracion_actual', 'materiales', 'medidas', 'estado_general', 'restauraciones',
        'uso_funcion', 'observaciones', 'exposiciones', 'referencias_bibliograficas',
        'prestamos', 'image1', 'image2', 'image3', 'image4']

    # ✏️ Formulario
    form_excluded_columns = ['numero_registro_general']  # ocultamos solo este
    form_overrides = {
        'descripcion': TextAreaField
    }
    form_widget_args = {
        'descripcion': {
            'rows': 8,
            'style': 'width: 100%; resize: vertical;'
        }
    }

    # 🔢 Mostrar el ID con ceros delante
    def _id_formatter(view, context, model, name):
        return str(model.id).zfill(4)  # ej: 0001, 0023, etc.

    column_formatters = {
        'id': _id_formatter
    }


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'yeti'
    admin = Admin(app, name='Apiculturas Admin', template_mode='bootstrap4')
    
    admin.add_view(UserAdmin(User, db.session, name='Usuarios'))
    admin.add_view(CategoryAdmin(Category, db.session, name='Familia'))
    admin.add_view(TypeAdmin(Type, db.session, name='Tipos'))
    admin.add_view(SubtypeAdmin(Subtype, db.session, name='Subtipos'))
    admin.add_view(ItemAdmin(Item, db.session, name='Productos'))
