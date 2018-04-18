//Storage controller

//Item Controller
const ItemCtrl = (function(){
  //Item Constructor
  const Item = function(id,name,calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  //Data Structure
  const data = {
    items: [
      /*{id:0,name:'Steak Dinner',calories:1200},
      {id:1,name:'Cookie',calories:400},
      {id:2,name:'Eggs',calories:300}*/
    ],
    currentItem : null,
    totalCalories: 0
  }

  return {
    getItems: function(){
      return data.items;
    },
    addItem: function(name,calories){
      let ID;
      //create id
      if(data.items.length > 0){
        ID = data.items[data.items.length - 1].id + 1;
      }else{
        ID = 0;
      }
      //Calories to number
      calories = parseInt(calories);
      //Create new item
      newItem = new Item(ID, name,calories);
      //Add to items array
      data.items.push(newItem);

      return newItem;
    },
    getTotalCalories: function(){
      let total = 0;
      //loop througt item and add cals
      data.items.forEach((item)=>{
        total += item.calories;
        
      });
      
      //Set total cal in data structure
      data.totalCalories = total;
      return data.totalCalories;
    },
    logData: function(){
      return data;
    }
  }
})();
//UI Controller
const UICtrl = (function(){
  const UISelectors = {
    itemList: '#item-list',
    addBtn : '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  }
  return {
    populateItemList: function(items){
      let html = '';

      items.forEach(item => {
        html += `
          <li id="item-${item.id}" class="collection-item">
            <strong>${item.name} : </strong><em> ${item.calories}</em>
            <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
          </li>`;
      });
      //Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function(){
      return {
        name:document.querySelector(UISelectors.itemNameInput).value,
        calories:document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem: function(item){
      //show the list 
      document.querySelector(UISelectors.itemList).style.display = 'block';
      //Create li element
      const li = document.createElement('li');
      //Add class
      li.className = 'collection-item';
      //add id
      li.id = `item-${item.id}`;
      //Add html
      li.innerHTML = `<strong>${item.name} : </strong><em> ${item.calories}</em>
      <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
      //Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li);
    },
    clearInput: function(){
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: function(total){
      document.querySelector(UISelectors.totalCalories).textContent = total;
    },
    getSelector:function(){
      return UISelectors;
    }
  }
})();
//App Controller
const App = (function(ItemCtrl,UICtrl){
  //Load event listeners
  const loadEventListeners = function(){
    //get ui selectors
    const UISelectors = UICtrl.getSelector();

    //Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
  }

  //Add item submit
  const itemAddSubmit = function(e){
    //get form input from UI controller
    const input = UICtrl.getItemInput();
    //Check for name and calories input
    if(input.name !== '' && input.calories !== ''){
      //add item 
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      //Add itm to ui list
      UICtrl.addListItem(newItem);
      //get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      //add total caories to ui
      UICtrl.showTotalCalories(totalCalories);
      //clear fields
      UICtrl.clearInput();
    }
    e.preventDefault();
  }
  //Public methods
  return {
    init: function(){
      console.log('Initialzing app');
      //Fetch items form data structure
      const items = ItemCtrl.getItems();
      //Check if any items
      if(items.length === 0){
        UICtrl.hideList();
      }else{
         //Populate list with items
        UICtrl.populateItemList(items);
      }

      //get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      //add total caories to ui
      UICtrl.showTotalCalories(totalCalories);
     

      //Load Event listeners
      loadEventListeners();
      
    }
  }
})(ItemCtrl,UICtrl);

//Initialize app
App.init();