const searchPhone = () => {
    const userInput = document.getElementById('src-input-field').value;
    const inputLowerCase = userInput.toLowerCase();
    const PhoneApiUrl = `https://openapi.programming-hero.com/api/phones?search=${inputLowerCase}`
    fetch(PhoneApiUrl)
    .then(res => res.json())
    .then(data => phoneItems(data.data))
};

const phoneItems = phones => {
    const phoneCard = document.getElementById('phone-card-center');
     phones.forEach(phone => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('col')
        console.log(phone);
        newDiv.innerHTML =`
        <div class="card mb-3" id="phoneCard" style="width: 18rem;">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body ">
          <h5 class="card-title text-black">Name : ${phone.phone_name}</h5>
          <h5 class="card-title text-black">Brand : ${phone.brand}</h5>
          <p class="card-text text-black">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Details</a>
        </div>
        </div>
        `;
        phoneCard.appendChild(newDiv);
    });

}