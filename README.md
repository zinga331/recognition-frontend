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

- (Required) Simon Service deployed to your production environment
- (Required) A link to your GitHub startup repository prominently displayed on your application's home page
- (Required) Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable. The TAs will only grade things that have been clearly described as being completed. Review the [voter app](https://github.com/webprogramming260/startup-example) as an example.
- Backend web service support and interaction

1. **30% - Create an HTTP service using Node.js and Express**
1. **10% - Frontend served up using express static middleware**
1. **10% - Your frontend calls third party service endpoints**
1. **20% - Your backend provides service endpoints**
1. **20% - Your frontend calls your service endpoints**

   1. **10% - Multiple Git commits with meaningful comments.**

1. Review and deploy Simon Service
   1. Clone the Simon Service repository to your development environment.
   1. Run `npm install` in the root of the project.
   1. Open the project in VS Code and examine the application's use of Node.js, Express, and JavaScript to create service endpoints.
   1. Execute in your development environment by debugging the application using VS Code's Node.js debugger (press F5 while viewing `index.js`). Set breakpoints in VS Code and step through the backend JavaScript.
   1. Open your browser to https://localhost:3000 and use the browser's dev tools to step through the frontend JavaScript using the Source tab.
   1. Deploy to your production environment using the deployment script so that it is available with your domain's `simon` subdomain.
1. Convert your startup application into a web service using Node.js and Express.
1. Serve up your frontend code using the Express static middleware.
1. Provide endpoints for your service.
1. Call your endpoints from your frontend code.
1. Call third party endpoints from your frontend code. This can be as simple as displaying a quote like Simon does.
1. Debug your application using VS Code's Node debugger and the browser's dev tools, in your development environment, to verify it is working correctly.
1. Periodically commit and push your code to GitHub.
1. Periodically update your startup repository's notes.md file to reflect what you have learned and want to remember.
1. Push your final version of your project to GitHub.
1. Deploy your startup application to your production environment (your server).
1. Make sure your application is available from your production environment.
1. Upload the URL to your startup application to the Canvas assignment.
