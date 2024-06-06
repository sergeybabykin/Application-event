from flask import request, make_response
from flask_restful import Resource
from models import Auth as AuthTable, StaffList as StaffListTable


class Auth(Resource):
    path = "/auth"

    @classmethod
    def get(cls):
        return {"message": "auth must be posted"}

    @classmethod
    def post(cls):
        print("json:",request.json)
        login, password = request.json.get("login"), request.json.get("password")

        if not all([login, password]):
            return {"message": "login or password is missing"}, 400

        auth, id = AuthTable.auth(login, password)

        if auth:
            user = StaffListTable.get_by_id(id).json()
            response = make_response({"user": user, "auth": auth}, 200)
            response.set_cookie("id", str(id), httponly=True, secure=True)
            return response
        else:
            return {"message": "login or password is incorrect"}, 401


class Logout(Resource):
    path = "/logout"

    @classmethod
    def post(cls):
        response = make_response({"message": "Logout"}, 200)
        response.set_cookie("id", "", expires=0)
        return response


def auth_required(f):
    def wrapper(*args, **kwargs):
        if request.cookies.get("id"):
            kwargs["id"] = request.cookies.get("id")
            return f(*args, **kwargs)
        else:
            print(request.cookies)
            return {"message": "Unauthorized"}, 401
    return wrapper
