from .db import db, BaseModel


class StudyType(BaseModel):
    __tablename__ = "study_type"

    st_id = db.Column(db.Integer, primary_key=True)
    st_type = db.Column(db.String(50), nullable=False)

    def json(self):
        return {
            "st_id": self.st_id,
            "st_type": self.st_type.strip()
        }
