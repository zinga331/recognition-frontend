# recognition-frontend

## Startup Specs:

[Specs](startupSpec.md)

## Links to Christian's personal notes

[GeneralNotes](/notes.md)

## HTML deliverable

The following elements were implemented for the HTML assignment.

- **HTML pages** - Two HTML pages that represent the ability to log in and index records.
- **Links** - The login and register buttons on the login page both link to the index page. The log in/out button on the index page links to the login page.
- **Text** - Each field to index is represented by a textual description. The record types are also represented by text.
- **Images** - The indexing page contains an image of a sample French record. The login page currently contains the same image as well.
- **Login** - The login page has inputs for username and password, with options to both register and login. The indexing page displays the user name of the logged in user.
- **Database** - The image and initial field values represent content stored persistently in the database.
- **WebSocket** - The index page can display live notifications to the user in real time.

## CSS deliverable

The following elements were added for the CSS assignment.

- **Header, footer, and main content body** - the header and footer are offset with a different color and given fixed heights. The body takes up the remaining height of the page.
- **Navigation elements** - The login / logout link is placed in the header. I also formated the login/register buttons that link back to the index page.
- **Responsive to window resizing** - The header and footer have fixed heights, while the body resizes vertically to fill the remaining space. The image and form on each page also move and resize as the window changes.
- **Application elements** - I centered and placed the form elements for the pages. I also edited the color scheme for the elements.
- **Application text content** - I increased the size of the text and changed some of the colors. I also added margins and padding around the text.
- **Application images** - the image is placed within the left 66% of the page and resizes with the page.

## JavaScript deliverable

The following elements were added for the JavaScript assignment.

- **JavaScript support for future login.** - The login and register buttons read in the username and save it to local storage. This name is read back and displayed on the home page. The logout buttons clears this data from local storage.
- **JavaScript support for future database data.** - service.js provides a mock of potential database return values. Notice that the image on the home page and the fields randomly changes when reloading the page or submitting data. These mocks will be replaced with calls to the database.
- **JavaScript support for future WebSocket.** - The home page provides a function that makes a notification pop up on the screen. For demonstration, this function gets called by a timeout once the user has been on the page for 10 seconds. Clicking the notification button shows the last notification. This will be replaced by notification sent through the WebSocket.
- **JavaScript support for your application's interaction logic.** - Users can add and remove new fields from the table while indexing. The tables dynamically populated based on the results from the database queries.

## Service Deliverable

The following elements were added for the Service assignment.

- **Create an HTTP service using Node.js and Express** - This service in contained in full-page-backend.
- **Frontend served up using express static middleware** - Express is set up to statically host the files in the folder public. Since we both developed independent frontends for practice, we replace the public folder with a symbolic link to the desired frontend.
- **Your frontend calls third party service endpoints** - The frontend calls quotable random api and displays the quote on the main page, or in Chris' case, the periodic notifications.
- **Your backend provides service endpoints** - The backend provides enpoints to support the following actions: loging in, registering, geting types of records, geting record for a type, and submiting a record. Since we have not added a database yet, these endpoints provide mocked values to the frontend that can later be replaced with calls to the database.
- **Your frontend calls your service endpoints** - The frontend calls the endpoints listed above and uses them in the data that it displays.

## Database Deliverable

The following elements were added for the Database assignment.

- **Add code for connecting to the database** - Added database.js to host the connection to the database.
- **Provide endpoints for adding, updating, and deleting your application data in the database** -
  - **Add a record** - Added an endpoint to add a record to the database. This endpoint is called when initializing the database within init() in initialize.js.
  - **Update a record** - Added an endpoint to update a record in the database. This endpoint is called when the user submits a record, and the user's entry form is submitted to the database. The entry form is associated with the record id, and the user who submitted the form.
  - **Delete a record** - Added an endpoint to clear all indexed records from the database. This is apart of an admin function not called by the front end.
- **Persist data in MongoDB.** - Data is stored in a MongoDB database and retrieved when needed.
- **Provide endpoints for retrieving your application data from the database** -
  - **Get Types** - On page load the types of records are retrieved from the database and displayed in the dropdown menu.
- **Display the user data in the frontend by manipulating the DOM.** - Unchanged from previous deliverables. The user's name is displayed after logging in, and the user's name is cleared after logging out.

## Login Deliverable

The following elements were added for the Login assignment.

- **Allow new users to create accounts by providing credentials** - This is done by entering a new username and password on the login screen and clicking the register button. The backend will send back an error message if the username already exists.
- **Store Encrypted credentials in your database** - The password is hashed with bcrypt before being stored in the database along with the username and a session token.
- **Authenticate users by comparing provided credentials against those stored in the database** - When users attempt to login, it looks up the username in the database and compares password hashes. If the username does not exist or the password is incorrect it says that one of them is incorrect. 
- **Restrict access to parts of the application that require authorization** - Users can only index when they are logged in. The index page will call the whoami route in the backend to check if the user is authenticated. If they are not, it redirects to the login page. Additionally, the backend limits all indexing-related routes to users that are authenticated.

## WebSocket Deliverable

The following elements were added for the WebSocket assignment.

- **WebSocket support for data pushed from the backend** - The notifications in the frontend are supported by a websocket connection. This allows the backend to send a message to all active users.
- **Backend listens for WebSocket connection** - This is contained in peerProxy.js.
- **Frontend makes WebSocket connection** - The indexing page connects to the web socket in the backend when the page is loaded.
- **Data sent over WebSocket connection** - Whenever a user submits a record, a taunt is sent to all users telling them that the other user is indexing more than they are.
- **WebSocket data displayed in the application interface** - The notifications received from the backend are displayed as temporary popups on the frontend.

## React Deliverable

The following elements were added for the React assignment.

- **Bundled using Vite** - Vite is used to build static files for the assignment.
- **Multiple functional react components** - the app consists of a high-level app component, a login component, and an indexing component.
- **React router** - the router directs the user between the login page and the home page. Automatic redirects based on login status are managed through the router's redirect option.
- **React hooks** - React hooks are used to make calls to initialize each page, such as checking if the user is logged in or loading the first image. Additionally, a react hook is used to request a new image when the user changes the selected type.
