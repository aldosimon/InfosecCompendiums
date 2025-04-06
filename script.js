// script.js

// --- Configuration ---
const YAML_FILE_PATH = 'data.yaml'; // Path to your single, consolidated YAML data file
const ITEMS_PER_PAGE = 20;          // Number of table rows to display per page

// --- DOM Elements ---
const tableBody = document.getElementById('tableBody');
const paginationContainer = document.getElementById('pagination');
const loadingRow = document.getElementById('loadingRow');
// Get all column filter input elements
const columnFilterInputs = document.querySelectorAll('.column-filter');

// --- State Variables ---
let allData = [];       // Holds all data items fetched from the YAML file
let filteredData = [];  // Holds the data after applying the current filters
let currentPage = 1;    // Tracks the currently displayed page number
// Store the current filter values for each column
let columnFilters = {}; // Example: { subject: 'soft', predicate: '', ... }

// --- Main Function ---

/**
 * Initializes the application by fetching and processing the YAML data.
 */
async function initializeApp() {
    try {
        setStatusMessage("Loading data...");

        const response = await fetch(YAML_FILE_PATH);
        if (!response.ok) {
            throw new Error(`Failed to load YAML file: ${response.status} ${response.statusText}`);
        }
        const yamlText = await response.text();
        const parsedData = jsyaml.load(yamlText);

        if (!Array.isArray(parsedData)) {
            console.error("Error: Parsed YAML data is not an array.", parsedData);
            throw new Error("YAML content could not be parsed into an array.");
        }

        allData = parsedData;
        // Initialize columnFilters object with empty strings for each column
        columnFilterInputs.forEach(input => {
            const columnKey = input.dataset.column;
            if (columnKey) {
                columnFilters[columnKey] = '';
            }
        });

        // Apply initial (empty) filters
        applyColumnFilters();

        // Remove the initial loading message row
        if (loadingRow && loadingRow.parentNode) {
            loadingRow.parentNode.removeChild(loadingRow);
        }

        // Render the first page
        renderTablePage();

        // Add event listeners to column filter inputs
        columnFilterInputs.forEach(input => {
            input.addEventListener('input', handleFilterChange);
        });

    } catch (error) {
        console.error("Initialization failed:", error);
        setStatusMessage(`Error: ${error.message}`);
    }
}

// --- Filtering Logic ---

/**
 * Handles changes in any column filter input field.
 * @param {Event} event - The input event object.
 */
function handleFilterChange(event) {
    const input = event.target;
    const columnKey = input.dataset.column; // Get column name from data attribute
    const filterValue = input.value.toLowerCase().trim(); // Get filter value

    if (columnKey) {
        // Update the stored filter value for this column
        columnFilters[columnKey] = filterValue;
        // Re-apply all filters and re-render the table
        applyColumnFilters();
        currentPage = 1; // Reset to first page after filtering
        renderTablePage();
    }
}

/**
 * Filters the `allData` array based on the current values in `columnFilters`.
 */
function applyColumnFilters() {
    filteredData = allData.filter(item => {
        // Check if the item matches ALL active column filters
        for (const columnKey in columnFilters) {
            const filterValue = columnFilters[columnKey];
            // If a filter is set for this column, check if the item matches
            if (filterValue) {
                const itemValue = String(item[columnKey] || '').toLowerCase(); // Get item's value for this column, handle undefined/null
                if (!itemValue.includes(filterValue)) {
                    return false; // Item doesn't match this filter, exclude it
                }
            }
        }
        return true; // Item matches all active filters (or no filters are active)
    });
}


// --- Rendering Functions ---

/**
 * Renders a single page of the table based on the current filter and page number.
 */
function renderTablePage() {
    tableBody.innerHTML = ''; // Clear existing content

    if (filteredData.length === 0) {
        setStatusMessage("No matching entries found.");
        renderPagination();
        return;
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredData.length);
    const pageData = filteredData.slice(startIndex, endIndex);

    pageData.forEach(item => {
        const row = tableBody.insertRow();
        // Use the keys from columnFilters to ensure order and inclusion
        // (Assumes columnFilters is initialized with all relevant keys)
        Object.keys(columnFilters).forEach(colKey => {
            const cell = row.insertCell();
            const value = item[colKey] || '';

            if (colKey === 'url' && value) {
                try {
                    const url = new URL(value);
                    const link = document.createElement('a');
                    link.href = url.href;
                    link.textContent = url.href;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    cell.appendChild(link);
                } catch (_) {
                    cell.textContent = value;
                }
            } else {
                cell.textContent = value;
            }
        });
    });

    renderPagination(); // Update pagination controls
}

/**
 * Renders the pagination controls (Previous/Next buttons, page info).
 */
function renderPagination() {
    paginationContainer.innerHTML = ''; // Clear existing controls
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

    if (totalPages <= 1) return; // No pagination needed for 0 or 1 page

    // Create "Previous" button
    const prevButton = document.createElement('button');
    prevButton.textContent = '‹ Previous';
    prevButton.disabled = (currentPage === 1);
    prevButton.title = "Go to previous page";
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTablePage();
            window.scrollTo(0, 0); // Scroll to top
        }
    });
    paginationContainer.appendChild(prevButton);

    // Display page info
    const pageInfo = document.createElement('span');
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    pageInfo.title = `Total items: ${filteredData.length}`;
    paginationContainer.appendChild(pageInfo);

    // Create "Next" button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next ›';
    nextButton.disabled = (currentPage === totalPages);
    nextButton.title = "Go to next page";
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderTablePage();
            window.scrollTo(0, 0); // Scroll to top
        }
    });
    paginationContainer.appendChild(nextButton);
}

// --- Utility Functions ---

/**
 * Displays a message (e.g., loading, error, no results) in the table body.
 * @param {string} message - The message text to display.
 */
function setStatusMessage(message) {
    tableBody.innerHTML = ''; // Clear table body
    const row = tableBody.insertRow();
    const cell = row.insertCell();
    // Determine colspan based on the number of filter inputs
    cell.colSpan = Object.keys(columnFilters).length || 7; // Use filter keys count or default
    cell.textContent = message;
    cell.className = 'status-message';
}

// --- Event Listeners ---

// Run initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);
