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

const runas = "runas /profile /env /user:"

const jobRun = "xcopy /y ";
const createDirectory = " /i";
const deleteFile = "\ndel "
const Drive = '"C:\\Users\\'
const deletePath = '\\Downloads\\'
const deleteFileName = '\*Run To Copy*'
const backSlash = "\\"
const defaultPath = "C:\\Users\\"
const dedaultPathFinal = "\\Documents\\"

function createBatFile(){
    const user = document.getElementById("userAD").value;
    const source = document.getElementById("server").value;
    const domain = document.getElementById("domain").value;

    let data = [];
    for (let i = 0; i < counter; i++) {
        const road = document.getElementById("path" + i).value;
        const target = document.getElementById("recording" + i).value;
        const dest = document.getElementById("destination" + i).value;

        data.push(
            jobRun + '\"' + source + road + "*" + target + '*"' + " " + '\"'  +defaultPath + user + dedaultPathFinal + dest + backSlash + '\"' + createDirectory
        );
    };
    data.push(
        deleteFile + Drive + user + deletePath + deleteFileName + '\"'
    );

    const data_string = data.join('\n');
    const file = new Blob([runas + domain + user + "\n" + data_string], {type: "text/plain"});
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(file);
    anchor.download = "Run To Copy.txt";
    anchor.click();
};
