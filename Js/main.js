const searchPhone = () => {
  loadingSpinner('block');
    const userInput = document.getElementById('src-input-field').value;
    const inputLowerCase = userInput.toLowerCase();
    const phoneCard = document.getElementById('phone-card-center');
    phoneCard.innerHTML=``;
    const detailsDiv = document.getElementById('details-section')
    detailsDiv.innerHTML=``;
    if(!isNaN(userInput) || userInput == ''){
      const errorMsg = document.getElementById('error-msg');
      errorMsg.innerHTML=`
      <div class="toast align-items-center border border-danger d-block" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
        <p class = 'text-danger pt-2'>please enter a phone name!!</p>
       </div>
        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
      `;
      loadingSpinner('none');
      document.getElementById('seemore-div').style.display= none;
      
  }
  else{
    const errorMsg = document.getElementById('error-msg');
      errorMsg.innerHTML=``;
    const PhoneApiUrl = `https://openapi.programming-hero.com/api/phones?search=${inputLowerCase}`
    fetch(PhoneApiUrl)
    .then(res => res.json())
    .then(data => phoneItems(data.data.slice(0,20)))
  }
  const seeMoreDiv = document.getElementById('seemore-div');
  seeMoreDiv.innerHTML = `<button id="SeeMore" onclick="moreItem()"  class="btn btn-primary" type="button">See More</button>`;
  
};

// See more button funcation
const moreItem = () =>{
  const userInput = document.getElementById('src-input-field').value;
  const inputLowerCase = userInput.toLowerCase();
    const PhoneApiUrl = `https://openapi.programming-hero.com/api/phones?search=${inputLowerCase}`
    fetch(PhoneApiUrl)
    .then(res => res.json())
    .then(data => phoneItems(data.data.slice(20,)))
    const seeMoreDiv = document.getElementById('SeeMore');
    seeMoreDiv.classList.add('d-none')
};
// phone card option
const phoneItems = phones => {
  const userInput = document.getElementById('src-input-field');
  userInput.value = '';
  // no result error handeling
  if(phones.length === 0){
    const seeMoreDiv = document.getElementById('SeeMore');
    seeMoreDiv.classList.add('d-none')
    const errorMsg = document.getElementById('error-msg');
    errorMsg.innerHTML=`
    <div class="toast align-items-center border border-danger d-block" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">
      <p class = 'text-danger pt-2'>Opps!No phones found.</p>
     </div>
      <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
    `;
    loadingSpinner('none');
  }
  else{
    const phoneCard = document.getElementById('phone-card-center');
     phones.forEach(phone => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('mb-4') 
        newDiv.innerHTML =`
        <hr>
        <div class="card h-100 mb-3" id="phoneCard" style="width: 18rem;">
        <img style="width:80% ; margin-left:10%; padding:5%" src="${phone.image}" class="card-img-top " alt="...">
        <div class="card-body ">
          <h5 class="card-title text-black ">Name : ${phone.phone_name}</h5>
          <h5 class="card-title text-black ">Brand : ${phone.brand}</h5>
        </div>
        <div id="btn-detail" class="card-footer">
        <a  href="#" onclick="detailsBtn('${phone.slug}')"  class="btn btn-primary">Details</a>
        </div>
        </div>

        `;
        phoneCard.appendChild(newDiv);

    });

  }
  loadingSpinner('none');
};
// phone details option
const detailsBtn = phoneId => { 
  const errorMsg = document.getElementById('error-msg');
  errorMsg.innerHTML='';
  loadingSpinner('block');  
    const detailsUrl = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(detailsUrl)
    .then(res => res.json())
    .then(data => detailsfunction(data.data))

};
const detailsfunction = phonesId => {
    const detailsDiv = document.getElementById('details-section')
    detailsDiv.innerHTML=`
    <div class="card mb-3" style="width: 740px;">
    <div class="row g-0">
      <div class="col-4 m-3 ps-3 text-center ">
        <img src="${phonesId.image}" class="w-100 h-80 " alt="...">
      </div>
      <div class="col-md-6 ms-xl-6">
        <div class="card-body ">
          <h5 class="card-title text-black ">${phonesId.name}</h5><br>
          <h5 class="card-title text-black "><u>Specifications:</u></h5>
          <p class='text-black'><span class="fw-bold">Chip Set : </span>${phonesId.mainFeatures.chipSet}</p>
          <p class='text-black'><span class="fw-bold">Display Size : </span>${phonesId.mainFeatures.displaySize}</p>
          <p class='text-black'><span class="fw-bold">Memory : </span>${phonesId.mainFeatures.memory}</p>
          <p class='text-black'><span class="fw-bold">Storage : </span>${phonesId.mainFeatures.storage}</p>
          <p class='text-black'><span class="fw-bold">sensors : </span>${phonesId.mainFeatures.sensors[0]},
          <span>${phonesId.mainFeatures.sensors[1]},</span><span>${phonesId.mainFeatures.sensors[2]},</span><span>${phonesId.mainFeatures.sensors[3]},</span><span>${phonesId.mainFeatures.sensors[4]}</span></p>
          <p class='text-black'><span class="fw-bold">Bluetooth : </span>${phonesId.others.Bluetooth}?</p>
          <p class='text-black'><span class="fw-bold">GPS : </span>${phonesId.others.GPS}</p>
          <p class='text-black'><span class="fw-bold">NFC : </span>${phonesId.others.NFC}</p>
          <p class='text-black'><span class="fw-bold">Radio : </span>${phonesId.others.Radio}</p>
          <p class='text-black'><span class="fw-bold">USB : </span>${phonesId.others.USB}</p>
          <p class='text-black'><span class="fw-bold">WLAN : </span>${phonesId.others.WLAN}</p>
          <p class='text-black'><span class="fw-bold">Release Date : </span>${phonesId.releaseDate ? phonesId.releaseDate : releaseDate="Comming Soon"}
        </div>
      </div>
    </div>
  </div>  
    `;
    loadingSpinner('none');
};

const loadingSpinner = display =>{
// loading spinner
 document.getElementById('spinner').style.display= display;
};
