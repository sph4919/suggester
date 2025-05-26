// background.js

let apiResult = "";
let dataToSend ="";

// Listener to receive data from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // If the message contains new content, store it in dataToSend.
  if (request.message) {
    dataToSend = request.message;
     console.log(dataToSend);
    sendResponse({ message: "data received" });
    sendRequest();
    return;
  }

  if (request.action === "getApiData") {
    console.log("Popup requested API data. Sending stored data...");
    sendResponse({ data: apiResult });
    return;
  }

});


function sendRequest()
{
const payload = { data: dataToSend };


// Send the string wrapped as a JSON literal
fetch("https://suggester-server-0f193070ba02.herokuapp.com/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data.result);
    apiResult = data.result;
  })
  .catch(error => {
    console.error("Error sending POST request:", error);
  });

}
