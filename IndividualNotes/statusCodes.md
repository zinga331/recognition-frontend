300 Redirection: This class of status code indicates that further action needs to be taken by the user agent in order to fulfill the request. The action required may be carried out by the user agent without interaction with the user if and only if the method used in the second request is GET or HEAD. A user agent should not automatically redirect a request more than five times, since such redirections usually indicate an infinite loop. Some examples include:

- 301 Moved Permanently: The URL of the requested resource has been changed permanently. The new URL is given in the response.
- 302 Found: This response code means that the URI of requested resource has been changed temporarily. Further changes in the URI might be made in the future.

400 Client Error: This class of status code is intended for situations in which the client seems to have erred. Except when responding to a HEAD request, the server should include an entity containing an explanation of the error situation, and whether it is a temporary or permanent condition. Some examples include:

- 400 Bad Request: This response means that server could not understand the request due to invalid syntax.
- 404 Not Found: The server can not find requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist.

500 Server Error: The server failed to fulfill a request. Response status codes beginning with the digit "5" indicate cases in which the server is aware that it has encountered an error or is otherwise incapable of performing the request. Some examples include:

- 500 Internal Server Error: The server has encountered a situation it doesn't know how to handle.
- 503 Service Unavailable: The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded.

These status codes are part of the HTTP/1.1 standard (RFC 7231). The Internet Assigned Numbers Authority (IANA) maintains the official registry of HTTP status codes.