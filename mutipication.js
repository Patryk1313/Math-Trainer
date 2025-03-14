document.addEventListener("DOMContentLoaded", function() {
    const table = document.getElementById("multiplication-table");

    let headerRow = "<tr><th></th>";
    for (let i = 1; i <= 10; i++) {
        headerRow += `<th>${i}</th>`;
    }
    headerRow += "</tr>";
    table.innerHTML += headerRow;

    for (let i = 1; i <= 10; i++) {
        let row = `<tr><th>${i}</th>`;
        for (let j = 1; j <= 10; j++) {
            row += `<td>${i * j}</td>`;
        }
        row += "</tr>";
        table.innerHTML += row;
    }
});
