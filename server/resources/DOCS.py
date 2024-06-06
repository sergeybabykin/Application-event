from flask import send_file
from flask_restful import Resource


class Docs(Resource):
    path = "/docs"

    @classmethod
    def get(cls):
        return send_file('./build/static/docs.html')
