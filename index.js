/*eslint-env jquery*/
'use strict';

// const itemSubmit = function () {
//   $( '#js-shopping-list-form' ).submit(function() {
//     event.preventDefault();
//     const userItem = $('js-shopping-list-entry').val();
//     $('#shopping-list-entry').val('');
//     $('shopping-list').append(`<li> 
//       <span class="shopping-item">apples</span>
//       <div class="shopping-item-controls">
//       <button class="shopping-item-toggle">
//       <span class="button-label">check</span>
//       </button>
//       <button class="shopping-item-delete">
//       <span class="button-label">delete</span>
//       </button>
//       </div> </li>`);
//   });
//   $('text').keypress(function(key){
//     if(key===13){
//       $('submit').itemSubmit();
//     }
//   });
// };

// const checkItem = function (){
//   $('shopping list').click('.shopping-item-toggle', function(){
//     $(this).closest('li').toggleClass('shopping-item__checked');
//   });
// };

// const removeItem = function(){
//   $('shopping-list').click('.shopping-item-delete', function(){
//     $(this).closest('li').remove();
//   });
// };

// const main = function(){
//   itemSubmit();
//   checkItem();
//   removeItem();
// };

// $(main);

//Above was my old code. Kind of confused about line 6 and 7.

//Below, is the starting example from Repl
const STORE = [
  { name: 'apples', checked: false },
  { name: 'oranges', checked: false },
  { name: 'milk', checked: true },
  { name: 'bread', checked: false }
];


function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item, index) => generateItemElement(item, index));

  return items.join('');
}


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({ name: itemName, checked: false });
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function (event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    console.log(newItemName);
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE[itemIndex].checked = !STORE[itemIndex].checked;
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function deleteCheckedForListItem (itemIndex) {
  STORE.splice(itemIndex, 1);
}

function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list item
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    console.log('`handleDeleteItemClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

// User can press a switch/checkbox to toggle between displaying 
// all items or displaying only items that are unchecked
// User can type in a search term and the displayed list will be 
// filtered by item names only containing that search term
// User can edit the title of an item
function toggleButtonString(){
  return `<button class="hide-checked-items"><span 
  class="button-label">Toggle Checked</span></button>`;
}

function addToggleButton(){
  $('#toggle-checked-items').html(toggleButtonString(STORE));
}

function findChecked(){
  if($('.js-shopping-list').find(STORE.checked.true)){
    console.log('`findChecked` ran');
    const filterListItems = STORE.filter($(STORE.checked.false));
    renderShoppingList(filterListItems);
  }
  renderShoppingList(STORE);
}

function toggleFilterChecked(){
  $('#toggle-checked-items').on('click', 'hide-checked-items', function() {
    console.log('`toggleFilterChecked` checked');
    findChecked();
  });
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  toggleFilterChecked();
  addToggleButton();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);