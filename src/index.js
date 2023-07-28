import "./styles.css";

//Get the data table:
const dataTable = document.querySelector("tbody");

//Fetch data and show it on the table:
async function fetchPopulationData() {
    const url =
        "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
    const dataPromise = await fetch(url);
    const dataJSON = await dataPromise.json();

    const employmentDataUrl =
        "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";
    const employmentDataPromise = await fetch(employmentDataUrl);
    const employmentDataJSON = await employmentDataPromise.json();
    console.log(employmentDataJSON);

    let municipalities = dataJSON.dataset.dimension.Alue.category.label;
    let values = dataJSON.dataset.value;
    let employmentValues = employmentDataJSON.dataset.value;

    let valueKey = 0;

    for (let key in municipalities) {
        if (municipalities.hasOwnProperty(key)) {
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");

            td1.innerText = municipalities[key];
            td2.innerText = values[valueKey];
            td3.innerText = employmentValues[valueKey];

            let employmentPercentage = (
                (employmentValues[valueKey] / values[valueKey]) *
                100
            ).toFixed(2);
            td4.innerText = employmentPercentage + "%";

            if (employmentPercentage > 45) {
                tr.classList.add("good");
                tr.style.backgroundColor = "#abffbd";
            } else if (employmentPercentage < 25) {
                tr.classList.add("bad");
                tr.style.backgroundColor = "#ff9e9e";
            } else {
                tr.classList.add("normal");
            }

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            dataTable.appendChild(tr);

            valueKey++;
        }
    }
}

fetchPopulationData();
