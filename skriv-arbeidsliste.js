// Skriv Arbeidsliste JavaScript

// Database configuration
const database = {
    projects: ['Project Alpha', 'Project Beta', 'Project Gamma'],
    floors: ['U3', 'U2', 'U1', 'U', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    products: [
        'Firestop Sealant 150', 'Mineral Wool Board', 'Intumescent Foam', 
        'Fire Collar 110mm', 'Fire Wrap', 'Acrylic Sealant'
    ],
    fireResistance: ['Lyd', 'E 30', 'EI 30', 'EI 60', 'E 90', 'EI 120', 'Trykk'],
    cutOutMaterials: ['Drywall', 'Concrete', 'Wood', 'Metal Stud', 'Brick'],
    holeDiameters: (() => {
        const diameters = [3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
        for (let i = 60; i <= 1500; i += 10) {
            diameters.push(i);
        }
        return diameters;
    })()
};

// Form data state
let formData = {
    project: '',
    date: new Date().toISOString().split('T')[0],
    floor: '',
    location1: '',
    location2: '',
    holeCount: '',
    holeCountOther: '',
    holeType: 'round',
    holeSize: { diameter: '', width: '', height: '' },
    wcf: '',
    products: [],
    fireResistance: '',
    sides: '1',
    cutOutMaterial: '',
    isEmpty: false,
    roundPipes: [],
    squarePipes: []
};

// UI state
let isDarkMode = false;
let savedEntries = [];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    populateDropdowns();
    populateButtonGroups();
    setDefaultDate();
});

function initializePage() {
    // Set initial date
    document.getElementById('date').value = formData.date;
    
    // Load saved entries from localStorage if available
    const saved = localStorage.getItem('fireproofingEntries');
    if (saved) {
        savedEntries = JSON.parse(saved);
        updateEntryCount();
    }
}

function setupEventListeners() {
    // Hole type radio buttons
    const holeTypeRadios = document.querySelectorAll('input[name="holeType"]');
    holeTypeRadios.forEach(radio => {
        radio.addEventListener('change', handleHoleTypeChange);
    });
    
    // Form inputs
    document.getElementById('project').addEventListener('change', (e) => {
        formData.project = e.target.value;
    });
    
    document.getElementById('date').addEventListener('change', (e) => {
        formData.date = e.target.value;
    });
    
    document.getElementById('location1').addEventListener('input', (e) => {
        formData.location1 = e.target.value;
    });
    
    document.getElementById('location2').addEventListener('input', (e) => {
        formData.location2 = e.target.value;
    });
    
    document.getElementById('holeCountOther').addEventListener('input', (e) => {
        formData.holeCountOther = e.target.value;
        if (e.target.value) {
            // Clear regular hole count selection
            clearButtonSelection('holeCountButtons');
            formData.holeCount = '';
        }
    });
    
    document.getElementById('holeDiameter').addEventListener('change', (e) => {
        formData.holeSize.diameter = e.target.value;
    });
    
    document.getElementById('holeWidth').addEventListener('input', (e) => {
        formData.holeSize.width = e.target.value;
    });
    
    document.getElementById('holeHeight').addEventListener('input', (e) => {
        formData.holeSize.height = e.target.value;
    });
    
    document.getElementById('isEmpty').addEventListener('change', (e) => {
        formData.isEmpty = e.target.checked;
    });
}

// Pipe functionality
function switchPipeTab(tabType) {
    const roundSection = document.getElementById('roundPipeSection');
    const squareSection = document.getElementById('squarePipeSection');
    const tabs = document.querySelectorAll('.pipe-tab-btn');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    
    if (tabType === 'round') {
        roundSection.classList.add('active');
        squareSection.classList.remove('active');
        tabs[0].classList.add('active');
    } else {
        squareSection.classList.add('active');
        roundSection.classList.remove('active');
        tabs[1].classList.add('active');
    }
}

function addRoundPipe() {
    const type = document.getElementById('roundPipeType').value;
    const size = document.getElementById('roundPipeSize').value;
    const quantity = document.getElementById('roundPipeQuantity').value;
    const rorstruper = document.getElementById('roundPipeRorstruper').value;
    
    if (!type || !size || !quantity || !rorstruper) {
        alert('Vennligst fyll ut alle felt for rundt rør');
        return;
    }
    
    const pipe = {
        id: Date.now(),
        type: type,
        size: size,
        quantity: quantity,
        rorstruper: rorstruper
    };
    
    formData.roundPipes.push(pipe);
    updateRoundPipesList();
    clearRoundPipeInputs();
}

function addSquarePipe() {
    const type = document.getElementById('squarePipeType').value;
    const width = document.getElementById('squarePipeWidth').value;
    const height = document.getElementById('squarePipeHeight').value;
    const quantity = document.getElementById('squarePipeQuantity').value;
    const rorstruper = document.getElementById('squarePipeRorstruper').value;
    
    if (!type || !width || !height || !quantity || !rorstruper) {
        alert('Vennligst fyll ut alle felt for firkantede rør');
        return;
    }
    
    const pipe = {
        id: Date.now(),
        type: type,
        width: width,
        height: height,
        quantity: quantity,
        rorstruper: rorstruper
    };
    
    formData.squarePipes.push(pipe);
    updateSquarePipesList();
    clearSquarePipeInputs();
}

function removeRoundPipe(id) {
    formData.roundPipes = formData.roundPipes.filter(pipe => pipe.id !== id);
    updateRoundPipesList();
}

function removeSquarePipe(id) {
    formData.squarePipes = formData.squarePipes.filter(pipe => pipe.id !== id);
    updateSquarePipesList();
}

function updateRoundPipesList() {
    const container = document.getElementById('roundPipesContainer');
    const listDiv = document.getElementById('roundPipesList');
    
    if (formData.roundPipes.length === 0) {
        listDiv.classList.add('hidden');
        return;
    }
    
    listDiv.classList.remove('hidden');
    container.innerHTML = '';
    
    formData.roundPipes.forEach(pipe => {
        const pipeDiv = document.createElement('div');
        pipeDiv.className = 'pipe-item';
        pipeDiv.innerHTML = `
            <div class="pipe-detail">
                <span class="pipe-detail-label">Type</span>
                <span class="pipe-detail-value">${pipe.type}</span>
            </div>
            <div class="pipe-detail">
                <span class="pipe-detail-label">Størrelse</span>
                <span class="pipe-detail-value">${pipe.size}</span>
            </div>
            <div class="pipe-detail">
                <span class="pipe-detail-label">Antall</span>
                <span class="pipe-detail-value">${pipe.quantity}</span>
            </div>
            <div class="pipe-detail">
                <span class="pipe-detail-label">Rørstruper</span>
                <span class="pipe-detail-value">${pipe.rorstruper}</span>
            </div>
            <button type="button" class="remove-pipe-btn" onclick="removeRoundPipe(${pipe.id})">
                Fjern
            </button>
        `;
        container.appendChild(pipeDiv);
    });
}

function updateSquarePipesList() {
    const container = document.getElementById('squarePipesContainer');
    const listDiv = document.getElementById('squarePipesList');
    
    if (formData.squarePipes.length === 0) {
        listDiv.classList.add('hidden');
        return;
    }
    
    listDiv.classList.remove('hidden');
    container.innerHTML = '';
    
    formData.squarePipes.forEach(pipe => {
        const pipeDiv = document.createElement('div');
        pipeDiv.className = 'pipe-item';
        pipeDiv.innerHTML = `
            <div class="pipe-detail">
                <span class="pipe-detail-label">Type</span>
                <span class="pipe-detail-value">${pipe.type}</span>
            </div>
            <div class="pipe-detail">
                <span class="pipe-detail-label">Dimensjon</span>
                <span class="pipe-detail-value">${pipe.width} x ${pipe.height}mm</span>
            </div>
            <div class="pipe-detail">
                <span class="pipe-detail-label">Antall</span>
                <span class="pipe-detail-value">${pipe.quantity}</span>
            </div>
            <div class="pipe-detail">
                <span class="pipe-detail-label">Rørstruper</span>
                <span class="pipe-detail-value">${pipe.rorstruper}</span>
            </div>
            <button type="button" class="remove-pipe-btn" onclick="removeSquarePipe(${pipe.id})">
                Fjern
            </button>
        `;
        container.appendChild(pipeDiv);
    });
}

function clearRoundPipeInputs() {
    document.getElementById('roundPipeType').value = '';
    document.getElementById('roundPipeSize').value = '';
    document.getElementById('roundPipeQuantity').value = '';
    document.getElementById('roundPipeRorstruper').value = '';
}

function clearSquarePipeInputs() {
    document.getElementById('squarePipeType').value = '';
    document.getElementById('squarePipeWidth').value = '';
    document.getElementById('squarePipeHeight').value = '';
    document.getElementById('squarePipeQuantity').value = '';
    document.getElementById('squarePipeRorstruper').value = '';
}

function populateDropdowns() {
    // Populate project dropdown
    const projectSelect = document.getElementById('project');
    database.projects.forEach(project => {
        const option = document.createElement('option');
        option.value = project;
        option.textContent = project;
        projectSelect.appendChild(option);
    });
    
    // Populate hole diameter dropdown
    const diameterSelect = document.getElementById('holeDiameter');
    database.holeDiameters.forEach(diameter => {
        const option = document.createElement('option');
        option.value = diameter;
        option.textContent = diameter + 'mm';
        diameterSelect.appendChild(option);
    });
}

function populateButtonGroups() {
    // Populate floor buttons
    populateButtonGroup('floorButtons', database.floors, 'floor');
    
    // Populate hole count buttons
    populateButtonGroup('holeCountButtons', ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], 'holeCount');
    
    // Populate fire resistance buttons
    populateButtonGroup('fireResistanceButtons', database.fireResistance, 'fireResistance');
    
    // Populate cut out material buttons
    populateButtonGroup('cutOutMaterialButtons', database.cutOutMaterials, 'cutOutMaterial');
    
    // Setup W/C/F buttons
    setupToggleButtons();
    
    // Populate product checkboxes
    populateProductCheckboxes();
}

function populateButtonGroup(containerId, items, dataField) {
    const container = document.getElementById(containerId);
    items.forEach(item => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = item;
        button.addEventListener('click', () => {
            selectButton(containerId, button, item, dataField);
        });
        container.appendChild(button);
    });
}

function selectButton(containerId, selectedButton, value, dataField) {
    // Clear other selections in the same group
    clearButtonSelection(containerId);
    
    // Set this button as active
    selectedButton.classList.add('active');
    
    // Update form data
    formData[dataField] = value;
    
    // Special handling for hole count
    if (dataField === 'holeCount') {
        document.getElementById('holeCountOther').value = '';
        formData.holeCountOther = '';
    }
}

function clearButtonSelection(containerId) {
    const container = document.getElementById(containerId);
    const buttons = container.querySelectorAll('button');
    buttons.forEach(button => button.classList.remove('active'));
}

function setupToggleButtons() {
    // W/C/F buttons
    const wcfButtons = document.querySelectorAll('[data-value]');
    wcfButtons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            const group = button.parentElement;
            
            // Clear other selections in group
            group.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
            
            // Set this button as active
            button.classList.add('active');
            
            // Update form data based on button group
            if (group.previousElementSibling.textContent === 'W/C/F') {
                formData.wcf = value;
            } else if (group.previousElementSibling.textContent === 'Antall Sider') {
                formData.sides = value;
            }
        });
    });
}

function populateProductCheckboxes() {
    const container = document.getElementById('productCheckboxes');
    database.products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product-checkbox';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'product_' + product.replace(/\s+/g, '_');
        checkbox.addEventListener('change', () => toggleProduct(product));
        
        const label = document.createElement('label');
        label.setAttribute('for', checkbox.id);
        label.textContent = product;
        
        div.appendChild(checkbox);
        div.appendChild(label);
        container.appendChild(div);
    });
}

function handleHoleTypeChange(e) {
    formData.holeType = e.target.value;
    
    const diameterSelect = document.getElementById('holeDiameter');
    const widthInput = document.getElementById('holeWidth');
    const heightInput = document.getElementById('holeHeight');
    
    if (e.target.value === 'round') {
        diameterSelect.classList.remove('hidden');
        widthInput.classList.add('hidden');
        heightInput.classList.add('hidden');
        
        // Clear square inputs
        formData.holeSize.width = '';
        formData.holeSize.height = '';
        widthInput.value = '';
        heightInput.value = '';
    } else {
        diameterSelect.classList.add('hidden');
        widthInput.classList.remove('hidden');
        heightInput.classList.remove('hidden');
        
        // Clear round input
        formData.holeSize.diameter = '';
        diameterSelect.value = '';
    }
}

function swapLocations() {
    const location1 = document.getElementById('location1');
    const location2 = document.getElementById('location2');
    
    const temp = location1.value;
    location1.value = location2.value;
    location2.value = temp;
    
    // Update form data
    formData.location1 = location2.value;
    formData.location2 = location1.value;
}

function toggleProduct(product) {
    const index = formData.products.indexOf(product);
    if (index > -1) {
        formData.products.splice(index, 1);
    } else {
        formData.products.push(product);
    }
    updateSelectedProducts();
}

function updateSelectedProducts() {
    const container = document.getElementById('selectedProducts');
    const tagsContainer = document.getElementById('productTags');
    
    if (formData.products.length > 0) {
        container.classList.remove('hidden');
        tagsContainer.innerHTML = '';
        
        formData.products.forEach(product => {
            const tag = document.createElement('span');
            tag.className = 'product-tag';
            tag.textContent = product + ' ✕';
            tag.addEventListener('click', () => toggleProduct(product));
            tagsContainer.appendChild(tag);
        });
    } else {
        container.classList.add('hidden');
    }
}

function resetProducts() {
    formData.products = [];
    
    // Uncheck all product checkboxes
    const checkboxes = document.querySelectorAll('#productCheckboxes input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
    
    updateSelectedProducts();
}

function showProductSelector() {
    document.getElementById('productModal').classList.remove('hidden');
}

function hideProductSelector() {
    document.getElementById('productModal').classList.add('hidden');
}

function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
    formData.date = today;
}

// Admin functions
function toggleAdminTools() {
    const panel = document.getElementById('adminPanel');
    panel.classList.toggle('hidden');
}

function addProject() {
    const input = document.getElementById('newProject');
    const value = input.value.trim();
    if (value) {
        database.projects.push(value);
        input.value = '';
        
        // Update dropdown
        const select = document.getElementById('project');
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
        
        toggleAdminTools();
        alert('Prosjekt lagt til: ' + value);
    }
}

function addFloor() {
    const input = document.getElementById('newFloor');
    const value = input.value.trim();
    if (value) {
        database.floors.push(value);
        input.value = '';
        
        // Update floor buttons
        const container = document.getElementById('floorButtons');
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = value;
        button.addEventListener('click', () => {
            selectButton('floorButtons', button, value, 'floor');
        });
        container.appendChild(button);
        
        toggleAdminTools();
        alert('Etasje lagt til: ' + value);
    }
}

function addProduct() {
    const input = document.getElementById('newProduct');
    const value = input.value.trim();
    if (value) {
        database.products.push(value);
        input.value = '';
        
        // Update product checkboxes
        const container = document.getElementById('productCheckboxes');
        const div = document.createElement('div');
        div.className = 'product-checkbox';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'product_' + value.replace(/\s+/g, '_');
        checkbox.addEventListener('change', () => toggleProduct(value));
        
        const label = document.createElement('label');
        label.setAttribute('for', checkbox.id);
        label.textContent = value;
        
        div.appendChild(checkbox);
        div.appendChild(label);
        container.appendChild(div);
        
        toggleAdminTools();
        alert('Produkt lagt til: ' + value);
    }
}

// Work lists functions
function toggleWorkLists() {
    const mainForm = document.getElementById('mainForm');
    const workListsView = document.getElementById('workListsView');
    
    mainForm.classList.toggle('hidden');
    workListsView.classList.toggle('hidden');
    
    if (!workListsView.classList.contains('hidden')) {
        displayWorkLists();
    }
}

function displayWorkLists() {
    const container = document.getElementById('workListsContent');
    
    if (savedEntries.length === 0) {
        container.innerHTML = '<p class="no-entries">Ingen oppføringer lagret ennå</p>';
    } else {
        container.innerHTML = '';
        
        savedEntries.forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.className = 'work-entry';
            
            entryDiv.innerHTML = `
                <div class="work-entry-grid">
                    <div class="work-entry-item">
                        <span class="work-entry-label">Prosjekt:</span>
                        <span class="work-entry-value">${entry.project || 'N/A'}</span>
                    </div>
                    <div class="work-entry-item">
                        <span class="work-entry-label">Dato:</span>
                        <span class="work-entry-value">${new Date(entry.date).toLocaleDateString()}</span>
                    </div>
                    <div class="work-entry-item">
                        <span class="work-entry-label">Etasje:</span>
                        <span class="work-entry-value">${entry.floor || 'N/A'}</span>
                    </div>
                    <div class="work-entry-item">
                        <span class="work-entry-label">Lokasjon:</span>
                        <span class="work-entry-value">${entry.location1 || 'N/A'} - ${entry.location2 || 'N/A'}</span>
                    </div>
                    <div class="work-entry-item">
                        <span class="work-entry-label">Hull:</span>
                        <span class="work-entry-value">${entry.holeCountOther || entry.holeCount || 'N/A'}</span>
                    </div>
                    <div class="work-entry-item">
                        <span class="work-entry-label">Type:</span>
                        <span class="work-entry-value">${entry.holeType} ${entry.holeType === 'round' ? `(${entry.holeSize.diameter || 'N/A'}mm)` : `(${entry.holeSize.width || 'N/A'} x ${entry.holeSize.height || 'N/A'})`}</span>
                    </div>
                    <div class="work-entry-item">
                        <span class="work-entry-label">W/C/F:</span>
                        <span class="work-entry-value">${entry.wcf || 'N/A'}</span>
                    </div>
                    <div class="work-entry-item">
                        <span class="work-entry-label">Brannmotstand:</span>
                        <span class="work-entry-value">${entry.fireResistance || 'N/A'}</span>
                    </div>
                    <div class="work-entry-item">
                        <span class="work-entry-label">Sider:</span>
                        <span class="work-entry-value">${entry.sides}</span>
                    </div>
                    <div class="work-entry-item">
                        <span class="work-entry-label">Materiale:</span>
                        <span class="work-entry-value">${entry.cutOutMaterial || 'N/A'}</span>
                    </div>
                    ${entry.isEmpty ? '<div class="work-entry-item" style="grid-column: 1 / -1;"><span class="work-entry-label" style="color: #e74c3c;">⚠️ Hull er tomt</span></div>' : ''}
                    ${entry.products.length > 0 ? `
                        <div class="work-entry-item" style="grid-column: 1 / -1;">
                            <span class="work-entry-label">Produkter:</span>
                            <div style="margin-top: 5px;">
                                ${entry.products.map(product => `<span style="background: #74b9ff; color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.8rem; margin-right: 5px; display: inline-block; margin-bottom: 2px;">${product}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
                <div class="work-entry-timestamp">
                    Lagret: ${new Date(entry.timestamp).toLocaleString()}
                </div>
            `;
            
            container.appendChild(entryDiv);
        });
    }
}

function updateEntryCount() {
    document.getElementById('entryCount').textContent = savedEntries.length;
}

// Dark mode toggle
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    
    const icon = document.getElementById('darkModeIcon');
    icon.textContent = isDarkMode ? '☀️' : '🌙';
}

// Save entry function
function saveEntry() {
    // Validate required fields
    if (!formData.project) {
        alert('Vennligst velg et prosjekt');
        return;
    }
    
    if (!formData.date) {
        alert('Vennligst velg en dato');
        return;
    }
    
    // Create entry object
    const entry = {
        ...formData,
        id: Date.now(),
        timestamp: new Date().toISOString()
    };
    
    // Add to saved entries
    savedEntries.push(entry);
    
    // Save to localStorage
    localStorage.setItem('fireproofingEntries', JSON.stringify(savedEntries));
    
    // Update entry count
    updateEntryCount();
    
    // Show success message
    alert('Oppføring lagret!');
    
    // Reset form
    resetForm();
}

function resetForm() {
    // Reset form data
    formData = {
        project: '',
        date: new Date().toISOString().split('T')[0],
        floor: '',
        location1: '',
        location2: '',
        holeCount: '',
        holeCountOther: '',
        holeType: 'round',
        holeSize: { diameter: '', width: '', height: '' },
        wcf: '',
        products: [],
        fireResistance: '',
        sides: '1',
        cutOutMaterial: '',
        isEmpty: false,
        roundPipes: [],
        squarePipes: []
    };
    
    // Reset form elements
    document.getElementById('project').value = '';
    document.getElementById('date').value = formData.date;
    document.getElementById('location1').value = '';
    document.getElementById('location2').value = '';
    document.getElementById('holeCountOther').value = '';
    document.getElementById('holeDiameter').value = '';
    document.getElementById('holeWidth').value = '';
    document.getElementById('holeHeight').value = '';
    document.getElementById('isEmpty').checked = false;
    
    // Reset radio buttons
    document.querySelector('input[name="holeType"][value="round"]').checked = true;
    handleHoleTypeChange({ target: { value: 'round' } });
    
    // Clear all button selections
    clearButtonSelection('floorButtons');
    clearButtonSelection('holeCountButtons');
    clearButtonSelection('fireResistanceButtons');
    clearButtonSelection('cutOutMaterialButtons');
    
    // Clear toggle button selections
    document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
    
    // Reset products
    resetProducts();
    
    // Reset pipes
    formData.roundPipes = [];
    formData.squarePipes = [];
    updateRoundPipesList();
    updateSquarePipesList();
    clearRoundPipeInputs();
    clearSquarePipeInputs();
}

// Navigation functions
function goHome() {
    window.location.href = 'index.html';
}

function logout() {
    if (confirm('Er du sikker på at du vil logge ut?')) {
        alert('Logger ut...');
        window.location.href = 'index.html';
    }
}

// Language function (simplified for this page)
function changeLanguage(lang) {
    // Basic language switching - you can expand this based on your main script.js
    console.log('Language changed to:', lang);
}
