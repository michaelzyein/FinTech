const translations = {
    en: {
        navHome: "Home",
        navTopics: "Topics",
        btnDarkMode: "Dark Mode \uD83C\uDF19",
        btnLightMode: "Light Mode \u2600\uFE0F",
        heroTitle: "The Future of <span>Wealth & Tech</span>",
        heroDesc: "Explore the modern pillars of financial growth and technological innovation. Simple, fast, and efficient.",
        btnExplore: "Explore Now",
        btnAdSponsor: "Special Offer",
        sectionTitle: "Core Horizons",
        card1Title: "Blockchain",
        card1Desc: "A decentralized, distributed, and public digital ledger that is used to record transactions across many computers so that the record cannot be altered.",
        card2Title: "Affiliate Marketing",
        card2Desc: "A marketing arrangement by which an online retailer pays a commission to an external website for traffic or sales generated from its referrals.",
        card3Title: "Stock Market",
        card3Desc: "The aggregation of buyers and sellers of stocks, which represent ownership claims on businesses. A key engine for long-term wealth creation.",
        footerText: "&copy; 2026 FinTech Hub. Designed with simple HTML, CSS, and JS."
    },
    id: {
        navHome: "Beranda",
        navTopics: "Topik",
        btnDarkMode: "Mode Gelap \uD83C\uDF19",
        btnLightMode: "Mode Terang \u2600\uFE0F",
        heroTitle: "Masa Depan <span>Kekayaan & Teknologi</span>",
        heroDesc: "Jelajahi pilar modern dari pertumbuhan finansial dan inovasi teknologi. Sederhana, cepat, dan efisien.",
        btnExplore: "Eksplorasi Sekarang",
        btnAdSponsor: "Penawaran Khusus",
        sectionTitle: "Cakrawala Utama",
        card1Title: "Blockchain",
        card1Desc: "Buku besar digital yang terdesentralisasi dan publik, digunakan untuk mencatat transaksi di banyak komputer sehingga catatannya tidak dapat diubah.",
        card2Title: "Pemasaran Afiliasi",
        card2Desc: "Pengaturan pemasaran di mana pengecer online membayar komisi ke situs web eksternal untuk lalu lintas atau penjualan yang dihasilkan dari rujukannya.",
        card3Title: "Pasar Saham",
        card3Desc: "Kumpulan pembeli dan penjual saham, yang mewakili klaim kepemilikan atas bisnis. Mesin utama untuk penciptaan kekayaan jangka panjang.",
        footerText: "&copy; 2026 FinTech Hub. Dirancang dengan HTML, CSS, dan JS murni."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Toggle Logic
    const langToggleBtn = document.getElementById('langToggle');
    let currentLang = localStorage.getItem('lang') || 'en';
    
    function applyLanguage(lang) {
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Toggle Button Text shows the OTHER language available to switch to
        langToggleBtn.textContent = lang === 'en' ? 'ID' : 'EN';
        
        // Update Theme toggle button text according to language
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        updateThemeButtonText(currentTheme, lang);
    }

    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'id' : 'en';
        localStorage.setItem('lang', currentLang);
        applyLanguage(currentLang);
    });

    // 2. Dark Mode Toggle Logic
    const themeToggleBtn = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            htmlElement.setAttribute('data-theme', 'dark');
        }
    }
    
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        let newTheme = 'light';
        
        if (currentTheme === 'light' || !currentTheme) {
            newTheme = 'dark';
        }
        
        themeToggleBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            themeToggleBtn.style.transform = '';
        }, 150);

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButtonText(newTheme, currentLang);
    });
    
    function updateThemeButtonText(theme, lang) {
        if (theme === 'dark') {
            themeToggleBtn.textContent = translations[lang].btnLightMode;
        } else {
            themeToggleBtn.textContent = translations[lang].btnDarkMode;
        }
    }

    // Apply exact initial language and theme text
    applyLanguage(currentLang);

    // 3. Scroll Animation for Cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`;
    });

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        observer.observe(card);
    });

    // 4. Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
            navbar.style.padding = '1rem 8%';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1.5rem 8%';
        }
        navbar.style.transition = 'padding 0.3s ease, box-shadow 0.3s ease';
    });
});
