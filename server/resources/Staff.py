from flask_restful import Resource
from models import StaffList as StaffListTable
from .Auth import auth_required


class Staff(Resource):
    path = "/staff_list"

    @classmethod
    @auth_required
    def get(cls, id):
        staff = StaffListTable.all()

        if staff:
            return {"staff": [s.json() for s in staff]}, 200
        else:
            return {"staff": "No staff found"}, 404