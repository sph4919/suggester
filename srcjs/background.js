// background.js

let apiResult = "";

// Listener to receive data from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // If the message contains new content, store it in dataToSend.
  if (request.message) {
    dataToSend = request.message;

    sendResponse({ message: "data received" });
    main();
    return;
  }

  if (request.action === "getApiData") {
    console.log("Popup requested API data. Sending stored data...");
    sendResponse({ data: apiResult });
    return;
  }

});


// Global variable to store the received data
let dataToSend = "";

// Import the GoogleGenAI module (make sure this module is bundled or available as needed)
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: "" 
});

// The main function that calls the API.
async function main() {
  // Check if data is present
  if (!dataToSend) {
    console.log("No data received yet. Please ensure the content script sends data before clicking the extension icon.");
    return;
  }
  
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `I need 2 podcast links and 2 books names related to the content I am providing in JSON format.I need you to do deep research to find the links and books. I do not need any other information other than podcast links and book names make sure the podcast are latest with updated links and in existance.Do not send anything else. If you dont find any podcast and book the return Not available in json instead of link and podcast.stricly Dont't give podcast link from apple podcast. The content is ${dataToSend}`,
    });
    console.log("Generated content:", response.text);
    apiResult = response.text;

}

