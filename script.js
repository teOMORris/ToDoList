const addListButton = document.getElementById("addList");
var canAddList = true;
var index = 0;

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
          <input id="titleTask" type="text" placeholder="Title" value=" ">
          <button id="addTaskButton" class="addButton">+ Add task</button>
          <div id="taskList"></div>
          `;
        }
    }

    class TaskCard extends HTMLElement {
      connectedCallback(){
        this.innerHTML = `
          <button>Task</button>
          <button>Complete</button>
          <button>Remove</button>
        `;
      }
    }
    window.customElements.define('task-card',TaskCard);
    window.customElements.define('add-listcard', AddListCard);
    window.customElements.define('list-task',ListOfTasks);
  })();

//Delete card of "Add list"
function DeleteCard(element)
{
    const parent = document.getElementById("addListCard");
    parent.removeChild(element);
    canAddList = true;
}

//Set id for elemements of listOfTask
function SetId(index)
{
    const titleTask = document.getElementById("titleTask");
    const addTaskButton = document.getElementById("addTaskButton");
    titleTask.setAttribute("id",index);
    addTaskButton.setAttribute("id",index);
}

function AddTask(index)
{
    const task = document.createElement("task-card");
    //task.setAttribute("id","Task" + i);
    task.textContent = "Task";
    const listOfTask = document.getElementById(index);
    const taskListEl = listOfTask.getElementsByTagName("div")[0];
    taskListEl.appendChild(task);
}
//Execute this code when Add List button is pressed
addListButton.addEventListener("click", function() {
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
        addButton.addEventListener("click", function()
        {
            //Get title of AddListCard
            const title = document.getElementById("titleTextAdd");

            //Do something only we have text in title input 
            if(title.value !== "") {

              //Create listOfTask
              const listOfTask = document.createElement('list-task');
              document.getElementById("listOfTasks").appendChild(listOfTask);
              listOfTask.setAttribute("id",index);

              //Set title of task card with the value of inputText from AddListCard
              const titleTask = document.getElementById("titleTask");
              titleTask.value = title.value;

               //Set ids for elements of taksCard
               SetId(index);
               index++;

              //Remove addListCard
              DeleteCard(element);

              //Get all addTaskButtons with classname = addButton
              const addTB = document.getElementsByClassName("addButton");

              //Cross thrown all buttons and verify if any is click
              for(let i = 0; i < addTB.length; i++) {
                addTB[i].onclick = function() {
                  AddTask(i);
                } 
              }
            }
        })
      }
      if(removeButton)
      {
        removeButton.addEventListener("click", function()
        {
          DeleteCard(element);
        })
      }
  }
})





