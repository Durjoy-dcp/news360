// console.log("Its working ");

const fetchCatagory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCatagories(data.data.news_category))
        .catch((error) => console.log(error));
}
function displayCatagories(data) {
    console.log(data);
    const listParent = document.getElementById("catagory");
    data.forEach(element => {
        const li = document.createElement('li');

        // li.classList.add = "mx-4";

        li.innerHTML = `<a class="nav-link" onclick="fetchData('${element.category_id}')" id="${element.category_name}" aria-current="page" href="#">${element.category_name}</a>`;
        listParent.appendChild(li);
    });
}

fetchCatagory();
function fetchData(id) {
    // console.log(id + " clicked");
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => console.log(data.data))
        .catch((error) => console.log(error));

}
const shownews = data => {

}