let currentLanguage = "en";

readPageText();

function readPageText() {
  textList = "";
  $(".translation").each(function (i, item) {
    if (i != 0) {
      textList += " | ";
    }
    if ($(this).html() != "") {
      cleaned = $(this)
        .text()
        .replace(/\r?\n|/g, "");
      console.log($(this).text());
      textList += cleaned;
    } else {
      textList += item.placeholder;
    }
  });
  console.log(textList);
  return textList;
}

console.log(textList);
var settings = {
  async: true,
  crossDomain: true,
  url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
  method: "POST",
  headers: {
    "x-rapidapi-host": "google-translate1.p.rapidapi.com",
    "x-rapidapi-key": "54d1674a31msh44bbfb801ddeceap13b331jsn3efa5250559a",
    "content-type": "application/x-www-form-urlencoded",
  },
  data: {
    source: "en",
    q: readPageText(),
    target: "",
  },
};

var userLang = navigator.language || navigator.userLanguage;

const languageCode = userLang.split("-")[0];

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
    console.log("translate ");

    // to get the abbreviation of the desired language
    if ($(this).attr("tolang") != "en") {
      settings.data.target = $(this).attr("tolang");
      settings.data.source = currentLanguage;
      currentLanguage = settings.data.target;
      if (settings.data.target == "ar") {
        $(".translation").css("text-align", "right");
        $(".t-align").css("text-align", "right");
      } else {
        $(".translation").css("text-align", "left");
        $(".t-align").css("text-align", "left");
      }
      fetchTranslation();

      $("button").html($(this).html());
    } else {
      console.log();
      updatePlaceholders(settings.data.q);
    }
  });
});

function fetchTranslation() {
  settings.data.q = readPageText();
  $.ajax(settings).done(function (response) {
    console.log("res" + response);

    var translatedText = response.data.translations[0].translatedText;

    updatePlaceholders(translatedText);
  });
}

function updatePlaceholders(updateString) {
  var comp = updateString.split("|");
  console.log(comp);

  $(".translation").each(function (idx, item) {
    console.log(idx, item);
    if ($(this).html() != "") {
      $(this).html(comp[idx].trim());
    } else {
      $(this).prop("placeholder", comp[idx].trim());
    }
  });
}

async function showReceipt() {
  var id = $("#userId").val();
  console.log(id);
  let output = "";
  $.ajax({
    //create an ajax request to display.php
    type: "GET",
    url: `/receipt/${id}`,
    dataType: "html", //expect html to be returned
    success: function (response) {
      responseJson = JSON.parse(response);
      console.log(responseJson);

      output += `<div class="form-box mb-30">
                   <input id="userId" class="input-field" type="text" name="name"
                       placeholder="Enter Your ID">
                 </div>
                 <a onClick="showReceipt()" class="btn result-button">Show</a>
                 <hr>`;

      responseJson.receipt.forEach((item) => {
        console.log(item + " ffffffffffffffffff");

        output += `
                                      <div class="row-12">
                                          <div class="form-box mb-30">
                                              <p ><p class="treatment-title translation">Receipt Date: </p> <p class="treatment-description translation">  ${item.date}</p></p>
                                          </div>
                                      </div>
                                      <div class="row-12">
                                          <div class="form-box mb-30">
                                              <p class="translation translation"><p class="treatment-title translation">Patient Name:</p> <p class="treatment-description translation">  ${item.patientName} </p></p>
                                          </div>
                                      </div>
                                      <div class="row-12">
                                          <div class="form-box mb-30">
                                              <p ><p class="treatment-title translation">Patient ID:</p> <p class="treatment-description translation">  ${item.patientId} </p></p>
                                          </div>
                                      </div>
                                      <div class="row-12">
                                          <div class="form-box mb-30">
                                              <p><p class="treatment-title translation">Drug Name:</p> <p class="treatment-description t-align">  ${item.drugName} </p></p>
                                          </div>
                                      </div>
                                      <div class="row-12">
                                          <div class="form-box mb-30">
                                              <p ><p class="treatment-title translation">Instructions:</p> <p class="treatment-description translation">  Take ${item.doseAmount} ${item.amountType},
                                                      &nbsp;${item.takingMethod}, ${item.dosesPerDay} times per day, for ${item.duration}
                                                      day/days.
                                              </p></p>
                                          </div>
                                      </div>
                                      <div class="row-12">
                                          <div class="form-box mb-30">
                                              <p ><p class="treatment-title translation">Duration of The Treatment:</p> <p class="treatment-description translation">   ${item.duration} days</p></p>
                                          </div>
                                      </div>
                                      <div class="row-12">
                                          <div class="form-box mb-30">
                                              <p > <p class="treatment-title translation">Dose Taking Time:</p> <p class="treatment-description translation">  ${item.dosesTime}</p></p>
                                          </div>
                                      </div>
                                      <div class="row-12">
                                          <div class="form-box mb-30">
                                              <p ><p class="treatment-title translation">Additional Comments:</p> <p class="treatment-description translation"> ${item.comment}</p></p>
                                          </div>
                                      </div>
                                      <hr>
                                      </br>
                                   `;
      });
      document.querySelector("#receipt-info").innerHTML = output;
    },
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
