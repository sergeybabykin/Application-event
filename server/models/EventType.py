from .db import db, BaseModel
from .Calendar import Calendar
from .EventKind import EventKind


class EventType(BaseModel):
    __tablename__ = "event_type"

    et_id = db.Column(db.Integer, primary_key=True)
    et_name = db.Column(db.String(200), nullable=False)
    et_location = db.Column(db.String(50))
    et_calendar_id = db.Column(db.Integer, db.ForeignKey('calendar.c_id'), nullable=False)
    et_ek_id = db.Column(db.Integer, db.ForeignKey('event_kind.ek_id'), nullable=False)

    def json(self):
        event_kind = EventKind.get_by_id(self.et_ek_id)

        calendar = Calendar.get_by_id(self.et_calendar_id)
        date2str = lambda date: date.strftime("%Y.%m.%d")
        str_date_range = f"{date2str(calendar.c_start_date)} - {date2str(calendar.c_end_date)}"
        
        return {
            "et_id": self.et_id,
            "et_name": self.et_name,
            "et_location": self.et_location.strip(),
            "et_calendar_dates": str_date_range,
            "et_ek_type": event_kind.ek_name
        }
