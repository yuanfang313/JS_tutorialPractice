
/////////////////////////////// BUDGET GONTROLLER
var budgetController = (function() {
  // function constructor for Expense obj
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totalIncome) {

    if(totalIncome > 0){
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
    
  };

  Expense.prototype.getPercentage = function(){
    return this.percentage;
  };
  // function constructor for Income obj
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });
    data.total[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    total: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };
  return {

    addItem: function(type, des, val) {
      var newItem, ID;

      // create new id for new item
      if(data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      
      // create new item (as an object that has 3 properties) based on 'inc' or 'exp' type
      if(type === 'exp'){
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val); 
      }
      // push it into our data structure
      data.allItems[type].push(newItem);

      // return the new element
      return newItem;
    },
    deleteItem: function(type, id) {
      var ids, index;
      // create an array of the rest id
      ids = data.allItems[type].map(function(current) {
        return current.id;
      });
      // find the index of a specific id
      index = ids.indexOf(id);
      // if this id in the array, remove it
      if(index !== -1) {
        data.allItems[type].splice(index, 1)
      }
    
    },
    calculateBudget: function() {
      
      calculateTotal('exp');
      calculateTotal('inc');
      data.budget = data.total.inc - data.total.exp;
      if(data.total.inc > 0) {
        data.percentage =Math.round((data.total.exp / data.total.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },
    calculatePercentages: function() {
      data.allItems.exp.forEach(function(cur) {
       cur.calcPercentage(data.total.inc);
      });
    },
    getPercentages: function() {
      var allPerc = data.allItems.exp.map(function(cur) {
       return cur.getPercentage();
      });
      return allPerc;
    },
    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.total.inc,
        totalExp: data.total.exp,
        percentage: data.percentage
      }
    },
    testing: function(){
      console.log(data);
      console.log(data.allItems['inc'][0]);
    }
  };
})();

//////////////////////////////// UI CONTROLLER
var UIController = (function() {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage',
    dateLabel: '.budget__title--month'
  };

  var formatNumber = function(num, type) {
    var numSplit, int, dec;
    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit = num.split('.');
    int = numSplit[0];
    dec = numSplit[1];
    if(int.length > 3) {
      int = int.substr(0, int.length - 3) + ',' + int.substr(int.length -3, int.length);
    }
    
    return (type === 'exp'? '-' : '+') + ' ' + int + '.' + dec;
  };

  var nodeListForEach = function(list, callback) {
    for(var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  return {
    getInput: function(){
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },
    
    addListItem: function(obj, type) {
      var html, newHtml, element;
      // create HTML string with placeholder text
      if(type == 'inc') {
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expenseContainer;
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // replace the placeholder text with some actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

      // insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },
    deleteListItem: function(selectorID) {

      var el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
      

    },
    displayBudget: function(obj) {

      var type;
      obj.budget > 0 ? type = 'inc' : type = 'exp';

      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc') ;
      document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp') ;
      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type) ;
      
      if(obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
      } else if (obj.percentage === 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = '< 0.5%';
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
      }
    },
    clearFields: function(){
      var fields;
      // return a list
      fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
      
      // conver array to list
      fieldArr = Array.prototype.slice.call(fields);
      
      // loop through the array to clear the fields
      // the callback function of .forEach accepts arguments up to three: currentValue, currentIndex, thisArray
      fieldArr.forEach(function(current, index, array) {
        current.value = "";
      });

      fieldArr[0].focus();

    },
    displayPercentages: function(percentages) {

     var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
     // .forEach() for a node list
     
     nodeListForEach(fields, function(current, index){
        
      // fields[a list of nodes] & percentages[an array]
       if(percentages[index] > 0) {
        current.textContent = percentages[index] + '%';
      } else if (percentages[index] === 0){
        current.textContent = '< 0.5%';
      } else {
         current.textContent = '---';
        }
       
     });
    },
    displayMonth: function() {
      var now, months, month, year;
      var now = new Date();
      year = now.getFullYear();

      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      month = now.getMonth();

      document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
      
    },
    changedType: function() {

     var fields = document.querySelectorAll(
       DOMstrings.inputType + ',' +
       DOMstrings.inputDescription + ',' +
       DOMstrings.inputValue);
       
       nodeListForEach(fields, function(cur){
        cur.classList.toggle('red-focus');
       });

       document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
    },
    getDOMstrings: function() {
      return DOMstrings;
    }
  }
})();

//////////////////////////////// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){
  
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();

    // add item --click
    document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
    // add item --press key
    document.addEventListener('keypress', function(event){
      if(event.keyCode === 13 || event.which ===13) {
        ctrlAddItem();
      }
    });

    // delete item
    // event delegation
    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    // change type
    document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
  };

  var updateBudget = function(){

    // 1. Calculate the budget
    budgetCtrl.calculateBudget();

    // 2. Return the budget
    var budget = budgetCtrl.getBudget();
    
    // 3. Display the budget on the UI
    UICtrl.displayBudget(budget);
     
  };

  var updatePercentages = function() {

    // 1. Calculate percentages
    budgetCtrl.calculatePercentages();

    // 2. Read percentages from the budget controller
    var percentages = budgetCtrl.getPercentages();
    //console.log(percentages);

    // 3. Update the UI with the new percentages
    UICtrl.displayPercentages(percentages);
  };

  var ctrlAddItem = function() {
    var input, newItem, updatedBudget;
    // 1. get the input data
    input = UICtrl.getInput();
    
    if(input.description !== "" && !isNaN(input.value) && input.value > 0){
    // 2. add the item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    // 3. add the item to the UI
    UICtrl.addListItem(newItem, input.type);
    // 4. Clear the fields
    UICtrl.clearFields();
    }

    // 5. Calculate & Update budget
    updateBudget();
    // 6. Calculate and update percentages
    updatePercentages();
  };

  var ctrlDeleteItem = function(event) {
    var itemID, splitID, type, ID;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    
    if(itemID) {
     // inc-1
     splitID = itemID.split('-');
     type = splitID[0];
     ID = parseInt(splitID[1]);

     // 1. delete the item from the data structure
     budgetCtrl.deleteItem(type, ID);
     // 2. delete the item from the UI
     UICtrl.deleteListItem(itemID);
     // 3. update and show the new budget
     updateBudget();
     // 4. Calculate and update percentages
    updatePercentages();
    }
  };

  return {
    init: function() {
      console.log('App has started');
      UICtrl.displayMonth();
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  }
})(budgetController, UIController);

controller.init();