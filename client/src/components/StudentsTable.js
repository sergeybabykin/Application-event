import axios from "axios";
import DataTable from "./DataTable";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentsTable() {
  const [data, setData] = useState([]);
  const columns = [
    "№",
    "Имя",
    "Фамилия",
    "Отчество",
    "Группа",
    "Форма обучения",
  ];

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/student")
      .then((res) => {
        setData(res.data.students);
      })
      .catch((err) => {
        setData(null);
      });
  }, [navigate]);
  
  return (
    <>
      {data ? (
        <DataTable dataHeaders={columns} data={data} />
      ) : (
        <p>Записи не найдены</p>
      )}
    </>
  );
}
