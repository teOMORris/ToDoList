const addListButton = document.getElementById("addList");
const addListCard = document.getElementById("addListCard");
var index = 0;
var element;
    
const list = document.getElementById("list");

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
            <input type="text" placeholder="Enter title" class="titleText">
            <button class="addButton">ADD</button>
            <button class="removeButton">X</button>
        `;
      }
    }
   window.customElements.define('add-listcard', AddListCard);
  })();

addListButton.addEventListener("click", function() {
    element = document.createElement('add-listcard');
    console.log(element);
    element.innerHTML = "addCard";
    element.setAttribute("id", "first");
    document.getElementById("list").appendChild(element);
})




