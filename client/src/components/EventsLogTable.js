import axios from "axios";
import DataTable from "./DataTable";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EventsLogTable() {
  const [data, setData] = useState([]);
  const columns = ["№", "Событие", "Место", "Даты проведения", "Тип события"];
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/event_type")
      .then((res) => {
        setData(res.data.event_types);
      })
      .catch((err) => {
        setData(null);
      });
  }, [navigate]);
  return (
    <div>
      {data ? (
        <DataTable dataHeaders={columns} data={data} onRowClick={(id) => {navigate("/event-card/"+id)}} />
      ) : (
        <p>Записи не найдены</p>
      )}
    </div>
  );
}
