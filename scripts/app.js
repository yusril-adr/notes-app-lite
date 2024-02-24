const App = {
  initNotes(notes) {
    const noteListElem = document.querySelector('note-list');
    const searchParams = (new URL(window.location.href)).searchParams;
    const keyword = searchParams.get('search');

    if (keyword) {
      noteListElem.notes = notes.filter(({ title })=> title.toLowerCase().trim().includes(keyword.toLowerCase().trim()));
    } else {
      noteListElem.notes = notes;

    }
  }
};

export default App;
