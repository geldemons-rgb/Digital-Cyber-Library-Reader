const books = [
  { id: 1, title: "Чистый C++", author: "Бьёрн Страуструп", cat: "it", progress: 65, desc: "Фундаментальное руководство по современному программированию на C++ и проектированию архитектуры." },
  { id: 2, title: "Киберпространство 2088", author: "Алекс Рейн", cat: "scifi", progress: 30, desc: "Захватывающий научно-фантастический роман о цифровых разумах и сетях будущего." },
  { id: 3, title: "Алгоритмы и Структуры", author: "Томас Кормен", cat: "it", progress: 85, desc: "Классическое пособие по структурам данных, графам и оптимизации алгоритмов." },
  { id: 4, title: "Квантовая Физика", author: "Стивен Хокинг", cat: "science", progress: 10, desc: "Введение в тайны мироздания, черные дыры и квантовую механику для всех." },
  { id: 5, title: "Искусственный Интеллект", author: "Питер Норвиг", cat: "it", progress: 45, desc: "Современный подход к обучению нейросетей и интеллектуальным агентам." },
  { id: 6, title: "Звездный Поход", author: "Артур Кларк", cat: "scifi", progress: 90, desc: "Путешествие к далеким галактикам и поиск инопланетного разума." }
];

const booksGrid = document.getElementById('booksGrid');
const searchInput = document.getElementById('searchInput');
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');

function renderBooks(filterCat = 'all', searchQuery = '') {
  booksGrid.innerHTML = '';
  
  const filtered = books.filter(b => {
    const matchesCat = filterCat === 'all' || b.cat === filterCat;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  filtered.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.onclick = () => openBookModal(book);
    card.innerHTML = `
      <div>
        <div class="book-cover"><i class="fa-solid fa-book"></i></div>
        <div class="book-tag">${book.cat}</div>
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>
      </div>
    `;
    booksGrid.appendChild(card);
  });
}

function openBookModal(book) {
  document.getElementById('modalTitle').textContent = book.title;
  document.getElementById('modalAuthor').textContent = book.author;
  document.getElementById('modalDesc').textContent = book.desc;
  document.getElementById('progressFill').style.width = `${book.progress}%`;
  modalOverlay.classList.add('active');
}

closeModal.onclick = () => modalOverlay.classList.remove('active');
modalOverlay.onclick = (e) => { if (e.target === modalOverlay) modalOverlay.classList.remove('active'); };

document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.onclick = (e) => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    renderBooks(e.target.dataset.cat, searchInput.value);
  };
});

searchInput.oninput = () => {
  const activeCat = document.querySelector('.cat-btn.active').dataset.cat;
  renderBooks(activeCat, searchInput.value);
};

renderBooks();
