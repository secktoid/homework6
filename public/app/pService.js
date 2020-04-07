var PRACTICE_SERVICE = (function() {
  var _db;
  var _currentPageID;

  var _getAllData = function(callback) {
    _db
      .collection("Pages")
      .get()
      .then(function(querySnapshot) {
        callback(querySnapshot);
      });
  };

  var _updateData = function(id, newContent, callback) {
    var newObj = { navName: newContent };

    _db
      .collection("Pages")
      .doc(id)
      .update(newObj)
      .then(function() {
        _getAllData(callback);
      });
  };

  var _deleteData = function(id) {
    console.log("anything");

    _db
      .collection("Pages")
      .doc(id)
      .delete();
  };

  var _addData = function(navName, callback) {
    let pageFakeData = {
      navName: navName,
      content: "<h1>HELLO</h1>",
      subNavs: []
    };

    _db
      .collection("Pages")
      .add(pageFakeData)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        callback("New Navigation Added");
      })
      .catch(function(error) {
        console.log("Error adding document: ", error);
      });
  };

  var _checkPages = function(mainNavName, callback) {
    var pages = _db.collection("Pages");
    pages
      .where("navName", "==", mainNavName)
      .get()
      .then(function(querySnapshot) {
        if (querySnapshot.empty) {
          _addData(mainNavName, callback);
        } else {
          callback("duplicate");
        }
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };

  var _initFirebase = function(callback) {
    firebase
      .auth()
      .signInAnonymously()
      .then(function(result) {
        console.log("connected");
        _db = firebase.firestore();
        callback();
      });
  };
  return {
    initFirebase: _initFirebase,
    addData: _addData,
    checkPages: _checkPages,
    getAllData: _getAllData,
    updateContent: _updateData,
    deleteContent: _deleteData
  };
})();
