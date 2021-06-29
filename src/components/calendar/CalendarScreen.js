import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { Navbar } from "../ui/Navbar";
import { messages } from "../../helpers/calendar-messages-es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";

//import actions for redux
import { uiOpenModal } from "../../actions/uiActions";

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
import "moment/locale/es";
import { eventClearActiveNote, eventSetActive } from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";

moment.locale("es");
const localizer = momentLocalizer(moment); // or globalizeLocalizer

// const events = [
//   {
//     title: "Cumpleaños del jefe",
//     start: moment().toDate(),
//     end: moment().add(2, "hours").toDate(),
//     notes: "comprar el pastel",
//     user: {
//       _id: "123434",
//       name: "Julians",
//     },
//   },
// ];

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );
  const onDoubleClickEvent = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    console.log(e);
    dispatch(eventSetActive(e));
  };

  const onViewEvent = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const onSelectSlot = (e) => {
    dispatch(eventClearActiveNote());
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };

    return {
      style,
    };
  };

  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        onDoubleClickEvent={onDoubleClickEvent}
        onSelectEvent={onSelectEvent}
        onView={onViewEvent}
        onSelectSlot={onSelectSlot}
        selectable={true}
        view={lastView}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
      />

      {activeEvent && <DeleteEventFab />}
      <AddNewFab />
      <CalendarModal />
    </div>
  );
};
