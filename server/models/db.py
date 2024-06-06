from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import OperationalError
from sqlalchemy import text


db = SQLAlchemy()

db.ConnectionError = OperationalError


def init_db(app):
    global db

    with app.app_context():
        tries = 0
        connected = False
        while tries < 10:
            try:
                db.create_all()
                connected = True
                init_sql_script = open("models/create_db.sql", "r").read()
                print(dir(db.engine))
                # db.engine.execute(text(init_sql_script))
                print("initialized database")
                break

            except db.ConnectionError as e:
                if not connected:
                    tries += 1
                    print(f"[{tries:0>2}/10] Failed to connect to the database. Retrying...")
                    time.sleep(3)
                    exit(-1)


class GetableNone(str):
    def __getattr__(self, item):
        return GetableNone()

    def __eq__(self, other):
        return other is None

    def __str__(self):
        return "null"


class BaseModel(db.Model):
    __abstract__ = True

    @classmethod
    def all(cls):
        return cls.query.all()

    @classmethod
    def get_by_id(cls, id):
        result = cls.query.get(id) 
        if not result:
            return GetableNone()
        else:
            return result

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()