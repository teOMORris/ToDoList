const addListButton = document.getElementById("addList");
const addListCard = document.getElementById("addListCard");
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
            <input type="text" placeholder="Enter title" id="titleText">
            <button id="addButton">ADD</button>
            <button id="removeButton">X</button>
        `;
      }
    }
   window.customElements.define('add-listcard', AddListCard);
  })();

//Delete card of "Add list"
function DeleteCard( element)
{
    const parent = document.getElementById("list");
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
      document.getElementById("list").appendChild(element);

      const addButton = document.getElementById("addButton");
      const removeButton = document.getElementById("removeButton");
      //canAddList give false value cause' we add a card already
      canAddList = false;

      if(addButton)
      {
        addButton.addEventListener("click", function()
        {
          const title = document.getElementById("titleText");
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




