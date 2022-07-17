var settings = {
  async: true,
  crossDomain: true,
  url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
  method: "POST",
  headers: {
    "x-rapidapi-host": "google-translate1.p.rapidapi.com",
    "x-rapidapi-key": "3fd319fca1msh35698ec26a4bcefp1d1ad3jsn25b9784846a2",
    "content-type": "application/x-www-form-urlencoded",
  },
  data: {
    source: "en",
    q: "Contact Form | Name | Contact Number | Email | play | good",
    target: "",
  },
};

$(document).ready(function () {
  $(".dropdown-item").click(function (e) {
    if ($(this).attr("tolang") != "en") {
      settings.data.target = $(this).attr("tolang");

      fetchTranslation();

      $("button").html($(this).html());
    } else {
      updatePlaceholders(settings.data.q);

      $("#langSel").html("Translate to");
    }
  });
});

function fetchTranslation() {
  $.ajax(settings).done(function (response) {
    console.log(response);

    var translatedText = response.data.translations[0].translatedText;

    updatePlaceholders(translatedText);
  });
}

function updatePlaceholders(updateString) {
  var comp = updateString.split("|");

  $(".translation").each(function (idx) {
    $(this).prop("placeholder", comp[idx + 1].trim());
  });

  $("#formHeading").html(comp[0]);
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

document.getElementById("app").innerHTML = `
  <h1>Check this out!</h1>
  <div>
   ${text}
  </div>
  `;

speakNow();
