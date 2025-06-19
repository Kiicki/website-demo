// Language translations
const translations = {
    no: {
        title: "Damsgård Brannsikring AS",
        subtitle: "Arbeidslogging og Dokumenthåndtering",
        home: "Hjem",
        logout: "Logg ut",
        logoutConfirm: "Er du sikker på at du vil logge ut?",
        loggingOut: "Logger ut...",
        alreadyHome: "Du er allerede på hjemmesiden!",
        navigating: "Navigerer til:",
        willImplement: "Denne siden vil bli implementert med funksjonalitet for å håndtere",
        footer: "Utviklet for effektiv arbeidslogging",
        menuItems: {
            create: {
                title: "Skriv arbeidsliste",
                desc: "Opprett nye arbeidslister og registrer arbeidsoppgaver for prosjekter"
            },
            view: {
                title: "Se arbeidslister", 
                desc: "Vis og administrer eksisterende arbeidslister og oppgaver"
            },
            drawings: {
                title: "Tegninger",
                desc: "Tilgang til tekniske tegninger og prosjektdokumentasjon"
            },
            instructions: {
                title: "Montasjeanvisninger",
                desc: "Detaljerte instruksjoner for montering og installasjon"
            },
            safety: {
                title: "Sikkerhertsblad",
                desc: "Sikkerhetsdatablad og HMS-informasjon for materialer"
            },
            time: {
                title: "Timeregistering",
                desc: "Registrer arbeidstimer og prosjektaktiviteter"
            }
        }
    },
    en: {
        title: "Damsgård Brannsikring AS",
        subtitle: "Work Logging and Document Management",
        home: "Home",
        logout: "Logout",
        logoutConfirm: "Are you sure you want to log out?",
        loggingOut: "Logging out...",
        alreadyHome: "You are already on the homepage!",
        navigating: "Navigating to:",
        willImplement: "This page will be implemented with functionality to handle",
        footer: "Developed for efficient work logging",
        menuItems: {
            create: {
                title: "Create Work List",
                desc: "Create new work lists and register work tasks for projects"
            },
            view: {
                title: "View Work Lists",
                desc: "View and manage existing work lists and tasks"
            },
            drawings: {
                title: "Drawings",
                desc: "Access to technical drawings and project documentation"
            },
            instructions: {
                title: "Assembly Instructions",
                desc: "Detailed instructions for assembly and installation"
            },
            safety: {
                title: "Safety Data Sheets",
                desc: "Safety data sheets and HSE information for materials"
            },
            time: {
                title: "Time Registration",
                desc: "Register work hours and project activities"
            }
        }
    },
    hr: {
        title: "Damsgård Brannsikring AS",
        subtitle: "Evidencija Rada i Upravljanje Dokumentimi",
        home: "Početna",
        logout: "Odjava",
        logoutConfirm: "Jeste li sigurni da se želite odjaviti?",
        loggingOut: "Odjavljivanje...",
        alreadyHome: "Već ste na početnoj stranici!",
        navigating: "Navigiranje na:",
        willImplement: "Ova stranica će biti implementirana s funkcionalnostima za rukovanje",
        footer: "Razvijeno za efikasnu evidenciju rada",
        menuItems: {
            create: {
                title: "Stvori Popis Radova",
                desc: "Stvori nove popise radova i registriraj radne zadatke za projekte"
            },
            view: {
                title: "Prikaži Popise Radova",
                desc: "Prikaži i upravljaj postojećim popisima radova i zadacima"
            },
            drawings: {
                title: "Crteži",
                desc: "Pristup tehničkim crtežima i projektnoj dokumentaciji"
            },
            instructions: {
                title: "Upute za Montažu",
                desc: "Detaljne upute za montažu i instalaciju"
            },
            safety: {
                title: "Sigurnosni Listovi",
                desc: "Sigurnosni listovi i HSE informacije za materijale"
            },
            time: {
                title: "Evidencija Vremena",
                desc: "Registriraj radne sate i projektne aktivnosti"
            }
        }
    }
};

let currentLanguage = 'no';

function changeLanguage(lang) {
    currentLanguage = lang;
    const t = translations[lang];
    
    // Update header
    document.querySelector('.header h1').textContent = `🔥 ${t.title}`;
    document.querySelector('.header p').textContent = t.subtitle;
    
    // Update home button
    document.querySelector('.home-text').textContent = t.home;
    
    // Update logout button
    document.querySelector('.logout-btn').textContent = t.logout;
    
    // Update menu items
    const menuItems = document.querySelectorAll('.menu-item');
    const menuKeys = ['create', 'view', 'drawings', 'instructions', 'safety', 'time'];
    
    menuItems.forEach((item, index) => {
        const key = menuKeys[index];
        item.querySelector('.menu-title').textContent = t.menuItems[key].title;
        item.querySelector('.menu-description').textContent = t.menuItems[key].desc;
    });
    
    // Update footer
    document.querySelector('.footer p').innerHTML = `&copy; 2025 Damsgård Brannsikring AS | ${t.footer}`;
}

function logout() {
    const t = translations[currentLanguage];
    if (confirm(t.logoutConfirm)) {
        alert(t.loggingOut);
        // Here you would redirect to login page
        // window.location.href = '/login';
    }
}

function goHome() {
    const t = translations[currentLanguage];
    alert(t.alreadyHome);
    // If on a different page, this would navigate back to home
    // window.location.href = '/';
}

function navigateTo(section) {
    const t = translations[currentLanguage];
    // Simulate navigation with visual feedback
    const clickedItem = event.currentTarget;
    clickedItem.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        clickedItem.style.transform = '';
        const sectionTitle = clickedItem.querySelector('.menu-title').textContent.toLowerCase();
        alert(`${t.navigating} ${section}\n\n${t.willImplement} ${sectionTitle}.`);
    }, 150);
}

// Add some interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });
});