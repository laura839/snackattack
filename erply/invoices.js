document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.getElementById('table-body');
    const filterDropdown = document.getElementById('tablefilter-dropdown'); // Lisatud defineerimine

    const invoices = [
        { 
            type: 'Receipt', 
            date: '21.10.2022', 
            customer: 'Lydia Dias', 
            location: 'Location #12', 
            state: 'IN PROGRESS', 
            total: '129.00 €' 
        },
        { 
            type: 'Receipt', 
            date: '21.10.2022', 
            customer: 'Livia Siphron', 
            location: 'Location #12', 
            state: 'PENDING', 
            total: '4147.20 €' 
        },
        { 
            type: 'Invoice-Waybill', 
            date: '21.10.2022', 
            customer: 'Tatiana George', 
            location: 'Location #12', 
            state: 'SUCCESS', 
            total: '129.00 €' 
        },
        { 
            type: 'Invoice-Waybill', 
            date: '21.10.2022', 
            customer: 'Dulce Lipshutz', 
            location: 'Location #12', 
            state: 'COMPLETE', 
            total: '129.00 €' 
        },
        { 
            type: 'Prepayment inv.', 
            date: '21.10.2022', 
            customer: 'Paityn Philips', 
            location: 'Location #12', 
            state: 'IN PROGRESS', 
            total: '129.00 €' 
        },
        { 
            type: 'Prepayment inv.', 
            date: '21.10.2022', 
            customer: 'Jordyn Mango', 
            location: 'Location #12', 
            state: 'PENDING', 
            total: '129.00 €' 
        },
        { 
            type: 'Receipt', 
            date: '21.10.2022', 
            customer: 'Paityn Workman', 
            location: 'Location #12', 
            state: 'PENDING', 
            total: '129.00 €' 
        }
    ];
    

    function populateTable(filteredInvoices) {
        tableBody.innerHTML = '';
        filteredInvoices.forEach((invoice, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><input type="checkbox" id="invoice-${index}"></td>
                <td>${invoice.type}</td>
                <td>${invoice.date}</td>
                <td>${invoice.customer}</td>
                <td>${invoice.location}</td>
                <td><span class="tag ${invoice.state.replace(' ', '-').toLowerCase()}"><span class="dot"></span>${invoice.state}</span></td>
                <td>${invoice.total}</td>
            `;
            tableBody.appendChild(row);

            const checkbox = document.getElementById(`invoice-${index}`);
            checkbox.addEventListener('change', function () {
                if (this.checked) {
                    row.classList.add('active');
                } else {
                    row.classList.remove('active');
                }
            });
        });
    }

    // Initial population of the table
    populateTable(invoices);

    // Add listener to the "select all" checkbox
    const selectAllCheckbox = document.getElementById('select-all');
    selectAllCheckbox.addEventListener('change', function () {
        const allCheckboxes = tableBody.querySelectorAll('input[type="checkbox"]');
        allCheckboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
            if (this.checked) {
                checkbox.closest('tr').classList.add('active');
            } else {
                checkbox.closest('tr').classList.remove('active');
            }
        });
    });
    
    
    // Customers list
    const customers = [
        'Marathon Oil Corp.',
        'Sealed Air',
        'Southern Company',
        'Atmos Energy',
        'Equifax Inc.',
        'Kansas City Southern',
        'Fidelity National Information Services',
        'Colgate-Palmolive',
        'Air Products & Chemicals Inc',
        'Intuitive Surgical Inc.',
        'Quest Diagnostics',
        'Crown Castle International Corp.',
        'News Corp. Class A',
        'Federal Realty Investment Trust',
        'Humana Inc.'
    ];

    // Function to populate customer list
    function populateCustomerList() {
        const customerList = document.getElementById('customer-list');
        customerList.innerHTML = '';
        customers.forEach(customer => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="dot"></span>${customer}`;
            customerList.appendChild(li);
        });
    }

    // Call the function to populate customer list
    populateCustomerList();

    // Function to filter customers by the clicked letter
    function filterCustomers(letter) {
        const filteredCustomers = customers.filter(customer => customer.startsWith(letter));
        const customerList = document.getElementById('customer-list');
        customerList.innerHTML = '';
        filteredCustomers.forEach(customer => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="dot"></span>${customer}`;
            customerList.appendChild(li);
        });
    }

    // Add event listener to each letter in alphabet filter
    const alphabetFilter = document.querySelector('.alphabet-filter');
    alphabetFilter.addEventListener('click', function(event) {
        if (event.target.tagName === 'SPAN') {
            const letter = event.target.textContent;
            filterCustomers(letter);
        }
    });

    // Add event listener to the filter dropdown
    filterDropdown.addEventListener('change', function () {
        const selectedValue = filterDropdown.value;
        const rows = document.querySelectorAll('#table-body tr');
    
        for (let row of rows) {
            const typeCell = row.cells[1]; // Tüübi veerg
            const stateCell = row.cells[5]; // Oleku veerg
    
            if (selectedValue === '') {
                row.style.display = ''; // Näita rida, kui filter pole valitud
            } else {
                const type = typeCell.textContent.trim();
                const state = stateCell.textContent.trim();
    
                if ((selectedValue === 'type-receipt' && type === 'Receipt') ||
                    (selectedValue === 'type-invoice-waybill' && type === 'Invoice-Waybill') ||
                    (selectedValue === 'type-prepayment-inv' && type === 'Prepayment inv.') ||
                    (selectedValue === 'state-in-progress' && state === 'IN PROGRESS') ||
                    (selectedValue === 'state-complete' && state === 'COMPLETE') ||
                    (selectedValue === 'state-pending' && state === 'PENDING')) {
                    row.style.display = ''; // Kuvab rea, kui see vastab filtri valikule
                } else {
                    row.style.display = 'none'; // Peidab rea, kui see ei vasta filtri valikule
                }
            }
        }
    });

    function generateRows(query) {
        const filteredInvoices = invoices.filter(invoice => invoice.customer.toLowerCase().includes(query.toLowerCase()));
    
        // Remove all rows if there are no search results
        if (filteredInvoices.length === 0) {
            invoicesBody.innerHTML = "";
            return;
        }
    
        // Update table rows
        invoicesBody.innerHTML = "";
        filteredInvoices.forEach(invoice => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${invoice.type}</td>
                <td>${invoice.date}</td>
                <td>${invoice.customer}</td>
                <td>${invoice.location}</td>
                <td>${invoice.state}</td>
                <td>${invoice.total}</td>
            `;
            invoicesBody.appendChild(row);
        });
    }

    document.getElementById('search-button').addEventListener('click', function() {
    const searchValue = document.getElementById('tablesearch-bar').value.toLowerCase();
    const filteredInvoices = invoices.filter(invoice => {
        return Object.values(invoice).some(value =>
            value.toString().toLowerCase().includes(searchValue)
        );
    });
    displayTable(filteredInvoices);
});

function displayTable(invoices) {
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '';

    if (invoices.length === 0) {
        tableContainer.innerHTML = '<p>No results found</p>';
        return;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headerRow = document.createElement('tr');
    ['Type', 'Date', 'Customer', 'Location', 'State', 'Total'].forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    invoices.forEach(invoice => {
        const row = document.createElement('tr');
        Object.values(invoice).forEach(text => {
            const td = document.createElement('td');
            td.textContent = text;
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);
}

    
document.getElementById('search-button').addEventListener('click', function() {
    const searchValue = document.getElementById('tablesearch-bar').value.toLowerCase();
    const filteredInvoices = invoices.filter(invoice => {
        return Object.values(invoice).some(value =>
            value.toString().toLowerCase().includes(searchValue)
        );
    });
    populateTable(filteredInvoices); // Call populateTable with filtered results
});
function populateTable(filteredInvoices) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''; // Clear the table body

    if (filteredInvoices.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7">No results found</td></tr>'; // Display message if no results
        return;
    }

    filteredInvoices.forEach((invoice, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" id="invoice-${index}"></td>
            <td>${invoice.type}</td>
            <td>${invoice.date}</td>
            <td>${invoice.customer}</td>
            <td>${invoice.location}</td>
            <td><span class="tag ${invoice.state.replace(' ', '-').toLowerCase()}"><span class="dot"></span>${invoice.state}</span></td>
            <td>${invoice.total}</td>
        `;
        tableBody.appendChild(row);

        const checkbox = document.getElementById(`invoice-${index}`);
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                row.classList.add('active');
            } else {
                row.classList.remove('active');
            }
        });
    });
}

// Initially populate the table with all invoices
populateTable(invoices);



});
