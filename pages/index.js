// import Any from "./api/any";
import dynamic from 'next/dynamic';
import { useEffect, useReducer } from 'react';

const Any = dynamic(() => import('./api/any'), { ssr: false})

const IndexPage = () => {

  const [clientFieldValues, setClientFieldValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    // initialFieldValues,
  )

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

  const clickButt = () => {
    console.log(`OI`);
    let quote = document.getElementById("note-quote").value;
    console.log(quote);
  }

  // function addEventListeners() {
  //   console.log("addEventListeners");

  //   $('#btn-submit').click(function(evt) {
  //     console.log("add ...");
  //     var title = $('#note-title').text();
  //     if (!title) title = $('#note-title').val();
  //     console.log(title);

  //     var quote = $('#note-quote').val();
  //     console.log(quote);
     
  //   });
   
  // }
  // addEventListeners();

  return (
    <div >  
      
      <h1>Take new reference</h1>
      <h3><Any/></h3>
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
      <button id="btn-submit" type="button" onClick={() => clickButt()}>Submit</button>
    </div>
  );
};

export default IndexPage;
