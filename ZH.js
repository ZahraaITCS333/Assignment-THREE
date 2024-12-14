 
const apiURL = "https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100";

 
async function fetchAndDisplayData() {
    try {
       
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();

    
        if (jsonData && jsonData.results && Array.isArray(jsonData.results)) {
            const tableBody = document.getElementById("data-table");

           
            jsonData.results.forEach(record => {
                if (record.year && record.semester && record.the_programs && record.nationality && record.colleges && record.number_of_students) {
                    const row = document.createElement("tr");

                    row.innerHTML = `
                        <td>${record.year}</td>
                        <td>${record.semester}</td>
                        <td>${record.the_programs}</td>
                        <td>${record.nationality}</td>
                        <td>${record.colleges}</td>
                        <td>${record.number_of_students}</td>
                    `;
                    tableBody.appendChild(row);
                }
            });
        } else {
            const tableBody = document.getElementById("data-table");
            tableBody.innerHTML = "<tr><td colspan='6'>No data available or the structure is different than expected.</td></tr>";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        const tableBody = document.getElementById("data-table");
        tableBody.innerHTML = "<tr><td colspan='6'>An error occurred while fetching data.</td></tr>";
    }
}
 
fetchAndDisplayData();
