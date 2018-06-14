const item = function () {

  $( "input" )
  .keyup(function() {
    let item = $( this ).val();

  });
}



//Takes the item and pushes into the list
function addItem(item()) {
  return
  `<li>
    <span class="shopping-item">${item}</span>
    <div class="shopping-item-controls">
      <button class="shopping-item-toggle">
        <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete">
        <span class="button-label">delete</span>
      </button>
    </div>
  </li>`
}

addItem();
