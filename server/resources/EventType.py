from flask_restful import Resource
from models import EventType as EventTypeTable
from .Auth import auth_required


class EventType(Resource):
    path = "/event_type"

    @classmethod
    @auth_required
    def get(cls, id):
        events = EventTypeTable.all()

        if events:
            return {"event_types": [e.json() for e in events]}
        else:
            return {"message": "No events found"}, 404