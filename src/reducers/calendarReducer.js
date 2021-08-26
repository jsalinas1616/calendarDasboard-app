import { types } from '../types/types';

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

const initialState = {
  events: [],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };
    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case types.eventClearActiveNote:
      return {
        ...state,
        activeEvent: null,
      };
    case types.eventUpdated:
      return {
        ...state,
        events: state.events.map((e) =>   
        e._id === action.payload._id ? action.payload : e
        ),
      };
    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter((e) => e._id !== state.activeEvent._id),
        activeEvent: null,
      };

    case types.eventLoaded:
      return {
        ...state,
        events: [...action.payload],
      };
      case types.eventLogout:
        return {
          ...initialState
        };
    default:
      return state;
  }
};
