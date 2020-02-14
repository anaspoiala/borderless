// Paste this in the console at:
// http://www.mathguide.de/info/tools/languagecode.html
// Then copy logs into SQL Insert Script :) 


var printTableToSQL = (table) => {
    for (var i = 1, row; row = table.rows[i]; i++) {
        var text = `(NEWID(), '${row.cells[0].innerText}', '${row.cells[1].innerText}'),`;
        console.log(text);
    }
}

const table1 = document.querySelector("body > p:nth-child(7) > table > tbody > tr > td:nth-child(1) > table > tbody");
const table2 = document.querySelector("body > p:nth-child(7) > table > tbody > tr > td:nth-child(2) > table");
const table3 = document.querySelector("body > p:nth-child(7) > table > tbody > tr > td:nth-child(3) > table");

printTableToSQL(table1);
printTableToSQL(table2);
printTableToSQL(table3);
