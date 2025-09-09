// Base URL of your API (adjust the URL as needed)
const apiUrl = 'http://localhost:5250/api/category';

// Elements
const createCategoryBtn = document.getElementById('createCategoryBtn');
const categoryNameInput = document.getElementById('categoryName');
const categoriesTable = document.getElementById('categoriesTable').getElementsByTagName('tbody')[0];
const editCategoryForm = document.getElementById('editCategoryForm');
const editCategoryId = document.getElementById('editCategoryId');
const editCategoryNameInput = document.getElementById('editCategoryName');
const updateCategoryBtn = document.getElementById('updateCategoryBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');

// Fetch Categories
async function fetchCategories() {
    const response = await fetch(apiUrl);
    const categories = await response.json();
    displayCategories(categories);
}

// Display Categories
function displayCategories(categories) {
    categoriesTable.innerHTML = '';
    categories.forEach(category => {
        const row = categoriesTable.insertRow();
        
            /*<td>${category.id}</td>
            <td>${category.name}</td>
            <td>
                <button class="editBtn" onclick="editCategory(${category.id})">Edit</button>
                <button class="deleteBtn" onclick="deleteCategory(${category.id})">Delete</button>
            </td>*/
	
		row.innerHTML = `<ul> <li>
        ${category.name}
        <span class="actions">
          <a onclick="editCategory(${category.id})" class="edit" title="Edit"><i class="fas fa-edit"></i></a>
          <a onclick="deleteCategory(${category.id})" class="delete" title="Delete"><i class="fas fa-trash-alt"></i></a>
        </span>
      </li>
</ul>
        `;
    });
	
}


async function getnCategories() {
  const response = await fetch('your-api-url-here');
  const categories = await response.json();

  const tableBody = document.querySelector("#categoriesTable tbody");
  tableBody.innerHTML = ""; // Clear existing rows

  categories.forEach(category => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${category.id}</td>
      <td>${category.name}</td>
      <td>
        <div class="actions">
          <a href="javascript:void(0)" class="edit" onclick="editCategory(${category.id})">
            <i class="fas fa-edit"></i> Edit
          </a>
          <a href="javascript:void(0)" class="delete" onclick="deleteCategory(${category.id})">
            <i class="fas fa-trash-alt"></i> Delete
          </a>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}


// Create Category
async function createCategory() {
    const categoryName = categoryNameInput.value.trim();
    if (!categoryName) {
        alert('Please enter a category name.');
        return;
    }

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName }),
    });

    if (response.ok) {
        alert('Category created successfully!');
        categoryNameInput.value = ''; // Clear input
        fetchCategories(); // Refresh category list
    } else {
        alert('Error creating category.');
    }
}

// Edit Category
async function editCategory(id) {
    // Hide the create form and show the edit form
    createCategoryForm.style.display = 'none';
    editCategoryForm.style.display = 'block';

    try {
        // Fetch the category data from the Web API by its ID
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Category not found');
        }

        // Parse the response JSON
        const category = await response.json();

        // Fill the edit form with the category data
        editCategoryNameInput.value = category.name; // Corrected to access category.name
        document.getElementById('editCategoryId').value = category.id; // Corrected to access category.id
    } catch (error) {
        console.error('Error fetching category:', error);
        alert('Error fetching category data');
    }
}


/*function editCategory(category) {
    // Hide the create form and show the edit form
    createCategoryForm.style.display = 'none';
    editCategoryForm.style.display = 'block';

    // Fill the edit form with the category data
    editCategoryNameInput.value = category.name;
    document.getElementById('editCategoryId').value = category.id;
  }*/


// Update Category
async function updateCategory() {
    const updatedCategoryName = editCategoryNameInput.value.trim();
    const categoryId = editCategoryId.value;

    if (!updatedCategoryName) {
        alert('Please enter a category name.');
        return;
    }

    const response = await fetch(`${apiUrl}/${categoryId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: categoryId, name: updatedCategoryName }),
    });

    if (response.ok) {
        alert('Category updated successfully!');
        editCategoryForm.style.display = 'none';
        fetchCategories(); // Refresh category list
    } else {
        alert('Error updating category.');
    }
}

// Delete Category
async function deleteCategory(id) {
	if(confirm('Are you sure! You want to delete?')){
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        alert('Category deleted successfully!');
        fetchCategories(); // Refresh category list
    } else {
        alert('Error deleting category.');
    }
}
}

// Event Listeners
createCategoryBtn.addEventListener('click', createCategory);
updateCategoryBtn.addEventListener('click', updateCategory);
cancelEditBtn.addEventListener('click', () => {
    editCategoryForm.style.display = 'none';
});

// Initial Fetch
fetchCategories();
