let currentLanguage = "en";

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
      // console.log($(this).text());
      textList += cleaned;
    } else {
      textList += item.placeholder;
    }
  });
  // console.log(textList);
  return textList;
}

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
console.log(languageCode);
// readPageText();
// beginTranslation(languageCode);

function beginTranslation(language) {
  if (settings.data.source == "en") {
    settings.data.q = readPageText();
  }
  if (language != "en") {
    settings.data.target = language;
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
    updatePlaceholders(settings.data.q);
  }
}

$(document).ready(function () {
  $(".dropdown-item").click(function (e) {
    console.log("translate ");

    // to get the abbreviation of the desired language
    beginTranslation($(this).attr("tolang"));
  });
});

function fetchTranslation() {
  $.ajax(settings).done(function (response) {
    // console.log("res" + response);

    var translatedText = response.data.translations[0].translatedText;

    updatePlaceholders(translatedText);
  });
}

function updatePlaceholders(updateString) {
  var comp = updateString.split("|");
  // console.log(comp);

  $(".translation").each(function (idx, item) {
    // console.log(idx, item);
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
    type: "GET",
    url: `/receipt/${id}`,
    dataType: "html", //expect html to be returned
    success: function (response) {
      responseJson = JSON.parse(response);
      // console.log(responseJson);
      responseJson.receipt.forEach((item) => {
        output += `
            <div class="col t-align" id="receipt-info">
                                      <div class="row-12">
                                          <div class="form-box mb-30">
                                              <p ><p class="treatment-title translation">Prescription Date: </p> <p class="treatment-description translation">  ${
                                                item.date
                                              }</p> <a class="voice-function" onClick="voiceClick(event)"><i class="fa fa-volume-up voice"></i></a></p>
                                          </div>
                                      </div>
                                      <div class="row-12">
                                          <div class="form-box mb-30">
                                              <p class="translation translation"><p class="treatment-title translation">Patient Name:</p> <p class="treatment-description translation">  ${
                                                item.patientName
                                              } </p><a class="voice-function" onClick="voiceClick(event)"><i class="fa fa-volume-up voice"></i></a></p>
                                          </div>
                                      </div>
                                      <div class="row-12">
                                          <div class="form-box mb-30">
                                              <p ><p class="treatment-title translation">Patient ID:</p> <p class="treatment-description translation">  ${
                                                item.patientId
                                              } </p><a class="voice-function" onClick="voiceClick(event)"><i class="fa fa-volume-up voice"></i></a></p>
                                          </div>
                                      </div>
                                      <div class="row-12">
                                          <div class="form-box mb-30">
                                              <p><p class="treatment-title translation">Drug Name:</p> <p class="treatment-description t-align">  ${
                                                item.drugName
                                              } </p><a class="voice-function" onClick="voiceClick(event)"><i class="fa fa-volume-up voice"></i></a></p>
                                          </div>
                                      </div>
                                      <div class="row-12">
                                          <div class="form-box mb-30">
                                              <p ><p class="treatment-title translation">Instructions:</p> <p class="treatment-description translation"> Take ${
                                                item.amountType != "cream"
                                                  ? `${item.doseAmount} ${
                                                      item.amountType
                                                    },
                                                     ${
                                                       item.takingMethod ==
                                                       "oral"
                                                         ? `through the mouth`
                                                         : `` // in case of specific
                                                     },`
                                                  : `${item.amountType}`
                                              }  ${
          item.timeType == "specific"
            ? `${item.dosesPerDay} times per day,`
            : item.timeType == "hours"
            ? `every ${item.dosesTime} hours,`
            : `when is needed,`
        }  for ${item.duration}
                                                      day/days.
                                              </p><a class="voice-function" onClick="voiceClick(event)"><i class="fa fa-volume-up voice"></i></a></p>
                                          </div>
                                      </div>
                                      <div class="row-12">
                                          <div class="form-box mb-30">
                                              <p ><p class="treatment-title translation">Treatment Duration:</p> <p class="treatment-description translation">   ${
                                                item.duration
                                              } days</p><a class="voice-function" onClick="voiceClick(event)"><i class="fa fa-volume-up voice"></i></a></p>
                                          </div>
                                      </div>
                                      ${
                                        item.timeType != "specific"
                                          ? ""
                                          : `<div class="row-12">
                                          <div class="form-box mb-30">

                                              <p > <p class="treatment-title translation">Dose Taking Time:</p> <p class="treatment-description translation">${item.dosesTime} </p><a class="voice-function" onClick="voiceClick(event)"><i class="fa fa-volume-up voice"></i></a></p>
                                          </div>
                                      </div>`
                                      }
                                      
                                      <div class="row-12">
                                          <div class="form-box mb-30">
                                              <p ><p class="treatment-title translation">Additional Comments:</p> <p class="treatment-description translation"> ${
                                                item.comment
                                              }</p><a class="voice-function" onClick="voiceClick(event)"><i class="fa fa-volume-up voice"></i></a></p>
                                          </div>
                                      </div>
                                      <hr>
                                      </br>
                                </div>
                                   `;
      });
      document.querySelector("#contact-form").innerHTML = output;
      // read page text because it has been changed
      settings.data.q = readPageText();
      beginTranslation(currentLanguage);
    },
  });
}

function navigateToReceipt() {
  $("#signin").addClass("hide");
  $("#make-receipt").removeClass("hide");
}

// Speech Section

function voiceClick(e) {
  e = e || window.event;
  var target = e.target || e.srcElement;

  // getting the parent of the target to go to the siblings
  target = target.parentElement;
  let fieldDescription = target.previousElementSibling;
  let fieldTitle = fieldDescription.previousElementSibling;

  const fullContent = fieldTitle.textContent + fieldDescription.textContent;
  fetchLanguages(fullContent);
}

function fetchLanguages(fullContent) {
  $.ajax({
    type: "GET",
    url: `/language`,
    dataType: "html", //expect html to be returned
    success: function (response) {
      responseJson = JSON.parse(response);
      let languageVoiceName = "";
      let languageVoiceNumber = 0;
      responseJson.receipt.forEach((language) => {
        let languageCode = language.value.split("-")[0];
        // console.log(languageCode);
        if (languageCode == currentLanguage) {
          languageVoiceName = language.voiceName;
          languageVoiceNumber = language.voiceNumber;
          speakNow(fullContent, languageVoiceName, languageVoiceNumber);
          return;
        }
      });
    },
  });
}

function addRecept() {
  $.ajax({
    type: "POST",
    url: "url",
    data: data,
    success: success,
    dataType: dataType,
  });
}
function speakNow(content, languageVoiceName, languageVoiceNumber) {
  // Check if Speech Synthesis is supported
  console.log(content, languageVoiceName, languageVoiceNumber);
  const text = content;
  const speech = window.speechSynthesis;
  if ("speechSynthesis" in window) {
    const msg = new SpeechSynthesisUtterance();
    const voices = speech.getVoices();
    msg.voice = voices[languageVoiceNumber];
    msg.lang = languageVoiceName;
    msg.text = text;
    window.speechSynthesis.speak(msg);
  } else {
    // Speech Synthesis Not Supported
    alert("Sorry, your browser doesn't support text to speech!");
  }
}

// Doctor Section

// set date field to today
var today = new Date().toISOString().slice(0, 10);
$("#receiptDate").val(today);

$("#amountType input") // select the radio by its id
  .on("change", function () {
    // bind a function to the change event
    let amountType = $('input[name="amountType"]:checked').val();
    switch (amountType) {
      case "capsules":
        $("#doseAmount label").html("Number of Capsules per Dose:");
        $("#doseAmount").removeClass("hide");
        $("#takingMethod").removeClass("hide");
        $("#doseAmount select").empty();

        for (i = 1; i <= 10; i++) {
          $("#doseAmount select").append($("<option></option>").val(i).html(i));
        }
        $("#doseAmount p").html("");
        break;
      case "syrup":
        $("#doseAmount label").html("Amount (ml) per dose:");
        $("#doseAmount").removeClass("hide");
        $("#takingMethod").removeClass("hide");
        $("#doseAmount select").empty();

        for (i = 1; i <= 15; i++) {
          $("#doseAmount select").append($("<option></option>").val(i).html(i));
        }
        $("#doseAmount p").html("ml");
        break;
      case "cream":
        $("#doseAmount").addClass("hide");
        $("#takingMethod").addClass("hide");
        break;
    }
  });

$("#timeType input") // select the radio by its id
  .on("change", function () {
    // bind a function to the change event
    let timeType = $('input[name="timeType"]:checked').val();
    console.log(timeType);
    switch (timeType) {
      case "specific":
        $("#dosesTime").removeClass("hide");
        $("#dosesTime select").empty();
        $(".specificTimesEnums").removeClass("hide");
        $(".dosePerDay").removeClass("hide");

        $("#dosesTime label[for='dosesNumberOfTimesSelect']").html(
          "Number of doses per a day:"
        );
        $("#dosesTime label[for='dosesTimeSelect']").html(
          "When is the dose taken:"
        );

        // $("#takingMethod").removeClass("hide");

        for (i = 1; i <= 6; i++) {
          $("#dosesTime select[id='dosesNumberOfTimesSelect']").append(
            $("<option></option>").val(i).html(i)
          );
        }
        $("#dosesTime select[id='dosesTimeSelect']").append(
          $("<option></option>").val("Before any meal").html("Before meals")
        );
        $("#dosesTime select[id='dosesTimeSelect']").append(
          $("<option></option>").val("After lunch").html("After meals")
        );
        $("#dosesTime select[id='dosesTimeSelect']").append(
          $("<option></option>").val("After lunch").html("Before sleep")
        );
        $("#dosesTime select[id='dosesTimeSelect']").append(
          $("<option></option>").val("Before sleep").html("On an empty stomach")
        );
        $("#dosesTime select[id='dosesTimeSelect']").append(
          $("<option></option>").val("At any time").html("At any time")
        );
        break;
      case "hours":
        $("#dosesTime").removeClass("hide");
        $("#dosesTime select").empty();
        $("#dosesTime label[for='dosesTimeSelect']").html(
          "Number of hours per a dose:"
        );
        for (i = 2; i <= 12; i = i + 2) {
          $("#dosesTime select[id='dosesTimeSelect']").append(
            $("<option></option>").val(i).html(i)
          );
        }
        $(".dosePerDay").addClass("hide");
        break;
      case "whenNeeded":
        $("#dosesTime").addClass("hide");
        break;
    }
  });

function submitReceipt() {
  $("#make-receipt").empty();
  document.querySelector("#make-receipt").innerHTML =
    '<img src="assets/img/qr.png" style="width: 100%">';
}
