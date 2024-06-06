from io import BytesIO
from datetime import date

from flask import send_file
from flask_restful import request, Resource

from models import EventCard as EventCardTable, Involvement as InvolvementTable, Calendar as CalendarTable, EventType as EventTypeTable
from .Auth import auth_required


class EventCard(Resource):
    path = "/event_cards"
    
    @classmethod
    @auth_required
    def get(cls, id):
        ec_id = request.args.get('id')
        date_from_str, date_to_str = request.args.get('date_from'), request.args.get('date_to')
        format_ = request.args.get('format')
        if ec_id:
            event_card = EventCardTable.get_by_id(ec_id)
            return {"event_card": event_card.json()}

        else:  # has no id, json format
            if all([date_from_str, date_to_str]):
                date_from = str2date(date_from_str)
                date_to = str2date(date_to_str)
                event_cards = EventCardTable.get_by_range(date_from, date_to)

                if format_ == "csv":
                    bytes_csv = create_csv(event_cards)
                    file_buffer = BytesIO(bytes_csv)
                    filename = "Отчет о мероприятиях с {} по {}.csv".format(date_from_str, date_to_str)
                    return send_file(
                        file_buffer, 
                        as_attachment=True, 
                        download_name=filename,
                        mimetype="text/csv"
                    )
                else:  # has dates, json format 
                    return {"event_cards": [event_card.json() for event_card in event_cards]}
            else:  # has no dates, json format
                event_cards = EventCardTable.all()
                return {"event_cards": [event_card.json() for event_card in event_cards]}

    @classmethod
    @auth_required
    def post(cls, id=None):
        args = request.json
        name =               args.get('name')
        is_planned_work =    args.get('planned')
        ec_location =        args.get('location')
        ec_is_photo_exists = args.get('photo')
        ec_internal_link =   args.get('internal_link')
        ec_external_link =   args.get('external_link')
        ec_eat_id = args.get('eat_id')
        ec_ek_id = args.get('event_kind_id')
        comment = args.get('comment')

        student_list = args.get('student_list')

        ec_staff_id = args.get('staff_id')
        date_start = args.get('date_start')
        date_end = args.get('date_end')

        start_date = str2date(date_start)
        end_date = str2date(date_end)

        event_calendar = CalendarTable(
            c_start_date=start_date,
            c_end_date=end_date
        )
        event_calendar.save()

        event_card = EventCardTable(
            ec_name=name,
            ec_is_planned_work=is_planned_work,
            ec_location=ec_location,
            ec_is_photo_exists=ec_is_photo_exists,
            ec_internal_link=ec_internal_link,
            ec_external_link=ec_external_link,
            ec_eat_id=ec_eat_id,
            ec_ek_id=ec_ek_id,
            ec_comments=comment,
            eС_staff_id=ec_staff_id,
            eС_calendar_id=event_calendar.c_id
        )
        event_card.save()

        event_type = EventTypeTable(
            et_name=event_card.ec_name,
            et_location=event_card.ec_location,
            et_calendar_id=event_calendar.c_id,
            et_ek_id=event_card.ec_ek_id
        )
        event_type.save()

        for student_id in student_list:
            involvement = InvolvementTable(
                i_ec_id=event_card.ec_id,
                i_student_id=student_id,
            )
            involvement.save()

        return {"event_card": event_card.json()}, 202


def str2date(date_str):
    yy, mm, dd = map(int, date_str.split('-'))
    return date(yy, mm, dd)


def create_csv(event_cards):
    csv_data = []

    columns = [
        "№",
        "Название",
        "Запланировано? (да/нет)",
        "место проведения",
        "наличие фото",
        "внутренняя ссылка",
        "внешняя ссылка",
        "студенты",
        "вид события",
        "тип события",
        "комментариии",
        "преподаватель",
        "дата начала",
        "дата окончания"
    ]
    csv_data.append(';'.join(columns))

    for event_card in event_cards:
        csv_data.append(';'.join(map(str, event_card.csv_view().values())))

    csv_format_data = '\n'.join(csv_data)
    return csv_format_data.encode("windows-1251")