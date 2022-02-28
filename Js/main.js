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
        newDiv.classList.add('mb-4') 
        console.log(phone);
        newDiv.innerHTML =`
        <div class="card h-100 mb-3" id="phoneCard" style="width: 18rem;">
        <img style="width:80% ; margin-left:10%; padding:5%" src="${phone.image}" class="card-img-top " alt="...">
        <div class="card-body ">
          <h5 class="card-title text-black ">Name : ${phone.phone_name}</h5>
          <h5 class="card-title text-black ">Brand : ${phone.brand}</h5>
        </div>
        <div id="btn-detail" class="card-footer">
        <a href="#" class="btn btn-primary">Details</a>
        </div>
        </div>
        `;
        phoneCard.appendChild(newDiv);
    });

}
searchPhone();