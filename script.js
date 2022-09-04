let myLead = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");
let leadsFromLS = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLS) {
    myLead = leadsFromLS
    render(myLead);
}

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        
        // templated strings/litterals
        listItems += `
            <li>
                <a target = '_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
    }
    ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function() {
    let lead = inputEl.value;
    if (lead.length === 0) {
        return 0;
    } else {
        myLead.push(lead);
        localStorage.setItem("myLeads", JSON.stringify(myLead));
        inputEl.value = "";
        render(myLead);
    }
})
tabBtn.addEventListener("click", function() {

    chrome.tabs.query({currentWindow: true, active: true}, function(tab){
        myLead.push(tab[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLead));
        render(myLead);
    });

});
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLead = [];
    render(myLead);
})




    



