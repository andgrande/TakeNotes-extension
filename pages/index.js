import { useEffect, useReducer } from 'react';

import { AddReferenceToFauna } from './api/fauna/AddReferenceToFauna';
// import { GetDBAndCreateIdx } from './api/indexedDB/GetDBAndCreateIdx';

const IndexPage = () => {
  const [clientFieldValues, setClientFieldValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
  )

  const inputValues = {
    noteQuote: '',
    notePage: '',
    noteAuthor: '',
    noteYear: null,
    noteTitle: '',
    notePublisher: '',
    noteLink: '',
    notePaper: ''
  };
  
  useEffect(() => {
    (async () => {
      const [tab] = await chrome.tabs.query({
        active: true, lastFocusedWindow: true
      })
      const response = await chrome.tabs.sendMessage(tab.id, {
        from: 'panel',
        subject: 'DOMInfo',
      })
      setClientFieldValues(response);
    })();
  }, []);

  // THERE SHOULD BE A USE EFFECT HERE TO 
  // LOAD THE CURRENT PAPER TITLE IN WORK

  const handleSubmit = async (e) => {
    e.preventDefault();

    inputValues.noteQuote = document.getElementById("note-quote").value;
    inputValues.notePage = document.getElementById("note-page").value;
    inputValues.noteAuthor = document.getElementById("note-author").value;
    inputValues.noteYear = document.getElementById("note-year").value;
    inputValues.noteTitle = document.getElementById("note-title").value;
    inputValues.notePublisher = document.getElementById("note-publisher").value;
    inputValues.noteLink = document.getElementById("note-link").value;
    inputValues.notePaper = document.getElementById("note-paper").value;

    if (inputValues.noteQuote && inputValues.noteTitle != '') {
      AddReferenceToFauna(inputValues);
      // THERE SHOULD BE A CALL HERE FOR
      // INDEXED DB SAVE PAPER TITLE
    } else {
      alert("Quote and Title must be populated.")
    }
  }

  return (
    <div >  
      <h1>Take new reference</h1>
      <h3>
        Any
      </h3>
      <form id="oForm" onSubmit={handleSubmit} >
        <div >
          <label htmlFor="note-quote">Quote</label>
          <textarea name="note-quote" id="note-quote"placeholder="Quote" rows={5}></textarea>
        </div>
        <div >
          <label htmlFor="note-page">Page</label>
          <input name="note-page" id="note-page" type="text" placeholder="Page"/>
        </div>
        <div >
          <label htmlFor="note-author">Author</label>
          <input name="note-author" id="note-author" type="text" placeholder="Author" />
        </div>
        <div >
          <label htmlFor="note-year">Year</label>
          <input name="note-year" id="note-year" type="number" placeholder="Year" />
        </div>
        <div >
          <label htmlFor="note-title">Title</label>
          <textarea name="note-title" id="note-title"placeholder="Title" rows={2} value={clientFieldValues?.textTitle}></textarea>
        </div>
        <div >
          <label htmlFor="note-publisher">Publisher</label>
          <input name="note-publisher" id="note-publisher" type="text" placeholder="Publisher" />
        </div>
        <div >
          <label htmlFor="note-link">Link</label>
          <input name="note-link" id="note-link" type="text" placeholder="Link" value={clientFieldValues?.textURL} />
        </div>
        <div >
          <label htmlFor="note-paper">Paper Title</label>
          <input name="note-paper" id="note-paper" type="text" placeholder="Paper" />
        </div>
        <button id="btn-submit" type="submit">Submit</button>
      </form>

      <button id='qlqun' type="button" onClick={() => handleTheGet()} >GET ACTUAL</button>
    </div>
  );
};

export default IndexPage;
