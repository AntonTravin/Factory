document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. ЛОГИКА ПЕРЕКЛЮЧЕНИЯ ВКЛАДОК ---
    function activateTab(targetId) {
        const targetPane = document.querySelector(targetId);
        if (!targetPane) return;

        // Скрываем все вкладки и убираем активные классы с кнопок
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('show', 'active'));
        document.querySelectorAll('.dropdown-item').forEach(b => b.classList.remove('active'));

        // Показываем нужную вкладку
        targetPane.classList.add('show', 'active');

        // Подсвечиваем кнопку в меню
        const btn = document.querySelector(`[data-target-id="${targetId}"]`) || 
                    document.querySelector(`[data-bs-target="${targetId}"]`);
        if (btn) btn.classList.add('active');
    }

    // Слушаем клики по кнопкам в меню (и в выпадающих, и в обычных)
    document.querySelectorAll('.dropdown-item, .nav-link').forEach(button => {
        button.addEventListener('click', function(e) {
            const targetId = this.getAttribute('data-target-id') || this.getAttribute('data-bs-target');
            
            // Если у кнопки есть цель-ID, активируем вкладку
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                activateTab(targetId);
            }
        });
    });



    // --- 2. ЛОГИКА ПОИСКА ---
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const filter = this.value.toLowerCase().trim();
            if (filter.length < 2) return;

            // Ищем по всем вкладкам
            const terms = document.querySelectorAll('.tab-pane b');
            
            for (let term of terms) {
                // Очистка от ударений для сравнения
                const termText = term.textContent.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                
                if (termText.includes(filter)) {
                    const parentPane = term.closest('.tab-pane');
                    
                    // Активируем вкладку (если она еще не открыта)
                    activateTab("#" + parentPane.id);

                    // Скроллим к слову
                    setTimeout(() => {
                        term.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        term.style.backgroundColor = 'yellow';
                        setTimeout(() => term.style.backgroundColor = 'transparent', 2000);
                    }, 50);
                    
                    break; // Нашли первое совпадение — выходим
                }
            }
        });
    }

    // --- 3. КНОПКА ВВЕРХ ---
    const topBtn = document.getElementById("btn-back-to-top");
    window.onscroll = function() {
        if (topBtn) {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                topBtn.style.display = "block";
            } else {
                topBtn.style.display = "none";
            }
        }
    };
    if (topBtn) {
        topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }
});





