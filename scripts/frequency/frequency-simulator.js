import { simSetup } from "/popup.js"

//Błogosławienie ci którzy nie rozumieli po co te pentle i zmienne a uwierzyli 
document.addEventListener('load', getBackupObjectFrequency());

function getBackupObjectFrequency() {
    let bgpage = chrome.extension.getBackgroundPage();
    let objectFrequency = bgpage.simObjectFrequency;

    let promisFrequency = new Promise((resolve) => {
        chrome.storage.local.get("simObjectFrequency", (result) => {
            resolve(result["simObjectFrequency"])
        });
    });

    let promisSettings = new Promise((resolve) => {
        chrome.storage.local.get("settings", (result) => {
            resolve(result["settings"])
        });
    });

    let backup;
    promisFrequency.then(data => {
        backup = data;
    })
    let settings;
    promisSettings.then(data => {
        settings = data
    }).then(() => {
        simSetup(backup, objectFrequency, settings);
    })
}

//Materilize css Navbar
document.addEventListener('DOMContentLoaded', function () {
    let elems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elems);
});
////Materialize css tooltip
$("document").ready(function () {
    let elems = document.querySelectorAll('.tooltipped');
    let instances = M.Tooltip.init(elems);
})

// Materialize css Toast
document.querySelector('a.btn-large').addEventListener('click', () => {
    M.toast({
        html: 'Zmiany zostały zapisane',
        classes: 'toast-container',
        inDuration: 300,
        outDuration: 300
    });
});

