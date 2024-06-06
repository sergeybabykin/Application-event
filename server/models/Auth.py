from .db import db, BaseModel
from passlib.hash import pbkdf2_sha256


class Auth(BaseModel):
    __tablename__ = "auth"

    a_id       = db.Column(db.Integer, primary_key=True)
    a_staff_id = db.Column(db.Integer, db.ForeignKey('staff_list.sl_id'), nullable=False)
    a_login    = db.Column(db.String(50), nullable=False)
    a_password = db.Column(db.String(87), nullable=False)

    @classmethod
    def auth(cls, login, password):
        user = cls.query.filter_by(a_login=login).first()

        if not user:
            return False, -1

        if not pbkdf2_sha256.verify(password, user.a_password):
            return False, -1

        return True, user.a_staff_id
