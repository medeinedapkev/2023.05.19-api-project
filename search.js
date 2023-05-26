import navigation from "./navigation.js";
import { API_URL } from "./config.js";
import { fetchData, getUrlParams } from "./funtions.js";

async function init() {
    const contentElement = document.querySelector('.content');

    const searchFor = getUrlParams('search');
    console.log(searchFor);
    
   

        let searching = await fetchData(`${API_URL}/users?q=${searchFor}`);
        console.log(searching)
        console.log(Object.keys(searching))
        console.log(searching.length > 0)

        searching.forEach(item => {
            console.log(item)
            console.log(Object.keys(item))
            console.log(item.name)
            console.log(item.email)
        })



    const mainHeader = navigation();
    contentElement.before(mainHeader);
}

init();

function searchList() {

    let categoriesArr = ['users', 'posts', 'albums', 'comments', 'photos'];
    
    categoriesArr.map(async category => {
        console.log(category)
    
        const searchedInfo = await fetchData(`${API_URL}/${category}?q=${searchFor}`);
        // console.log(searchedInfo)
        // console.log(searchedInfo.length > 0)

        if (searchedInfo.length > 0) {
            searchedInfo.forEach(item => {
                console.log(item)
                console.log(Object.keys(item))
                console.log(Object.values(item))

                const keys = Object.keys(item);
                keys.forEach((key, index) => {
                    console.log(key)
                    console.log(index)
                })
    
            })

        }

    })

}