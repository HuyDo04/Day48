const Redux = {
    createStore(reducer, initState) {
        let state = reducer(initState, { type: "" });

        const listeners = [];

        // Hàm unsubscribe để loại bỏ listener
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
};


function reducer(prevState, action) {
    let nextState;
    switch (action.type) {
        case "add":
            nextState = [...prevState, action.payload];
            break;

        case "edit":
           return prevState.map(item => {
            if (item.id === payload.id) {
                return { ...item, name: payload.name };
            }
            return item;
        })

        case "delete":
            return  prevState.filter(item => item.id !== payload);
    
        default:
            nextState = prevState;
    }
    return nextState;
}

const store = Redux.createStore(reducer, []);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch({
    type: "add",
    payload: { 
        id: 1, 
        name: "HTML, CSS" 
    }
});

unsubscribe();  

store.dispatch({
    type: "add",
    payload: { 
        id: 2, 
        name: "JavaScript" 
    }
});

console.log( store.getState());
