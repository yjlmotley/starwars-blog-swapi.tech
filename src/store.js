export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    sampleStoreNames: [
      {
        prop1: 5,
        prop2: "random value here",
      }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case 'add_task':
      const { id, color } = action.payload
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case 'actionNameHere':
      const { value1, value2 } = action.payload /* payload here is the object holding your props */
      return {
        ...store,
        /* store name here*/sampleStoreNames: store.sampleStoreNames.map((sampleStoreName) => (sampleStoreName.prop1 === value1 ? { ...sampleStoreName, prop2: value2 } : sampleStoreName))
      };

    default:
      throw Error('Unknown action.');
  }
}

