// This code creates a server using express and body-parser. 
// It uses the post method to get the data from the form, and sends the data to the mailchimp server using the API key 
// and the List ID. The data is sent as a JSON object. 
// If the response status is 200, the user is redirected to the success page. 
// If the status is not 200, the user is redirected to the failure page.

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const data = {
        members: [
            {
              email_address: email,
              status: "subscribed",
              merge_fields: {
                FNAME: firstName,
                LNAME: lastName
              }
            }
        ]
    };
    var jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/d948d7b0a4";
    const options = {
        method: "POST",
        auth: "Sai1:4cb991a3acc4ddac670895acf69b93c4-us21"
    }
    const request = https.request(url, options, function(response) {
      if(response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      } 
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.post("/success", function(req, res) {
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

//API Key
// 4cb991a3acc4ddac670895acf69b93c4-us21
//List ID
// d948d7b0a4