const searchPhone = () => {
    const userInput = document.getElementById('src-input-field').value;
    const inputLowerCase = userInput.toLowerCase();
    const PhoneApiUrl = `https://openapi.programming-hero.com/api/phones?search=${inputLowerCase}`
    fetch(PhoneApiUrl)
    .then(res => res.json())
    .then(data => console.log(data.data))
};