import { createTask } from "./task";
import { elFactory } from "./helpers/helpers";
import { textInputModule } from './helpers/components'

/* List Factory */
const _updateList = (state) => ({
  addtask: (task) => state.tasks.push(task),
  changeIndex: (newIndex) => state.index = newIndex,
  deleteList: () => { },
});

const _getDetails = (state) => ({
  get title() {
    return state.title;
  },
  get tasks() {
    return state.tasks;
  },
  get index() {
    return state.index;
  },
});

const _logDetails = (state) => ({
  logTasks: () => state.tasks.forEach(task => task.logTitle()),
});

const _renderList = (state) => ({
  renderList: () => {
    const list = elFactory('div', { class: 'list', name: state.title, 'data-index': state.index });
    const head = _renderListHead(state);
    const body = _renderListBody(state);
    const footer = _renderListFooter(state);

    // Add Delete button functionality
    head.lastChild.addEventListener('click', () => {
      // Remove list from main array and update index
      state.parent.splice(state.index, 1);
      for (let i = 0; i < state.parent.length; i++) {
        state.parent[i].index = i;
      }

      // Remove list from DOM
      head.parentElement.remove();
    })


    footer.firstChild.addEventListener('click', () => {
      const task = createTask('Click to add title', '', 'due', '', state.tasks.length); // placeholder values
      state.tasks.push(task);
      body.appendChild(task.renderTask());
    });

    list.appendChild(head);
    list.appendChild(body);
    list.appendChild(footer);

    return list
  }
})

const createList = (title, index, parent) => {
  const state = {
    title,
    tasks: [],
    index,
    parent,
  }
  return Object.assign(
    {},
    _updateList(state),
    _getDetails(state),
    _logDetails(state),
    _renderList(state),
  )
}

const _renderListHead = ((listData) => {
  const head = elFactory('div', { class: 'list-head' });
  const title = textInputModule('h2', listData);
  const deleteBtn = elFactory('div', { class: 'delete' }, 'x');
  head.appendChild(title);
  head.appendChild(deleteBtn);

  return head;
});

const _renderListBody = ((listData) => {
  const body = elFactory('div', { class: 'list-body' });
  listData.tasks.forEach(task => body.appendChild(_renderTask(task)));

  return body;
});

const _renderListFooter = ((listData) => {
  const footer = elFactory('div', { class: 'list-footer' });
  const newTaskBtn = elFactory('div', { class: 'new-task' }, '+ Add new task');
  footer.appendChild(newTaskBtn);
  newTaskBtn.addEventListener('click', () => {

  })

  return footer;
});



/* List Button Factory */
const _renderListBtn = (state) => ({
  renderBtn: () => {
    const card = elFactory('div', { class: 'new-list' });
    const form = elFactory('form', { class: 'hide', id: 'new-list-from' });
    const input = elFactory('input', {
      id: 'list-title-input',
      type: 'text',
      placeholder: 'Enter list title...'
    });
    const btn = elFactory('div', { id: 'create-list' }, state.text);

    form.appendChild(input);
    card.appendChild(form);
    card.appendChild(btn);
    card.addEventListener('mouseenter', () => {
      form.classList.remove('hide');
    })
    card.addEventListener('mouseleave', () => {
      form.classList.add('hide');
    })
    return card;
  },
});

const _listBtnFunction = (state) => ({
  pushToMyLists: (list) => {
    state.target.push(list);
  },
  log: () => {
    console.log(state.target);
  },
  listIndex: () => {
    return state.target.length;
  }
})

const createListBtn = (text, target) => {
  const state = {
    text,
    target,
    active: false,
  }
  return Object.assign(
    {},
    _renderListBtn(state),
    _listBtnFunction(state),
  )
}

export { createList, createListBtn };