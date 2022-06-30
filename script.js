const addListButton = document.getElementById("addList");
var canAddList = true;

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
            <input type="text" placeholder="Enter title" id="titleTextAdd">
            <button id="addButton">ADD</button>
            <button id="removeButton">X</button>
        `;
      }
    }

    class TaskCard extends HTMLElement {
        connectedCallback() {
          this.innerHTML = ` <input id="titleTask" type="text" placeholder="Title" value=" ">
          <button id="addButton">+ Add task</button>`;
        }
    } 
   window.customElements.define('add-listcard', AddListCard);
   window.customElements.define('task-card',TaskCard);
  })();

//Delete card of "Add list"
function DeleteCard( element)
{
    const parent = document.getElementById("addListCard");
    parent.removeChild(element);
    canAddList = true;
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
          const title = document.getElementById("titleTextAdd");
          const taskCard = document.createElement('task-card');
          document.getElementById("listOfTasks").appendChild(taskCard);
          const titleTask = document.getElementById("titleTask");
          titleTask.value = title.value;
          DeleteCard(element);
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




