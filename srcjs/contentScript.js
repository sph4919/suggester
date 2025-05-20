console.log("contentscript injected");

let data1 = document.querySelectorAll("p");


    let extData1 = "";
    for (const element of data1) {
   extData1 = extData1 + element.textContent;
    };


    let finalData = "";
    for(let i =0;i<1000;i++)
    {
        finalData = finalData + extData1.at(i);
    }


    console.log(finalData);


   
chrome.runtime.sendMessage({message: finalData},(response)=>{console.log(response.message)});



