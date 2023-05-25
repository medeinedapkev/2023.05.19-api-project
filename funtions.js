export function firstLetterUpperCase(string) {
    let firstLetter = string.at(0).toUpperCase();
    let restOfString = string.slice(1);
    let output = firstLetter + restOfString;

    return output;
}

export async function fetchData(url) {
    let res = await fetch(url);
    let data = await res.json();

    return data;
}

export function createHTMLElement(type, className, text) {
    const element = document.createElement(type);
    if (className) {
       element.classList.add(className);
    } 

    if (text) {
        element.textContent = text;
    }

    return element;
}

export function getUrlParams(param) {
    const queryParams = location.search;
    const urlParams = new URLSearchParams(queryParams);
    const value = urlParams.get(param);
    
    return value;  
}