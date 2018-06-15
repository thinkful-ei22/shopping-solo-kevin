'use strict';

const itemSubmit = function () {
  $( 'submit' ).click(function() {
    const userShopping = $(this).find('#shopping-list-entry');
    $('shopping-item').text(`${userShopping.val()}`);
    $('ul').append('<li>' + [`${userShopping.val()}`] + '</li>');
    userShopping.val('');
  });
  $('text').keypress(function(key){
    if(key===13){
      $('submit').itemSubmit();
    }
  });
};

const checkItem = function (){
  $('shopping list').click('.shopping-item-toggle', function(){
    $(this).css('shopping-item__checked');
  });
};

const removeItem = function(){
  $('shopping-list').click('.shopping-item-delete', function(){
    $(this).remove();
  });
};


//not sure if i need this. something to do with calling it at the end 
//for DOM ready check
// const main = function(){
//   itemSubmit();
//   checkItem();
//   removeItem();
// };

// main();