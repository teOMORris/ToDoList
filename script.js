const addListButton = document.getElementById("addList");
var canAddList = true;
const mainListTasks = document.getElementById("listOfTasks");

function LoadContent()
{
      var keys = Object.keys(localStorage).sort();
      for(let i = 0; i < keys.length; i++)
      {
          const listOfTask = document.createElement('list-task');
          mainListTasks.appendChild(listOfTask);
          listOfTask.setAttribute("id",keys[i]);
          listOfTask.innerHTML = localStorage.getItem(keys[i]);
      }
}

//Here is a function which invoke herself
(function() {
    //declare a class which extends properties from HTMLElement
    class AddListCard extends HTMLElement {
        //Thrown constroctor we will able to build an object
      //constructor() {
        //super keyword is used to acces properties of object
        //super();
        //attachShadow() create shadowRoot
        //other method is to use connectedCallback which is invoke when this object is created
        connectedCallback(){

        //this.attachShadow({mode: 'open'});
        //shadowRoot is used to that code to be visible just in 
        //this.shadowRoot.innerHTML = `...`
        this.innerHTML = `
            <input type="text" placeholder="Enter title" id="titleTextAdd" required>
            <button id="addButton">ADD</button>
            <button id="removeButton">X</button>
        `;
      }
    }

    class ListOfTasks extends HTMLElement {
        connectedCallback() {
          this.innerHTML = ` 
          <header>
            <input id="titleTask" class="title" type="text" placeholder="Title" value=" ">
            <button onclick="AddTask(this)" id="addTaskButton" class="addButton">+ Add task</button>
            <button onclick="RemoveList(this)">Remove List</button>
            </header>
          <div id="taskList"></div>
          `;
        }
        //
      }
    class TaskCard extends HTMLElement {
      connectedCallback(){
        this.innerHTML = `
          <input type="text" placeholder="Write task">
          <button>Complete</button>
          <button onclick="RemoveTask(this)">Remove</button>
        `;
      }
    }
    window.customElements.define('task-card',TaskCard);
    window.customElements.define('add-listcard', AddListCard);
    window.customElements.define('list-task',ListOfTasks);

    LoadContent();
  })();

//Delete card of "Add list"
function DeleteCard(element)
{
    const parent = document.getElementById("addListCard");
    parent.removeChild(element);
    canAddList = true;
}

//Set id for elemements of listOfTask
function SetId()
{
    const listTask = document.querySelectorAll("list-task");
    const titleTask = document.getElementById("titleTask");
    const addTaskButton = document.getElementById("addTaskButton");
    const header = document.querySelectorAll("header")[listTask.length - 1];
    if(header) {
      header.setAttribute("id",listTask.length - 1);
      titleTask.setAttribute("id",listTask.length - 1);
      addTaskButton.setAttribute("id",listTask.length - 1);
    }
}

//Execute this code when Add List button is pressed
addListButton.onclick = function() {
    //if we don't have none card displyed, we can add card
    if(canAddList) {
      //We are creating the custom element
      const element = document.createElement('add-listcard');
      element.setAttribute("id", "addCard");
      //Add element such as child in parent(list)
      document.getElementById("addListCard").appendChild(element);

      const addButton = document.getElementById("addButton");
      const removeButton = document.getElementById("removeButton");
      //canAddList give false value cause' we add a card already
      canAddList = false;

      if(addButton)
      {
        addButton.onclick = function()
        {
            //Get title of AddListCard
            const title = document.getElementById("titleTextAdd");

            //Do something only we have text in title input 
            if(title.value !== "") {

              //Create listOfTask
              const listOfTask = document.createElement('list-task');
              mainListTasks.appendChild(listOfTask);
              if(!document.querySelectorAll("list-task"))
                  listOfTask.setAttribute("id",0);
              else{
                  listOfTask.setAttribute("id",document.querySelectorAll("list-task").length - 1);
              }

              //Set title of task card with the value of inputText from AddListCard
              const titleTask = document.getElementById("titleTask");
              titleTask.setAttribute("value",title.value);
               
              //Set ids for elements of taksCard
               SetId();
               localStorage.setItem(listOfTask.id,listOfTask.innerHTML);

              //Remove addListCard
              DeleteCard(element);
            }
            
        }
      }
      if(removeButton)
      {
        removeButton.addEventListener("click", function()
        {
          DeleteCard(element);
        })
      }
  }
}





