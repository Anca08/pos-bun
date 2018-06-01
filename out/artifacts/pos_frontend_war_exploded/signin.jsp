<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Log in with your account</title>

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/app.css" rel="stylesheet" type="text/css">
    <link href="css/common.css" rel="stylesheet" type="text/css">
    <script src="js/jquery.min.js" type="text/javascript"></script>
    <script src="js/scripts.js" type="text/javascript"></script>
    <script src="js/bootstrap.min.js" type="text/javascript"></script>
</head>

<body>

<header class="header">
    <nav class="col-md-9 col-xs-9">
        <ul>
            <a href="index.jsp"><li>Home</li></a>
            <a href="signin.jsp"><li>Page1</li></a>
            <a href="articles.jsp"><li>New article</li></a>

        </ul>

    </nav>
    <div class="col-md-3 col-xs-3 loginButtons">
        <a href="signin.jsp"><button>Sign in</button></a>
        <a href="login.jsp"><button>Log in</button></a>
    </div>
    <div id="logoutButtons" class="col-md-3 col-xs-3" style="display:none">
        <span id="displayUsername"></span>
        <button type="button" onclick="logout()">Logout</button>
    </div>
</header>
<div class="container form-signin">
    <div class="col-md-6">
        <div style="color:red" id="err_msg_signin" ></div>
        <label for = "userName">User Name</label>
        <input id = "userName" type = "text" /><br/>

        <label for = "password">Password</label>
        <input id = "password" type = "password" /><br/>
        <label for = "retypePassword">Retype Password</label>
        <input id = "retypePassword" type = "password" /><br/>

    </div>
    <div class="col-md-12">
        <input type = "submit" value="Sign in" id = "signIn" />
    </div>
</div>

</body>
</html>

