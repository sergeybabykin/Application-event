import "./cards.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function EventCardsListPage() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/event_cards")
      .then((res) => {
        setData(res.data.event_cards);
      })
      .catch((err) => {
        toast.error("Произошла ошибка при загрузке данных. Попробуйте позже.");
        console.log(err);
      });
  }, [navigate]);

  return (
    <>
      <div className="cards-container">
        <div className="cards-wrapper">
          {data.map((card) => (
            <Card key={card.ec_id} card={card} />
          ))}
        </div>
      </div>
      <div className="add-btn" onClick={() => navigate("/event-card-new")} />
    </>
  );
}

function Card({ card }) {
  const navigate = useNavigate();

  const open_card = (id) => {
    navigate(`/event-card/${id}`);
  };

  return (
    <div
      className="card"
      key={card.ec_id}
      onClick={() => open_card(card.ec_id)}
    >
      {card.ec_is_photo_exists && (
        <center>
          <img src="/image.jpg" className="card-image" alt="event" />
        </center>
      )}
      <div className="card-header">
        <div className="card-header-title">{card.ec_name}</div>
        <div className="card-header-subtitle">{card.ec_location}</div>
      </div>
      <div className="tags">
        {card.ec_is_planned_work === true ? (
          <Chip label="planed" color="success" />
        ) : (
          <Chip label="not planed" color="error" />
        )}
      </div>
      <div className="card-footer">
        {card.event_list && (
          <div className="card-date">
            {card.event_list.el_c_start_date} - {card.event_list.el_c_end_date}
          </div>
        )}
      </div>
    </div>
  );
}

function Chip({ label, color }) {
  return <div className={`chip chip-${color}`}>{label}</div>;
}
