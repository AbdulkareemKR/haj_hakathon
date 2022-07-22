textList = "";
$(".translation").each(function (i, item) {
  if ($(this).html() != "") {
    cleaned = $(this)
      .text()
      .replace(/\r?\n|\s/g, "");
    textList += cleaned + " | ";
  } else {
    textList += item.placeholder + " | ";
  }
});

console.log(textList);
var settings = {
  async: true,
  crossDomain: true,
  url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
  method: "POST",
  headers: {
    "x-rapidapi-host": "google-translate1.p.rapidapi.com",
    "x-rapidapi-key": "53c48e08d0msh527d7daeb07ca0bp1cadcbjsn7537f63869ba",
    "content-type": "application/x-www-form-urlencoded",
  },
  data: {
    source: "en",
    translationText:
      "Contact Form | Name | Contact Number | Email | play | good",
    target: "",
  },
};

var userLang = navigator.language || navigator.userLanguage;

console.log(userLang + " aaaa");
const languageCode = userLang.split("-")[0];
console.log(languageCode);

// if (languageCode != "en") {
//   settings.data.target = languageCode;

//   fetchTranslation();

//   $("button").html($(this).html());
// } else {
//   updatePlaceholders(settings.data.q);

//   $("#langSel").html("Translate to");
// }

$(document).ready(function () {
  $(".dropdown-item").click(function (e) {
    // to get the abbreviation of the desired language
    if ($(this).attr("tolang") != "en") {
      settings.data.target = $(this).attr("tolang");

      fetchTranslation();

      $("button").html($(this).html());
    } else {
      console.log();
      updatePlaceholders(settings.data.translationText);
    }
  });
});

function fetchTranslation() {
  $.ajax(settings).done(function (response) {
    console.log("res" + response);

    var translatedText = response.data.translations[0].translatedText;

    updatePlaceholders(translatedText);
  });
}

function updatePlaceholders(updateString) {
  var comp = updateString.split("|");
  console.log(comp);

  $(".translation").each(function (idx) {
    if ($(this).html() != "") {
      $(this).html(comp[idx + 1].trim());
    } else {
      $(this).prop("placeholder", comp[idx + 1].trim());
    }
  });
}

// Speech Section
const text = "my med";
const speech = window.speechSynthesis;

const speakNow = () => {
  // Check if Speech Synthesis is supported
  if ("speechSynthesis" in window) {
    const msg = new SpeechSynthesisUtterance();
    const voices = speech.getVoices();
    msg.voice = voices[1];
    msg.lang = "en-US";
    msg.text = text;
    window.speechSynthesis.speak(msg);
  } else {
    // Speech Synthesis Not Supported
    alert("Sorry, your browser doesn't support text to speech!");
  }
};

speakNow();
