// Report Screen Page JavaScript

(function() {
  'use strict';

  // LaTeX Template
  const latexTemplates = {
    default: `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{geometry}
\\usepackage{graphicx}
\\usepackage{booktabs}
\\usepackage{xcolor}
\\usepackage{hyperref}
\\usepackage{fancyhdr}
\\usepackage{lastpage}

\\geometry{margin=2.5cm}
\\hypersetup{
    colorlinks=true,
    linkcolor=blue,
    urlcolor=blue,
    citecolor=blue
}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyhead[L]{\\textbf{Database Validation Report}}
\\fancyhead[R]{\\today}
\\fancyfoot[C]{\\thepage\\ / \\pageref{LastPage}}

\\definecolor{accent}{RGB}{126, 145, 129}
\\definecolor{accentdark}{RGB}{46, 53, 50}

\\begin{document}

\\title{\\textbf{Database Validation Report}}
\\author{DB Validation Team}
\\date{\\today}
\\maketitle

\\section{Executive Summary}
This report presents the results of database validation tests performed on the selected database.

\\section{Test Results}
The following sections detail the test results obtained from the validation process.

\\section{Schema Analysis}
Schema analysis results are presented in this section.

\\section{Data Analysis}
Data analysis findings are documented here.

\\section{Recommendations}
Based on the analysis, the following recommendations are provided.

\\section{Appendix}
Additional information and detailed data are included in the appendix.

\\end{document}`,

    detailed: `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{geometry}
\\usepackage{graphicx}
\\usepackage{booktabs}
\\usepackage{longtable}
\\usepackage{xcolor}
\\usepackage{hyperref}
\\usepackage{fancyhdr}
\\usepackage{lastpage}
\\usepackage{listings}

\\geometry{margin=2cm}
\\hypersetup{
    colorlinks=true,
    linkcolor=blue,
    urlcolor=blue
}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyhead[L]{\\textbf{Detailed Database Validation Report}}
\\fancyhead[R]{\\today}
\\fancyfoot[C]{\\thepage\\ / \\pageref{LastPage}}

\\definecolor{accent}{RGB}{126, 145, 129}

\\begin{document}

\\title{\\Large\\textbf{Detailed Database Validation Report}\\\\
\\large Comprehensive Analysis and Results}
\\author{DB Validation Team}
\\date{\\today}
\\maketitle

\\tableofcontents
\\newpage

\\section{Executive Summary}
\\subsection{Overview}
This comprehensive report provides detailed analysis of database validation tests.

\\subsection{Key Findings}
\\begin{itemize}
    \\item Test execution completed successfully
    \\item Multiple validation checks performed
    \\item Schema integrity verified
    \\item Data quality assessed
\\end{itemize}

\\section{Test Results}
\\subsection{Test Execution Summary}
\\begin{table}[h]
\\centering
\\begin{tabular}{lrr}
\\toprule
\\textbf{Test Category} & \\textbf{Passed} & \\textbf{Failed} \\\\
\\midrule
Schema Control & 1 & 0 \\\\
Structure Control & 1 & 0 \\\\
Whitespace Control & 0 & 1 \\\\
Parameter Control & 0 & 1 \\\\
\\bottomrule
\\end{tabular}
\\caption{Test Results Summary}
\\end{table}

\\section{Schema Analysis}
Detailed schema analysis results are presented in this section.

\\section{Data Analysis}
Comprehensive data analysis findings are documented here.

\\section{Recommendations}
\\begin{enumerate}
    \\item Address identified schema inconsistencies
    \\item Clean up whitespace issues
    \\item Review and fix parameter configurations
    \\item Implement recommended improvements
\\end{enumerate}

\\section{Appendix}
\\subsection{Additional Data}
Additional detailed information is provided in this appendix.

\\end{document}`,

    summary: `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{geometry}
\\usepackage{graphicx}
\\usepackage{booktabs}
\\usepackage{xcolor}
\\usepackage{hyperref}

\\geometry{margin=2.5cm}
\\hypersetup{
    colorlinks=true,
    linkcolor=blue
}

\\definecolor{accent}{RGB}{126, 145, 129}

\\begin{document}

\\title{\\textbf{Database Validation Summary Report}}
\\author{DB Validation Team}
\\date{\\today}
\\maketitle

\\section{Summary}
This report provides a summary of database validation results.

\\section{Key Results}
\\begin{itemize}
    \\item Overall validation status
    \\item Critical findings
    \\item Recommended actions
\\end{itemize}

\\end{document}`
  };

  // Current configuration
  let currentConfig = {
    template: 'default',
    title: 'Database Validation Report',
    author: 'DB Validation Team',
    dateFormat: 'full',
    sections: {
      summary: true,
      'test-results': true,
      'schema-analysis': true,
      'data-analysis': true,
      recommendations: true,
      appendix: true
    }
  };

  // Initialize page
  function initPage() {
    setupEventListeners();
    updatePreview();
  }

  // Setup event listeners
  function setupEventListeners() {
    const templateSelect = document.getElementById('template-select');
    const reportTitle = document.getElementById('report-title');
    const reportAuthor = document.getElementById('report-author');
    const dateFormat = document.getElementById('date-format');
    const refreshPreview = document.getElementById('refresh-preview');
    const exportPdfBtn = document.getElementById('export-pdf-btn');
    const exportLatexBtn = document.getElementById('export-latex-btn');

    if (templateSelect) {
      templateSelect.addEventListener('change', (e) => {
        currentConfig.template = e.target.value;
        updatePreview();
      });
    }

    if (reportTitle) {
      reportTitle.addEventListener('input', (e) => {
        currentConfig.title = e.target.value;
        updatePreview();
      });
    }

    if (reportAuthor) {
      reportAuthor.addEventListener('input', (e) => {
        currentConfig.author = e.target.value;
        updatePreview();
      });
    }

    if (dateFormat) {
      dateFormat.addEventListener('change', (e) => {
        currentConfig.dateFormat = e.target.value;
        updatePreview();
      });
    }

    // Section checkboxes
    const sectionCheckboxes = document.querySelectorAll('.section-checkbox input[type="checkbox"]');
    sectionCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        currentConfig.sections[checkbox.dataset.section] = checkbox.checked;
        updatePreview();
      });
    });

    if (refreshPreview) {
      refreshPreview.addEventListener('click', () => {
        updatePreview();
      });
    }

    if (exportPdfBtn) {
      exportPdfBtn.addEventListener('click', () => {
        exportToPDF();
      });
    }

    if (exportLatexBtn) {
      exportLatexBtn.addEventListener('click', () => {
        exportToLaTeX();
      });
    }
  }

  // Generate LaTeX code
  function generateLaTeX() {
    const template = latexTemplates[currentConfig.template] || latexTemplates.default;
    const dateStr = formatDate(new Date(), currentConfig.dateFormat);
    
    let latex = template
      .replace(/Database Validation Report/g, currentConfig.title)
      .replace(/DB Validation Team/g, currentConfig.author)
      .replace(/\\today/g, dateStr);

    // Remove sections that are not selected
    Object.keys(currentConfig.sections).forEach(section => {
      if (!currentConfig.sections[section]) {
        const sectionMap = {
          'summary': 'Executive Summary',
          'test-results': 'Test Results',
          'schema-analysis': 'Schema Analysis',
          'data-analysis': 'Data Analysis',
          'recommendations': 'Recommendations',
          'appendix': 'Appendix'
        };
        const sectionName = sectionMap[section];
        if (sectionName) {
          // Remove section and its content (simple approach)
          const sectionRegex = new RegExp(`\\\\section\\{${sectionName}\\}[\\s\\S]*?(?=\\\\section|\\\\end\\{document\\})`, 'g');
          latex = latex.replace(sectionRegex, '');
        }
      }
    });

    return latex;
  }

  // Format date
  function formatDate(date, format) {
    const options = {
      full: { year: 'numeric', month: 'long', day: 'numeric' },
      short: { year: 'numeric', month: '2-digit', day: '2-digit' },
      iso: { year: 'numeric', month: '2-digit', day: '2-digit' }
    };

    const opt = options[format] || options.full;
    const formatted = date.toLocaleDateString('en-US', opt);
    
    if (format === 'iso') {
      return formatted.replace(/\//g, '-');
    }
    
    return formatted;
  }

  // Update preview
  function updatePreview() {
    const previewEl = document.getElementById('latex-preview');
    if (previewEl) {
      const latex = generateLaTeX();
      previewEl.textContent = latex;
    }
  }

  // Export to PDF
  async function exportToPDF() {
    try {
      const latex = generateLaTeX();
      
      // Check if electronAPI is available
      if (window.electronAPI && window.electronAPI.generatePDF) {
        const result = await window.electronAPI.generatePDF(latex, currentConfig);
        if (result.success) {
          // LaTeX file is saved, now Python backend needs to compile it
          console.log('[Report] LaTeX file saved:', result.latexPath);
          console.log('[Report] Target PDF path:', result.pdfPath);
          console.log('[Report] LaTeX code:', latex);
          
          // TODO: Call Python backend to compile LaTeX to PDF
          // Python backend will use pdflatex to compile the .tex file
          alert(`LaTeX file generated successfully!\n\nLaTeX file: ${result.latexPath}\nTarget PDF: ${result.pdfPath}\n\nPython backend will compile LaTeX to PDF.`);
        } else {
          alert(`Error generating PDF: ${result.error}`);
        }
      } else {
        // Fallback: Show LaTeX code (backend will handle PDF generation)
        console.log('[Report] LaTeX code generated, sending to backend...');
        console.log('[Report] LaTeX:', latex);
        alert('LaTeX code generated. Backend will compile and generate PDF.\n\nCheck console for LaTeX code.');
      }
    } catch (error) {
      console.error('[Report] Error generating PDF:', error);
      alert('Error generating PDF. Please check console for details.');
    }
  }

  // Export to LaTeX file
  function exportToLaTeX() {
    try {
      const latex = generateLaTeX();
      const blob = new Blob([latex], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report_${Date.now()}.tex`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      console.log('[Report] LaTeX file exported');
    } catch (error) {
      console.error('[Report] Error exporting LaTeX:', error);
      alert('Error exporting LaTeX file. Please check console for details.');
    }
  }

  // Public API - Backend'den veri geldiğinde kullanılacak
  window.updateReportData = function(testData, schemaData, analysisData) {
    // Update LaTeX template with real data
    console.log('[Report] Report data updated:', { testData, schemaData, analysisData });
    updatePreview();
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
  } else {
    initPage();
  }

})();

