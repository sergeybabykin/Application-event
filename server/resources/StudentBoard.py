from flask_restful import Resource
from models import StudentBoard as StudentBoardTable
from .Auth import auth_required


class StudentBoard(Resource):
    path="/student_board"
    
    @auth_required
    def get(self, id):
        students = StudentBoardTable.all()

        if students:
            return {"board": [s.json() for s in students]}, 200
        else:
            return {"message": "No students boards found"}, 404