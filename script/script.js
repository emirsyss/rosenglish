const generateButton = document.getElementById("generateButton");
const checkButton = document.getElementById("checkButton");
const turkishInput = document.getElementById("turkishInput");
let englishWord = "";

function getRandomWord() {
    
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const randomWord = xhr.responseText;
            document.getElementById("wordDisplay").textContent = randomWord;
            document.getElementById("wordDisplay").style.color = "black";

            englishWord = randomWord;
        }
    };
    xhr.open("GET", "random_word.php", true);
    xhr.send();
}

async function checkTranslation() {
    const turkishMeaning = document.getElementById("turkishInput").value.toLowerCase();
    try {
       
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${englishWord}&langpair=en|tr`);
        const data = await response.json();

        

        
        const turkishTranslation = data.responseData.translatedText.toLowerCase();

        if (turkishTranslation === turkishMeaning) {
            document.getElementById("wordDisplay").textContent = englishWord + " (" + turkishMeaning + ")";
            document.getElementById("wordDisplay").style.color = "green";
        } else {
            document.getElementById("wordDisplay").textContent = "Yanlış anlam! Doğru çeviri: " + turkishTranslation;
            document.getElementById("wordDisplay").style.color = "red";

        }
    } catch (error) {
        console.error(error);
        document.getElementById("wordDisplay").textContent = "Çeviri hatası: " + error;
    }

    
    document.getElementById("turkishInput").value = "";
}
turkishInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        
        checkButton.click();
    }
});


checkButton.addEventListener("click", checkTranslation);
generateButton.addEventListener("click", getRandomWord);
