from .db import db, BaseModel
from .Student import Student


class Involvement(BaseModel):
    __tablename__ = "involvement"

    i_id = db.Column(db.Integer, primary_key=True)
    i_ec_id = db.Column(db.Integer, db.ForeignKey('event_card.ec_id'), nullable=False)
    i_student_id = db.Column(db.Integer, db.ForeignKey('student.s_id'), nullable=False)

    def json(self):
        return {
            "i_id": self.i_id,
            "i_ec_id": self.i_ec_id,
            "i_student_id": self.i_student_id
        }


    @classmethod
    def get_count_by_ec_id(cls, ec_id):
        count = cls.query.filter_by(i_ec_id=ec_id).count()
        return count