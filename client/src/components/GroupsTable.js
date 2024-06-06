import axios from "axios";
import DataTable from "./DataTable";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentsTable() {
  const [data, setData] = useState([]);
  const columns = ["№", "Название", "Год"];
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/groups")
      .then((res) => {
        setData(res.data.groups);
      })
      .catch((err) => {
        setData(null);
      });
  }, [navigate]);
  return (
    <div>
      {data ? (
        <DataTable dataHeaders={columns} data={data} />
      ) : (
        <p>Записи не найдены</p>
      )}
    </div>
  );
}
