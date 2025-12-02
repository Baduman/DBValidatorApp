// Detailed Test Results Page JavaScript

(function() {
  'use strict';

  // Mock test data - Will be replaced with real data from backend
  const mockTestData = {
    database: 'sample_database.db',
    testDate: new Date().toLocaleString('en-US'),
    testDuration: '2.34 seconds',
    overallStatus: 'warning', // 'success', 'warning', 'error'
    tests: [
      {
        id: 'schema-control',
        name: 'Schema Control',
        status: 'success', // 'success', 'warning', 'error'
        description: 'Database schema structure checked. All tables and columns are in correct structure.',
        stats: {
          totalTables: 12,
          totalColumns: 45,
          checkedItems: 45
        },
        errors: [],
        warnings: []
      },
      {
        id: 'structure-control',
        name: 'Structure Control',
        status: 'success',
        description: 'Database structural integrity checked. All foreign keys and constraints are correct.',
        stats: {
          foreignKeys: 8,
          constraints: 15,
          checkedItems: 23
        },
        errors: [],
        warnings: []
      },
      {
        id: 'whitespace-control',
        name: 'Whitespace Control',
        status: 'warning',
        description: 'Unnecessary whitespaces detected in database. Cleanup recommended for some fields.',
        stats: {
          totalFields: 1200,
          whitespaceFound: 23,
          cleanedFields: 0
        },
        errors: [],
        warnings: [
          'Table: users, Column: email - Unnecessary whitespace found in 5 records',
          'Table: products, Column: description - Unnecessary whitespace found in 12 records',
          'Table: orders, Column: notes - Unnecessary whitespace found in 6 records'
        ]
      },
      {
        id: 'parameter-control',
        name: 'Parameter Control',
        status: 'error',
        description: 'Some parameters are missing or incorrectly configured. Fix required.',
        stats: {
          totalParameters: 35,
          validParameters: 28,
          invalidParameters: 7
        },
        errors: [
          'Parameter: max_connections - Value undefined',
          'Parameter: timeout - Invalid format (numeric value expected)',
          'Parameter: retry_count - Missing parameter'
        ],
        warnings: [
          'Parameter: cache_size - Below recommended value',
          'Parameter: pool_size - Using default value'
        ]
      },
      {
        id: 'type-json-control',
        name: 'Type-based Parameter JSON Control',
        status: 'warning',
        description: 'Type-based parameter JSON structures checked. Some structures have missing elements.',
        stats: {
          totalTypes: 8,
          validTypes: 6,
          invalidTypes: 2
        },
        errors: [],
        warnings: [
          'Type: query_params - "limit" parameter missing in JSON structure',
          'Type: filter_params - "sort" parameter missing in JSON structure'
        ]
      },
      {
        id: 'missing-parameter-control',
        name: 'Missing Parameter Control',
        status: 'error',
        description: 'Critical parameters missing. Database functionality may be affected.',
        stats: {
          requiredParameters: 15,
          foundParameters: 12,
          missingParameters: 3
        },
        errors: [
          'Missing parameter: database_url - Critical parameter not found',
          'Missing parameter: encryption_key - Security parameter missing',
          'Missing parameter: backup_path - Backup path not defined'
        ],
        warnings: []
      }
    ]
  };

  // Initialize page
  function initPage() {
    renderSummary(mockTestData);
    renderTestInfo(mockTestData);
    renderTestDetails(mockTestData.tests);
  }

  // Render summary cards
  function renderSummary(data) {
    const tests = data.tests;
    let passed = 0;
    let warnings = 0;
    let failed = 0;

    tests.forEach(test => {
      if (test.status === 'success') passed++;
      else if (test.status === 'warning') warnings++;
      else if (test.status === 'error') failed++;
    });

    const totalPassedEl = document.getElementById('total-passed');
    const totalWarningsEl = document.getElementById('total-warnings');
    const totalFailedEl = document.getElementById('total-failed');
    const totalTestsEl = document.getElementById('total-tests');

    if (totalPassedEl) totalPassedEl.textContent = passed;
    if (totalWarningsEl) totalWarningsEl.textContent = warnings;
    if (totalFailedEl) totalFailedEl.textContent = failed;
    if (totalTestsEl) totalTestsEl.textContent = tests.length;
  }

  // Render test info
  function renderTestInfo(data) {
    const databaseEl = document.getElementById('test-database');
    const durationEl = document.getElementById('test-duration');
    const dateEl = document.getElementById('test-date');
    const statusEl = document.getElementById('overall-status');

    if (databaseEl) databaseEl.textContent = data.database;
    if (durationEl) durationEl.textContent = data.testDuration;
    if (dateEl) dateEl.textContent = data.testDate;
    
    if (statusEl) {
      statusEl.textContent = getStatusText(data.overallStatus);
      statusEl.className = `test-info-value status-badge ${data.overallStatus}`;
    }
  }

  // Render test details
  function renderTestDetails(tests) {
    const container = document.getElementById('test-details');
    if (!container) return;

    container.innerHTML = '';

    tests.forEach(test => {
      const card = createTestCard(test);
      container.appendChild(card);
    });
  }

  // Create test card
  function createTestCard(test) {
    const card = document.createElement('div');
    card.className = `test-card ${test.status}`;

    const icon = getTestIcon(test.id);
    const statusText = getStatusText(test.status);

    card.innerHTML = `
      <div class="test-card-header">
        <div class="test-card-title-row">
          <div class="test-card-icon">
            ${icon}
          </div>
          <div class="test-card-title">${test.name}</div>
        </div>
        <div class="test-card-status">${statusText}</div>
      </div>
      
      <div class="test-card-description">${test.description}</div>
      
      <div class="test-card-stats">
        ${Object.entries(test.stats).map(([key, value]) => `
          <div class="test-stat">
            <div class="test-stat-label">${formatStatLabel(key)}</div>
            <div class="test-stat-value">${value}</div>
          </div>
        `).join('')}
      </div>
      
      ${test.errors.length > 0 || test.warnings.length > 0 ? `
        <div class="test-card-errors">
          <div class="test-card-errors-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            ${test.errors.length > 0 ? 'Errors' : 'Warnings'}
          </div>
          <div class="error-list">
            ${test.errors.map(error => `
              <div class="error-item">
                <strong>Error:</strong> ${error}
              </div>
            `).join('')}
            ${test.warnings.map(warning => `
              <div class="warning-item">
                <strong>Warning:</strong> ${warning}
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;

    return card;
  }

  // Get test icon
  function getTestIcon(testId) {
    const icons = {
      'schema-control': `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
        </svg>
      `,
      'structure-control': `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="3" x2="9" y2="21"></line>
          <line x1="3" y1="9" x2="21" y2="9"></line>
        </svg>
      `,
      'whitespace-control': `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <line x1="8" y1="10" x2="16" y2="10"></line>
          <line x1="8" y1="14" x2="16" y2="14"></line>
        </svg>
      `,
      'parameter-control': `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"></path>
        </svg>
      `,
      'type-json-control': `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <path d="M9 8h6"></path>
          <path d="M9 12h6"></path>
          <path d="M9 16h4"></path>
        </svg>
      `,
      'missing-parameter-control': `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      `
    };

    return icons[testId] || icons['parameter-control'];
  }

  // Get status text
  function getStatusText(status) {
    const texts = {
      'success': 'Passed',
      'warning': 'Warning',
      'error': 'Failed'
    };
    return texts[status] || status;
  }

  // Format stat label
  function formatStatLabel(key) {
    const labels = {
      'totalTables': 'Total Tables',
      'totalColumns': 'Total Columns',
      'checkedItems': 'Checked',
      'foreignKeys': 'Foreign Keys',
      'constraints': 'Constraints',
      'totalFields': 'Total Fields',
      'whitespaceFound': 'Whitespace Found',
      'cleanedFields': 'Cleaned',
      'totalParameters': 'Total Parameters',
      'validParameters': 'Valid',
      'invalidParameters': 'Invalid',
      'totalTypes': 'Total Types',
      'validTypes': 'Valid Types',
      'invalidTypes': 'Invalid Types',
      'requiredParameters': 'Required',
      'foundParameters': 'Found',
      'missingParameters': 'Missing'
    };
    return labels[key] || key;
  }

  // Public API - Backend'den veri geldiğinde kullanılacak
  window.updateTestResults = function(testData) {
    renderSummary(testData);
    renderTestInfo(testData);
    renderTestDetails(testData.tests);
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
  } else {
    initPage();
  }

})();

