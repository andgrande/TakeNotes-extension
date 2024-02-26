import { useEffect, useReducer, useState } from 'react';

import { AddReferenceToFauna } from './api/fauna/AddReferenceToFauna';
import InputField from './components/InputField';
import TextAreaField from './components/TextAreaField';
// import { GetDBAndCreateIdx } from './api/indexedDB/GetDBAndCreateIdx';

import { TbRefresh, TbSearch } from "react-icons/tb";
import AcknowledgeEffect from './components/AcknowledgeEffect';

const IndexPage = () => {
  const [ refreshCount, setRefreshCount ] = useState(0);
  const [ showAckEffect, setShowAckEffect ] = useState(false);
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

  // TEMPORARILY DEACTIVATED FOR TESTING
  const getValuesFromPage = () => {
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
  }

  useEffect(() => {
    try {
      getValuesFromPage();  
    } catch (error) {
      console.log(error.msg + " SVP reload the page")
    }
  }, [refreshCount]);

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
      handleShowAcknowledge();
      handleRefeshFields();
    } else {
      alert("Quote and Title must be populated.")
    }
  }

  const handleRefeshFields = () => {
    document.getElementById("note-quote").value = "";
    setRefreshCount(state => state + 1);
  }

  const handleShowAcknowledge = () => {
    setShowAckEffect(true);
    setTimeout(() => setShowAckEffect(false), 1800);
  }

  return (
    <div className='flex-1 flex-col min-h-98vh mx-4 mt-2'>
      <div className='w-full flex flex-col items-center'>

        <AcknowledgeEffect state={showAckEffect} />

        <div className='w-full flex flex-row justify-between items-center'>
          <h1 className="text-2xl font-bold text-pale-800 w-1/2">
            Notes
          </h1>
          <div className='flex flex-row justify-around w-1/6'>
            <button
              onClick={() => handleRefeshFields()}
              className='w-1/6 self-end
              text-lg text-pale-700'
            >
              <TbRefresh />
            </button>
            <a
              href="https://take-notes-table.vercel.app"
              target="_blank" rel="noopener noreferrer"
              className='w-1/6 self-center text-lg text-pale-700'
            >
              <TbSearch />
            </a>
          </div>
        </div>
        <form id="oForm" onSubmit={handleSubmit} className='flex flex-col justify-between h-90vh w-full mt-4 space-y-2 -mb-4'>

          <TextAreaField rowsTag={4} nameTag="note-quote" placeholderTag="Quote"/>
          <InputField typeTag="text" nameTag="note-page" placeholderTag="Pages"/>
          <InputField typeTag="text" nameTag="note-author" placeholderTag="Author"/>
          <InputField typeTag="number" nameTag="note-year" placeholderTag="Year" />
          <TextAreaField rowsTag={2} nameTag="note-title" placeholderTag="Title" value={clientFieldValues?.textTitle} />

          <InputField typeTag="text" nameTag="note-publisher" placeholderTag="Publisher" />
          <InputField typeTag="text" nameTag="note-link" placeholderTag="Link" value={clientFieldValues?.textURL} />
          <InputField typeTag="text" nameTag="note-paper" placeholderTag="Paper" />

          <button id="btn-submit" type="submit"
            className='border border-pale-800 w-10/12 h-10 rounded self-center
            text-lg text-pale-200 bg-pale-800'
          >Submit</button>
        </form>
      </div>
    </div>
  );
};

export default IndexPage;
