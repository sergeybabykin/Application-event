import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import DataTable from "./DataTable";

export default function EventsListTable() {
  const [data, setData] = useState(null);
  const columns = [
    "№",
    "Событие",
    "дата начала",
    "дата окончания",
    "группа",
    "студент",
    "преподаватель",
  ];
  const navigate = useNavigate();

  useEffect(() => {
    console.log("EventsListTable");
    axios.get("/event_list")
      .then((res) => {
        setData(res.data.events);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, [navigate]);

  return (
    <DataTable dataHeaders={columns} data={data} />
  );
}
