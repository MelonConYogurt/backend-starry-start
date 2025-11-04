var admin = require("firebase-admin");

var serviceAccount = require("./starry-start-dd62d-firebase-adminsdk-fbsvc-ae70fc3c81.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
