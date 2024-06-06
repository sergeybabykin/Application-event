from flask_restful import Resource
from models import EventList as EventListTable
from .Auth import auth_required


class Report(Resource):
    path = "/report"

    @classmethod
    @auth_required
    def get(cls, id):
        events = EventListTable.all()

        if events:
            return [e.json() for e in events]
        else:
            return {"message": "No events found"}, 404