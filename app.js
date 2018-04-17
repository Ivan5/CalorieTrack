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
      {id:0,name:'Steak Dinner',calories:1200},
      {id:1,name:'Cookie',calories:400},
      {id:2,name:'Eggs',calories:300}
    ],
    currentItem : null,
    totalCalories: 0
  }

  return {
    getItems: function(){
      return data.items;
    },
    logData: function(){
      return data;
    }
  }
})();
//UI Controller
const UICtrl = (function(){
  const UISelectors = {
    itemList: '#item-list'
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
    }
  }
})();
//App Controller
const App = (function(ItemCtrl,UICtrl){
  //Public methods
  return {
    init: function(){
      console.log('Initialzing app');
      //Fetch items form data structure
      const items = ItemCtrl.getItems();
      //Populate list with items
      UICtrl.populateItemList(items);
      
    }
  }
})(ItemCtrl,UICtrl);

//Initialize app
App.init();