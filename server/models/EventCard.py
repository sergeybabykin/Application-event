from sqlalchemy import and_

from .db import db, BaseModel
from .EventKind import EventKind
from .StaffList import StaffList as StaffListTable
from .Calendar import Calendar
from .EducationalActivitiesType import EducationalActivitiesType
from .Involvement import Involvement


class EventCard(BaseModel):
    __tablename__ = "event_card"

    ec_id = db.Column(db.Integer, primary_key=True)
    ec_name = db.Column(db.String(1000), nullable=False)
    ec_is_planned_work = db.Column(db.Boolean, nullable=False)
    ec_location = db.Column(db.String(1000), nullable=False)
    ec_is_photo_exists = db.Column(db.Boolean, nullable=False)
    ec_internal_link = db.Column(db.String(1000))
    ec_external_link = db.Column(db.String(1000))
    ec_eat_id = db.Column(db.Integer, db.ForeignKey('educational_activities_type.eat_id'), nullable=False)
    ec_ek_id = db.Column(db.Integer, db.ForeignKey('event_kind.ek_id'), nullable=False)
    ec_comments = db.Column(db.String(1000))
    eС_staff_id = db.Column(db.Integer, db.ForeignKey('staff_list.sl_id'), nullable=False)
    eС_calendar_id = db.Column(db.Integer, db.ForeignKey('calendar.c_id'), nullable=False)

    def json(self):
        event_act_type = EducationalActivitiesType.get_by_id(self.ec_eat_id)
        event_kind = EventKind.get_by_id(self.ec_ek_id)
        staff = StaffListTable.get_by_id(self.eС_staff_id)
        calendar = Calendar.get_by_id(self.eС_calendar_id)
        students_count = Involvement.get_count_by_ec_id(self.ec_id)
        return {
            'ec_id': self.ec_id,
            'ec_name': self.ec_name.strip(),
            'ec_is_planned_work': "да" if self.ec_is_planned_work else "нет",
            'ec_location': self.ec_location.strip(),
            'ec_is_photo_exists': "-" if not self.ec_is_photo_exists else "+",
            'ec_internal_link': self.ec_internal_link.strip(),
            'ec_external_link': self.ec_external_link.strip(),
            'students': students_count,
            'ec_eat_id':  event_act_type.eat_name.strip(),
            'ec_ek_id':   event_kind.ek_name.strip(),
            'ec_comments': self.ec_comments.strip(),
            "staff": staff.sl_firstname.strip() + " " + staff.sl_lastname.strip() + " " + staff.sl_surname.strip(),
            "calendar": calendar.json()["c_start_date"] + " - " + calendar.json()["c_end_date"]
        }
    
    def csv_view(self):
        students_count = Involvement.get_count_by_ec_id(self.ec_id)
        ec_eat = EducationalActivitiesType.get_by_id(self.ec_eat_id)
        event_kind = EventKind.get_by_id(self.ec_ek_id)
        staff = StaffListTable.get_by_id(self.eС_staff_id)
        staff_fio = staff.sl_firstname.strip() + "  " + staff.sl_lastname.strip() + "  " + staff.sl_surname.strip()
        calendar = Calendar.get_by_id(self.eС_calendar_id)
        return {
            'ec_id': self.ec_id,
            'ec_name': self.ec_name.strip(),
            'ec_is_planned_work': "да" if self.ec_is_planned_work else "нет",
            'ec_location': self.ec_location.strip(),
            'ec_is_photo_exists': "-" if not self.ec_is_photo_exists else "+",
            'ec_internal_link': self.ec_internal_link.strip(),
            'ec_external_link': self.ec_external_link.strip(),
            'student': students_count,
            'ec_eat_id': ec_eat.eat_name.strip(),
            'ec_ek_id': event_kind.ek_name.strip(),
            'ec_comments': self.ec_comments.strip(),
            'eС_staff_id': staff_fio,
            'ec_start_date': calendar.c_start_date.strftime("%Y.%m.%d"),
            'ec_end_date': calendar.c_end_date.strftime("%Y.%m.%d")
        }

    @classmethod
    def get_by_range(cls, date_start, date_end):
        return cls.query.join(Calendar, cls.eС_calendar_id == Calendar.c_id)\
            .filter(and_(Calendar.c_start_date <= date_end,
                        Calendar.c_end_date >= date_start))\
            .all()
