// 'use client'

export default async function Any() {
  chrome.runtime.onMessage.addListener((msgRequest, sender, sendResponse) => {
    console.log("bonjour");
    console.log(msgRequest);
  
    // window.localStorage.setItem(textPaperTitle, 'azul do mar')
    if((msgRequest.from === 'panel') && (msgRequest.subject == 'DOMInfo')) {
  
      let gatheredData = {
        textTitle: document.title,
        textURL: document.URL,
        // textPaperTitle: window.localStorage.getItem(textPaperTitle),
      }
  
      console.log(gatheredData)
      sendResponse(gatheredData);
    }
  })
}