// Fetch the JSON file
fetch('CHLPointList.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // Create the table
    var table = document.querySelector("#table");
    var tableData = document.createElement('table');

    let tableHtml = '<table class="table-1">\n';

    var headers = Object.keys(data[0]);
    tableHtml += '<thead><tr class="row-1">';
        
    for(const header of headers){
        tableHtml+= `<th class="column-${header.trim()}" rowspan="1" colspan="1" tabindex="0">${header}</th>\n`;
    }
    tableHtml+= '</tr></thead>';
        
    var htmlBody = '<tbody>';
    for(const row of data){
        htmlBody+='<tr>\n';

        for(const header of headers){
            htmlBody+=`<td>${row[header]}</td>\n`;
        }

        htmlBody+='</tr>\n';
    }
    htmlBody+='</tbody>';
    tableHtml += htmlBody + "</table>";
    tableData.innerHTML = tableHtml;

    // Add the table to the document body
    table.appendChild(tableData);
  })
  .catch(function(error) {
    console.log('Error fetching JSON file:', error);
  });