import axios from "axios";
import DataTable from "./DataTable";
import { useState, useEffect } from "react";

export default function TableView({ endpoint_url }) {
  if (!endpoint_url) console.warn("has no endpoint url");
  const [data, setData] = useState([]);
  const [hasResponse, setHasResponse] = useState(false);
  useEffect(() => {
    axios
      .get(endpoint_url)
      .then((res) => {
        const raw_data = res.data;
        setData(raw_data[Object.keys(raw_data)]);
        setHasResponse(true);
      })
      .catch((err) => {
        setData(null);
        setHasResponse(true);
      });
  }, [endpoint_url]);
  return (
    <div>
      {!hasResponse ? (
        <div className="loader" />
      ) : data ? (
        <DataTable data={data} />
      ) : (
        <p>Записи не найдены</p>
      )}
    </div>
  );
}
