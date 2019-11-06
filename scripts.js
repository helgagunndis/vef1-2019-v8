const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);
    _items.addEventListener('change' , finish);

    newlistener();

    // TODO láta hluti í _items virka
  }

  //new listener hjálparfall fyrir spansArray því spansArray.length breytist þegar kallað er á add
  function newlistener() {
    const spansArray = document.getElementsByClassName('item__text');
    const delButton = document.getElementsByClassName('item__button');

    for (let i = 0; i < spansArray.length; i++) {
      spansArray[i].onclick = edit;

    }
    for (let i = 0; i < delButton.length; i++) {
      delButton[i].onclick = deleteItem;
    }
  }

  function formHandler(e) {
    e.preventDefault();

    const input = document.getElementsByClassName('form__input')[0];
    if (input.value.trim().length > 0) {
      add(input.value);
      input.value = '';
    }
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    e.preventDefault();
    
    let checkboxes = document.getElementsByClassName('item__checkbox');
    
    for(let i = 0; i < checkboxes.length; i++){
      if(checkboxes[i].checked === true){
          checkboxes[i].parentElement.className='item item--done';
      }
      else if(checkboxes[i].checked === false){
          checkboxes[i].parentElement.className='item';
      }
    }
  }
  // event handler fyrir það að breyta færslu

  function edit(e) {
    e.preventDefault();
    let input = document.createElement('input');//býr til nýtt element
    input.type = 'text';
    input.value = this.innerHTML;
    
    input.className = 'item__text';
    this.replaceWith(input); 
    input.focus(); 
    
    input.addEventListener('keydown',function(e){
      if(e.keyCode == 13){
        
        let event = new Event('submit');
        input.addEventListener('submit',commit);
        input.dispatchEvent(event);
        input.removeEventListener('submit',commit);

      }
    });

  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    e.preventDefault();
    let span = document.createElement('span');
    span.className = 'item__text';
    span.innerHTML = this.value;
    this.replaceWith(span);
    span.onclick = edit;
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    let li = document.createElement('li');
    li.className = 'item';

    let checkbox = document.createElement('input');
    checkbox.className = 'item__checkbox';
    checkbox.type = 'checkbox';

    li.appendChild(checkbox);

    let text = document.createElement('span');
    text.className = 'item__text';
    text.innerHTML = value;

    let del = document.createElement('button');
    del.className = 'item__button';
    del.innerHTML = 'Eyða';

    li.appendChild(text);
    li.appendChild(del);
    items.appendChild(li);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    let parent = this.parentElement;
    parent.parentElement.removeChild(parent);
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
  }

  return {
    init: init
  }
})();
