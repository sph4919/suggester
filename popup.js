

document.addEventListener("DOMContentLoaded", () => 
{
  
  chrome.runtime.sendMessage({ action: "getApiData" }, (response) => {
   
 
   let str = response.data;
   let fix1 =  str.replace(/`/g, "");
   let fix2= fix1.replace("json","");
   let jsonStr = JSON.parse(fix2);


   display(jsonStr);

  });
});



function display(jsonStr)
{
    let podCastTextArea1 = document.getElementById("pd1");
    let podCastTextArea2 = document.getElementById("pd2");
    let bookArea1 = document.getElementById("book1");
    let bookArea2 = document.getElementById("book2");

    podCastTextArea1.setAttribute("href",`${jsonStr.podcast_links[0]}`);
    podCastTextArea2.setAttribute("href",`${jsonStr.podcast_links[1]}`);
    podCastTextArea1.setAttribute("target","_blank");
    podCastTextArea2.setAttribute("target","_blank");



    podCastTextArea1.innerHTML =  jsonStr.podcast_links[0] || "No podcast available";
    podCastTextArea2.innerHTML =  jsonStr.podcast_links[1] || "No podcast available";
    bookArea1.innerHTML = jsonStr.book_names[0] || "No book available";
    bookArea2.innerHTML = jsonStr.book_names[1] || "no book available";
}



