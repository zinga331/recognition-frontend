The following are examples of questions we may see on the midterm:

<!-- 1. In the following code, what does the link element do? -->

1.  In the following code, what does a div tag do?
    > Div tags are used to group HTML elements together. They are used to apply CSS styles to a group of elements. They are also used to apply JavaScript to a group of elements.
1.  In the following code, what is the difference between the #title and .grid selector?
    > The #title selector selects the element with the id of title. The .grid selector selects all elements with the class of grid.
1.  In the following code, what is the difference between padding and margin?
    > Padding is the space between the content and the border. Margin is the space between the border and the next element.
1.  Given this HTML and this CSS how will the images be displayed using flex?
    > e.g.The images will be displayed in a row with the first image taking up 2/3 of the space and the second image taking up 1/3 of the space.
    <!-- 1. What does the following padding CSS do? -->
1.  What does the following code using arrow syntax function declaration do?
    > See [notes on arrow functions](/IndividualNotes/javascript.md#arrow-functions)
1.  What does the following code using map with an array output?
    > See [notes on object functions](/IndividualNotes/javascript.md#object-functions)
1.  What does the following code output using getElementByID and addEventListener?
    > See [notes on getElementByID](/IndividualNotes/javascriptAdvancedConcepts.md#my-solution), and [notes that mention addEventListener](/IndividualNotes/javascript.md#putting-it-all-togther-by-lee-jensen)
1.  What does Javascript do using a # selector?
    > In JavaScript, the # selector is used to select an element with a specific ID attribute. This can be done using the document.querySelector() method or the document.getElementById() method. Once the element is selected, you can manipulate its properties or add event listeners to it using JavaScript.
1.  Which of the following are true? (mark all that are true about the DOM)
    > The DOM is a tree structure that represents the HTML document. The DOM is used to manipulate the HTML document using JavaScript. The DOM is used to add event listeners to HTML elements using JavaScript. [Dom notes](/IndividualNotes/javascriptAdvancedConcepts.md#accessing-the-dom)
1.  By default, the HTML span element has a default CSS display property value of:
    > inline
1.  How would you use CSS to change all the div elements to have a background color of red?

    ```css
    div {
      background-color: red;
    }
    ```

1.  How would you display an image with a hyperlink in HTML?
    > <a href="https://example.com">
        <img src="image.jpg" alt="Description of the image">
    </a>
1.  In the CSS box model, what is the ordering of the box layers starting at the inside and working out?
    > Content, padding, border, margin
    > We know this is correct because the padding is between the content and the border, and the margin is between the border and the next element.
1.  Given the following HTML, what CSS would you use to set the text "troubl" to green and leave the "double" text unaffected?
    >
    ```html
    <p id="trouble">troubl<span id="double">e</span></p>
    ```
    ```css
    #trouble {
      color: green;
    }
    ```
1.  What will the following code output when executed using a for loop and console.log?
    ```js
    let arr = [1, 2, 3, 4, 5];
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]);
    }
    ```
    > 1, 2, 3, 4, 5
1.  How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?
    >
    ```js
    document.getElementById("byu").style.color = "green";
    ```
1.  What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?
    > p, ol, ul, h2, h1, h3
    ```html
    <p>paragraph</p>
    <ol>
      ordered list
    </ol>
    <ul>
      unordered list
    </ul>
    <h2>heading 2</h2>
    <h1>heading 1</h1>
    <h3>heading 3</h3>
    ```
1.  How do you declare the document type to be html?
    ```html
    <!DOCTYPE html>
    ```
1.  What is valid javascript syntax for if, else, for, while, switch statements?
    ```js
    //if/else statement
    if (condition) {
      // code to execute if condition is true
    } else {
      // code to execute if condition is false
    }
    //for loop
    for (let i = 0; i < 10; i++) {
      // code to execute
    }
    //while loop
    while (condition) {
      // code to execute
    }
    //switch statement
    switch (expression) {
      case value1:
        // code to execute if expression is value1
        break;
      case value2:
        // code to execute if expression is value2
        break;
      default:
      // code to execute if expression is not value1 or value2
    }
    ```
1.  What is the correct syntax for creating a javascript object?
    ```js
    let obj = {
      property1: "value1",
      property2: "value2",
    };
    ```
1.  Is is possible to add new properties to javascript objects?
    > Yes, e.g. obj.property3 = "value3";
1.  If you want to include JavaScript on an HTML page, which tag do you use?
    ```html
    <script src="script.js"></script>
    ```
1.  Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?
    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <title>Set Text with JavaScript</title>
      </head>
      <body>
        <p id="myText">I have an animal and a fish.</p>
      </body>
    </html>
    ```
    ```js
    var textElement = document.getElementById("myText");
    var currentText = textElement.textContent;
    var newText = currentText.replace("animal", "crow");
    textElement.textContent = newText;
    ```
1.  Which of the following correctly describes JSON?
    > [primitive types](/IndividualNotes/javascript.md#primitive-types)
1.  What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo do?
    > chmod - change file permissions
    > usage: chmod [options] mode[,mode] file1 [file2 ...]
    > pwd - print working directory
    > usage: pwd
    ```shell
    $ pwd
    /home/user
    ```
    > cd - change directory
    > usage: cd [options] [directory]
    ```shell
    $ pwd
    /home
    $ cd /home/user
    $ pwd
    /home/user
    ```
    > ls - list directory contents
    > usage: ls [options] [file ...]
    ```shell
    $ ls
    file1 file2 file3
    ```
    > vim - Vi IMproved, a programmers text editor
    > usage: vim [options] [file ..]
    ```shell
    $ vim file1
    ```
    > nano - Nano's ANOther editor, an enhanced free Pico clone
    > usage: nano [options] [[+line[,column]] file]...
    ```shell
    $ nano file1
    ```
    > mkdir - make directories
    > usage: mkdir [OPTION]... DIRECTORY...
    ```shell
    $ mkdir dir1
    $ ls
    dir1 file1 file2 file3
    ```
    > mv - move (rename) files
    > usage: mv [OPTION]... [-T] SOURCE DEST
    ```shell
    $ mv file1 dir1
    $ ls
    dir1 file2 file3
    $ ls dir1
    file1
    ```
    > rm - remove files or directories
    > usage: rm [OPTION]... FILE...
    ```shell
    $ rm file1
    $ ls
    file2 file3
    ```
    > ssh - OpenSSH SSH client (remote login program)
    > usage: ssh [-46AaCfGgKkMNnqsTtVvXxYy] [-B bind_interface]
            [-b bind_address] [-c cipher_spec] [-D [bind_address:]port]
            [-E log_file] [-e escape_char] [-F configfile] [-I pkcs11]
            [-i identity_file] [-J [user@]host[:port]] [-L address]
            [-l login_name] [-m mac_spec] [-O ctl_cmd] [-o option] [-p port]
            [-Q query_option] [-R address] [-S ctl_path] [-W host:port]
            [-w local_tun[:remote_tun]] destination [command]
    ```shell
    $ ssh hallcj31@schizo.cs.byu.edu
    ```
    > ps - report a snapshot of the current processes
    > usage: ps [options]
    ```shell
    $ ps
    PID TTY          TIME CMD
    1234 pts/0    00:00:00 bash
    5678 pts/0    00:00:00 ps
    ```
    > wget - The non-interactive network downloader
    > usage: wget [option]... [URL]...
    ```shell
    $ wget https://example.com
    ```
    > sudo - execute a command as another user
    > usage: sudo -h | -K | -k | -V
    ```shell
    $ sudo apt-get install package1
    ```
1.  Which of the following console command creates a remote shell session?
    1. sudo
    1. ssh
    1. wget
    1. pwd
       > ssh, as seen above.
1.  Which of the following is true when the -la parameter is specified for the ls console command?
    1. The ls command will list all files in the current directory.
    1. The ls command will list all files in the current directory, including hidden files.
    1. The ls command will list all files in the current directory, including hidden files, and will display the file permissions.
    1. The ls command will list all files in the current directory, including hidden files, and will display the file permissions, and the file owner.
       > 4: The ls command will list all files in the current directory, including hidden files, and will display the file permissions, and the file owner.
1.  Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?
    1. bozo.click is the top level domain, fruit is a subdomain, and banana is a root domain.
    1. bozo.click is the top level domain, fruit is a root domain, and banana is a subdomain.
    1. bozo.click is the top level domain, banana is a subdomain, and fruit is a root domain.
    1. bozo.click is the top level domain, banana is a root domain, and fruit is a subdomain.
       > 3: bozo.click is the top level domain, banana is a subdomain, and fruit is a root domain.
1.  Is a web certificate is necessary to use HTTPS? Why?
    > Yes, a web certificate is necessary to use HTTPS. The certificate is used to verify that the server is who it says it is. This is done by having the server sign the certificate with its private key. The client can then verify the signature using the server's public key. If the signature is valid, the client knows that the server is who it says it is.
1.  Can a DNS A record can point to an IP address or another A record? Why?
    > Yes, a DNS A record can point to an IP address or another A record. This is useful for load balancing. If you have multiple servers that you want to distribute traffic between, you can create multiple A records that point to each server. When a client requests the IP address for the domain, the DNS server will return one of the IP addresses. This allows you to distribute traffic between multiple servers.
1.  Port 443, 80, 22 is reserved for which protocol?
    > 443 - HTTPS
    > 80 - HTTP
    > 22 - SSH
1.  What will the following code using Promises output when executed?

```js
const delay = (msg, wait) => {
  setTimeout(() => {
    console.log(msg, wait);
  }, 1000 * wait);
};

new Promise((resolve, reject) => {
  // Code executing in the promise
  for (let i = 0; i < 3; i++) {
    delay("In promise", i);
  }
});

// Code executing after the promise
for (let i = 0; i < 3; i++) {
  delay("After promise", i);
}
```

```
In promise 0
After promise 0
In promise 1
After promise 1
In promise 2
After promise 2
```

QUESTON 40 Scratch
