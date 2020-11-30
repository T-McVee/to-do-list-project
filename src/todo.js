import { format } from 'date-fns'

const logDetails = (state) => ({
  logTitle: () => console.log(state.title),
  logDescription: () => console.log(state.description),
  logDateCreated: () => console.log(format(state.dateCreated, 'yyyy/MM/dd kk:mm')),
  logDueDate: () => console.log(state.dueDate),
  logPriority: () => console.log(state.priority),
  logNotes: () => console.log(state.notes),
});

const getDetails = (state) => ({
  get title() {
    return state.title;
  },
  get description() {
    return state.description;
  },
  get dateCreated() {
    return state.dateCreated;
  },
  get dueDate() {
    return state.dueDate;
  },
  get priority() {
    return state.priority;
  },
  get notes() {
    return state.notes;
  },
})

const updateTodo = (state) => ({
  updateTitle: (newTitle) => state.title = newTitle,
  updateDescription: (newDescription) => state.description = newDescription,
  updateDueDate: (newDate) => state.dueDate = newDate,
  updatePriority: (newPriority) => state.priority = newPriority,
  addNote: (input) => state.notes.push(input),
})

// Todo Factory
const createTodo = (title, description, dueDate, priority) => {
  let state = {
    title,
    description,
    dateCreated: new Date(),
    dueDate,
    priority,
    notes: [],
  }

  return Object.assign(
    {},
    logDetails(state),
    getDetails(state),
    updateTodo(state)
  )
}

export { createTodo };