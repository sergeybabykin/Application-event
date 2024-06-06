import axios from "axios";
import DataTable, { TableWrapper } from "./DataTable";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StaffTable() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const columns = [
    "№",
    "Имя",
    "Фамилия",
    "Отчество",
    "Предмет",
    "Работает (да/нет)",
  ];
  useEffect(() => {
    axios
      .get("/staff_list")
      .then((res) => {
        setData(res.data.staff);
      })
      .catch((err) => {
        setData(null);
      });
  }, [navigate]);
  return (
    <TableWrapper>
      {data ? (
        <DataTable dataHeaders={columns} data={data} />
      ) : (
        <p>Записи не найдены</p>
      )}
    </TableWrapper>
  );
}
