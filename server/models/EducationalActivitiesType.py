from .db import db, BaseModel


class EducationalActivitiesType(BaseModel):
    __tablename__ = "educational_activities_type"

    eat_id = db.Column(db.Integer, primary_key=True)
    eat_name = db.Column(db.String(1000), nullable=False)

    def json(self):
        return {
            "eat_id": self.eat_id,
            "eat_name": self.eat_name.strip()
        }
