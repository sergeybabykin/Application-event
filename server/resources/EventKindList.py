from flask_restful import Resource
from models import EventKind as EventKindTable
from .Auth import auth_required


class EventKindList(Resource):
    path = "/event_kind_list"

    @auth_required
    def get(self, id):
        event_kinds = EventKindTable.all()
        return {"event_kinds": [e.json() for e in event_kinds]}, 200