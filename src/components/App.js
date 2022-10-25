import React,{useState,useEffect} from 'react'
import "./App.css"
import { BrowserRouter as Router} from 'react-router-dom';
import {Route,Routes} from "react-router";
import {v4 as uuid} from "uuid";
import Header from "./Header"
import AddContact from "./AddContact"
import ContactList from "./ContactList"
import ContactDetail from './ContactDetail'


function App(){
  const LOCAL_STORAGE_KEY="contacts"
  const [contacts,setContacts]=useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))??[])

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  }


  

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className='ui container'>
      <Router forceRefresh={true}>
        <Header/>
        <Routes>
        <Route path="/add" element={<AddContact addContactHandler={addContactHandler}/>}/>
        
        <Route path="/" element={<ContactList contacts={contacts} getContactId={removeContactHandler} /> }/>
        <Route path="/contact/:id" element={<ContactDetail contacts={contacts} />} />
        </Routes>
        
        {/**/}
        {/**/}

      </Router>
    </div>
  )
}

export default App