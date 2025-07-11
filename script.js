var selectedRow = null;

function showForm() {
    document.getElementById("formContainer").style.display = "block";
    document.getElementById("tableContainer").style.display = "none";
}

function hideForm() {
    document.getElementById("formContainer").style.display = "none";
    document.getElementById("tableContainer").style.display = "block";
}

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null) 
            insertNewRecord(formData);
        else 
            updateRecord(formData);
        
        resetForm();
        hideForm(); // Hide form after submission
    }
}

function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["bloodPressure"] = document.getElementById("bloodPressure").value;
    formData["weight"] = document.getElementById("weight").value;
    formData["date"] = document.getElementById("date").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    newRow.insertCell(0).innerHTML = data.fullName;
    newRow.insertCell(1).innerHTML = data.bloodPressure;
    newRow.insertCell(2).innerHTML = data.weight;
    newRow.insertCell(3).innerHTML = data.date;
    newRow.insertCell(4).innerHTML = `<a onClick="onEdit(this)">Edit</a> 
                                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("bloodPressure").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("date").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("bloodPressure").value = selectedRow.cells[1].innerHTML;
    document.getElementById("weight").value = selectedRow.cells[2].innerHTML;
    document.getElementById("date").value = selectedRow.cells[3].innerHTML;
    
    showForm();
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.bloodPressure;
    selectedRow.cells[2].innerHTML = formData.weight;
    selectedRow.cells[3].innerHTML = formData.date;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate() {
    let isValid = true;
    if (document.getElementById("fullName").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}

// Search Functionality
function searchTable() {
    let input = document.getElementById("searchBar").value.toLowerCase();
    let table = document.getElementById("employeeList").getElementsByTagName("tbody")[0];
    let rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        let nameCell = rows[i].getElementsByTagName("td")[0];
        if (nameCell) {
            let nameValue = nameCell.textContent || nameCell.innerText;
            if (nameValue.toLowerCase().indexOf(input) > -1) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}
