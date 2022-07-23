textList = "";
$(".translation").each(function (i, item) {
  if (i != 0) {
    textList += " | ";
  }
  if ($(this).html() != "") {
    cleaned = $(this)
      .text()
      .replace(/\r?\n|\s/g, "");
    textList += cleaned;
  } else {
    textList += item.placeholder;
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
    "x-rapidapi-key": "be22973d11mshb2d2484c0dba20dp15577cjsn0115664a019a",
    "content-type": "application/x-www-form-urlencoded",
  },
  data: {
    source: "en",
    q: textList,
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
  console.log("here ");

  $(".dropdown-item").click(function (e) {
    // to get the abbreviation of the desired language
    if ($(this).attr("tolang") != "en") {
      settings.data.target = $(this).attr("tolang");

      fetchTranslation();

      $("button").html($(this).html());
    } else {
      console.log();
      updatePlaceholders(settings.data.q);
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
  id = $("#userId").text();
  console.log("here " + id);
  await makeAjaxCall("GET", `/receipt/${id}/`, "", (err, resp) => {
    if (!err) {
      let output = resp.length > 0 ? "" : "<h2>No Comments</h2>";
      output += ` <form class="col-lg-6" id="commentForm">
                                <input type="hidden" name="flower_id" value="${id}">
                                <input type="text" name="author" class="form-control" placeholder="Your name" required>
                                <textarea name="comment" class="form-control" cols="30" rows="5" placeholder="Your comment" required></textarea>
                                <div>
                                    <button name="submit"   type="button" onclick="sendForm()" class="btn btn-outline-primary float-end" >Add A Comment</button>
                                </div>
                            </form>`;
      if (resp.length > 0) {
        resp.forEach((comment) => {
          output += `
                       <div class="col-lg-6">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"> ${comment["author"]}</h4>
                                <p class="card-text"> ${comment["comment"]}</p>
                            </div>
                        </div>
                      </div>`;
        });
      }
      document.querySelector("#commentsRow").innerHTML = output;
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
