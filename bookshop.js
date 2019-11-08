//Import JSON
let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        sortBookObj.data = JSON.parse(this.responseText);
        sortBookObj.addJSdateIn();
        sortBookObj.sort();
    }
}
xmlhttp.open('GET', "boeken.json", true);
xmlhttp.send();

//make a table with the data from an array
const createTableHead = (arr) => {
    let head = "<table class='bookSelection'><tr>";
    arr.forEach((item) => {
        head += "<th>" + item + "</th>";
    });
    head += "</tr>";
    return head;
}

// create a table row: use array and boolean
//boolean tells when a row has an accent or not
// string with markup
const createTableRow = (arr, accent) => {
    let row = "";
    if (accent == true) {
        row = "<tr class='bookSelection__row--accent'>"
    }
}