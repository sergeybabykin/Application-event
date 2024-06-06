import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./cards.css";

export default function EventCardsListPage() {
  const id = useParams().id;
  const [card, setCard] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`event_cards?id=${id}`)
      .then((res) => {
        setCard(res.data.event_card);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Произошла ошибка при загрузке данных. Попробуйте позже.");
      });
  }, [id, navigate]);

  return (
    card.ec_name && (
      <div className="raw-card">
        <center>
          <h1>{card.ec_name}</h1>
          <img src="/image.jpg" alt="event" />
        </center>
        <p>Location: {card.ec_location}</p>
        <p>
          {" "}
          links:
          <br />
          &nbsp;&nbsp;<a href={card.ec_external_link}>external link</a>
          <br />
          &nbsp;&nbsp;<a href={card.ec_internal_link}>internal link</a>
        </p>
        <p>type: {card.ec_eat_id}</p>
        <p>kind: {card.ec_ek_id} </p>
        <hr />
        <h5>Comments:</h5>
        <p>{card.ec_comments}</p>
      </div>
    )
  );
}
