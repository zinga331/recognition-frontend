function getUsername() {
    console.log('getUsername() called');
    const username = localStorage.getItem('username');
    const userNameElement = document.querySelector('.user-name');
    if (username != null && username != '') {
      userNameElement.textContent = username;
    } else {
      userNameElement.textContent = 'Guest';
    }
  }

// function getUsername() {
//     const username = localStorage.getItem('username');
//     const userNameElement = document.querySelector('.user-name');
//     if (username) {
//       userNameElement.textContent = username;
//     } else {
//       userNameElement.textContent = 'Guest';
//     }
//   }