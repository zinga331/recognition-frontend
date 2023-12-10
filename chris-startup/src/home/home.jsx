import React, { useState, useEffect } from "react";
import { getTypes, getRecord, submitRecord, getQuote } from "../service.js";

function Home() {
  const [username, setUsername] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [curRecord, setCurRecord] = useState(null);
  const [fields, setFields] = useState([]);

  const notify = (msgText) => {
    // Add your notification logic here
  };

  useEffect(() => {
    const init = async () => {
      console.log("init() called");

      // Add your button listeners here. In React, you typically do this in the JSX (see below)

      const types = await getTypes();
      setTypes(types);
      const username = localStorage.getItem("username");
      setUsername(username);
      setLoggedIn(!!username);

      // Call your other async functions here
      await showDialog();
      await loadIndexDocument();

      // Set up websocket notifications
      useWebSocket(username, notify);
    };
    init();
  }, []);

  useEffect(() => {
    const loadIndexDocument = async () => {
      if (!selectedType) return;
      const record = await getRecord(selectedType.toLowerCase());
      if (!record) {
        alert("There are no records of that type available!");
        return;
      }
      setCurRecord(record);
      setRecordImage(record.imageURL);
      setFields(
        record.fields.map((field) => ({ id: field.field, value: field.value }))
      );
    };
    loadIndexDocument();
  }, [selectedType]);

  const addRow = () => {
    setFields([...fields, { editable: true, value: "" }]);
  };

  const removeRow = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  // const loadIndexDocument = async () => {
  //     // ... similar to addRow and removeRow
  // };

  const submitTable = async () => {
    // ... similar to addRow and removeRow
  };

  const logout = async () => {
    // ... similar to addRow and removeRow
  };

  const useWebSocket = (username) => {
    useEffect(() => {
      const protocol = window.location.protocol === "https:" ? "wss" : "ws";
      let socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

      socket.onopen = (event) => {
        console.log("Connected web socket");
      };

      socket.onclose = (event) => {
        console.log("Disconnected web socket");
      };

      socket.onmessage = async (event) => {
        const msg = JSON.parse(await event.data.text());
        const msgText = msg.msg;

        // Check if the message contains the username. If not, ignore message and do not notify.
        if (!msgText.includes(username)) {
          notify(msgText);
        }
      };

      // Clean up the effect
      return () => socket.close();
    }, [username]); // Re-run the effect when the 'username' changes
  };

  // ... rest of the JSX code

  return (
    <main className="container-fluid bg-secondary text-center">
      <head>
        <title>Full Page Indexing</title>
        <link rel="stylesheet" href="style.css" />
        <h1>
          Welcome to indexing, <span className="user-name"></span>
        </h1>
        <div className="notification" tabIndex="0">
          No notifications yet
        </div>

        <fieldset>
          <legend>Notifications Settings</legend>
          <div className="radioRow">
            <input
              type="radio"
              id="opt-in"
              name="notification"
              value="receive"
            />
            <label htmlFor="opt-in">Receive</label>
            <br />
            <input
              type="radio"
              id="opt-out"
              name="notification"
              value="receive-not"
            />
            <label htmlFor="opt-out">Don't Receive</label>
            <br />
          </div>
          <p>
            Note: Site-wide notifications cannot be received if you are not
            opted in. You can opt in or out at any time.
          </p>
        </fieldset>
        <img
          alt="Slideshow Placeholder"
          src="images/dummy_example.png"
          id="recordImage"
          width="800px"
        />
      </head>
      <body>
        <div className="form-wrapper">
          <div id="recordForm">
            <p>
              <label htmlFor="optgroup">Record Type: </label>
              <select id="optgroup" name="varOptGroup"></select>
            </p>

            <table id="documentForm">
              <legend>Indexing Entry</legend>
            </table>
            <div>
              <button id="addRow" className="menu" onClick={addRow}>
                +New Field
              </button>
              {fields.map((field, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) =>
                      setFields(
                        fields.map((f, i) =>
                          i === index ? { ...f, value: e.target.value } : f
                        )
                      )
                    }
                  />
                  <button onClick={() => removeRow(index)}>Remove</button>
                </div>
              ))}{" "}
            </div>
            <button id="submitTable" className="menu" type="submit">
              Submit
            </button>
            <p className="warning">
              Verify the accuracy of the generation, then submit.
            </p>
          </div>
        </div>
      </body>

      {/* ... rest of the JSX code */}
    </main>
  );
}

export default Home;
