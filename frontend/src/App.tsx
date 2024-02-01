// 4.38

import { useEffect, useState } from 'react';
import './App.css';
import Note  from './components/Note';
import {Note as NoteModel } from './models/note';
import { Container, Row, Col, Button } from 'react-bootstrap';
// import styles from "./style/Note.modules.css";
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from "./components/AddNoteDialog";
import styleUtils from "./styles/utils.module.css";

function App() {
  // const [clickCount, setClickCount] = useState(0);
  const [note, setNote] = useState<NoteModel[]>([]);
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


  return (
    <Container >
    <Button
    className={`mb-4 ${styleUtils.blockCenter}`}
    onClick={() => {setShowAddNoteDialog(true)}}>Add New Note</Button>
      {/* extra small, medium, extra large */}
      <Row xs={1} md={2} xl={3} className="g-4">
        {
          note.map( note => (
      <Col key={note._id} >
      <Note note={note} />
      {/* <Button><i className="bi bi-trash"></i></Button> */}
        </Col>
    ))
   }
      </Row>
      {showAddNoteDialog  && <AddNoteDialog
      onDismiss={() => setShowAddNoteDialog(false)}
      onNoteSaved={(newNote) => {
        setNote([...note, newNote])
        setShowAddNoteDialog(false)
      }}
      />}
      
    </Container>
   
  );
}

export default App;
