import click
from api.models import db, User

def setup_commands(app):
    
    @app.cli.command("insert-test-users")  # nombre del comando
    @click.argument("count")  # argumento del comando
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.usuario = "test_user" + str(x)
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.usuario, " created.")

        print("All test users created")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        pass
