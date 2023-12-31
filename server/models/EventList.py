from .db import db
from datetime import date


class EventList(db.Model):
    __tablename__ = "event_list"

    el_id = db.Column(db.Integer, primary_key=True)
    el_calendar_id = db.Column(db.Integer, nullable=False)
    el_event_type_id = db.Column(db.Integer, nullable=False)
    el_c_start_date = db.Column(db.Date)
    el_c_end_date = db.Column(db.Date)
    el_group_id = db.Column(db.Integer, nullable=False)
    el_student_id = db.Column(db.Integer, nullable=False)
    el_staff_id = db.Column(db.Integer, nullable=False)

    def json(self):
        return {
            "el_id": self.el_id,
            "el_calendar_id": self.el_calendar_id,
            "el_event_type_id": self.el_event_type_id,
            "el_c_start_date": self.el_c_start_date.__str__(),
            "el_c_end_date": self.el_c_end_date.__str__(),
            "el_group_id": self.el_group_id,
            "el_student_id": self.el_student_id,
            "el_staff_id": self.el_staff_id
        }
    
    def save(self):
        if not self.el_id:
            db.session.add(self)
        db.session.commit()
    
    @classmethod
    def get_all(cls):
        return cls.query.all()

    @classmethod
    def get_by_range(cls, date_from: date):
        if not date_from:
            raise ValueError('date_from is required')
        today = date.today()
        return cls.query.filter(
            cls.el_c_start_date.between(date_from, today) &
            cls.el_c_end_date.between(date_from, today)
        ).all()
