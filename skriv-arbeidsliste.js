// Fireproofing Documentation App
const { useState, useEffect } = React;
const { Calendar, Moon, Sun, Settings, Plus, X, Save, Download, Eye, RotateCw } = lucide;

function FireproofingApp() {
  // State for form data
  const [formData, setFormData] = useState({
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
    isEmpty: false
  });

  // State for UI
  const [darkMode, setDarkMode] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAdminTools, setShowAdminTools] = useState(false);
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [showWorkLists, setShowWorkLists] = useState(false);
  const [savedEntries, setSavedEntries] = useState([]);

  // Database state (in-memory for this demo)
  const [database, setDatabase] = useState({
    projects: ['Project Alpha', 'Project Beta', 'Project Gamma'],
    floors: ['U3', 'U2', 'U1', 'U', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    products: ['Firestop Sealant 150', 'Mineral Wool Board', 'Intumescent Foam', 'Fire Collar 110mm', 'Fire Wrap', 'Acrylic Sealant'],
    fireResistance: ['Lyd', 'E 30', 'EI 30', 'EI 60', 'E 90', 'EI 120', 'Trykk'],
    cutOutMaterials: ['Drywall', 'Concrete', 'Wood', 'Metal Stud', 'Brick'],
    holeDiameters: (() => {
      const diameters = [3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
      for (let i = 60; i <= 1500; i += 10) {
        diameters.push(i);
      }
      return diameters;
    })()
  });

  // State for admin tools
  const [adminInput, setAdminInput] = useState({
    project: '',
    floor: '',
    product: '',
    fireResistance: '',
    cutOutMaterial: ''
  });

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Handlers
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleHoleSizeChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      holeSize: {
        ...prev.holeSize,
        [field]: value
      }
    }));
  };

  const handleHoleCountChange = (count) => {
    setFormData(prev => ({
      ...prev,
      holeCount: count,
      holeCountOther: ''
    }));
  };

  const toggleProduct = (product) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.includes(product)
        ? prev.products.filter(p => p !== product)
        : [...prev.products, product]
    }));
  };

  const resetProducts = () => {
    setFormData(prev => ({
      ...prev,
      products: []
    }));
  };

  // Admin functions
  const addToDatabase = (category, value) => {
    if (value.trim()) {
      setDatabase(prev => ({
        ...prev,
        [category]: [...prev[category], value]
      }));
      // Close admin tools after adding
      setShowAdminTools(false);
    }
  };

  const saveEntry = () => {
    const entry = {
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    setSavedEntries(prev => [...prev, entry]);
    alert('Entry saved successfully!');
    
    // Reset form after saving
    setFormData({
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
      isEmpty: false
    });
  };

  const exportEntry = () => {
    const text = `FIREPROOFING DOCUMENTATION
=======================
Project: ${formData.project}
Date: ${formData.date}
Floor: ${formData.floor}
Location: ${formData.location1} - ${formData.location2}
Hole Count: ${formData.holeCountOther || formData.holeCount}
Hole Type: ${formData.holeType}
${formData.holeType === 'round' ? `Diameter: ${formData.holeSize.diameter}mm` : `Size: ${formData.holeSize.width} x ${formData.holeSize.height}`}
W/C/F: ${formData.wcf}
Products: ${formData.products.join(', ')}
Fire Resistance: ${formData.fireResistance}
Sides: ${formData.sides}
Cut Out Material: ${formData.cutOutMaterial}
Empty: ${formData.isEmpty ? 'Yes' : 'No'}`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fireproofing_${Date.now()}.txt`;
    a.click();
  };

  // Create icons using lucide
  const CalendarIcon = () => React.createElement('span', { dangerouslySetInnerHTML: { __html: lucide.createIcons()['calendar'] } });
  const MoonIcon = () => React.createElement('span', { dangerouslySetInnerHTML: { __html: lucide.createIcons()['moon'] } });
  const SunIcon = () => React.createElement('span', { dangerouslySetInnerHTML: { __html: lucide.createIcons()['sun'] } });
  const SettingsIcon = () => React.createElement('span', { dangerouslySetInnerHTML: { __html: lucide.createIcons()['settings'] } });
  const PlusIcon = () => React.createElement('span', { dangerouslySetInnerHTML: { __html: lucide.createIcons()['plus'] } });
  const XIcon = () => React.createElement('span', { dangerouslySetInnerHTML: { __html: lucide.createIcons()['x'] } });
  const SaveIcon = () => React.createElement('span', { dangerouslySetInnerHTML: { __html: lucide.createIcons()['save'] } });
  const DownloadIcon = () => React.createElement('span', { dangerouslySetInnerHTML: { __html: lucide.createIcons()['download'] } });
  const RotateCwIcon = () => React.createElement('span', { dangerouslySetInnerHTML: { __html: lucide.createIcons()['rotate-cw'] } });

  return React.createElement('div', { className: 'container' },
    // Header
    React.createElement('div', { className: 'header' },
      React.createElement('h1', null, 'Fireproofing Documentation'),
      React.createElement('div', { className: 'header-buttons' },
        React.createElement('button', {
          onClick: () => setShowWorkLists(!showWorkLists),
          className: 'btn btn-primary'
        }, 'See Work Lists'),
        React.createElement('button', {
          onClick: () => setDarkMode(!darkMode),
          className: 'btn btn-icon'
        }, darkMode ? '☀️' : '🌙'),
        React.createElement('button', {
          onClick: () => setShowAdminTools(!showAdminTools),
          className: 'btn btn-icon'
        }, '⚙️')
      )
    ),

    // Admin Tools
    showAdminTools && React.createElement('div', { className: 'card' },
      React.createElement('h2', { className: 'font-semibold mb-4' }, 'Admin Tools'),
      React.createElement('div', { className: 'grid grid-cols-2 gap-2' },
        // Add Project
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', null, 'Add Project'),
          React.createElement('div', { className: 'flex gap-2' },
            React.createElement('input', {
              type: 'text',
              value: adminInput.project,
              onChange: (e) => setAdminInput({...adminInput, project: e.target.value}),
              className: 'form-control',
              placeholder: 'Project name'
            }),
            React.createElement('button', {
              onClick: () => {
                addToDatabase('projects', adminInput.project);
                setAdminInput({...adminInput, project: ''});
              },
              className: 'btn btn-success'
            }, 'Add')
          )
        ),
        // Add Floor
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', null, 'Add Floor'),
          React.createElement('div', { className: 'flex gap-2' },
            React.createElement('input', {
              type: 'text',
              value: adminInput.floor,
              onChange: (e) => setAdminInput({...adminInput, floor: e.target.value}),
              className: 'form-control',
              placeholder: 'Floor'
            }),
            React.createElement('button', {
              onClick: () => {
                addToDatabase('floors', adminInput.floor);
                setAdminInput({...adminInput, floor: ''});
              },
              className: 'btn btn-success'
            }, 'Add')
          )
        ),
        // Add Product
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', null, 'Add Product'),
          React.createElement('div', { className: 'flex gap-2' },
            React.createElement('input', {
              type: 'text',
              value: adminInput.product,
              onChange: (e) => setAdminInput({...adminInput, product: e.target.value}),
              className: 'form-control',
              placeholder: 'Product name'
            }),
            React.createElement('button', {
              onClick: () => {
                addToDatabase('products', adminInput.product);
                setAdminInput({...adminInput, product: ''});
              },
              className: 'btn btn-success'
            }, 'Add')
          )
        ),
        // Add Fire Resistance
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', null, 'Add Fire Resistance'),
          React.createElement('div', { className: 'flex gap-2' },
            React.createElement('input', {
              type: 'text',
              value: adminInput.fireResistance,
              onChange: (e) => setAdminInput({...adminInput, fireResistance: e.target.value}),
              className: 'form-control',
              placeholder: 'Fire resistance'
            }),
            React.createElement('button', {
              onClick: () => {
                addToDatabase('fireResistance', adminInput.fireResistance);
                setAdminInput({...adminInput, fireResistance: ''});
              },
              className: 'btn btn-success'
            }, 'Add')
          )
        ),
        // Add Cut Out Material
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', null, 'Add Cut Out Material'),
          React.createElement('div', { className: 'flex gap-2' },
            React.createElement('input', {
              type: 'text',
              value: adminInput.cutOutMaterial,
              onChange: (e) => setAdminInput({...adminInput, cutOutMaterial: e.target.value}),
              className: 'form-control',
              placeholder: 'Material'
            }),
            React.createElement('button', {
              onClick: () => {
                addToDatabase('cutOutMaterials', adminInput.cutOutMaterial);
                setAdminInput({...adminInput, cutOutMaterial: ''});
              },
              className: 'btn btn-success'
            }, 'Add')
          )
        )
      )
    ),

    // Work Lists View
    showWorkLists && React.createElement('div', { className: 'mb-4' },
      React.createElement('div', { className: 'flex-between mb-4' },
        React.createElement('h2', { className: 'font-semibold' }, `Saved Work Lists (${savedEntries.length})`),
        React.createElement('button', {
          onClick: () => setShowWorkLists(false),
          className: 'btn btn-primary'
        }, 'Back to Form')
      ),
      
      savedEntries.length === 0 
        ? React.createElement('p', { className: 'text-center text-gray-500' }, 'No entries saved yet')
        : React.createElement('div', null,
            savedEntries.map((entry) => React.createElement('div', { key: entry.id, className: 'card' },
              React.createElement('div', { className: 'grid grid-cols-2 gap-2 text-sm' },
                React.createElement('div', null,
                  React.createElement('span', { className: 'font-medium' }, 'Project: '),
                  entry.project || 'N/A'
                ),
                React.createElement('div', null,
                  React.createElement('span', { className: 'font-medium' }, 'Date: '),
                  new Date(entry.date).toLocaleDateString()
                ),
                React.createElement('div', null,
                  React.createElement('span', { className: 'font-medium' }, 'Floor: '),
                  entry.floor || 'N/A'
                ),
                React.createElement('div', null,
                  React.createElement('span', { className: 'font-medium' }, 'Location: '),
                  `${entry.location1 || 'N/A'} - ${entry.location2 || 'N/A'}`
                ),
                React.createElement('div', null,
                  React.createElement('span', { className: 'font-medium' }, 'Holes: '),
                  entry.holeCountOther || entry.holeCount || 'N/A'
                ),
                React.createElement('div', null,
                  React.createElement('span', { className: 'font-medium' }, 'Type: '),
                  entry.holeType,
                  entry.holeType === 'round' 
                    ? ` (${entry.holeSize.diameter || 'N/A'}mm)` 
                    : ` (${entry.holeSize.width || 'N/A'} x ${entry.holeSize.height || 'N/A'})`
                ),
                React.createElement('div', null,
                  React.createElement('span', { className: 'font-medium' }, 'W/C/F: '),
                  entry.wcf || 'N/A'
                ),
                React.createElement('div', null,
                  React.createElement('span', { className: 'font-medium' }, 'Fire Resistance: '),
                  entry.fireResistance || 'N/A'
                ),
                React.createElement('div', null,
                  React.createElement('span', { className: 'font-medium' }, 'Sides: '),
                  entry.sides
                ),
                React.createElement('div', null,
                  React.createElement('span', { className: 'font-medium' }, 'Material: '),
                  entry.cutOutMaterial || 'N/A'
                ),
                entry.isEmpty && React.createElement('div', { className: 'col-span-2' },
                  React.createElement('span', { className: 'font-medium text-red-600' }, '⚠️ Hole is empty')
                ),
                entry.products.length > 0 && React.createElement('div', { className: 'col-span-2' },
                  React.createElement('span', { className: 'font-medium' }, 'Products:'),
                  React.createElement('div', { className: 'mt-2' },
                    entry.products.map((product, idx) => 
                      React.createElement('span', { key: idx, className: 'tag' }, product)
                    )
                  )
                )
              ),
              React.createElement('div', { className: 'text-xs text-gray-500 mt-2' },
                'Saved: ', new Date(entry.timestamp).toLocaleString()
              )
            ))
          )
    ),

    // Main Form
    !showWorkLists && React.createElement('div', { className: 'space-y-4' },
      // Project and Date
      React.createElement('div', { className: 'grid grid-cols-2 gap-2' },
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', null, 'Project'),
          React.createElement('select', {
            value: formData.project,
            onChange: (e) => handleInputChange('project', e.target.value),
            className: 'form-control'
          },
            React.createElement('option', { value: '' }, 'Select a project'),
            database.projects.map(project => 
              React.createElement('option', { key: project, value: project }, project)
            )
          )
        ),
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', null, 'Date'),
          React.createElement('input', {
            type: 'date',
            value: formData.date,
            onChange: (e) => handleInputChange('date', e.target.value),
            className: 'form-control'
          })
        )
      ),

      // Floor
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', null, 'Floor'),
        React.createElement('div', { className: 'toggle-group' },
          database.floors.map(floor => 
            React.createElement('button', {
              key: floor,
              onClick: () => handleInputChange('floor', floor),
              className: `toggle-btn ${formData.floor === floor ? 'active' : ''}`
            }, floor)
          )
        )
      ),

      // Location
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', null, 'Location'),
        React.createElement('div', { className: 'grid grid-cols-2 gap-2' },
          React.createElement('input', {
            type: 'text',
            value: formData.location1,
            onChange: (e) => handleInputChange('location1', e.target.value),
            placeholder: 'Room 1',
            className: 'form-control'
          }),
          React.createElement('input', {
            type: 'text',
            value: formData.location2,
            onChange: (e) => handleInputChange('location2', e.target.value),
            placeholder: 'Room 2',
            className: 'form-control'
          })
        )
      ),

      // Amount of Holes
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', null, 'Amount of Holes'),
        React.createElement('div', { className: 'flex gap-1 flex-wrap' },
          ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map(count => 
            React.createElement('button', {
              key: count,
              onClick: () => handleHoleCountChange(count),
              className: `toggle-btn ${formData.holeCount === count ? 'active' : ''}`
            }, count)
          ),
          React.createElement('input', {
            type: 'number',
            value: formData.holeCountOther,
            onChange: (e) => {
              setFormData(prev => ({
                ...prev,
                holeCount: '',
                holeCountOther: e.target.value
              }));
            },
            placeholder: 'Other',
            className: 'form-control',
            style: { width: '80px' }
          })
        )
      ),

      // Hole Type
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', null, 'Hole Type'),
        React.createElement('div', { className: 'flex gap-2' },
          React.createElement('button', {
            onClick: () => handleInputChange('holeType', 'round'),
            className: `toggle-btn ${formData.holeType === 'round' ? 'active' : ''}`
          }, 'Round'),
          React.createElement('button', {
            onClick: () => handleInputChange('holeType', 'square'),
            className: `toggle-btn ${formData.holeType === 'square' ? 'active' : ''}`
          }, 'Square')
        )
      ),

      // Hole Size
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', null, 'Hole Size'),
        formData.holeType === 'round' 
          ? React.createElement('select', {
              value: formData.holeSize.diameter,
              onChange: (e) => handleHoleSizeChange('diameter', e.target.value),
              className: 'form-control'
            },
              React.createElement('option', { value: '' }, 'Select diameter'),
              database.holeDiameters.map(diameter => 
                React.createElement('option', { key: diameter, value: diameter }, `${diameter}mm`)
              )
            )
          : React.createElement('div', { className: 'grid grid-cols-2 gap-2' },
              React.createElement('input', {
                type: 'text',
                value: formData.holeSize.width,
                onChange: (e) => handleHoleSizeChange('width', e.target.value),
                placeholder: 'Width',
                className: 'form-control'
              }),
              React.createElement('input', {
                type: 'text',
                value: formData.holeSize.height,
                onChange: (e) => handleHoleSizeChange('height', e.target.value),
                placeholder: 'Height',
                className: 'form-control'
              })
            )
      ),

      // W/C/F
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', null, 'W/C/F'),
        React.createElement('div', { className: 'flex gap-2' },
          ['Wall', 'Ceiling', 'Floor'].map(type => 
            React.createElement('button', {
              key: type,
              onClick: () => handleInputChange('wcf', type),
              className: `toggle-btn ${formData.wcf === type ? 'active' : ''}`
            }, type)
          )
        )
      ),

      // Products
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', null, 'Products'),
        React.createElement('div', { className: 'flex gap-2 mb-2' },
          React.createElement('button', {
            onClick: () => setShowProductSelector(!showProductSelector),
            className: 'btn btn-success flex-1'
          }, '➕ Add'),
          React.createElement('button', {
            onClick: resetProducts,
            className: 'btn btn-secondary flex-1'
          }, '🔄 Reset')
        ),
        showProductSelector && React.createElement('div', null,
          React.createElement('div', {
            className: 'modal-backdrop',
            onClick: () => setShowProductSelector(false)
          }),
          React.createElement('div', { className: 'modal' },
            React.createElement('div', { className: 'flex-between mb-3' },
              React.createElement('p', { className: 'font-medium' }, 'Select Products'),
              React.createElement('button', {
                onClick: () => setShowProductSelector(false),
                className: 'btn btn-icon'
              }, '✕')
            ),
            React.createElement('div', { className: 'grid grid-cols-2 gap-2 mb-3' },
              database.products.map(product => 
                React.createElement('label', {
                  key: product,
                  className: 'flex items-start gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer'
                },
                  React.createElement('input', {
                    type: 'checkbox',
                    checked: formData.products.includes(product),
                    onChange: () => toggleProduct(product),
                    className: 'checkbox'
                  }),
                  React.createElement('span', { className: 'text-sm' }, product)
                )
              )
            ),
            React.createElement('button', {
              onClick: () => setShowProductSelector(false),
              className: 'btn btn-primary w-full'
            }, 'Apply')
          )
        ),
        formData.products.length > 0 && React.createElement('div', { className: 'flex flex-wrap gap-1' },
          formData.products.map((product, idx) => 
            React.createElement('span', { key: idx, className: 'tag' }, product)
          )
        )
      ),

      // Fire Resistance
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', null, 'Fire Resistance'),
        React.createElement('div', { className: 'toggle-group' },
          database.fireResistance.map(resistance => 
            React.createElement('button', {
              key: resistance,
              onClick: () => handleInputChange('fireResistance', resistance),
              className: `toggle-btn ${formData.fireResistance === resistance ? 'active' : ''}`
            }, resistance)
          )
        )
      ),

      // Sides
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', null, 'Sides'),
        React.createElement('div', { className: 'flex gap-2' },
          ['1', '2'].map(side => 
            React.createElement('button', {
              key: side,
              onClick: () => handleInputChange('sides', side),
              className: `toggle-btn ${formData.sides === side ? 'active' : ''}`
            }, side)
          )
        )
      ),

      // Cut Out Material
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', null, 'Cut Out Material'),
        React.createElement('div', { className: 'toggle-group' },
          database.cutOutMaterials.map(material => 
            React.createElement('button', {
              key: material,
              onClick: () => handleInputChange('cutOutMaterial', material),
              className: `toggle-btn ${formData.cutOutMaterial === material ? 'active' : ''}`
            }, material)
          )
        )
      ),

      // Empty Hole Checkbox
      React.createElement('div', { className: 'checkbox-group' },
        React.createElement('input', {
          type: 'checkbox',
          id: 'isEmpty',
          checked: formData.isEmpty,
          onChange: (e) => handleInputChange('isEmpty', e.target.checked),
          className: 'checkbox'
        }),
        React.createElement('label', {
          htmlFor: 'isEmpty',
          className: 'text-base font-medium cursor-pointer flex-1'
        }, 'Hole is empty')
      ),

      // Action Buttons
      React.createElement('div', { className: 'flex gap-3 mt-4' },
        React.createElement('button', {
          onClick: saveEntry,
          className: 'btn btn-success flex-1'
        }, '💾 Save Entry'),
        React.createElement('button', {
          onClick: exportEntry,
          className: 'btn btn-secondary flex-1'
        }, '📥 Export')
      )
    ),

    // Saved Entries Count
    !showWorkLists && savedEntries.length > 0 && React.createElement('div', { className: 'card mt-4' },
      React.createElement('p', { className: 'text-sm' }, `Total saved entries: ${savedEntries.length}`)
    )
  );
}

// Render the app
ReactDOM.render(React.createElement(FireproofingApp), document.getElementById('root'));
