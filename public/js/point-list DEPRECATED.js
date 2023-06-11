const fs = require('fs');
const csv = require('csv-parser');
const { table } = require('console');

//var table=document.getElementById("display_csv_data")

var tableHtml = "";

function generateHtmlTable(csvFilePath, callback){
    const rows = [];
    fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row)=>{
        rows.push(row);
    })
    .on('end', () =>{
        const table = generateTableMarkup(rows);
        console.log
        callback(table);
    });
}
   
//Method to display the data in HTML Table
function generateTableMarkup(jsonData){

    let tableHtml = '<table class="table-1">\n';

    var headers = Object.keys(jsonData[0]);
    tableHtml += '<thead><tr class="row-1">';
        
    for(const header of headers){
        tableHtml+= `<th class="column-${header.trim()}" rowspan="1" colspan="1" tabindex="0">${header}</th>\n`;
    }
    tableHtml+= '</tr></thead>';
        
    var htmlBody = '<tbody>';
    for(const row of jsonData){
        htmlBody+='<tr>\n';

        for(const header of headers){
            htmlBody+=`<td>${row[header]}</td>\n`;
        }

        htmlBody+='</tr>\n';
    }
    htmlBody+='</tbody>';
    tableHtml += htmlBody + "</table>";
    return tableHtml;
}

module.exports = { generateHtmlTable };