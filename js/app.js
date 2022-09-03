// console.log("Its working ");
let value = 0;
const setValue = (id = 0) => value = id;


const fetchCatagory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCatagories(data.data.news_category))
        .catch((error) => console.log(error));
}
function displayCatagories(data) {

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

    }
    document.getElementById(docId).classList.add("active");
    // console.log(id + " clicked");
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => shownews(data.data, docId))
        .catch((error) => console.log(error));

}
const shownews = (data, id) => {


    const newsContainer = document.getElementById('news');
    newsContainer.innerHTML = ``;
    if (data.length == 0) {
        newsContainer.innerHTML = `<h2 class="text-center py-2 text-danger">No news Found !!!</h2>`;

    }
    const amount = document.getElementById('amount')
    amount.innerText = data.length;
    console.log(amount.parentNode.parentNode);
    document.getElementById('show-amount').classList.remove('d-none');
    document.getElementById('catagoryName').innerText = id;


    if (value == 1) {
        data = data.sort((a, b) => b.total_view - a.total_view);
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

                <div class="d-md-flex d-sm-block   justify-content-between">

                    <div class="d-flex my-4  align-items-center">
                        <img class="author-img me-3"
                            src="${element.author.img}"
                            alt="">
                        <h6 class="">${(element.author.name == null || element.author.name == "") ? 'Information not found' : element.author.name}</h6>
                    </div>
                    <div  class="d-flex align-items-center justify-content-between">
                    <div class="d-flex text-secondary">
                        <i class="fa-solid fa-eye me-2"></i>
                        <h6>${(element.total_view == null || element.total_view == "") ? 'Information not found' : element.total_view}</h6>
                    </div>
                    <div>
                        <button onclick="fetchForModal('${element._id}')" type="button" class="btn " data-bs-toggle="modal"
                            data-bs-target="#exampleModal">
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                    </div>
                </div>


            </div>
        </div>
    </div>`;

        newsContainer.appendChild(div);
    });



}
function fetchForModal(id) {
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
        .then(res => res.json())
        .then(data => showModal(data.data[0]))
    // .catch((error) => console.log(error));

}
function showModal(element) {



    console.log(element);
    const id = document.getElementById('modal-body');
    id.innerHTML = ` <div class=" col-12 d-flex justify-content-center">
    <img src="${element.image_url}"
        class="img-fluid rounded   alt="...">
</div>
<div class="col-12">
    <div class="card-body my-5 px-5">
        <h5 class="card-title  ">${element.title}</h5>
        <p class="card-text text-secondary ">${element.details}</p>
        <div>

            <div class="d-flex justify-content-between">

                <div class="d-flex  align-items-center">
                 
                    <h6 class="">Author : ${(element.author.name == null || element.author.name == "") ? 'Information not found' : element.author.name}</h6>
                </div>
                <div class="d-flex text-secondary">
                    <i class="fa-solid fa-eye me-2"></i>
                    <h6>${(element.total_view == null || element.total_view == "") ? 'Information not found' : element.total_view}</h6>
                </div>
         
            </div>


        </div>
    </div>
</div>`;

}


function compareview(a, b) {
    return b.age - a.age;
}