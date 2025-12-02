// Schema Control Page JavaScript

(function() {
  'use strict';

  // Mock schema data - Backend'den gelecek gerçek verilerle değiştirilecek
  const mockSchemaData = {
    expectedSchema: {
      tables: [
        {
          name: 'users',
          columns: [
            { name: 'id', type: 'INTEGER', primaryKey: true },
            { name: 'username', type: 'VARCHAR(50)', nullable: false },
            { name: 'email', type: 'VARCHAR(100)', nullable: false },
            { name: 'password_hash', type: 'VARCHAR(255)', nullable: false },
            { name: 'created_at', type: 'TIMESTAMP', nullable: false },
            { name: 'updated_at', type: 'TIMESTAMP', nullable: true }
          ]
        },
        {
          name: 'products',
          columns: [
            { name: 'id', type: 'INTEGER', primaryKey: true },
            { name: 'name', type: 'VARCHAR(200)', nullable: false },
            { name: 'description', type: 'TEXT', nullable: true },
            { name: 'price', type: 'DECIMAL(10,2)', nullable: false },
            { name: 'stock', type: 'INTEGER', nullable: false },
            { name: 'category_id', type: 'INTEGER', nullable: false },
            { name: 'created_at', type: 'TIMESTAMP', nullable: false }
          ]
        },
        {
          name: 'orders',
          columns: [
            { name: 'id', type: 'INTEGER', primaryKey: true },
            { name: 'user_id', type: 'INTEGER', nullable: false },
            { name: 'total_amount', type: 'DECIMAL(10,2)', nullable: false },
            { name: 'status', type: 'VARCHAR(20)', nullable: false },
            { name: 'created_at', type: 'TIMESTAMP', nullable: false },
            { name: 'shipped_at', type: 'TIMESTAMP', nullable: true }
          ]
        },
        {
          name: 'categories',
          columns: [
            { name: 'id', type: 'INTEGER', primaryKey: true },
            { name: 'name', type: 'VARCHAR(100)', nullable: false },
            { name: 'slug', type: 'VARCHAR(100)', nullable: false },
            { name: 'description', type: 'TEXT', nullable: true }
          ]
        }
      ]
    },
    actualSchema: {
      tables: [
        {
          name: 'users',
          columns: [
            { name: 'id', type: 'INTEGER' },
            { name: 'username', type: 'VARCHAR(50)' },
            { name: 'email', type: 'VARCHAR(100)' },
            { name: 'password_hash', type: 'VARCHAR(255)' },
            { name: 'created_at', type: 'TIMESTAMP' }
            // updated_at eksik
          ]
        },
        {
          name: 'products',
          columns: [
            { name: 'id', type: 'INTEGER' },
            { name: 'name', type: 'VARCHAR(200)' },
            { name: 'description', type: 'TEXT' },
            { name: 'price', type: 'DECIMAL(10,2)' },
            { name: 'stock', type: 'INTEGER' },
            { name: 'category_id', type: 'INTEGER' },
            { name: 'created_at', type: 'TIMESTAMP' }
          ]
        },
        {
          name: 'orders',
          columns: [
            { name: 'id', type: 'INTEGER' },
            { name: 'user_id', type: 'INTEGER' },
            { name: 'total_amount', type: 'DECIMAL(10,2)' },
            { name: 'status', type: 'VARCHAR(20)' },
            { name: 'created_at', type: 'TIMESTAMP' }
            // shipped_at eksik
          ]
        },
        {
          name: 'logs',
          columns: [
            { name: 'id', type: 'INTEGER' },
            { name: 'message', type: 'TEXT' },
            { name: 'level', type: 'VARCHAR(20)' },
            { name: 'created_at', type: 'TIMESTAMP' }
          ]
        }
        // categories tablosu eksik
      ]
    }
  };

  let currentFilter = 'all';
  let searchQuery = '';

  // Initialize page
  function initPage() {
    const comparison = compareSchemas(mockSchemaData.expectedSchema, mockSchemaData.actualSchema);
    renderSummary(comparison);
    renderTables(comparison);
    setupEventListeners();
  }

  // Compare schemas
  function compareSchemas(expected, actual) {
    const comparison = {
      totalExpectedTables: expected.tables.length,
      totalActualTables: actual.tables.length,
      matchedTables: 0,
      missingTables: [],
      extraTables: [],
      tables: []
    };

    const actualTableMap = {};
    actual.tables.forEach(table => {
      actualTableMap[table.name] = table;
    });

    // Check expected tables
    expected.tables.forEach(expectedTable => {
      const actualTable = actualTableMap[expectedTable.name];
      
      if (!actualTable) {
        comparison.missingTables.push(expectedTable.name);
        comparison.tables.push({
          name: expectedTable.name,
          status: 'missing',
          expectedColumns: expectedTable.columns,
          actualColumns: [],
          matchedColumns: [],
          missingColumns: expectedTable.columns.map(c => c.name),
          extraColumns: []
        });
      } else {
        comparison.matchedTables++;
        const columnComparison = compareColumns(expectedTable.columns, actualTable.columns);
        comparison.tables.push({
          name: expectedTable.name,
          status: columnComparison.missingColumns.length > 0 ? 'partial' : 'matched',
          expectedColumns: expectedTable.columns,
          actualColumns: actualTable.columns,
          ...columnComparison
        });
        delete actualTableMap[expectedTable.name];
      }
    });

    // Check extra tables
    Object.values(actualTableMap).forEach(extraTable => {
      comparison.extraTables.push(extraTable.name);
      comparison.tables.push({
        name: extraTable.name,
        status: 'extra',
        expectedColumns: [],
        actualColumns: extraTable.columns,
        matchedColumns: [],
        missingColumns: [],
        extraColumns: extraTable.columns.map(c => c.name)
      });
    });

    // Calculate totals
    comparison.totalColumns = expected.tables.reduce((sum, table) => sum + table.columns.length, 0);
    comparison.missingColumns = comparison.tables.reduce((sum, table) => sum + table.missingColumns.length, 0);

    return comparison;
  }

  // Compare columns
  function compareColumns(expectedColumns, actualColumns) {
    const actualColumnMap = {};
    actualColumns.forEach(col => {
      actualColumnMap[col.name] = col;
    });

    const matched = [];
    const missing = [];

    expectedColumns.forEach(expectedCol => {
      if (actualColumnMap[expectedCol.name]) {
        matched.push(expectedCol.name);
        delete actualColumnMap[expectedCol.name];
      } else {
        missing.push(expectedCol.name);
      }
    });

    const extra = Object.keys(actualColumnMap);

    return {
      matchedColumns: matched,
      missingColumns: missing,
      extraColumns: extra
    };
  }

  // Render summary
  function renderSummary(comparison) {
    const totalTablesEl = document.getElementById('total-tables');
    const totalColumnsEl = document.getElementById('total-columns');
    const matchedTablesEl = document.getElementById('matched-tables');
    const missingTablesEl = document.getElementById('missing-tables');
    const missingColumnsEl = document.getElementById('missing-columns');

    if (totalTablesEl) totalTablesEl.textContent = comparison.totalExpectedTables;
    if (totalColumnsEl) totalColumnsEl.textContent = comparison.totalColumns;
    if (matchedTablesEl) matchedTablesEl.textContent = comparison.matchedTables;
    if (missingTablesEl) missingTablesEl.textContent = comparison.missingTables.length;
    if (missingColumnsEl) missingColumnsEl.textContent = comparison.missingColumns;
  }

  // Render tables
  function renderTables(comparison) {
    const container = document.getElementById('schema-tables');
    if (!container) return;

    container.innerHTML = '';

    let filteredTables = comparison.tables;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredTables = filteredTables.filter(table => 
        table.name.toLowerCase().includes(query) ||
        table.expectedColumns.some(col => col.name.toLowerCase().includes(query)) ||
        table.actualColumns.some(col => col.name.toLowerCase().includes(query))
      );
    }

    // Apply status filter
    if (currentFilter !== 'all') {
      filteredTables = filteredTables.filter(table => {
        if (currentFilter === 'matched') return table.status === 'matched';
        if (currentFilter === 'missing') return table.status === 'missing' || table.status === 'partial';
        if (currentFilter === 'extra') return table.status === 'extra';
        return true;
      });
    }

    filteredTables.forEach(table => {
      const card = createTableCard(table);
      container.appendChild(card);
    });
  }

  // Create table card
  function createTableCard(table) {
    const card = document.createElement('div');
    card.className = `schema-table-card ${table.status}`;

    const statusText = getStatusText(table.status);
    const allColumns = [...table.expectedColumns, ...table.actualColumns.filter(ac => 
      !table.expectedColumns.some(ec => ec.name === ac.name)
    )];

    card.innerHTML = `
      <div class="table-header">
        <div class="table-title-row">
          <div class="table-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
              <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
            </svg>
          </div>
          <div class="table-name">${table.name}</div>
        </div>
        <div class="table-status">${statusText}</div>
      </div>

      <div class="table-stats">
        <div class="table-stat">
          <div class="table-stat-label">Expected</div>
          <div class="table-stat-value">${table.expectedColumns.length}</div>
        </div>
        <div class="table-stat">
          <div class="table-stat-label">Actual</div>
          <div class="table-stat-value">${table.actualColumns.length}</div>
        </div>
        <div class="table-stat">
          <div class="table-stat-label">Matched</div>
          <div class="table-stat-value">${table.matchedColumns.length}</div>
        </div>
        ${table.missingColumns.length > 0 ? `
          <div class="table-stat">
            <div class="table-stat-label">Missing</div>
            <div class="table-stat-value">${table.missingColumns.length}</div>
          </div>
        ` : ''}
        ${table.extraColumns.length > 0 ? `
          <div class="table-stat">
            <div class="table-stat-label">Extra</div>
            <div class="table-stat-value">${table.extraColumns.length}</div>
          </div>
        ` : ''}
      </div>

      <div class="table-columns">
        ${allColumns.map(col => {
          const isMatched = table.matchedColumns.includes(col.name);
          const isMissing = table.missingColumns.includes(col.name);
          const isExtra = table.extraColumns.includes(col.name);
          
          let status = 'matched';
          if (isMissing) status = 'missing';
          else if (isExtra) status = 'extra';

          return `
            <div class="column-item ${status}">
              <div class="column-info">
                <div class="column-name">${col.name}</div>
                <div class="column-type">${col.type}</div>
              </div>
              <div class="column-status">
                ${getColumnStatusIcon(status)}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    return card;
  }

  // Get status text
  function getStatusText(status) {
    const texts = {
      'matched': 'Matched',
      'missing': 'Missing',
      'partial': 'Partial',
      'extra': 'Extra'
    };
    return texts[status] || status;
  }

  // Get column status icon
  function getColumnStatusIcon(status) {
    if (status === 'matched') {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
    } else if (status === 'missing') {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
    } else {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      `;
    }
  }

  // Setup event listeners
  function setupEventListeners() {
    const searchInput = document.getElementById('schema-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        const comparison = compareSchemas(mockSchemaData.expectedSchema, mockSchemaData.actualSchema);
        renderTables(comparison);
      });
    }

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        const comparison = compareSchemas(mockSchemaData.expectedSchema, mockSchemaData.actualSchema);
        renderTables(comparison);
      });
    });
  }

  // Public API - Backend'den veri geldiğinde kullanılacak
  window.updateSchemaData = function(expectedSchema, actualSchema) {
    const comparison = compareSchemas(expectedSchema, actualSchema);
    renderSummary(comparison);
    renderTables(comparison);
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
  } else {
    initPage();
  }

})();

