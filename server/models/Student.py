from .db import db, BaseModel
from .StudyType import StudyType
from .GroupList import GroupList


class Student(BaseModel):
    __tablename__ = "student"

    s_id = db.Column(db.Integer, primary_key=True)
    s_firstname = db.Column(db.String(50), nullable=False)
    s_surname = db.Column(db.String(50), nullable=False)
    s_lastname = db.Column(db.String(50), nullable=False)
    s_group_id = db.Column(db.Integer, db.ForeignKey('group_list.gl_id'), nullable=False)
    s_study_type_id = db.Column(db.Integer, db.ForeignKey('study_type.st_id'), nullable=False)

    def json(self):
        return {
            "s_id": self.s_id,
            "s_firstname": self.s_firstname.strip(),
            "s_surname": self.s_surname.strip(),
            "s_lastname": self.s_lastname.strip(),
            "s_group_id": GroupList.get_by_id(self.s_group_id).gl_name,
            "s_study_type_id": StudyType.get_by_id(self.s_study_type_id).st_type
        }