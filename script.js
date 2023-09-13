let apiKey = "5Z9ikbrpOlcx0uSmjgErgP1INZciJBvQ";
const mainContainer = document.querySelector(".container");
const searchBtn = document.getElementById("search-btn");
const resultContainer = document.querySelector(".result");
const loadingSpinner = document.querySelector(".spinner");
const inputBox = document.getElementById("search");

const getData = async function () {
  try {
    let searchValue = inputBox.value;
    let gifsCount = 30;

    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchValue}&limit=${gifsCount}&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
    );
    const gifInfo = await res.json();
    loadingSpinner.style.display = "block";

    const gifData = gifInfo.data;
    console.log(gifData);
    gifData.forEach((gif) => {
      const gifCard = document.createElement("div");
      gifCard.classList.add("gif-container");
      const gifImg = document.createElement("img");
      gifImg.classList.add("gif-img");
      gifImg.setAttribute("src", gif.images.fixed_width.url);
      gifImg.onload = () => {
        gifsCount -= 1;

        if (gifsCount == 0) {
          loadingSpinner.style.display = "none";
          resultContainer.style.display = "grid";
        }
      };
      gifCard.append(gifImg);
      resultContainer.append(gifCard);
      const copyBtn = document.createElement("button");

      copyBtn.innerText = `Copy Link`;
      copyBtn.classList.add("copy");
      copyBtn.onclick = () => {
        let gifLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;
        let hiddenInput = document.createElement("input");
        hiddenInput.setAttribute("type", "text");
        document.body.appendChild(hiddenInput);
        hiddenInput.value = gifLink;
        hiddenInput.select();
        document.execCommand("copy");
        document.body.removeChild(hiddenInput);
        alert("URL Copied To Clipboard");
      };
      gifCard.append(copyBtn);
    });
  } catch (err) {
    console.error(err);
  }
};

searchBtn.addEventListener("click", function () {
  resultContainer.innerHTML = "";
  getData();
});
