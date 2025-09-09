// Base URL of your API (adjust the URL as needed)
//const apiUrl = 'http://localhost:5250/api/subcategory';

const apiUrl ='https://idealfurniture.runasp.net/api/subcategory';

// Elements
const createSubcategoryBtn = document.getElementById('createSubcategoryBtn');
const SubcategoryNameInput = document.getElementById('SubcategoryName');
const subcategoriesTable = document.getElementById('subcategoriesTable').getElementsByTagName('tbody')[0];
const editSubcategoryForm = document.getElementById('editSubcategoryForm');
const editSubcategoryId = document.getElementById('editSubcategoryId');
const editSubcategoryNameInput = document.getElementById('editSubcategoryName');
const updateSubcategoryBtn = document.getElementById('updateSubcategoryBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');

// Fetch subcategories
async function fetchsubcategories() {
    const response = await fetch(apiUrl);
    const subcategories = await response.json();
    displaysubcategories(subcategories);
}

// Display subcategories
function displaysubcategories(subcategories) {
    subcategoriesTable.innerHTML = '';
    subcategories.forEach(Subcategory => {
        const row = subcategoriesTable.insertRow();
        
            /*<td>${Subcategory.id}</td>
            <td>${Subcategory.name}</td>
            <td>
                <button class="editBtn" onclick="editSubcategory(${Subcategory.id})">Edit</button>
                <button class="deleteBtn" onclick="deleteSubcategory(${Subcategory.id})">Delete</button>
            </td>*/
	
		row.innerHTML = `<ul> <li>
        ${Subcategory.name}
        <span class="actions">
          <a onclick="editSubcategory(${Subcategory.id})" class="edit" title="Edit"><i class="fas fa-edit"></i></a>
          <a onclick="deleteSubcategory(${Subcategory.id})" class="delete" title="Delete"><i class="fas fa-trash-alt"></i></a>
        </span>
      </li>
</ul>
        `;
    });
	
}


async function getnsubcategories() {
  const response = await fetch('your-api-url-here');
  const subcategories = await response.json();

  const tableBody = document.querySelector("#subcategoriesTable tbody");
  tableBody.innerHTML = ""; // Clear existing rows

  subcategories.forEach(Subcategory => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${Subcategory.id}</td>
      <td>${Subcategory.name}</td>
      <td>
        <div class="actions">
          <a href="javascript:void(0)" class="edit" onclick="editSubcategory(${Subcategory.id})">
            <i class="fas fa-edit"></i> Edit
          </a>
          <a href="javascript:void(0)" class="delete" onclick="deleteSubcategory(${Subcategory.id})">
            <i class="fas fa-trash-alt"></i> Delete
          </a>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}


// Create Subcategory
async function createSubcategory() {
    const catId = categoryDropdown.value.trim();
	const SubcategoryName = SubcategoryNameInput.value.trim();
    if (!SubcategoryName) {
        alert('Please enter a Subcategory name.');
        return;
    }

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: SubcategoryName }),
    });

    if (response.ok) {
        alert('Subcategory created successfully!');
        SubcategoryNameInput.value = ''; // Clear input
        fetchsubcategories(); // Refresh Subcategory list
    } else {
        alert('Error creating Subcategory.');
    }
}

// Edit Subcategory
async function editSubcategory(id) {
    // Hide the create form and show the edit form
    createSubcategoryForm.style.display = 'none';
    editSubcategoryForm.style.display = 'block';

    try {
        // Fetch the Subcategory data from the Web API by its ID
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Subcategory not found');
        }

        // Parse the response JSON
        const Subcategory = await response.json();

        // Fill the edit form with the Subcategory data
        editSubcategoryNameInput.value = Subcategory.name; // Corrected to access Subcategory.name
        document.getElementById('categoryDropdown').value = Subcategory.catId;
        document.getElementById('editSubcategoryId').value = Subcategory.id; // Corrected to access Subcategory.id
    } catch (error) {
        console.error('Error fetching Subcategory:', error);
        alert('Error fetching Subcategory data');
    }
}


/*function editSubcategory(Subcategory) {
    // Hide the create form and show the edit form
    createSubcategoryForm.style.display = 'none';
    editSubcategoryForm.style.display = 'block';

    // Fill the edit form with the Subcategory data
    editSubcategoryNameInput.value = Subcategory.name;
    document.getElementById('editSubcategoryId').value = Subcategory.id;
  }*/


// Update Subcategory
async function updateSubcategory() {
    const updatedSubcategoryName = editSubcategoryNameInput.value.trim();
	const updatedSubCatId = document.getElementById('categoryDropdown').value;

    const SubcategoryId = editSubcategoryId.value;

    if (!updatedSubcategoryName) {
        alert('Please enter a Subcategory name.');
        return;
    }

    const response = await fetch(`${apiUrl}/${SubcategoryId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: SubcategoryId, name: updatedSubcategoryName, CatId: updatedSubCatId }),
    });

    if (response.ok) {
        alert('Subcategory updated successfully!');
        editSubcategoryForm.style.display = 'none';
        fetchsubcategories(); // Refresh Subcategory list
    } else {
        alert('Error updating Subcategory.');
    }
}

// Delete Subcategory
async function deleteSubcategory(id) {
	if(confirm('Are you sure! You want to delete?')){
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        alert('Subcategory deleted successfully!');
        fetchsubcategories(); // Refresh Subcategory list
    } else {
        alert('Error deleting Subcategory.');
    }
}
}

// Event Listeners
createSubcategoryBtn.addEventListener('click', createSubcategory);
updateSubcategoryBtn.addEventListener('click', updateSubcategory);
cancelEditBtn.addEventListener('click', () => {
    editSubcategoryForm.style.display = 'none';
});

// Initial Fetch
fetchsubcategories();



        fetch("http://localhost:5250/api/category")
            .then(response => response.json())
            .then(data => {
                const dropdown = document.getElementById("categoryDropdown");
                data.forEach(item => {
                    const option = document.createElement("option");
                    option.value = item.id;
                    option.text = item.name;
                    dropdown.appendChild(option);
                });
            })
            .catch(error => console.error('Error loading categories:', error));
