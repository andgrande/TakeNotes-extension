export const GetDBAndCreateIdx = (notePaper) => {
  console.log("bon jo");
  // (function () {
    const DB_NAME = 'xtns-xx-take-notes';
    const DB_VERSION = 1; // Use a long long for this value (don't use a float)
    const DB_STORE_NAME = 'references';
  
    var db;
  
    function openDb() {
      console.log("openDb ...");
      var req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onsuccess = function (evt) {
        // Equal to: db = req.result;
        db = this.result;
        // console.log("openDb DONE");
      };
      req.onerror = function (evt) {
        console.error("openDb:", evt.target.errorCode);
      };
  
      req.onupgradeneeded = function (evt) {
        // console.log("openDb.onupgradeneeded");
        var store = evt.currentTarget.result.createObjectStore(
          DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });
  
        store.createIndex('paperTitle', 'paperTitle', { unique: false });
      };
    }
  
    /**
     * @param {string} store_name
     * @param {string} mode either "readonly" or "readwrite"
     */
    function getObjectStore(store_name, mode) {
      var tx = db.transaction(store_name, mode);
      return tx.objectStore(store_name);
    }
  
    function getIndex() {
      const objectStore = getObjectStore(DB_STORE_NAME, 'readwrite');
      // return objectStore.index("paperTitle")

      const req = objectStore.index("paperTitle")
      req.get("xix").onsuccess = function (evt) {
        if (typeof evt.target.result == 'undefined') {
          console.log("No matching record found");
          return;
        }
        console.log(evt.target.result)
      }
    }

    function addPublication(notePaper, blob) {
      // console.log("addPublication arguments:", arguments);
      var obj = { notePaper: notePaper };
      if (typeof blob != 'undefined')
        obj.blob = blob;
  
      var store = getObjectStore(DB_STORE_NAME, 'readwrite');
      getIndex();

      // const xoxo = index.getKey(10)

      // xoxo.onsuccess = (evt) => {
      //   console.log(evt.target);
      // }

      // const xoxo = index.getKey(9);
      // xoxo.onsuccess = (evt) => {
      //   console.log(evt.target);
      // }
      // xoxo.onerror = (evt) => {
      //   console.log(evt.type);
      // }
      // console.log(index.getKey(1))
      // if (index) console.log(index.getKey(1))

      var req;
      try {
        req = store.add(obj);
      } catch (e) {
        if (e.name == 'DataCloneError')
          displayActionFailure("This engine doesn't know how to clone a Blob, " +
                               "use Firefox");
        throw e;
      }
      req.onsuccess = function (evt) {
        // console.log("Insertion in DB successful");
        displayActionSuccess();
        // displayPubList(store);
      };
      req.onerror = function() {
        console.error("addPublication error", this.error);
        displayActionFailure(this.error);
      };
    }
    function displayActionSuccess(msg) {
      // msg = typeof msg != 'undefined' ? "Success: " + msg : "Success";
      // $('#msg').html('<span class="action-success">' + msg + '</span>');
      // console.log('Mensagem de sucesso ' + msg);
    }
    function displayActionFailure(msg) {
      // msg = typeof msg != 'undefined' ? "Failure: " + msg : "Failure";
      // $('#msg').html('<span class="action-failure">' + msg + '</span>')
      // console.log('Mensagem de erro ' + msg);;
    }
  

    // }
    openDb();
    // setTimeout(() => addPublication('publipubli'), 3000);
    if (notePaper) setTimeout(() => addPublication(notePaper), 3000);
  
  // })(); // Immediately-Invoked Function Expression (IIFE)
} 