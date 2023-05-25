import { API_URL } from "./config.js";
import { fetchData, getUrlParams } from "./funtions.js";

function init() {
    const searchFor = getUrlParams('search');
    
    let categoriesArr = ['users', 'posts', 'albums', 'comments', 'photos'];
    
    categoriesArr.map(async category => {
        console.log(category)
    
        const searching = await fetchData(`${API_URL}/${category}?q=${searchFor}`);
        console.log(searching)
        console.log(searching.length > 0)

        searching.forEach(item => {
            console.log(item)
            console.log(item.name)
            console.log(item.body)
            console.log(item.email)
        })
    })
}

init();

function searchList() {

}