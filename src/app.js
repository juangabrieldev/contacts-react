import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./component/header/header";
import ContactForm from "./component/contact-form/contact-form";
import ContactList from "./component/contact-list/contact-list";

import { addContact, deleteContact, editContact } from "./redux/action";

import "./app.scss";

const App = () => {
  const contactList = useSelector(state => state.contactList);
  const dispatch = useDispatch();

  const [ contactFormMode, setContactFormMode ] = useState("hidden");
  const [ selectedContactList, setSelectedContactList ] = useState([]);
  const [ contactFormWidth, setContactFormWidth ] = useState(0);

  const ref = useRef();

  const hideContactForm = useCallback((event) => {
    event.preventDefault();
    setContactFormMode("hidden");
    setSelectedContactList([]);
  });

  const saveContact = useCallback((contact) => {
    switch(contactFormMode) {
      case "add":
        dispatch(addContact({
          ...contact,
          id: Math.random().toString(36).substring(4)
        }));
        break;
      case "edit":
        dispatch(editContact(contact));
        break;
      default:
        break;
    }

    setContactFormMode("hidden");
    setSelectedContactList([]);
  }, [contactFormMode]);

  const selectContact = useCallback(
    (id) => {
      let isContactAlreadySelected = selectedContactList.filter(
        selectedContact => selectedContact === id
      ).length > 0;

      if(isContactAlreadySelected){
        setSelectedContactList(selectedContactList.filter(
          selectedContact => selectedContact !== id
        ));
      } else {
        setSelectedContactList([...selectedContactList, id])
      }
    },
    [selectedContactList]
  );

  const showEditContactForm = useCallback((id) => {
    setSelectedContactList([id]);
    setContactFormMode("edit");
  }, [contactList]);

  useEffect(
    ( ) => {
      setSelectedContactList([]);
    },
    [contactList]
  );

  useEffect(
    () => {
      setContactFormWidth(ref.current.offsetWidth)
    },
    [contactList]
  );

  return (
    <>
      {
        contactFormMode === "hidden" && (
          <div className="contact-container">
            <Header
              addContact={ () => {
                setContactFormMode("add");
              } }
              deleteContact={ () => {
                dispatch(deleteContact(selectedContactList));
              } }
              selectedContactList={ selectedContactList }
            />
            <ContactList
              ref={ ref }
              contactList={ contactList }
              selectContact={ selectContact }
              selectedContactList={ selectedContactList }
              showEditContactForm={ showEditContactForm }
            />
          </div>
        )
      }
      {
        contactFormMode !== "hidden" && (
          <ContactForm
            cancel={ hideContactForm }
            formWidth={ contactFormWidth }
            mode={ contactFormMode }
            saveContact={ saveContact }
            selectedContact={
              contactList.filter(contact => (
                contact.id === selectedContactList[0]
              ))[0]
            }
            setContactFormMode={ setContactFormMode }
          />
        )
      }
    </>
  );
}

export default App;