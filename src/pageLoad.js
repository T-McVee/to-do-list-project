import { renderMain } from './render';
import { elFactory, updateOrder } from './helpers/functions';
import sortable from '../node_modules/html5sortable/dist/html5sortable.es.js';
import { formInputFactory } from './helpers/components';

const welcomeLoad = () => {
  const woof = elFactory('div', { class: 'woof' }, 'Woof...');

  const heading = elFactory('h1', {}, 'Your gaurd dog against forgetfulness');
  const subHeading = elFactory('span', {}, 'Create an account or sign in');
  const cta = elFactory('div', { class: 'cta' }, heading, subHeading);

  const inputName = formInputFactory(
    { text: 'name:' },
    { type: 'text', id: 'name', name: 'name', placeholder: 'Name' }
  );

  const inputEmail = formInputFactory(
    { text: 'email:' },
    { type: 'email', id: 'email', name: 'email', placeholder: 'Email' }
  );

  const inputPassword = formInputFactory(
    { text: 'password:' },
    {
      type: 'password',
      id: 'password',
      name: 'password',
      placeholder: 'Password',
    }
  );

  const signUp = elFactory(
    'div',
    { class: 'button sign-up', id: 'sign-up' },
    'sign up'
  );
  const signIn = elFactory(
    'div',
    { class: 'button sign-in', id: 'sign-in' },
    'sign in'
  );
  const buttons = elFactory('div', { class: 'buttons' }, signUp, signIn);

  const form = elFactory('form', {}, inputEmail, inputPassword, buttons);

  /*  const tributeText = elFactory('div', {}, 'inspired by');
   const tributeLink = elFactory('a', { href: 'https://trello.com/', target: 'blank' }, 'Trello'); */
  /* const tribute = elFactory('div', { class: 'tribute' }, tributeText, tributeLink); */

  const tribute = document.createElement('div');
  tribute.classList.add('tribute');
  tribute.innerHTML = `Inspired by <a href="https://trello.com/"> Trello</a>`;

  const container = elFactory(
    'div',
    { class: 'container' },
    woof,
    cta,
    form,
    tribute
  );
  const col1 = elFactory('div', { class: 'col col-1' }, container);
  const col2 = elFactory('div', { class: 'col col-2' });
  const row = elFactory('div', { class: 'row' }, col1, col2);
  const main = elFactory('div', { class: 'welcome-screen' }, row);

  return main;
};

const appLoad = (myLists) => {
  const main = renderMain(myLists);
  const workSpace = main.querySelector('.work-space');

  // Add list Drag n' Drop
  const sortableLists = sortable(workSpace, {
    forcePlaceholderSize: true,
  });

  sortableLists[0].addEventListener('sortupdate', (e) => {
    updateOrder(e, myLists);
  });

  return elFactory('div', { class: 'app' }, main);
};

export { appLoad, welcomeLoad };
