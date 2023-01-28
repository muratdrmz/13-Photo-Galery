const btnEl=document.getElementById('btn');
const inputEl=document.getElementById('input');
const errorEl = document.getElementById("errorMessage");
const galeryEl=document.getElementById('galery');


async function fetchImage() {
 const randomNum = Math.round(Math.random() * 1000);

 
 if(inputEl.value>10 || inputEl.value<1){
  errorEl.style.display='block';
  errorEl.innerText=`${inputEl.value} is not a valid selection. Please choose numbers between 1 to 10`
  galeryEl.style.display = "none";
  return
 }
 imgs='';
 try {
  btnEl.style.display='none';
  const loading = '<img src="spinner.svg" alt="">';
  galeryEl.innerHTML=loading
  await fetch(
    `https://api.unsplash.com/photos?per_page=${inputEl.value}&page=${randomNum}&client_id=KWNXt6YGxCUGsk6J8HStgK9DOfHZ4NCbHY9AbTT9TTo`
  ).then((res) =>res.json())
    .then((data) => {
      if (data) {
        data.forEach((pic) => {
          imgs += `<img src="${pic.urls.small}" alt="image">`;
          galeryEl.style.display = "block";
          galeryEl.innerHTML=imgs;
          btnEl.style.display='block'
          errorEl.style.display = "none";            
        });
      }
    });
  
 } catch (error) {
  console.log(error);
  galeryEl.style.display = "none";
  errorEl.style.display='block';
  errorEl.innerHTML=`Following error accured: ${error}`;
  btnEl.style.display = "block";
  
 }
}
btnEl.addEventListener('click',fetchImage)

