import axios from "axios";
import DataTable from "./DataTable";
import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import dayjs from "dayjs";

export default function EventsListTable() {
  const [date1, setDate1] = useState();
  const [date2, setDate2] = useState();
  const [showForm, setShowForm] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [data, setData] = useState([]);
  const columns = [
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
    "даты начала и конца",
  ];
  const load_data = async () => {
    if (!date1 || !date2) return alert("Выберите даты начала и конца периода");

    const date1AsDate = dayjs(date1);
    const date2AsDate = dayjs(date2);

    const formattedDate1 = date1AsDate.format("YYYY-MM-DD");
    const formattedDate2 = date2AsDate.format("YYYY-MM-DD");

    axios.get(`/event_cards?date_from=${formattedDate1}&date_to=${formattedDate2}`)
      .then((res) => {
        if (res.status === 400) toast.error("Введены неверные данные");

        if (res.status === 200) {
          setData(res.data.event_cards);
          setHasData(true);
          toast.success("Данные загружены");
          setShowForm(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 404)
          toast.error("Не найдено событий на указанном промежутке");
        else {
          console.log(err);
          toast.error(
            "Произошла ошибка при загрузке данных. Попробуйте позже.",
          );
        }
        setData([]);
        setHasData(true);
        setShowForm(false);
      });
  };

  const back = () => {
    setShowForm(true);
    setData([]);
    setHasData(false);
  };

  const download_csv = () => {
    const date_1 = dayjs(date1).format("YYYY-MM-DD");
    const date_2 = dayjs(date2).format("YYYY-MM-DD");
    const url = `/api/event_cards?date_from=${date_1}&date_to=${date_2}&format=csv`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <center>
        {showForm ?
          <>
            <Typography variant="h4" sx={{ marginTop: "50px" }}>
              Отчет по событиям
            </Typography>
            <FormBox>
              <Typography variant="h5" sx={{ marginTop: "20px" }}>
                Выберите даты начала и конца периода
              </Typography>
              <DatePicker onChange={(e) => setDate1(e)} />
              <DatePicker onChange={(e) => setDate2(e)} />
              <Button variant="contained" onClick={() => load_data()}>
                Показать
              </Button>
            </FormBox>
          </>
          :
          <div style={{ width: "700px", margin: "0.5em", display: "flex", justifyContent: "space-evenly" }}>
            <Button variant="contained" onClick={back}>
              Назад
            </Button>
            <Button variant="outlined" onClick={download_csv}>
              Скачать
            </Button>
          </div>
        }
      </center>
      {data.length > 0 ? (
        <DataTable dataHeaders={columns} data={data} />
      ) : (
        data.length == 0 ?
          <p>Записи не найдены</p>
          :
          <p>Загрузка данных...</p>
      )}
    </div>
  );
}

const FormBox = styled("div")({
  display: "grid",
  gridTemplateColumns: "auto",
  rowGap: "20px",
  width: "500px",
  "& > *": {
    margin: "10px",
  },
});
