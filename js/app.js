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
        li.classList.add('text-secondary');
        // li.classList.add = "mx-4";

        li.innerHTML = `<a class="" onclick="fetchData('${element.category_id}','${element.category_name}')" id="${element.category_name}" aria-current="page" href="#">${element.category_name}</a>`;
        listParent.appendChild(li);
    });
}

fetchCatagory();
function fetchData(id, docId) {
    const current = document.getElementsByClassName('active');
    if (current.length > 0) {
        current[0].className = current[0].className.replace("active", "");
        console.log("working");
    }
    document.getElementById(docId).classList.add("active");
    // console.log(id + " clicked");
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => shownews(data.data))
        .catch((error) => console.log(error));

}
const shownews = (data, id) => {


    const newsContainer = document.getElementById('news');
    newsContainer.innerHTML = ``;
    if (data.length == 0) {
        newsContainer.innerHTML = `<h2 class="text-center py-2 text-danger">No news Found !!!</h2>`;

    }
    data.forEach(element => {
        console.log(element);
        let detail = element.details;

        detail = detail.split(" ");
        if (detail.length > 50) {
            detail = detail.slice(0, 50).join(" ");
            detail += " ...";
        }
        const div = document.createElement('div');
        div.classList.add('g-0');
        div.classList.add('row');
        div.classList.add('my-2');
        div.classList.add('rounded');
        div.innerHTML = `   <div class="col-md-2 col-12 d-flex justify-content-center">
        <img src="${element.thumbnail_url}"
            class="img-fluid rounded   alt="...">
    </div>
    <div class="col-md-10 col-12">
        <div class="card-body px-5">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text text-secondary ">${detail}</p>
            <div>

                <div class="d-flex justify-content-between">

                    <div class="d-flex  align-items-center">
                        <img class="author-img me-3"
                            src="${element.author.img}"
                            alt="">
                        <h6 class="">${element.author.name === null ? 'Information not found' : element.author.name}</h6>
                    </div>
                    <div class="d-flex text-secondary">
                        <i class="fa-solid fa-eye me-2"></i>
                        <h6>1.5M</h6>
                    </div>
                    <div>
                        <button type="button" class="btn " data-bs-toggle="modal"
                            data-bs-target="#exampleModal">
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>


            </div>
        </div>
    </div>`;
        newsContainer.appendChild(div);
    });



}