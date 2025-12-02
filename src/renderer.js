// Basit UI state - sadece sayfa yükleme
const navItems = document.querySelectorAll('.nav-item');
const breadcrumbsEl = document.getElementById('breadcrumbs');
const pageTitleEl = document.getElementById('page-title');
const pageSubtitleEl = document.getElementById('page-subtitle');
const viewRoot = document.getElementById('view-root');

// Sol menü – view switcher
const viewConfigs = {
  'test-run': {
    breadcrumbs: 'Test Run',
    title: 'Configure Test Scenarios',
    subtitle:
      'Select which database and configuration to run tests with. Python backend will use these selections.',
    templatePath: 'Product/Test/Pages/test-run.html',
  },
  'detailed-results': {
    breadcrumbs: 'Detailed Test Results',
    title: 'Detailed Test Results',
    subtitle:
      'View time, row differences, error details and statistics for your executed tests.',
    templatePath: 'Product/Test/Pages/detailed-results.html',
  },
  'schema-control': {
    breadcrumbs: 'Database Schema Control',
    title: 'Check Schema Changes',
    subtitle:
      'Review table, column and index changes from this screen.',
    templatePath: 'Product/Test/Pages/schema-control.html',
  },
  'data-analysis': {
    breadcrumbs: 'Data Analysis',
    title: 'Data Analysis & Statistics',
    subtitle:
      'View data distributions, statistics and anomaly analyses for your queries.',
    templatePath: 'Product/Analysis/Pages/data-analysis.html',
  },
  'report-screen': {
    breadcrumbs: 'Report Screen',
    title: 'Reporting & Export',
    subtitle:
      'Export to CSV / Excel / PDF and generate shareable links.',
    templatePath: 'Product/Test/Pages/report-screen.html',
  },
  settings: {
    breadcrumbs: 'Settings',
    title: 'Application Settings',
    subtitle:
      'Configure theme, connection profiles and backend (Python) integration settings.',
    templatePath: 'Product/Test/Pages/settings.html',
  },
};

async function switchView(viewKey) {
  const config = viewConfigs[viewKey] || viewConfigs['test-run'];

  // Menü active state
  navItems.forEach((item) => {
    if (item.dataset.view === viewKey) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Başlıklar
  if (breadcrumbsEl) breadcrumbsEl.textContent = config.breadcrumbs;
  if (pageTitleEl) pageTitleEl.textContent = config.title;
  if (pageSubtitleEl) pageSubtitleEl.textContent = config.subtitle;

  // Sayfa içeriğini ilgili HTML dosyasından yükle
  if (viewRoot && config.templatePath) {
    try {
      const response = await fetch(config.templatePath);
      let html = await response.text();

      // Test Run sayfası için CSS ve JS'i inject et
      if (viewKey === 'test-run') {
        // CSS'i yükle ve inject et
        try {
          const cssResponse = await fetch('Product/Test/Component/test-run.css');
          const cssText = await cssResponse.text();
          const styleTag = `<style id="test-run-styles">${cssText}</style>`;
          html = styleTag + html;
        } catch (cssErr) {
          console.warn('[UI] CSS yüklenemedi:', cssErr);
        }

        // JS'i yükle ve inject et
        try {
          const jsResponse = await fetch('Product/Test/Component/test-run.js');
          const jsText = await jsResponse.text();
          html = html + `<script>${jsText}</script>`;
        } catch (jsErr) {
          console.warn('[UI] JS yüklenemedi:', jsErr);
        }
      }

      // Detailed Results sayfası için CSS ve JS'i inject et
      if (viewKey === 'detailed-results') {
        // CSS'i yükle ve inject et
        try {
          const cssResponse = await fetch('Product/Test/Component/detailed-results.css');
          const cssText = await cssResponse.text();
          const styleTag = `<style id="detailed-results-styles">${cssText}</style>`;
          html = styleTag + html;
        } catch (cssErr) {
          console.warn('[UI] CSS yüklenemedi:', cssErr);
        }

        // JS'i yükle ve inject et
        try {
          const jsResponse = await fetch('Product/Test/Component/detailed-results.js');
          const jsText = await jsResponse.text();
          html = html + `<script>${jsText}</script>`;
        } catch (jsErr) {
          console.warn('[UI] JS yüklenemedi:', jsErr);
        }
      }

      // Schema Control sayfası için CSS ve JS'i inject et
      if (viewKey === 'schema-control') {
        // CSS'i yükle ve inject et
        try {
          const cssResponse = await fetch('Product/Test/Component/schema-control.css');
          const cssText = await cssResponse.text();
          const styleTag = `<style id="schema-control-styles">${cssText}</style>`;
          html = styleTag + html;
        } catch (cssErr) {
          console.warn('[UI] CSS yüklenemedi:', cssErr);
        }

        // JS'i yükle ve inject et
        try {
          const jsResponse = await fetch('Product/Test/Component/schema-control.js');
          const jsText = await jsResponse.text();
          html = html + `<script>${jsText}</script>`;
        } catch (jsErr) {
          console.warn('[UI] JS yüklenemedi:', jsErr);
        }
      }

      // Data Analysis sayfası için CSS ve JS'i inject et
      if (viewKey === 'data-analysis') {
        // CSS'i yükle ve inject et
        try {
          const cssResponse = await fetch('Product/Analysis/Component/data-analysis.css');
          const cssText = await cssResponse.text();
          const styleTag = `<style id="data-analysis-styles">${cssText}</style>`;
          html = styleTag + html;
        } catch (cssErr) {
          console.warn('[UI] CSS yüklenemedi:', cssErr);
        }

        // JS'i yükle ve inject et
        try {
          const jsResponse = await fetch('Product/Analysis/Component/data-analysis.js');
          const jsText = await jsResponse.text();
          html = html + `<script>${jsText}</script>`;
        } catch (jsErr) {
          console.warn('[UI] JS yüklenemedi:', jsErr);
        }
      }

      // Report Screen sayfası için CSS ve JS'i inject et
      if (viewKey === 'report-screen') {
        // CSS'i yükle ve inject et
        try {
          const cssResponse = await fetch('Product/Test/Component/report-screen.css');
          const cssText = await cssResponse.text();
          const styleTag = `<style id="report-screen-styles">${cssText}</style>`;
          html = styleTag + html;
        } catch (cssErr) {
          console.warn('[UI] CSS yüklenemedi:', cssErr);
        }

        // JS'i yükle ve inject et
        try {
          const jsResponse = await fetch('Product/Test/Component/report-screen.js');
          const jsText = await jsResponse.text();
          html = html + `<script>${jsText}</script>`;
        } catch (jsErr) {
          console.warn('[UI] JS yüklenemedi:', jsErr);
        }
      }

      viewRoot.innerHTML = html;

      // Fonksiyonel özellikler kaldırıldı - sadece görsel tasarım
    } catch (err) {
      console.error('[UI] Sayfa yüklenemedi:', config.templatePath, err);
      viewRoot.innerHTML =
        '<p style=\"color: var(--danger); font-size: 12px\">Sayfa yüklenirken hata oluştu.</p>';
    }
  }

  console.log('[UI] Görünüm değiştirildi:', config.breadcrumbs);
}

if (navItems && navItems.length) {
  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      const viewKey = item.dataset.view;
      switchView(viewKey);
    });
  });
}

// Varsayılan görünüm
switchView('test-run');

// Başlangıç metni


