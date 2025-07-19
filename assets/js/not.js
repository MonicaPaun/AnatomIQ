let notes = JSON.parse(localStorage.getItem("notes") || "[]");
let trashedNotes = JSON.parse(localStorage.getItem("trashedNotes") || "[]");
let activeNoteId = null;

const notesList = document.getElementById("notes-list");
const addNoteBtn = document.getElementById("add-note");
const noteEditor = document.getElementById("note-editor");
const noteTitle = document.getElementById("note-title");
const noteBody = document.getElementById("note-body");

const toggleTrashBtn = document.getElementById("toggle-trash");
const trashedNotesList = document.getElementById("trashed-notes-list");

let trashVisible = false;

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("trashedNotes", JSON.stringify(trashedNotes));
}

function renderNotesList() {
  notesList.innerHTML = "";
  notes.forEach(note => {
    const div = document.createElement("div");
    div.className = "note-item" + (note.id === activeNoteId ? " active" : "");
   div.textContent = note.title || translations[currentLang].noTitle;


    const deleteBtn = document.createElement("button");
    deleteBtn.className = "notes__delete-btn";
    deleteBtn.innerHTML = '<i class="bx bx-trash"></i>';

    deleteBtn.onclick = (event) => {
      event.stopPropagation();
   if (confirm(translations[currentLang].confirmDeleteNote)) {
        moveNoteToTrash(note.id);
      }
    };

    div.appendChild(deleteBtn);
    div.onclick = () => {
      setActiveNote(note.id);
    };

    notesList.appendChild(div);
  });
}

function renderTrashedNotes() {
  trashedNotesList.innerHTML = "";

  if (trashedNotes.length === 0) {
   trashedNotesList.textContent = translations[currentLang].noTrashedNotes;

    return;
  }

  trashedNotes.forEach(note => {
    const div = document.createElement("div");
    div.className = "trashed-note-item";
   div.textContent = note.title || translations[currentLang].noTitle;


    // Buton recuperare
const restoreBtn = document.createElement("button");
restoreBtn.textContent = "Recuperează";
restoreBtn.className = "btn btn-restore";  // clasa nouă pentru stilizare
restoreBtn.onclick = () => {
  restoreNoteFromTrash(note.id);
};

// Buton ștergere definitivă
const deleteForeverBtn = document.createElement("button");
deleteForeverBtn.textContent = translations[currentLang].deleteForever;

deleteForeverBtn.className = "btn btn-delete";  // clasa nouă pentru stilizare
deleteForeverBtn.onclick = () => {
if (confirm(translations[currentLang].confirmPermanentDelete)) {

    deleteNoteForever(note.id);
  }
};


    div.appendChild(restoreBtn);
    div.appendChild(deleteForeverBtn);

    trashedNotesList.appendChild(div);
  });
}

function setActiveNote(id) {
  activeNoteId = id;
  const note = notes.find(n => n.id === id);
  if (note) {
    noteTitle.value = note.title;
    noteBody.value = note.body;
    noteEditor.style.display = "flex";
    renderNotesList();
    // Daca e activă sectiunea trash, o inchidem
    if(trashVisible){
      toggleTrashVisibility(false);
    }
  }
}

function addNote() {
  if(trashVisible){
    toggleTrashVisibility(false);  // inchide trash daca e deschis cand creezi notita noua
  }

  const newNote = {
    id: Date.now(),
   title: translations[currentLang].newNote,
    body: ""
  };
  notes.unshift(newNote);
  saveNotes();
  setActiveNote(newNote.id);
}

function moveNoteToTrash(id) {
  const index = notes.findIndex(n => n.id === id);
  if (index > -1) {
    const [removed] = notes.splice(index, 1);
    trashedNotes.unshift(removed);
    if (activeNoteId === id) {
      noteEditor.style.display = "none";
      activeNoteId = null;
    }
    saveNotes();
    renderNotesList();
    if (trashVisible) {
      renderTrashedNotes();
    }
  }
}

function restoreNoteFromTrash(id) {
  const index = trashedNotes.findIndex(n => n.id === id);
  if (index > -1) {
    const [restored] = trashedNotes.splice(index, 1);
    notes.unshift(restored);
    saveNotes();
    renderNotesList();
    renderTrashedNotes();
  }
}

function deleteNoteForever(id) {
  const index = trashedNotes.findIndex(n => n.id === id);
  if (index > -1) {
    trashedNotes.splice(index, 1);
    saveNotes();
    renderTrashedNotes();
  }
}

function toggleTrashVisibility(forceState) {
  if (typeof forceState === "boolean") {
    trashVisible = forceState;
  } else {
    trashVisible = !trashVisible;
  }

  if (trashVisible) {
    noteEditor.style.display = "flex";
    // ascunde editorul notitei active, ca afisam trash-ul
    noteTitle.style.display = "none";
    noteBody.style.display = "none";

    // afisam sectiunea trash in interiorul note-editor-ului
    document.getElementById("trash-section").style.display = "block";

    renderTrashedNotes();
  } else {
    document.getElementById("trash-section").style.display = "none";

    noteTitle.style.display = "block";
    noteBody.style.display = "block";

    // daca exista notita activa, afisam editorul ei, altfel ascundem editorul
    if (activeNoteId !== null) {
      noteEditor.style.display = "flex";
    } else {
      noteEditor.style.display = "none";
    }
  }
}

toggleTrashBtn.addEventListener("click", () => {
  toggleTrashVisibility();
});

// evenimente editare titlu si corp notita 

noteTitle.addEventListener("input", () => {
  const note = notes.find(n => n.id === activeNoteId);
  if (note) {
    note.title = noteTitle.value;
    saveNotes();
    renderNotesList();
  }
});

noteBody.addEventListener("input", () => {
  const note = notes.find(n => n.id === activeNoteId);
  if (note) {
    note.body = noteBody.value;
    saveNotes();
  }
});

addNoteBtn.addEventListener("click", addNote);

// Inițializăm aplicația
renderNotesList();