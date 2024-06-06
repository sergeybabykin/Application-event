from .db import db, BaseModel


class StudentBoard(BaseModel):
    __tablename__ = "student_board"

    sb_board_id = db.Column(db.Integer, primary_key=True)
    sb_calendar_id = db.Column(db.Integer, db.ForeignKey('calendar.c_id'), nullable=False)
    sb_student_id = db.Column(db.Integer, db.ForeignKey('student.s_id'), nullable=False)
    sb_position_id = db.Column(db.Integer, nullable=False)

    def json(self):
        return {
            "sb_board_id": self.sb_board_id,
            "sb_calendar_id": self.sb_calendar_id,
            "sb_student_id": self.sb_student_id,
            "sb_position_id": self.sb_position_id
        }
