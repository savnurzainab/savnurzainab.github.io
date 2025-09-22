//const apiUrl = 'http://localhost:5250/api/media';
const apiUrl ='https://idealfurniture.runasp.net/api/media';


// Fetch media
async function fetchMedia() {
    const response = await fetch(apiUrl+'/images');
	 if (!response.ok) {
          throw new Error('Failed to fetch data');
     }
	const data = await response.json();

	const listElement = document.getElementById('itemsList');
	listElement.innerHTML = '';
	 data.forEach(data => {
          // Create a new <li> element
          const li = document.createElement('li');
          
          // Set the content of the <li> element (user's name)
          li.innerHTML = `<img src=${data.imagePath} height='100px' width='100px'> <span class="actions">
                            <a href="#" class="delete" title="Delete" onclick="fnDeleteMedia(${data.id})"><i class="fas fa-trash-alt"></i></a>
                          </span>`;

          // Append the <li> to the <ul> element
          listElement.appendChild(li);
        });

        


	 /* fro multiple json value returning from webapi
	  data.forEach(item => {
          const listItem = document.createElement('li');
          listItem.textContent = `Id: ${item.Id}, Name: ${item.Name}`; // Display Id and Name
          listElement.appendChild(listItem); // Append the list item to the <ul>
        });
	 */
}



document.addEventListener("DOMContentLoaded", function () {
    // Fetch categories from the API
	//const dataUrl='http://localhost:5250/api/category';
	const dataUrl='https://idealfurniture.runasp.net/api/category';

    fetch(dataUrl)
        .then(response => response.json())
        .then(data => {

            if (data && Array.isArray(data)) {
                const dropdown = document.getElementById("categoryDropdown");
                // Clear any existing options
                dropdown.innerHTML = "<option value=''>-- Select Category --</option>";
                // Loop through the API data and append options to the dropdown
                data.forEach(item => {
                  const option1 = document.createElement("option");
                    option1.value = item.id;
                    option1.text = item.name;
                    
                    // Append each option to its respective dropdown
                    dropdown.appendChild(option1);
                });
            } else {
                console.error("API did not return valid category data");
            }
        })
        .catch(error => {
            console.error("Error loading categories:", error);
            alert("Failed to load categories. Please try again later.");
        });
});

function fnOnchangeCategory(){

var catID = document.getElementById("categoryDropdown").value;

	//const dataUrl='http://localhost:5250/api/Subcategory/allsubcategory/'+catID;
	const dataUrl='https://idealfurniture.runasp.net/api/Subcategory/allsubcategory/'+catID;

    fetch(dataUrl)
        .then(response => response.json())
        .then(data => {

            if (data && Array.isArray(data)) {
                const dropdown = document.getElementById("subCategoryDropdown");
                // Clear any existing options
                dropdown.innerHTML = "<option value=''>-- Select Subcategory --</option>";
                // Loop through the API data and append options to the dropdown
                data.forEach(item => {
                  const option1 = document.createElement("option");
                    option1.value = item.id;
                    option1.text = item.name;
                    
                    // Append each option to its respective dropdown
                    dropdown.appendChild(option1);
                });
            } else {
                console.error("API did not return valid subcategory data");
            }
        })
        .catch(error => {
            console.error("Error loading subcategories:", error);
            alert("Failed to load subcategories. Please try again later.");
        });


}

// Delete Subcategory
async function fnDeleteMedia(id) {
	if(confirm('Are you sure! You want to delete?')){
    const response = await fetch(`${apiUrl}/delete/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        alert('Media deleted successfully!');
        fetchMedia(); // Refresh Subcategory list
    } else {
        alert('Error deleting Media.');
    }
}
}

fetchMedia();