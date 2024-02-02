// 4.38

import { useEffect, useState } from 'react';
import './App.css';
import Note  from './components/Note';
import {Note as NoteModel } from './models/note';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from "./styles/NotePage.modules.css";
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from "./components/AddNoteDialog";
import styleUtils from "./styles/utils.module.css";
// import * as NoteApi from "./network/notes_api";

function App() {
  // const [clickCount, setClickCount] = useState(0);
  const [notes, setNote] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  // 3.05 MIN
  useEffect(() => {
      async function getData(){
        try {

          // const response = await fetch("http://localhost:5000/api/notes", {method: "GET"})
          
          // const result = await response.json();
          const notes = await NotesApi.fetchNotes();
          // console.log(notes.title);
          setNote(notes)        
        }
        catch(err){
          alert(err)
        }
      }
      getData();
  }, [])

  // THIS function has an aim to delete specified note through its id;
  async function deleteNote(note:NoteModel){
    try {
      await NotesApi.deleteNote(note._id)
      // you should filter out through all items, and should upadate the DB after deleted of the specified note!
      // setNote(note.filter(existingNotes => existingNotes._id !== note._id))
      setNote(notes.filter(existingNote => existingNote._id !== note._id))
    }
    catch(err){
      console.error(err);
      alert(err)
    }
  }
  return (
    <Container >
    <Button
    className={`mb-4 ${styleUtils.blockCenter}`}
    onClick={() => {setShowAddNoteDialog(true)}}>Add New Note</Button>
      {/* extra small, medium, extra large */}
      <Row xs={1} md={2} xl={3} className="g-4">
        {
          notes.map( note => (
      <Col key={note._id} >
      <Note note={note}
      className={styles.note}
      onDeleteNote={deleteNote}
      />
      {/* <Button><i className="bi bi-trash"></i></Button> */}
        </Col>
    ))
   }
      </Row>
      {showAddNoteDialog  && <AddNoteDialog
      onDismiss={() => setShowAddNoteDialog(false)}
      onNoteSaved={(newNote) => {
        setNote([...notes, newNote])
        setShowAddNoteDialog(false)
      }}
      />}
      
    </Container>
   
  );
}

export default App;
