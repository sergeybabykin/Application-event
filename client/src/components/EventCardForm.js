import {
  Checkbox,
  Select,
  TextField,
  Typography,
  FormControlLabel,
  MenuItem,
  Menu,
  Button,
} from "@mui/material";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import styled from "@emotion/styled";

import { useState, useEffect } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./css/EventCardForm.css";
import axios from "axios";
import dayjs from "dayjs";


export default function EventCardForm() {
  const [eventName, setEventName] = useState("");
  const [isPlanned, setIsPlanned] = useState(false);
  const [eventLocation, setEventLocation] = useState("");
  const [isPhotoExist, setIsPhotoExist] = useState(false);
  const [internalLink, setInternalLink] = useState("");
  const [externalLink, setExternalLink] = useState("");

  const [eatId, setEatId] = useState(0);
  const [eventKindId, setEventKindId] = useState(0);

  const [comment, setComment] = useState("");

  const [selectedStudentsList, setSelectedStudentsList] = useState([]);

  const [staffId, setStaffId] = useState(0);
  const [date1, setDate1] = useState();
  const [date2, setDate2] = useState();

  // data lists for form selects
  const [eatList, setEatList] = useState([]);
  const [eventKindList, setEventKindList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    axios.get("/eat_list").then((res) => {
      setEatList(res.data.eats);
    });

    axios.get("/event_kind_list").then((res) => {
      setEventKindList(res.data.event_kinds);
    });

    axios.get("/student").then((res) => {
      setStudentList(res.data.students);
    });

    axios.get("/staff_list").then((res) => {
      setStaffList(res.data.staff);
    });
  }, []);

  const submit_form = () => {
    let body = {
      name: eventName,
      location: eventLocation,
      planned: isPlanned,
      photo: isPhotoExist,
      internal_link: internalLink,
      external_link: externalLink,
      eat_id: eatId,
      event_kind_id: eventKindId,
      comment: comment,
      student_list: selectedStudentsList,
      staff_id: staffId,
      date_start: dayjs(date1).format("YYYY-MM-DD"),
      date_end: dayjs(date2).format("YYYY-MM-DD"),
    };
    
    axios.post("/event_cards", body)
      .then((res) => {
        toast.success("successfully created new event card")
      })
      .catch((err) => {
        toast.error("Something went wrong, try again")
        console.log(err)
      })
  };

  return (
    <div class="form-wrapper">
      <div class="form">
        <Typography variant="h3">Новая карточка события</Typography>

        <TextField
          label="Название события"
          variant="outlined"
          onChange={(e) => setEventName(e.target.value)}
          required
        />

        <TextField
          label="Локация события"
          variant="outlined"
          onChange={(e) => setEventLocation(e.target.value)}
          required
        />

        <FormControlLabel
          label="Планируемое событие или внеплановое?"
          control={
            <Checkbox
              defaultChecked
              onChange={(e) => setIsPlanned(e.target.checked)}
              required
            />
          }
        />

        <FormControlLabel
          label="Наличие фотоматериалов"
          control={
            <Checkbox
              defaultChecked
              onChange={(e) => setIsPhotoExist(e.target.checked)}
              required
            />
          }
        />

        <TextField
          label="Внешняя ссылка"
          variant="outlined"
          onChange={(e) => setExternalLink(e.target.value)}
        />

        <TextField
          label="Внутренняя ссылка"
          variant="outlined"
          onChange={(e) => setInternalLink(e.target.value)}
        />

        <Typography variant="h5" sx={{ marginTop: "20px" }}>
          {" "}
          Выберите вид события{" "}
        </Typography>
        <Select
          variant="outlined"
          onChange={(e) => setEventKindId(e.target.value)}
        >
          {eventKindList.map((event_kind) => (
            <MenuItem key={event_kind.ek_id} value={event_kind.ek_id}>
              {event_kind.ek_name}
            </MenuItem>
          ))}
        </Select>

        <Typography variant="h5" sx={{ marginTop: "20px" }}>
          {" "}
          Выберите тип события{" "}
        </Typography>
        <Select variant="outlined" onChange={(e) => setEatId(e.target.value)}>
          {eatList.map((eat) => (
            <MenuItem key={eat.eat_id} value={eat.eat_id}>
              {eat.eat_name}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="Комментарии"
          variant="outlined"
          multiline
          rows={4}
          onChange={(e) => setComment(e.target.value)}
        />

        <Typography variant="h5" sx={{ marginTop: "20px" }}>
          {" "}
          Выберите участников{" "}
        </Typography>
        <StudentPicker
          students={studentList}
          setSelectedStudentsList={setSelectedStudentsList}
        />

        <Typography variant="h5" sx={{ marginTop: "20px" }}>
          {" "}
          Выберите преподавателя{" "}
        </Typography>
        <Select variant="outlined" onChange={(e) => setStaffId(e.target.value)}>
          {staffList.map((staff) => (
            <MenuItem key={staff.sl_id} value={staff.sl_id}>
              {staff.sl_firstname} {staff.sl_lastname} {staff.sl_surname}
            </MenuItem>
          ))}
        </Select>

        <Typography variant="h5" sx={{ marginTop: "20px" }}>
          {" "}
          Выберите даты начала и конца периода
        </Typography>

        <DatePicker onChange={(e) => setDate1(e)} />

        <DatePicker onChange={(e) => setDate2(e)} />

        <Button
          variant="filled"
          onClick={submit_form}
          sx={{ marginTop: "20px" }}
        >
          {" "}
          Создать{" "}
        </Button>
      </div>
    </div>
  );
}

function StudentPicker({ students, setSelectedStudentsList }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedText, setSelectedText] = useState("Выберите участника");
  const [selectedStudents, setSelectedStudents] = useState([]);

  const open_menu = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const close_menu = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleSelect = (checked, id) => {
    var newSelectList = [];
    if (checked) {
      console.log("selected: ", id);
      newSelectList = [...selectedStudents, id];
    } else {
      console.log("unselected: ", id);
      newSelectList = selectedStudents.filter((student) => student !== id);
    }
    newSelectList.sort((a, b) => a - b);
    console.log("selected_students: " + newSelectList);

    setSelectedText(get_selected_text(newSelectList));
    setSelectedStudents(newSelectList);
    setSelectedStudentsList(newSelectList);
  };

  const is_selected = (id) => {
    return selectedStudents.includes(id);
  };

  const get_student_by_id = (id) => {
    return students.find((student) => student.s_id === id);
  };

  const get_selected_text = (selectedStudents) => {
    const get_io = (st) => {
      return st.s_firstname + " " + st.s_lastname;
    };

    if (selectedStudents.length === 0) {
      return "Выберите участника";
    } else if (selectedStudents.length > 2) {
      let [st1, st2] = selectedStudents.slice(0, 2);
      return (
        get_io(get_student_by_id(st1)) +
        ", " +
        get_io(get_student_by_id(st2)) +
        " и еще " +
        (selectedStudents.length - 2)
      );
    } else {
      return selectedStudents
        .map((st_id) => get_io(get_student_by_id(st_id)))
        .join(", ");
    }
  };

  return (
    <>
      <Button
        onClick={open_menu}
        variant="outlined"
        sx={{
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        Выбрать...
      </Button>
      <p>{selectedText}</p>
      <Menu anchorEl={anchorEl} open={open} onClose={close_menu}>
        {students.map((student) => (
          <StudentPickerItem
            key={student.s_id}
            student={student}
            selected={is_selected(student.s_id)}
            handleSelect={handleSelect}
          />
        ))}
      </Menu>
    </>
  );
}

function StudentPickerItem({ student, selected, handleSelect }) {
  const [checked, setChecked] = useState(selected);

  const handleChoose = () => {
    handleSelect(!checked, student.s_id);
    setChecked(!checked);
  };

  return (
    <MenuItem>
      <StudentPickerItemDiv onClick={handleChoose}>
        {checked ? (
          <CheckBoxOutlinedIcon />
        ) : (
          <CheckBoxOutlineBlankOutlinedIcon />
        )}
        {student.s_firstname} {student.s_lastname} {student.s_surname}
      </StudentPickerItemDiv>
    </MenuItem>
  );
}

const StudentPickerItemDiv = styled("div")({
  padding: "0.5em",
  display: "flex",
  gap: "5px",
  justifyContent: "space-between",
});
