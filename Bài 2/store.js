// Constants
export const ADD_BOOK = "ADD_BOOK";
export const UPDATE_BOOK = "UPDATE_BOOK";
export const REMOVE_BOOK = "REMOVE_BOOK";
export const SET_FILTER = "SET_FILTER";

// id
function generateRandomId(n, prefix = "book-") {
    const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = prefix;
    for (let i = 0; i < n; i++) {
        id += char.charAt(Math.floor(Math.random() * char.length));
    }
    return id;
}


// Create action
export const createAction = (type, payload) => {
    return { type, payload }
}

// Actions
export const addBook = (book) => createAction('ADD_BOOK', book);
export const updateBook = (book) => createAction('UPDATE_BOOK', book);
export const removeBook = (book) => createAction('REMOVE_BOOK', book);
export const setFilter = (book) => createAction('SET_FILTER', book);

// Init state
const initState = {
    books: [],
    filter: ""
}

// Reducer
const reducer = (state= initState, action) => {
    switch(action.type) {
        case "ADD_BOOK": {
            const newState = {
                ...state,
                books: [...state.books, {...action.payload, id : generateRandomId(4)}]
            }            
            return newState
        }

        case "UPDATE_BOOK": {
            const newState = {
                ...state,
                books: state.books.map(item => item.id === action.payload.id ? { ...item, ...action.payload } : item
            )
        }
            return newState
    }
           
        case "REMOVE_BOOK": {
            const newState = {
                ...state,
                books: state.books.filter(item => item.id !== action.payload)
            }
            return newState
        }

        case "SET_FILTER": {
            const newState = {
                ...state,
                filter: action.payload
            }
            return newState
        }
        default: return state
    }

}

// Create store
export const createStore = (reducer, initState) => {
     let state = reducer(initState, { type: "@@redux/INITg.d.l.o.1.k" });

        const listeners = [];

        function unsubscribe(listener) {
            const index = listeners.indexOf(listener);            
            if (index !== -1) {
                listeners.splice(index, 1);  
            }
        }

        return {
            getState() {
                return state;
            },

            subscribe(listener) {
                listeners.push(listener);  
                return () => unsubscribe(listener);
            },

            
            dispatch(action) {
                state = reducer(state, action); 
                listeners.forEach((listener) => listener()); 
            },
        };
}

export const store = createStore(reducer, initState)