# Storage services

Web applicationss ocmmonly need to store files associated with the application or the users of the application. Think of images, user uploade,s documents and movies. These files are often stored in a database, but this is not the best solution. Databases are not designed to store large files. Instead, we use a storage service.

It might be tempting to store files directly on your server. This is usually a bad idea for several reasons.

1. Your server has limited drive space. If you server runs out of drive space your entire application will fail.
1. You should consider your server as being ephemeral, or temporary. It can be thrown away and replaced by a copy at any time. If you start storing files on the server, then your server has state that cannot be easily replaced.
1. You need backup copies of your application and user files. If you only have one copy of your files on your server, then they will disappear when your server disappears, and you must always assume that your server will disappear.

Instead you want to use a storage service that is specifically designed to support production storage and delivery of files.

## AWS S3

There are many such solutions out there, but one of the most popular ones is [AWS S3](https://aws.amazon.com/s3/). S3 provides the following advantages:

1. It has unlimited capacity
1. You only pay for the storage that you use
1. It is optimized for global access
1. It keeps multiple redundant copies of every file
1. You can version the files
1. It is performant
1. It supports metadata tags
1. You can make your files publicly available directly from S3
1. You can keep your files private and only accessible to your application

In this course we will not be using any storage services for the Simon project. If, however, you want to use S3 as the storage service for your Startup application, then you need to learn how to use the AWS SDK. You can find detailed information about using AWS S3 with Node.js on the [AWS website](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html). Generally, the steps you need to take include:

1. Creating a S3 bucket to store your data in.
1. Getting credentials so that your application can access the bucket.
1. [Using](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html) the credentials in your application.
1. Using the [SDK](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html) to write, list, read, and delete files from the bucket.

⚠ Make sure that you do not include your credentials in your code. If you check your credentials into your GitHub repository they will immediately be stolen and used by hackers to take over your AWS account. This may result in significant monetary damage to you.

# Authorization services

If your application is going to remember a user's data, then you will need a way to uniquely associate the data with a particular credential. That means you will `athenticate` a user by asking for their login information. We'll remember the user has authenticated by storing an `authorization token` on their local device. Often that token is stored in a cookie that is passed to your web service on each request.

![authentication](notesImages/authServiceAuthentication.jpg)

> Determining what a user is `authorized` to do in your application is also important. For example, you might have different roles in your application such as Administrators, Editors, and Customers. Once you have the ability to authenticate a user and store information about that user, you can also store the authorization for the user. A simple application might have a single field that represents the role of the user. The service code would then use that role to allow, limit, or prevent what a service endpoint does. A complex web application will usually have very powerful authorization representation that controls the user's access to every part of the application. For example, an Editor role might have authorization only to work on content that they created or were invited to.

![authorize](notesImages/authServiceAuthorize.jpg)

> As you might imagine, authentication and authorization can become very complex, very quickly. It is also a primary target for a hacker. If they can bypass the authentication or escalate what they are authorized to do, then they can gain control of your application. Additionally, constantly forcing users to authenticate in a secure way causes users to not want to use an application. This creates opposing priorities: keep the system secure or make it easy to use.

> In an attempt to remove the complexity of authentication and authorization from your application, many service providers and package developers have created solutions that you can use. Assuming that you are using a trusted, well-tested service this is an attractive option because it removes the cost of building, testing, and managing that critical infrastructure yourself.

> Authorization services often use standard protocols for authenticating and authorizing. These include standards such as OAuth, SAML, and OIDC. Additionally, they usually support concepts like Single Sign On (SSO) and Federated Login. Single sign on allows a user to use the same credentials for multiple web applications. For example, you can log in to GitHub using your Google credentials. Federated login allows a user to log in once, and then the authentication token is reused to automatically log the user in to multiple websites. For example, logging in to Gmail allows you to also use Google Docs and YouTube without logging in again.

# Account creation and login

The first step towwards supporting authentication in your web application is providing a way for ussers to uniquely identify themselves. This usually requires two service endpoints: one to `create` an authentication credential, and the other to authenticate or `login` a user on future visites. Once a user is authenticated we can control access to other endpoints.

> For example, web services often have a getMe endpoint that gives information about the currently authenticated user. We will implement this endpoint to demonstrate that authentication is actually working correctly
