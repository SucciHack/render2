const inputOne = document.getElementById("inputOne")
const inputTwo = document.getElementById("inputTwo")
const submit = document.getElementById("btn")
const productContainer = document.querySelector(".productContainer")
const productsArray =JSON.parse(localStorage.getItem('products')) || []
renderUi(productsArray)


submit.addEventListener("click", (event)=>{
    event.preventDefault()
    const file = inputTwo.files[0] //access the first file 
    if(!file){
        alert("An Image is required")
        return
    }

    const reader = new FileReader()
    reader.onload = function(e){
        const products = {
            name: inputOne.value,
            image: e.target.result // get the base64 of the image
        }
        productsArray.push(products)
        console.log(productsArray)
        inputOne.value = ''
        inputTwo.value = ''
        renderUi(productsArray)
        localStorage.setItem('products',JSON.stringify(productsArray))
    }
    //start reading the selected file as Base64-encoded image
    reader.readAsDataURL(file)
})

function renderUi(data){
    productContainer.innerHTML = ''
    data.forEach(product => {
        const div = document.createElement('div')
        div.classList.add("product")
        div.innerHTML = `
            <div>
                <h2>${product.name}</h2>
                <div class="image">
                    <img src="${product.image}" alt="">
                    <p> Lorem, ipsum dolor sit amet</p>
                </div>
            </div>
        `
        productContainer.appendChild(div)
    });
}