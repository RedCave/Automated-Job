// Create a input field for users

const addBtn = document.querySelector(".add-button");
const input = document.querySelector(".add-field");

// Remove button
function removeInput(){
    this.parentElement.remove();
}

let counter = 0;

function addInput(){
    const source = document.createElement("input");
    source.type = "text";
    source.placeholder = "path";
    source.id = "path" + counter; // Add a unique "id" attribute with the value "path" + counter

    const target = document.createElement("input");
    target.type = "text";
    target.placeholder = "recording";
    target.id = "recording" + counter; // Add a unique "id" attribute with the value "recording" + counter

    const dest = document.createElement("input");
    dest.type = "text";
    dest.placeholder = "destination";
    dest.id = "destination" + counter; // Add a unique "id" attribute with the value "destination" + counter

    const btn = document.createElement("a");
    btn.className = "delete";
    btn.innerHTML = "&times";

    btn.addEventListener('click', removeInput);

    const flex=document.createElement("div");
    flex.className = "flex";

    input.appendChild(flex);
    flex.appendChild(source);
    flex.appendChild(target);
    flex.appendChild(dest);
    flex.appendChild(btn);

    counter++; // Increment the counter
}

addBtn.addEventListener('click', addInput);

// Create a batch file that completes the task

//const runas = "runas /profile /env /user:" //run as a domain users for access to the shared folder
const jobRun = "xcopy /y ";
const createDirectory = " /i"; //creates a folder if it does not exist in on the default dir
const deleteFile = "\ndel "
const userLocation = '%USERPROFILE%' //Get the user's default path
const deletePath = '\\Downloads\\' //the fodler with the bat file, used to delete when the file is done running
const deleteFileName = '\*Run To Copy*'
const backSlash = "\\"
const dedaultPathFinal = "\\Documents\\"
const getDomain = '%USERDOMAIN%\\' //domain of the network is stored by this const, this is part of the .bat script
const getUser = '%USERNAME%' //username of current logged in user is stored by this line, this is part of the .bat script

function createBatFile(){
    const source = document.getElementById("server").value; //user assisted share folder path, this is filled in as the path of the shared folder

    let data = [];
    for (let i = 0; i < counter; i++) {
        const road = document.getElementById("path" + i).value; //source of the file is stored by this line, user input filled
        const target = document.getElementById("recording" + i).value; //filename is stored by this line, user input filled
        const dest = document.getElementById("destination" + i).value; //destination of the copied file is store on this line, user input filled

        data.push(
            jobRun + '\"' + source + road + "*" + target + '*"' + " " + '\"'  + userLocation + dedaultPathFinal + dest + backSlash + '\"' + createDirectory //the file gets copied from the source then pasted to the targeted folder, the default folder is Documents
        );
    };
    data.push(
        deleteFile + userLocation + deletePath + deleteFileName + '\"' //delete the file downloaded, this is to get the download folder clean
    );

    //create a file to be downloaded
    const data_string = data.join('\n');
    //const file = new Blob([runas + getDomain + getUser + "\n" + data_string], {type: "text/plain"}); //only use if you want to run as a different user or domain user
    const file = new Blob([data_string], {type: "text/plain"});
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(file);
    anchor.download = "Automate Job Copy.bat";
    anchor.click();
};
