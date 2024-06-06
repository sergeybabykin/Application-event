from flask_restful import Resource
from .Auth import auth_required
from models import EducationalActivitiesType


class EatList(Resource):
    path = "/eat_list"

    @auth_required
    def get(self, id):
        eats = EducationalActivitiesType.all()
        return {"eats": [e.json() for e in eats]}, 200