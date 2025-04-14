import {store, addBook, updateBook, removeBook, setFilter} from "./store.js"

const bookInput = document.querySelector("#book-input");
const addBookBtn = document.querySelector("#add-book-btn");
const bookList = document.querySelector(".book-list");
const filterBook = document.querySelector(".filter-book");
const filterInput = document.querySelector("#filter-input");
const resultCount = document.querySelector("#result-count");

//DOM Event 
addBookBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const bookName = bookInput.value.trim();
    if(bookName) {
        store.dispatch(addBook({name:bookName}))
        bookInput.value = "";
    }
})

filterInput.addEventListener("input", () => {
    store.dispatch(setFilter(filterInput.value));
});

// render
const render = () => {
   const { books, filter } = store.getState();
    const filterBook = books.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
    );

    bookList.innerHTML = "";
    filterBook.forEach(book => {
        const li = document.createElement("li");
        
        const p = document.createElement("p");
        p.textContent = book.name;

        const edit = document.createElement("input");
        edit.value = book.name
        edit.style.display = "none";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Sửa";
        editBtn.onclick = () => {
            p.style.display = "none";
            edit.style.display = "inline";
            editBtn.style.display = "none";
            saveBtn.style.display = "inline";
            edit.focus();
        };

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Lưu";
        saveBtn.style.display = "none";
        saveBtn.onclick = () => {
            if (edit.value.trim()) {
                store.dispatch(updateBook({ id: book.id, name: edit.value.trim() }));
            }
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Xóa";
        deleteBtn.onclick = () => {
            store.dispatch(removeBook(book.id));
        };

        li.append(p, edit, editBtn, saveBtn, deleteBtn);
        bookList.appendChild(li);
    });

    resultCount.textContent = `Tổng: ${filterBook.length}`;
}

store.subscribe(render)

render();