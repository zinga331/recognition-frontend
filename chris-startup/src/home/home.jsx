import React, { useState, useEffect, useRef } from "react";
import { getTypes, getRecord, submitRecord, getQuote } from "../service.js";
import { NavLink, useNavigate } from "react-router-dom";
// import defaultImage from "/images/dummy_example.png";

function Home() {
  const [username, setUsername] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [types, setTypes] = useState([]);
  const [recordImage, setRecordImage] = useState(
    "../../public/images/spanish.png"
  );
  const [selectedType, setSelectedType] = useState("");
  const [addedFields, setAddedFields] = useState(0);
  const [curRecord, setCurRecord] = useState(null);
  const [fields, setFields] = useState([]);
  const [notification, setNotification] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [receiveNotifications, setReceiveNotifications] = useState();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("spanish");

  const selectRef = useRef();
  const receiveNotificationsRef = useRef(receiveNotifications);

  useEffect(() => {
    receiveNotificationsRef.current = receiveNotifications;
  }, [receiveNotifications]);

  const notify = (msgText) => {
    console.log("notify() called with " + msgText);
    console.log("receiveNotifications is " + receiveNotificationsRef.current);
    if (receiveNotificationsRef.current) {
      setNotification(msgText);
      setShowNotification(true);
    }

    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const navigate = useNavigate();

  const loadIndexDocument = async () => {
    const type =
      selectRef.current.options[
        selectRef.current.selectedIndex
      ].parentNode.label.toLowerCase();
    const record = await getRecord(type);

    if (record == null) {
      window.alert("There are no records of that type available!");
      return;
    }

    setCurRecord(record);
    setAddedFields(0);
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

      // Set up websocket notifications
      useWebSocket(username, notify);
    };

    const initialize = async () => {
      await loadTypes();
      // setShowDialog(true);

      //   await showDialog();
    };

    init();
    initialize();

    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      setUsername(storedUsername);
      setLoggedIn(true);
    } else {
      setUsername("Guest");
      setLoggedIn(false);
    }
    const storedReceiveNotifications = localStorage.getItem(
      "receiveNotifications"
    );
    setReceiveNotifications(storedReceiveNotifications === "true");
  }, []);

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    socket.onopen = (event) => {
      console.log("Connected web socket");
    };

    socket.onclose = (event) => {
      console.log("Disconnected web socket");
    };

    socket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data);
      const msgText = msg.msg;

      if (!msgText.includes(username)) {
        notify(msgText);

        // Clear the notification after 2 seconds
        setTimeout(() => {
          console.log("Clearing notification");
          notification.clear();
        }, 2000);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    loadIndexDocument();
  }, [selectedType]);

  useEffect(() => {
    console.log("selectedLanguage changed");
    console.log(selectedLanguage);
    setRecordImage(`../../public/images/${selectedLanguage.toLowerCase()}.png`);
    console.log("Record image is (useEffect1)" + recordImage);
  }, [selectedLanguage]);

  // Test log messages
  useEffect(() => {
    console.log("Record image is (useEffect2)" + recordImage);
  }, [recordImage]);

  useEffect(() => {
    console.log("receiveNotifications is " + receiveNotifications);
  }, [receiveNotifications]);

  // useEffect(() => {
  //   let hideNoticeTimer;

  //   if (showNotification) {
  //     hideNoticeTimer = setTimeout(() => {
  //       setShowNotification(false);
  //     }, 2000);
  //   }

  //   return () => {
  //     if (hideNoticeTimer) {
  //       clearTimeout(hideNoticeTimer);
  //     }
  //   };
  // }, [showNotification, notification]);

  const addRow = () => {
    console.log("addRow() called");
    setCurRecord({
      ...curRecord,
      fields: [...curRecord.fields, { editable: true, value: "" }],
    });
  };

  const removeRow = () => {
    const newFields = [...curRecord.fields];
    newFields.pop();
    setCurRecord({ ...curRecord, fields: newFields });
  };

  const handleDialogConfirm = () => {
    setShowDialog(false);
    setReceiveNotifications(true);
    localStorage.setItem("receiveNotifications", "true");
  };

  const handleDialogCancel = () => {
    setShowDialog(false);
    setReceiveNotifications(false);
    localStorage.setItem("receiveNotifications", "false");
  };

  const handleSelectChange = () => {
    const type =
      selectRef.current.options[selectRef.current.selectedIndex].parentNode
        .label;
    setSelectedType(type.toLowerCase());
  };
  const handleInputChange = (event, index) => {
    const newFields = [...curRecord.fields];
    newFields[index].value = event.target.value;
    setCurRecord({ ...curRecord, fields: newFields });
  };

  const handleFieldChange = (event, index) => {
    const newFields = [...curRecord.fields];
    newFields[index].field = event.target.value;
    setCurRecord({ ...curRecord, fields: newFields });
  };

  const loadTypes = async () => {
    const types = await getTypes();
    setTypes(types);
  };

  const submitTable = async () => {
    console.log("submitTable() called");
    if (!curRecord) return;
    const confirm = window.confirm(
      "Are you sure you want to submit the table?"
    );

    if (confirm) {
      curRecord.results = fields;
      await submitRecord(curRecord);

      // Clear the fields
      console.log("Clearing fields");
      setCurRecord(null);
    }
  };

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
        if (
          !msgText.includes(username) &&
          msgText.includes("just indexed something! Get on their level.") &&
          receiveNotifications
        ) {
          console.log("Notification received");
          notify(msgText);
        }
      };

      // Clean up the effect
      return () => socket.close();
    }, [username]); // Re-run the effect when the 'username' changes
  };

  const uniqueLanguages = [...new Set(types.map((type) => type.language))];

  return (
    <main className="container-fluid bg-secondary text-center">
      <header>
        <div className="header-buttons">
          <button
            id="notification-button"
            type="button"
            onClick={() => setShowNotification(true)}
          >
            Notifications
          </button>
          <button id="logout-button" type="logout" onClick={logout}>
            Logout
          </button>
        </div>
        <div
          className="notification"
          style={{ display: showNotification ? "block" : "none" }}
          onClick={() => {
            console.log("Notification is" + notification);
            console.log("Show notification is" + showNotification);
            setShowNotification(false);
          }}
        >
          {notification}
        </div>
      </header>
      <div>
        <title>Full Page Indexing</title>
        <link rel="stylesheet" href="style.css" />
        <h1>Welcome to indexing, {username}!</h1>
        {/* {showNotification ? (
          <div className="notification">{notification}</div>
        ) : (
          <></>
        )} */}

        <fieldset>
          <legend>Notifications Settings</legend>
          <div className="radioRow">
            <input
              type="radio"
              id="opt-in"
              name="notification"
              value="receive"
              checked={receiveNotifications}
              onChange={() => setReceiveNotifications(true)}
            />
            <label htmlFor="opt-in">Receive</label>
            <br />
            <input
              type="radio"
              id="opt-out"
              name="notification"
              value="receive-not"
              checked={!receiveNotifications}
              onChange={() => setReceiveNotifications(false)}
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
          src={recordImage}
          id="recordImage"
          width="800px"
        />
      </div>
      <body>
        <div className="form-wrapper">
          <div id="recordForm">
            <p>
              <label htmlFor="optgroup">Record Type: </label>
              <select
                id="optgroup"
                name="varOptGroup"
                ref={selectRef}
                onChange={(event) => {
                  console.log(selectRef.current);
                  handleSelectChange(event);
                  const valueWithoutIntegers = selectRef.current.value.replace(
                    /\d/g,
                    ""
                  );
                  setSelectedLanguage(valueWithoutIntegers);
                }}
              >
                {uniqueLanguages.map((language, index) => (
                  <optgroup key={index} label={language}>
                    {types
                      .filter((type) => type.language === language)
                      .map((type, i) => (
                        <option key={i} value={type.id}>
                          {type.display}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </p>

            <table id="documentForm">
              <legend>Indexing Entry</legend>
            </table>
            <div>
              {curRecord &&
                curRecord.fields.map((field, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={field.field}
                        onChange={(event) => handleFieldChange(event, index)}
                        disabled={false}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        id={field.field}
                        value={field.value}
                        onChange={(event) => handleInputChange(event, index)}
                        disabled={false}
                      />
                    </td>
                  </tr>
                ))}
            </div>
            <button id="addRow" className="menu" onClick={addRow}>
              +New Field
            </button>
            <button id="removeRow" className="menu" onClick={() => removeRow()}>
              Remove
            </button>
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
