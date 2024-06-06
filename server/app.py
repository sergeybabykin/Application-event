import time
import os
from dotenv import load_dotenv

from flask import Flask, render_template, send_file, redirect
from flask_cors import CORS

from models import db, init_db
from resources import api
from sqlalchemy import text


app = Flask(__name__, static_folder='build/static', template_folder='build')
CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["PROPAGATE_EXCEPTIONS"] = True


db.init_app(app)
init_db(app)

api.init_app(app)


if __name__ == '__main__':
    app.run(port=5000)