import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

//import actions for redux
import { uiCloseModal } from "../../actions/uiActions";
import {
  eventAddNew,
  eventClearActiveNote,
  eventUpdated,
} from "../../actions/events";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const startDate = moment().minutes(0).seconds(0).add(1, "hours");
const finishDate = moment().minutes(0).seconds(0).add(2, "hours");

const intialEvent = {
  title: "",
  notes: "",
  start: startDate.toDate(),
  end: finishDate.toDate(),
};

export const CalendarModal = () => {
  const [dateStart, setDateStart] = useState(startDate.toDate());
  const [dateFinish, setDateFinish] = useState(finishDate.toDate());
  const [validTitle, setValidTitle] = useState(true);

  //extract state of redux
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  //Monitor of activeEvent
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState(intialEvent);

  const { title, notes, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
      setDateStart(activeEvent.start);
      setDateFinish(activeEvent.end);
    } else {
      setFormValues(intialEvent);
    }
  }, [activeEvent, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(eventClearActiveNote());
    dispatch(uiCloseModal());

    setFormValues(intialEvent);
    setDateStart(startDate.toDate());
    setDateFinish(finishDate.toDate());
  };

  const handleStartDateChange = (e) => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const handleFinishDateChange = (e) => {
    setDateFinish(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentFinish = moment(end);

    if (momentStart.isSameOrAfter(momentFinish)) {
      Swal.fire(
        "Error",
        "La fecha de fin debe de ser mayor a la fecha de inicio",
        "error"
      );
      return;
    }

    if (title.trim().length < 2) {
      setValidTitle(false);
      return;
    }

    setValidTitle(true);

    closeModal();
    dispatch(eventClearActiveNote());

    //TO DO: realizar la grabación en la base de datos
    dispatch(
      activeEvent === null
        ? eventAddNew({
            ...formValues,
            id: new Date().getTime(),
            user: {
              id: 123,
              nombre: "Julian",
            },
          })
        : eventUpdated({
            ...formValues,
          })
    );
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> {activeEvent ? title : "Nuevo Evento"} </h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={dateStart}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleFinishDateChange}
            value={dateFinish}
            minDate={dateStart}
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!validTitle && "is-invalid"} `}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            onChange={handleInputChange}
            value={notes}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
