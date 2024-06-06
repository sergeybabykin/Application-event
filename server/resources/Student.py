from flask_restful import Resource
from models import Student as StudentTable
from .Auth import auth_required


class Student(Resource):
    path = "/student"

    @classmethod
    @auth_required
    def get(cls, id):
        students = StudentTable.all()

        if students:
            return {"students": [s.json() for s in students]}
        else:
            return {"message": "No students found"}, 404
            
    @classmethod
    @auth_required
    def post(cls, id):
        firstname = request.json.get("firstname")
        lastname = request.json.get("lastname")
        surname = request.json.get("surname")
        
        group_id = request.json.get("group_id")
        type_id = request.json.get("type_id")
        
        if not all([firstname, surname, lastname, group_id, type_id]):
            return {"message": "missed required field"}, 400
            
            
        new_student = StudentTable(
            s_firstname=firstname,
            s_surname=surname,
            s_lastname=lastname,
            s_group_id=group_id,
            s_study_type_id=type_id
        )
        new_student.save()
        
        return {"student": new_student.json()}, 201
        
        
        
        
        
        
            