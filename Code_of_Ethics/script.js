
window.onload = function () {
  const paramName = 'userid'; // Change to 'userid' to match the parameter name in your URL
  const paramValue = getQueryParam(paramName);

  if (paramValue !== null) {
      console.log(`${paramName} is: ${paramValue}`);
      localStorage.setItem('user_id', paramValue);

  } else {
      console.log(`${paramName} not found in the URL.`);
  }
};

// Function to get query parameter by name
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}



const checkbox = document.getElementById('checkbox');
const finishBtn = document.getElementById('finishBtn');

checkbox.addEventListener('change', function() {
  if (checkbox.checked) {
    finishBtn.style.display = 'block';
    localStorage.setItem('user_response', 'yes');
  } else {
    finishBtn.style.display = 'none';
    localStorage.setItem('user_response', 'no');
  }
});

window.addEventListener('DOMContentLoaded', function() {
  const userID = generateUserID(); 
  const utcTime = new Date();
  const istTime = new Date(utcTime.getTime() + 5.5 * 60 * 60 * 1000); 
  const pageLoadTime = istTime.toISOString();

  // localStorage.setItem('pageLoadTime', pageLoadTime);

  window.addEventListener('beforeunload', function() {
    localStorage.setItem('user_response', 'no');
  });
});

function generateUserID() {
  return 'user123'; 
}

finishBtn.addEventListener('click', function() {
  const userData = {
    user_id: localStorage.getItem('user_id'),
    user_response: localStorage.getItem('user_response') || 'no',
  };
  console.log("user data",userData)
  // Make a POST request using fetch
  fetch('https://connectopia.app:8080/postCodeOfEthicLog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(response => response.json())
    .then(result => {
      console.log("result",result); // Handle the result from the server
      window.open('https://www.bata.com/in/');
    })
    .catch(error => {
      console.error('Error:', error); // Handle errors
    });
});
















