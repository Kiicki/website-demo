function addRoundPipeLine() {
    console.log('addRoundPipeLine called'); // Debug log
    roundPipeCounter++;
    const container = document.getElementById('roundPipeLines');
    const newLine = document.createElement('function addRoundPipeLine() {
    console.log('addRoundPipeLine called'); // Debug log
    roundPipeCounter++;
    const container = document.getElementById('roundPipeLines');
    const newLine = document.createElement('div');
    newLine.className = 'pipe-input-row';
    newLine.setAttribute('data-pipe-id', roundPipeCounter);
    
    newLine.innerHTML = `
        <select class="pipe-input" data-field="type">
            <option value="">Select pipe type</option>
            <option value="Steel">Steel</option>
            <option value="Copper">Copper</option>
            <option value="PVC">PVC</option>
            <option value="Cast Iron">Cast Ironfunction addRoundPipeLine() {
    roundPipeCounter++;
    const container = document.getElementById('roundPipeLines');
    const newLine = document.createElement('div');
    newLine.className = 'pipe-line';
    newLine.setAttribute('data-pipe-id', roundPipeCounter);
    
    newLine.innerHTML = `
        <div class="pipe-column">
            <div class="pipe-header">Pipe Type</div>
            <select class="pipe-input" data-field="type">
                <option value="">Select pipe type</option>
                <option value="Steel">Steel</option>
                <option value="Copper">Copper</option>
                <option value="PVC">PVC</option>
                <option value="Cast Iron">Cast Iron</option>
                <option value="PEX">PEX</option>
            </select>
        </div>
        <div class="pipe-column">
            <div class="pipe-header">Pipe Size</div>
            <select class="pipe-input" data-field="size">
                <option value="">Select size</option>
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
    roundPipeLines: [],
    squarePipeLines: []
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
let roundPipeCounter = 1;
let squarePipeCounter = 1;

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

function addRoundPipeLine() {
    roundPipeCounter++;
    const container = document.getElementById('roundPipeLines');
    const newLine = document.createElement('div');
    newLine.className = 'pipe-line';
    newLine.setAttribute('data-pipe-id', roundPipeCounter);
    
    newLine.innerHTML = `
        <select class="pipe-input" data-field="type">
            <option value="">Select pipe type</option>
            <option value="Steel">Steel</option>
            <option value="Copper">Copper</option>
            <option value="PVC">PVC</option>
            <option value="Cast Iron">Cast Iron</option>
            <option value="PEX">PEX</option>
        </select>
        <select class="pipe-input" data-field="size">
            <option value="">Select size</option>
            <option value="15mm">15mm</option>
            <option value="22mm">22mm</option>
            <option value="28mm">28mm</option>
            <option value="35mm">35mm</option>
            <option value="42mm">42mm</option>
            <option value="54mm">54mm</option>
            <option value="76mm">76mm</option>
            <option value="108mm">108mm</option>
        </select>
        <select class="pipe-input" data-field="quantity">
            <option value="">Select quantity</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        <select class="pipe-input" data-field="rorstruper">
            <option value="">Select rørstruper</option>
            ${Array.from({length: 20}, (_, i) => `<option value="${i+1}">${i+1}</option>`).join('')}
        </select>
        <div class="pipe-actions">
            <button type="button" class="remove-pipe-btn" onclick="removePipeLine(this)">Remove</button>
        </div>
    `;
    
    container.appendChild(newLine);
}

function addSquarePipeLine() {
    squarePipeCounter++;
    const container = document.getElementById('squarePipeLines');
    const newLine = document.createElement('div');
    newLine.className = 'pipe-line';
    newLine.setAttribute('data-pipe-id', squarePipeCounter);
    
    newLine.innerHTML = `
        <select class="pipe-input" data-field="type">
            <option value="">Select pipe type</option>
            <option value="Steel">Steel</option>
            <option value="Aluminum">Aluminum</option>
            <option value="Galvanized">Galvanized</option>
            <option value="Stainless Steel">Stainless Steel</option>
        </select>
        <input type="number" class="pipe-input" data-field="width" placeholder="Width (mm)">
        <input type="number" class="pipe-input" data-field="height" placeholder="Height (mm)">
        <select class="pipe-input" data-field="quantity">
            <option value="">Select quantity</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        <select class="pipe-input" data-field="rorstruper">
            <option value="">Select rørstruper</option>
            ${Array.from({length: 20}, (_, i) => `<option value="${i+1}">${i+1}</option>`).join('')}
        </select>
        <div class="pipe-actions">
            <button type="button" class="remove-pipe-btn" onclick="removePipeLine(this)">Remove</button>
        </div>
    `;
    
    container.appendChild(newLine);
}

function removePipeLine(button) {
    const pipeLine = button.closest('.pipe-line');
    pipeLine.remove();
}

function collectPipeData() {
    // Collect round pipe data
    const roundLines = document.querySelectorAll('#roundPipeLines .pipe-line');
    formData.roundPipeLines = [];
    
    roundLines.forEach(line => {
        const inputs = line.querySelectorAll('.pipe-input');
        const pipeData = {};
        
        inputs.forEach(input => {
            const field = input.getAttribute('data-field');
            pipeData[field] = input.value;
        });
        
        // Only add if at least one field is filled
        if (Object.values(pipeData).some(value => value && value.trim() !== '')) {
            formData.roundPipeLines.push(pipeData);
        }
    });
    
    // Collect square pipe data
    const squareLines = document.querySelectorAll('#squarePipeLines .pipe-line');
    formData.squarePipeLines = [];
    
    squareLines.forEach(line => {
        const inputs = line.querySelectorAll('.pipe-input');
        const pipeData = {};
        
        inputs.forEach(input => {
            const field = input.getAttribute('data-field');
            pipeData[field] = input.value;
        });
        
        // Only add if at least one field is filled
        if (Object.values(pipeData).some(value => value && value.trim() !== '')) {
            formData.squarePipeLines.push(pipeData);
        }
    });
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
    // Collect pipe data before saving
    collectPipeData();
    
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
        roundPipeLines: [],
        squarePipeLines: []
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
    
    // Reset pipes - clear all pipe lines except the first one
    resetPipeLines();
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
