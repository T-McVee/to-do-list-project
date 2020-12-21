import { updateLocalStorage } from './index'
import { elFactory } from './helpers/helpers'
import { createList, listFactory } from './list'
import { createListBtn, renderListBtn } from './createListBtn'
import sortable from '../node_modules/html5sortable/dist/html5sortable.es.js'


const _renderColumn = ((input) => {
  const col = elFactory('div', { class: 'col' });
  const content = elFactory('div', { class: input.classes }, input.text);
  col.appendChild(content);

  return col;
});

const _renderRow = ((input) => {
  const row = elFactory('div', { class: 'row' });

  input.forEach(el => {
    const col = _renderColumn(el);
    row.appendChild(col);
  });

  return row;
});

const renderNavBar = (() => {
  const nav = document.createElement('nav');
  const row = _renderRow([{ text: 'Kanbanit', classes: 'logo' }]);
  row.classList.add('container');
  row.appendChild(elFactory('i', { class: 'fas fa-bars' }));
  nav.appendChild(row);

  return nav
});

const renderWorkSpace = ((myLists) => {
  const workSpace = elFactory('div', { class: 'work-space container' });
  const newListBtn = createListBtn('+ Create new list', myLists);

  //RenderedListBtn should live outside of workspace - causes issues w/ drag n drop
  const renderedListBtn = renderListBtn();

  renderedListBtn.firstChild.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = renderedListBtn.firstChild.firstChild.value;
    if (!input) return;
    const list = createList({ title: input, index: myLists.length });
    newListBtn.pushToMyLists(list);
    updateLocalStorage();

    // Create DOM elements for new list
    const listEl = listFactory(list);

    workSpace.insertBefore(listEl, renderedListBtn);
    renderedListBtn.firstChild.reset();

    // Add list drag n' drop
    const sortableLists = sortable(workSpace, {
      forcePlaceholderSize: true,
      placeholderClass: 'ph-class',
      hoverClass: 'bg-maroon yellow'
    });

    sortableLists[0].addEventListener('sortupdate', (e) => {
      const origin = e.detail.origin.index;
      const destination = e.detail.destination.index;

      let movedItem = myLists.splice(origin, 1);
      myLists.splice(destination, 0, movedItem[0]);
      updateLocalStorage();
    });

    // Add task Drag n' Drop
    const sortableTasks = sortable(listEl.querySelector('.list-body'), {
      forcePlaceholderSize: true,
      placeholderClass: 'ph-class',
      hoverClass: 'bg-maroon yellow'
    });

    sortableTasks[0].addEventListener('sortupdate', (e) => {
      const origin = e.detail.origin.index;
      const destination = e.detail.destination.index;

      let movedItem = list.tasks.splice(origin, 1);
      list.tasks.splice(destination, 0, movedItem[0]);
      updateLocalStorage();
    });
  });

  workSpace.appendChild(renderedListBtn);

  // Load existing lists
  myLists.forEach(list => {
    workSpace.insertBefore(listFactory(list), workSpace.lastChild)
  });

  return workSpace;
});

export {
  renderNavBar,
  renderWorkSpace,
}