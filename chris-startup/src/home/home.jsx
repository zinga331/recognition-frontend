import React, { useState, useEffect } from "react";
import { getTypes, getRecord, submitRecord, getQuote } from "../service.js";
import { NavLink, useNavigate } from "react-router-dom";

function Home() {
  const [username, setUsername] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [curRecord, setCurRecord] = useState(null);
  const [fields, setFields] = useState([]);
  const [notification, setNotification] = useState(null);
  const [receiveNotifications, setReceiveNotifications] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [optIn, setOptIn] = useState(false);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const notify = (msgText) => {
    if (receiveNotifications) {
      setNotification(msgText);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      console.log("init() called");

      // Add your button listeners here. In React, you typically do this in the JSX (see below)

      const types = await getTypes();
      setTypes(types);
      const username = localStorage.getItem("username");
      setUsername(username);
      setLoggedIn(!!username);

      // Set up websocket notifications
      useWebSocket(username, notify);
    };

    const initialize = async () => {
      await loadTypes();
    //   await showDialog();
      await loadIndexDocument();
    };

    init();
    initialize();
    setShowDialog(true);


    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      setUsername(storedUsername);
      setLoggedIn(true);
    } else {
      setUsername("Guest");
      setLoggedIn(false);
    }
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

  const handleDialogConfirm = () => {
    setOptIn(true);
    setShowDialog(false);
  };
  
  const handleDialogCancel = () => {
    setOptIn(false);
    setShowDialog(false);
  };

  // const loadIndexDocument = async () => {
  //     // ... similar to addRow and removeRow
  // };

  const submitTable = async () => {
    if (!curRecord) return;
    const confirm = window.confirm(
      "Are you sure you want to submit the table?"
    );

    if (confirm) {
      curRecord.results = fields;
      await submitRecord(curRecord);

      // Clear the fields
      setFields([]);
    }
  };
  // Todo handle the opt-in and opt-out buttons differently
//   async function showDialog() {
//     const result = window.confirm("Opt-in to receive notifications?");
//     if (result) {
//       document.getElementById("opt-in").click();
//     } else {
//       document.getElementById("opt-out").click();
//     }
//   }

  const logout = async () => {
    console.log("logout() called");
    if (loggedIn) {
      localStorage.removeItem("username");
      try {
        const response = await fetch("/api/logout", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Logout failed: ${response.statusText}`);
        }

        // If the logout was successful, redirect to the landing page
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
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
      <header>
        {/* <NavLink className="nav-link" to="/">
          {" "}
          Return to Landing Page
        </NavLink> */}
        <div className="header-buttons">
          <button id="notification-button" type="notification">
            Notifications
          </button>
          <button id="logout-button" type="logout" onClick={logout}>
            Logout
          </button>
        </div>
        <div
          className="notification"
          style={{ display: notification ? "block" : "none" }}
        >
          {notification}
        </div>
      </header>
      <div>
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
              checked={optIn}
              onChange={() => setOptIn(true)}
            />
            <label htmlFor="opt-in">Receive</label>
            <br />
            <input
              type="radio"
              id="opt-out"
              name="notification"
              value="receive-not"
              checked={!optIn}
              onChange={() => setOptIn(false)}
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
      </div>
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
            <button
              id="submitTable"
              className="menu"
              type="submit"
              onClick={submitTable}
            >
              Submit
            </button>
            <p className="warning">
              Verify the accuracy of the generation, then submit.
            </p>
          </div>
        </div>
      </body>

      {/* ... rest of the JSX code */}
      {showDialog && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <p>Opt-in to receive notifications?</p>
          <button onClick={handleDialogConfirm}>Yes</button>
          <button onClick={handleDialogCancel}>No</button>
        </div>
      </div>
    )}
    </main>
  );
}

export default Home;
