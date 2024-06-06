from flask_restful import Resource
from .Auth import auth_required
from models import StudyType as StudyTypeTable


class StudyType(Resource):
    path = "/study_type"

    @auth_required
    def get(self, id):
        types = StudyTypeTable.all()
        return {"type": [t.json() for t in types]}, 200
