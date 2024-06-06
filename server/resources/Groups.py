from flask_restful import Resource
from models import GroupList as GroupListTable
from .Auth import auth_required


class Groups(Resource):
    path = "/groups"

    @classmethod
    # @auth_required
    def get(cls, id=None):
        groupes = GroupListTable.all()

        if groupes:
            return {"groups": [g.json() for g in groupes]}, 200
        else:
            return {"message": "No groups found"}, 404
