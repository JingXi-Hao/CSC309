var token;
var user_id;
console.log(token);
console.log(user_id);
// jQuery Document
$(document).ready(function() {
    // Do some initial setup
    // poll for new messages every 2.5 seconds

    console.log("in user jquery file");
    getalluser();

    //console.log(document);
    $("#register").click(function(){
        registerUser();
    });

    $("#login").click(function(){
        loginUser();
    });    

    function registerUser() {
        var clientusername = $("#username").val();
        var clientemail = $("#email").val();
        var clientpassword = $("#password").val();
        //var clientconfirm = $("#confirm").val();
        console.log(clientusername);
        console.log(clientemail);
        console.log(clientpassword);
        //console.log(clientconfirm);

        $.ajax({
            url: "/users",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify( { "username": clientusername, "email": clientemail, "password":clientpassword} ),
            success: function(response) {
                token = response['token'];
                user_id = response['user_id'];
                //updateUI(name);
                console.log("Success!!!!");
                console.log(token);
                console.log(user_id);
                //window.location.replace("welcomepagenosignin.html");
                window.location.replace("/");
            }
        });

    }

    function loginUser(){
        var loginusername = $("#username").val();
        var loginpassword = $("#password").val();
        console.log(loginusername);
        console.log(loginpassword);
        
        $.ajax({
            url: "/users",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify( { "username": loginusername, "password":loginpassword} ),
            success: function(response) {
                var token = response['token'];
                var user_id = response['user_id'];
                //updateUI(name);
                console.log("Success!!!!");
                window.location.replace("welcomepage.html");
            }
        });        

    }

    function getalluser(){
        var username = []
        $.ajax({
            url:"/users/getalluser",
            type:"GET",
            dataType:"json",
            contentType: "application/json; charset=utf-8",
            success: function(response){
                username = response['alluser'];
                console.log(username);
            }

        })
    }
    
});

