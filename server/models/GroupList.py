from .db import db, BaseModel


class GroupList(BaseModel):
    __tablename__ = "group_list"

    gl_id = db.Column(db.Integer, primary_key=True)
    gl_name = db.Column(db.String(50), nullable=False)
    gl_year = db.Column(db.Date, nullable=False)

    def json(self):
        return {
            "gl_id": self.gl_id,
            "gl_name": self.gl_name.strip(),
            "gl_year": self.gl_year.year
        }
