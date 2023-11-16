# recognition-frontend

# Startup Specs:

[Specs](startupSpec.md)

# Links to Christian's personal notes

[GeneralNotes](/notes.md)

# HTML deliverable

The following elements were implemented for the HTML assignment.

- **HTML pages** - Two HTML pages that represent the ability to log in and index records.
- **Links** - The login and register buttons on the login page both link to the index page. The log in/out button on the index page links to the login page.
- **Text** - Each field to index is represented by a textual description. The record types are also represented by text.
- **Images** - The indexing page contains an image of a sample French record. The login page currently contains the same image as well.
- **Login** - The login page has inputs for username and password, with options to both register and login. The indexing page displays the user name of the logged in user.
- **Database** - The image and initial field values represent content stored persistently in the database.
- **WebSocket** - The index page can display live notifications to the user in real time.

# CSS deliverable

The following elements were added for the CSS assignment.

- **Header, footer, and main content body** - the header and footer are offset with a different color and given fixed heights. The body takes up the remaining height of the page.
- **Navigation elements** - The login / logout link is placed in the header. I also formated the login/register buttons that link back to the index page.
- **Responsive to window resizing** - The header and footer have fixed heights, while the body resizes vertically to fill the remaining space. The image and form on each page also move and resize as the window changes.
- **Application elements** - I centered and placed the form elements for the pages. I also edited the color scheme for the elements.
- **Application text content** - I increased the size of the text and changed some of the colors. I also added margins and padding around the text.
- **Application images** - the image is placed within the left 66% of the page and resizes with the page.

# JavaScript deliverable

The following elements were added for the JavaScript assignment.

- **JavaScript support for future login.** - The login and register buttons read in the username and save it to local storage. This name is read back and displayed on the home page. The logout buttons clears this data from local storage.
- **JavaScript support for future database data.** - service.js provides a mock of potential database return values. Notice that the image on the home page and the fields randomly changes when reloading the page or submitting data. These mocks will be replaced with calls to the database.
- **JavaScript support for future WebSocket.** - The home page provides a function that makes a notification pop up on the screen. For demonstration, this function gets called by a timeout once the user has been on the page for 10 seconds. Clicking the notification button shows the last notification. This will be replaced by notification sent through the WebSocket.
- **JavaScript support for your application's interaction logic.** - Users can add and remove new fields from the table while indexing. The tables dynamically populated based on the results from the database queries.

# Service Deliverable

The following elements were added for the Service assignment.

- **Create an HTTP service using Node.js and Express** - This service in contained in full-page-backend.
- **Frontend served up using express static middleware** - Express is set up to statically host the files in the folder public. Since we both developed independent frontends for practice, we replace the public folder with a symbolic link to the desired frontend.
- **Your frontend calls third party service endpoints** - The frontend calls quotable random api and displays the quote on the main page, or in Chris' case, the periodic notifications.
- **Your backend provides service endpoints** - The backend provides enpoints to support the following actions: loging in, registering, geting types of records, geting record for a type, and submiting a record. Since we have not added a database yet, these endpoints provide mocked values to the frontend that can later be replaced with calls to the database.
- **Your frontend calls your service endpoints** - The frontend calls the endpoints listed above and uses them in the data that it displays.

# Database Deliverable

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

# Login Deliverable

The following elements were added for the Login assignment.

- **Allow new users to create accounts by providing credentials** -
- **Store Encrypted credentials in your database** -
- **Authenticate users by comparing provided credentials against those stored in the database** -
- **Restrict access to parts of the application that require authorization** -
