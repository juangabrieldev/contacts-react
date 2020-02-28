import { ADD_CONTACT, EDIT_CONTACT, DELETE_CONTACT } from "./action-type";

const initialState = {
  contactList: [
    {
      id: "quaxi71a",
      firstName: "Aubrey",
      middleName: "",
      lastName: "Terry",
      mobileNumber: "09591736637",
      emailAddress: "aubreyterry@gmail.com"
    },
    {
      id: "cqc3tmbxc",
      firstName: "Kara",
      middleName: "",
      lastName: "Lawrence",
      mobileNumber: "09693943668",
      emailAddress: "karalawrence@gmail.com"
    },
    {
      id: "6e3gtfyzs",
      firstName: "Raquel",
      middleName: "",
      lastName: "Wright",
      mobileNumber: "09177324640",
      emailAddress: "raquelwright@gmail.com"
    },
    {
      id: "lpwx12ww",
      firstName: "Lola",
      middleName: "",
      lastName: "Garrett",
      mobileNumber: "09453244072",
      emailAddress: "lolagarrett@gmail.com"
    }
  ]
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_CONTACT:
      return {
        contactList: [
          ...state.contactList,
          action.payload
        ]
      };

    case DELETE_CONTACT:
      return {
        contactList: state.contactList.filter(contact => (
          action.payload.includes(contact.id) === false
        ))
      };

    case EDIT_CONTACT:
      return {
        contactList: state.contactList.map(contact => (
          contact.id === action.payload.id ?
          {
            ...contact,
            ...action.payload
          } :
          contact
        ))
      }

    default:
      return state;
  }
};

export default reducer;