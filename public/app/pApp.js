function addNavListener() {
  $("nav a").click(function(e) {
    console.log("anything");
    var id = e.currentTarget.id;
    var newNavName = $("#updateContent").val();

    PRACTICE_SERVICE.updateContent(id, newNavName, displayData);
  });
}

function addDelListener() {
  $(".deleteData").click(function(e) {
    console.log("anything");
    $("nav a").click(function(e) {
      var id = e.currentTarget.id;

      PRACTICE_SERVICE.deleteContent(id, displayData);
    });
  });
}

function displayData(addData) {
  var container = "<nav>";
  addData.forEach(function(doc) {
    var id = doc.id;
    var rawData = doc.data();
    container += `<a href="#" id="${id}">${rawData.navName}</a>`;
  });
  container += "</nav>";
  $(".showData").html(container);
  addNavListener();
}

function init() {
  $(".getData").click(function(e) {
    PRACTICE_SERVICE.getAllData(displayData);
  });
  addDelListener();

  $("#addData").click(function(e) {
    e.preventDefault();
    console.log("add data");
    let nName = $("#nav-input")
      .val()
      .trim()
      .toLowerCase();

    if (nName != "") {
      console.log("add data");
      PRACTICE_SERVICE.checkPages(nName, alertUser);
      $("#nav-input").val("");
    } else {
      alert("add name");
    }
  });
}

//   $("#checkPages").click(function(e) {
//     e.preventDefault();
//     console.log("check data");
//     PRACTICE_SERVICE.checkPages("home");
//   });
// }

function alertUser(result) {
  alert(result);
}

$(document).ready(function() {
  PRACTICE_SERVICE.initFirebase(init);
});
