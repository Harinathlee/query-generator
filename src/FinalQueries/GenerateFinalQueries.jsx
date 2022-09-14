import { GenerateSelectQuery } from "../CheckDuplicates/GenerateSelectQuery";



export function GenerateFinalQueries(queryType, typeOfUpdate) {
    let completeData = JSON.parse(localStorage.getItem("CompleteData"));
    let queryInput = "";
    let finalQuery = "";
    let finalQueries = new Array();
    let tableName = "";
    // if we are trying to insert new items this will execute
    if (queryType.selectedOption == "Insert") {
        //if the type of data we are inserting is text items
        if (typeOfUpdate.selectedOption == "TEXT") {
            queryInput = localStorage.getItem("insertText");
        }
        //if the type of data we are inserting is assets
        else {
            queryInput = localStorage.getItem("insertAsset");
        }

        tableName = queryInput.split(" ")[2];
        GenerateSelectQuery(completeData, tableName);

        //loop to access all values and add it to the query
        for (let index = 0; index < completeData.length; index++) {
            finalQuery = queryInput.substring(
                queryInput.toLowerCase().indexOf("Insert"),
                queryInput.toLowerCase().indexOf("values") + 7
            );
            const element = completeData[index];
            let columnNames = Object.keys(element);

            for (let i = 1; i < columnNames.length; i++) {
                const colname = columnNames[i];
                const value = element[colname];
                if (
                    typeof value == "number" ||
                    (typeof value == "string" && colname.includes("DT")) ||
                    value == 'null'
                ) {

                    finalQuery = finalQuery + value + ",";
                } else {
                    finalQuery = finalQuery + "'" + value + "',";
                }
            }
            finalQuery = finalQuery + ");";
            finalQueries.push(finalQuery);
        }
        localStorage.setItem("finalQueries", JSON.stringify(finalQueries));
    } else {
        //if the type of data we are updating is text items
        if (typeOfUpdate.selectedOption == "TEXT") {
            queryInput = localStorage.getItem("updateText");
        }
        //if the type of data we are updating is assets
        else {
            queryInput = localStorage.getItem("updateAsset");
        }
    }
}
