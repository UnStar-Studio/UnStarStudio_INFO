const themeToggle = document.getElementById('theme-toggle');
themeToggle.onclick = () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    themeToggle.checked = document.body.classList.contains('dark-theme');
};

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.checked = true;
}

const navBtns = document.querySelectorAll('.nav-btn');
const contents = document.querySelectorAll('.content');
navBtns.forEach(btn => {
    btn.onclick = () => {
        navBtns.forEach(b => b.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.target).classList.add('active');
    };
});

const categoryButtons = document.querySelectorAll('.nav-buttons button');
const videoCards = document.querySelectorAll('.video-card');
let activeCategory = null;

categoryButtons.forEach(btn => {
    btn.onclick = () => {
        if (btn.classList.contains('active')) {
            btn.classList.remove('active');
            activeCategory = null;
            videoCards.forEach(card => card.style.display = 'block');
        } else {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.category;
            videoCards.forEach(card => {
                card.style.display = card.dataset.category === activeCategory ? 'block' : 'none';
            });
        }
    };
});

const searchInput = document.getElementById('search-input');
searchInput.oninput = () => {
    const query = searchInput.value.toLowerCase();
    videoCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const desc = card.querySelector('p').textContent.toLowerCase();
        card.style.display = (title.includes(query) || desc.includes(query)) ? 'block' : 'none';
    });
};