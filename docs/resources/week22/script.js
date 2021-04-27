const tableHeaderHTML = `
<tr>
  <th>Name</th>
</tr>
`;

const petRowHTML = `
<tr>
  <td>PET_NAME</td>
</tr>
`;

const baseUrl = 'https://petstore.swagger.io/v2';
const resourcePath = '/pet/findByStatus';
const query = '?status=available';

let petsHTML = tableHeaderHTML;

function handleClick() {
  const path = `${baseUrl}${resourcePath}${query}`;
  //console.log(path);
  fetch(path)
    .then(response => response.json())
    .then(data => {
      if(!Array.isArray(data)){
        throw new Error('The data is invalid!');
      }

      data.forEach(pet => {
        petsHTML += petRowHTML.replace('PET_NAME', pet.name);
      });

      document.getElementById('petsTable').innerHTML = petsHTML;
    })
    .catch((error) => {
      console.log('AN ERROR HAS OCCURRED: ', JSON.stringify(error))
    });
}