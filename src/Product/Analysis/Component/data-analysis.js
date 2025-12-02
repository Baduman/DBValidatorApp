// Data Analysis Page JavaScript

(function() {
  'use strict';

  // Mock data - Backend'den gelecek gerçek verilerle değiştirilecek
  // LEFT/RIGHT JOIN ile birleştirilmiş sorgu sonuçları simülasyonu
  const mockData = [
    {
      id: 1,
      username: 'john_doe',
      email: 'john@example.com',
      product_name: 'Laptop Pro 15',
      product_price: 1299.99,
      order_id: 1001,
      order_total: 1299.99,
      order_status: 'completed',
      order_date: '2024-01-15',
      category_name: 'Electronics'
    },
    {
      id: 2,
      username: 'jane_smith',
      email: 'jane@example.com',
      product_name: 'Wireless Mouse',
      product_price: 29.99,
      order_id: 1002,
      order_total: 29.99,
      order_status: 'pending',
      order_date: '2024-01-16',
      category_name: 'Accessories'
    },
    {
      id: 3,
      username: 'bob_wilson',
      email: 'bob@example.com',
      product_name: 'Mechanical Keyboard',
      product_price: 149.99,
      order_id: 1003,
      order_total: 149.99,
      order_status: 'shipped',
      order_date: '2024-01-17',
      category_name: 'Accessories'
    },
    {
      id: 4,
      username: 'alice_brown',
      email: 'alice@example.com',
      product_name: 'USB-C Hub',
      product_price: 79.99,
      order_id: 1004,
      order_total: 79.99,
      order_status: 'completed',
      order_date: '2024-01-18',
      category_name: 'Accessories'
    },
    {
      id: 5,
      username: 'charlie_davis',
      email: 'charlie@example.com',
      product_name: 'Monitor 27"',
      product_price: 399.99,
      order_id: 1005,
      order_total: 399.99,
      order_status: 'pending',
      order_date: '2024-01-19',
      category_name: 'Electronics'
    },
    {
      id: 6,
      username: 'diana_miller',
      email: 'diana@example.com',
      product_name: 'Webcam HD',
      product_price: 59.99,
      order_id: 1006,
      order_total: 59.99,
      order_status: 'completed',
      order_date: '2024-01-20',
      category_name: 'Accessories'
    },
    {
      id: 7,
      username: 'edward_taylor',
      email: 'edward@example.com',
      product_name: 'SSD 1TB',
      product_price: 89.99,
      order_id: 1007,
      order_total: 89.99,
      order_status: 'shipped',
      order_date: '2024-01-21',
      category_name: 'Storage'
    },
    {
      id: 8,
      username: 'fiona_anderson',
      email: 'fiona@example.com',
      product_name: 'RAM 16GB',
      product_price: 129.99,
      order_id: 1008,
      order_total: 129.99,
      order_status: 'completed',
      order_date: '2024-01-22',
      category_name: 'Components'
    },
    {
      id: 9,
      username: 'george_martin',
      email: 'george@example.com',
      product_name: 'Graphics Card',
      product_price: 599.99,
      order_id: 1009,
      order_total: 599.99,
      order_status: 'pending',
      order_date: '2024-01-23',
      category_name: 'Components'
    },
    {
      id: 10,
      username: 'helen_white',
      email: 'helen@example.com',
      product_name: 'Power Supply 750W',
      product_price: 119.99,
      order_id: 1010,
      order_total: 119.99,
      order_status: 'completed',
      order_date: '2024-01-24',
      category_name: 'Components'
    },
    {
      id: 11,
      username: 'ivan_jones',
      email: 'ivan@example.com',
      product_name: 'Motherboard',
      product_price: 249.99,
      order_id: 1011,
      order_total: 249.99,
      order_status: 'shipped',
      order_date: '2024-01-25',
      category_name: 'Components'
    },
    {
      id: 12,
      username: 'julia_garcia',
      email: 'julia@example.com',
      product_name: 'CPU Cooler',
      product_price: 79.99,
      order_id: 1012,
      order_total: 79.99,
      order_status: 'completed',
      order_date: '2024-01-26',
      category_name: 'Components'
    },
    {
      id: 13,
      username: 'kevin_lee',
      email: 'kevin@example.com',
      product_name: 'Case ATX',
      product_price: 149.99,
      order_id: 1013,
      order_total: 149.99,
      order_status: 'pending',
      order_date: '2024-01-27',
      category_name: 'Cases'
    },
    {
      id: 14,
      username: 'lisa_thomas',
      email: 'lisa@example.com',
      product_name: 'Cable Management',
      product_price: 19.99,
      order_id: 1014,
      order_total: 19.99,
      order_status: 'completed',
      order_date: '2024-01-28',
      category_name: 'Accessories'
    },
    {
      id: 15,
      username: 'michael_jackson',
      email: 'michael@example.com',
      product_name: 'RGB Strip',
      product_price: 34.99,
      order_id: 1015,
      order_total: 34.99,
      order_status: 'shipped',
      order_date: '2024-01-29',
      category_name: 'Accessories'
    },
    {
      id: 16,
      username: 'nancy_harris',
      email: 'nancy@example.com',
      product_name: 'Fan 120mm',
      product_price: 14.99,
      order_id: 1016,
      order_total: 14.99,
      order_status: 'completed',
      order_date: '2024-01-30',
      category_name: 'Cooling'
    },
    {
      id: 17,
      username: 'oscar_clark',
      email: 'oscar@example.com',
      product_name: 'Thermal Paste',
      product_price: 9.99,
      order_id: 1017,
      order_total: 9.99,
      order_status: 'completed',
      order_date: '2024-02-01',
      category_name: 'Accessories'
    },
    {
      id: 18,
      username: 'patricia_lewis',
      email: 'patricia@example.com',
      product_name: 'SATA Cable',
      product_price: 7.99,
      order_id: 1018,
      order_total: 7.99,
      order_status: 'pending',
      order_date: '2024-02-02',
      category_name: 'Accessories'
    },
    {
      id: 19,
      username: 'quinn_walker',
      email: 'quinn@example.com',
      product_name: 'M.2 SSD 500GB',
      product_price: 69.99,
      order_id: 1019,
      order_total: 69.99,
      order_status: 'shipped',
      order_date: '2024-02-03',
      category_name: 'Storage'
    },
    {
      id: 20,
      username: 'rachel_hall',
      email: 'rachel@example.com',
      product_name: 'External HDD 2TB',
      product_price: 89.99,
      order_id: 1020,
      order_total: 89.99,
      order_status: 'completed',
      order_date: '2024-02-04',
      category_name: 'Storage'
    },
    {
      id: 21,
      username: 'samuel_young',
      email: 'samuel@example.com',
      product_name: 'USB Flash 64GB',
      product_price: 12.99,
      order_id: 1021,
      order_total: 12.99,
      order_status: 'completed',
      order_date: '2024-02-05',
      category_name: 'Storage'
    },
    {
      id: 22,
      username: 'tina_king',
      email: 'tina@example.com',
      product_name: 'Network Card',
      product_price: 39.99,
      order_id: 1022,
      order_total: 39.99,
      order_status: 'pending',
      order_date: '2024-02-06',
      category_name: 'Networking'
    },
    {
      id: 23,
      username: 'ulysses_wright',
      email: 'ulysses@example.com',
      product_name: 'WiFi Adapter',
      product_price: 24.99,
      order_id: 1023,
      order_total: 24.99,
      order_status: 'shipped',
      order_date: '2024-02-07',
      category_name: 'Networking'
    },
    {
      id: 24,
      username: 'victoria_lopez',
      email: 'victoria@example.com',
      product_name: 'Ethernet Cable',
      product_price: 8.99,
      order_id: 1024,
      order_total: 8.99,
      order_status: 'completed',
      order_date: '2024-02-08',
      category_name: 'Networking'
    },
    {
      id: 25,
      username: 'william_hill',
      email: 'william@example.com',
      product_name: 'Router WiFi 6',
      product_price: 199.99,
      order_id: 1025,
      order_total: 199.99,
      order_status: 'pending',
      order_date: '2024-02-09',
      category_name: 'Networking'
    }
  ];

  let currentData = [...mockData];
  let filteredData = [...mockData];
  let currentPage = 1;
  let pageSize = 25;
  let sortColumn = null;
  let sortDirection = 'asc';
  let searchQuery = '';

  // Column definitions
  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'username', label: 'User', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'product_name', label: 'Product', sortable: true },
    { key: 'product_price', label: 'Price', sortable: true, format: 'currency' },
    { key: 'order_id', label: 'Order ID', sortable: true },
    { key: 'order_total', label: 'Total', sortable: true, format: 'currency' },
    { key: 'order_status', label: 'Status', sortable: true, format: 'status' },
    { key: 'order_date', label: 'Date', sortable: true, format: 'date' },
    { key: 'category_name', label: 'Category', sortable: true }
  ];

  // Initialize page
  function initPage() {
    renderTable();
    setupEventListeners();
    updatePagination();
  }

  // Render table
  function renderTable() {
    const headerRow = document.getElementById('table-header-row');
    const tbody = document.getElementById('table-body');
    
    if (!headerRow || !tbody) return;

    // Render header
    headerRow.innerHTML = columns.map(col => {
      let classes = col.sortable ? 'sortable' : '';
      if (sortColumn === col.key) {
        classes += ` sort-${sortDirection}`;
      }
      return `
        <th class="${classes.trim()}" 
            data-column="${col.key}">
          ${col.label}
        </th>
      `;
    }).join('');

    // Calculate pagination
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = filteredData.slice(startIndex, endIndex);

    // Render body
    tbody.innerHTML = pageData.map(row => `
      <tr>
        ${columns.map(col => {
          let value = row[col.key];
          
          if (col.format === 'currency') {
            value = formatCurrency(value);
          } else if (col.format === 'date') {
            value = formatDate(value);
          } else if (col.format === 'status') {
            value = formatStatus(value);
          }
          
          return `<td>${value || '-'}</td>`;
        }).join('')}
      </tr>
    `).join('');

    // Update info
    const totalRowsEl = document.getElementById('total-rows');
    const showingRangeEl = document.getElementById('showing-range');
    
    if (totalRowsEl) totalRowsEl.textContent = filteredData.length;
    
    if (showingRangeEl && filteredData.length > 0) {
      const start = startIndex + 1;
      const end = Math.min(endIndex, filteredData.length);
      showingRangeEl.textContent = `${start}-${end}`;
    } else if (showingRangeEl) {
      showingRangeEl.textContent = '0-0';
    }
  }

  // Format currency
  function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  }

  // Format date
  function formatDate(value) {
    return new Date(value).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Format status
  function formatStatus(value) {
    const statusMap = {
      'completed': { text: 'Completed', class: 'status-completed' },
      'pending': { text: 'Pending', class: 'status-pending' },
      'shipped': { text: 'Shipped', class: 'status-shipped' }
    };
    
    const status = statusMap[value] || { text: value, class: '' };
    return `<span class="status-badge ${status.class}">${status.text}</span>`;
  }

  // Sort data
  function sortData(columnKey) {
    if (sortColumn === columnKey) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn = columnKey;
      sortDirection = 'asc';
    }

    filteredData.sort((a, b) => {
      let aVal = a[columnKey];
      let bVal = b[columnKey];

      // Handle null/undefined
      if (aVal == null) aVal = '';
      if (bVal == null) bVal = '';

      // Handle numbers
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      // Handle strings
      aVal = String(aVal).toLowerCase();
      bVal = String(bVal).toLowerCase();

      if (sortDirection === 'asc') {
        return aVal.localeCompare(bVal);
      } else {
        return bVal.localeCompare(aVal);
      }
    });

    currentPage = 1;
    renderTable();
    updatePagination();
  }

  // Filter data
  function filterData() {
    if (!searchQuery) {
      filteredData = [...currentData];
    } else {
      const query = searchQuery.toLowerCase();
      filteredData = currentData.filter(row => {
        return columns.some(col => {
          const value = row[col.key];
          return value != null && String(value).toLowerCase().includes(query);
        });
      });
    }

    // Apply current sort
    if (sortColumn) {
      const column = columns.find(c => c.key === sortColumn);
      if (column && column.sortable) {
        filteredData.sort((a, b) => {
          let aVal = a[sortColumn];
          let bVal = b[sortColumn];
          if (aVal == null) aVal = '';
          if (bVal == null) bVal = '';
          if (typeof aVal === 'number' && typeof bVal === 'number') {
            return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
          }
          aVal = String(aVal).toLowerCase();
          bVal = String(bVal).toLowerCase();
          return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        });
      }
    }

    currentPage = 1;
    renderTable();
    updatePagination();
  }

  // Update pagination
  function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / pageSize);
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const currentPageEl = document.getElementById('current-page');
    const totalPagesEl = document.getElementById('total-pages');

    if (!prevBtn || !nextBtn || !currentPageEl || !totalPagesEl) return;

    // Update buttons
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;

    // Update page info
    currentPageEl.textContent = currentPage;
    totalPagesEl.textContent = totalPages || 1;
  }

  // Setup event listeners
  function setupEventListeners() {
    // Search
    const searchInput = document.getElementById('table-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        filterData();
      });
    }

    // Sort - Event delegation for dynamically added headers
    const table = document.getElementById('data-table');
    if (table) {
      table.addEventListener('click', (e) => {
        const th = e.target.closest('th');
        if (th && th.classList.contains('sortable')) {
          const columnKey = th.dataset.column;
          const column = columns.find(c => c.key === columnKey);
          if (column && column.sortable) {
            sortData(columnKey);
          }
        }
      });
    }

    // Pagination
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageSizeSelect = document.getElementById('page-size');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          renderTable();
          updatePagination();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredData.length / pageSize);
        if (currentPage < totalPages) {
          currentPage++;
          renderTable();
          updatePagination();
        }
      });
    }

    if (pageSizeSelect) {
      pageSizeSelect.addEventListener('change', (e) => {
        pageSize = parseInt(e.target.value);
        currentPage = 1;
        renderTable();
        updatePagination();
      });
    }

    // Export buttons
    const exportCsvBtn = document.getElementById('export-csv');
    const exportExcelBtn = document.getElementById('export-excel');

    if (exportCsvBtn) {
      exportCsvBtn.addEventListener('click', () => {
        console.log('[Data Analysis] CSV export clicked');
        // TODO: Implement CSV export
      });
    }

    if (exportExcelBtn) {
      exportExcelBtn.addEventListener('click', () => {
        console.log('[Data Analysis] Excel export clicked');
        // TODO: Implement Excel export
      });
    }
  }

  // Public API - Backend'den veri geldiğinde kullanılacak
  window.updateAnalysisData = function(newData) {
    currentData = newData;
    filteredData = [...newData];
    currentPage = 1;
    filterData();
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
  } else {
    initPage();
  }

})();

