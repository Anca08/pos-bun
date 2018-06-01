
var BASE_URL = "https://api-pos-backend.herokuapp.com";


$(document).ready(function(){
	
	var token = localStorage.getItem("token");
	
	if(token){
		var base64Url = token.split('.')[1];
    	var base64 = base64Url.replace('-', '+').replace('_', '/');
    	var decode = JSON.parse(window.atob(base64));
		
		var logoutButtons = document.getElementById("logoutButtons");
		$(logoutButtons).css('display','block');
		var loginButtons = document.getElementsByClassName("loginButtons");
		$(loginButtons).css('display','none');
		document.getElementById('displayUsername').innerHTML = "Hello, " + 	decode.sub + "!";

	}
//login
    $("#loginButton").click(function(){
    	var url = BASE_URL+"/auth";

		var username = document.getElementById("userLogin").value ;
		var password =  document.getElementById("passwordLogin").value ;

		var data = {};
		data.username = username;
		data.password  = password;
		var jsonSend = JSON.stringify(data);

		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader('Content-Type','application/json; charset=utf-8');

		xhr.onload = function () { 
			console.log("login onload");
			console.log(xhr.readyState + " " );
		    if (xhr.readyState == 4 && xhr.status == 200) {
		        var json = JSON.parse(xhr.responseText);
				localStorage.setItem('token', json.token); // write
				document.getElementById("error_msg").innerHTML = "Login success!";
				window.location.pathname = 'C:/Users/anast/Desktop/pos_frontend/pos_html/index.html';
				
		    }
			if(xhr.status == 400){				
		        var json = JSON.parse(xhr.responseText);
				if(json.status == 1){
					//$("#error_msg").text = "Username or password not correct. Please fill in again!";
					 document.getElementById("error_msg").innerHTML = "Username or password are not correct. Please fill in again!";
				}
				
			}
				
		}
		xhr.send(jsonSend);
		console.log("login send");
    });

//register
    $("#signIn").click(function(){
    	var url = BASE_URL + "/register";

    	var username = document.getElementById("userName").value ;
		var password =  document.getElementById("password").value ;
		var retypePassword = document.getElementById("retypePassword").value;
		if(password === retypePassword){
				var data = {};
				data.username = username;
				data.password  = password;
				var jsonSend = JSON.stringify(data);

				var xhr = new XMLHttpRequest();
				xhr.open("POST",url,true);
				xhr.setRequestHeader('Content-Type','application/json; charset=utf-8');

				xhr.onload = function() {
					console.log("register onload + status : " + xhr.status);
					if (xhr.readyState == 4 && xhr.status == 200) {
						var json = JSON.parse(xhr.responseText);
						console.log(json);
						document.getElementById("err_msg_signin").innerHTML = "Sign in succeeded";
						window.location.pathname = 'C:/Users/anast/Desktop/pos_frontend/pos_html/index.html';
		  				
					}
					else{
						var mes = JSON.parse(xhr.responseText);
						document.getElementById("err_msg_signin").innerHTML = mes.message.toUpperCase();
						
					}
				}

				xhr.send(jsonSend);
				console.log("register send");
		}
		else{
			document.getElementById("err_msg_signin").innerHTML = "The passwords don't match!";
		}
    });

//createArticle
    $("#insert_new_article").click(function(){
    	var url = BASE_URL + "/createArticle";

    	var articleTitle = document.getElementById("articleTitle").value ;
		var articleContent =  document.getElementById("articleContent").value;

		var data = {};
		data.article_title = articleTitle;
		data.article_content  = articleContent;
		var jsonSend = JSON.stringify(data);

    	var xhr = new XMLHttpRequest();
    	xhr.open("POST",url,true);
    	xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
    	xhr.setRequestHeader('Content-Type','application/json; charset=utf-8');

    	xhr.onload = function() {
		console.log("createArticle onload");
			if (xhr.readyState == 4 && xhr.status == 200) {
		        var json = JSON.parse(xhr.responseText);
		        console.log(json);
		    }
    	}

    	xhr.send(jsonSend);
		console.log("createArticle send");
    });


//updateArticle
	function updateArticle(article_uuid){
		var url = BASE_URL + "/updateArticle";		
		var articleTitle = document.getElementById("articleTitle").value ;
		var articleContent =  document.getElementById("articleContent").value;

		var data = {};
		data.articleTitle = articleTitle;
		data.articleContent  = articleContent;
		data.article_uuid=article_uuid;
		var jsonSend = JSON.stringify(data);

    	var xhr = new XMLHttpRequest();
    	xhr.open("POST",url,true);
    	xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
    	xhr.setRequestHeader('Content-Type','application/json; charset=utf-8');

    	xhr.onload = function() {
		console.log("updateArticle onload");
			if (xhr.readyState == 4 && xhr.status == 200) {
		        var json = JSON.parse(xhr.responseText);
		        console.log(json);
		    }
    	}

    	xhr.send(jsonSend);
		console.log("updateArticle send");
	}
	
	
})
//editArticle
//continutul articolului ar trebui salvat intr-un coockie si refolosit
//transpus in edit mode - in inputuri
function editArticle(){}

function displayArticles(){
	

	var checkArticles = localStorage.getItem("articles");
	var parentDiv = document.getElementsByClassName("displayArticles");
    	var url = BASE_URL + "/getArticles/0";
    	var xhr = new XMLHttpRequest();
    	xhr.open("GET",url,true);
    	//xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));

    	xhr.onload = function() {
			console.log("getArticle onload");
			if (xhr.readyState == 4 && xhr.status == 200) {
		        var json = JSON.parse(xhr.responseText);
				if(json){
					for(var i=0;i<json.length;i++){
						var id = json[i].articleUUID;

						$article = $('<div class="article'+(i) +'">'+ 
						'<h2>'+ json[i].articleTitle+'</h2>' +
						'<button onclick="getArticle(\''+id+'\')">More</button>'+
						'</div>');
						$(parentDiv).append( $article );
						
					}
					
				}
  
		    }
    	}

    	xhr.send(null);
		console.log("getArticlesend");    
}

function logout(){
	var url = BASE_URL+"/logout";
	//
	localStorage.removeItem('token');
	window.location.pathname = 'C:/Users/anast/Desktop/pos_frontend/pos_html/login.html';
	document.getElementById("logoutButtons").css('display','none');
	document.getElementsByClassName("loginButtons").css('display','block');

}

// function getArticle(id){
// 	var url = BASE_URL + "/getArticle/" + id;
// 	var xhr = new XMLHttpRequest();
//     xhr.open("GET",url,true);
//     var parentDiv = document.getElementsByClassName("article");
//     var article ="";
// 	xhr.onload = function() {
// 			console.log("getArticle by id onload");
// 			if (xhr.readyState == 4 && xhr.status == 200) {
// 		        var json = JSON.parse(xhr.responseText);
// 				if(json){
					
// 					$article = $('<div class="article_new"><h2>'+ json.articleTitle+'</h2><p>'+json.articleContent+ '</p></div>');
// 					displayArticle($article);	
// 				}
  
// 		    }
//     	}

//     	xhr.send(null);
						
// }
 
function getArticle(id){
	var url = BASE_URL + "/getArticle/" + id;
	//var pageurl = 'C:/Users/anast/Desktop/pos_frontend/pos_html/article.html';
	var parentDiv = document.getElementsByClassName("displayArticles");
    var dataArticle;
	$(function(e){	   
	    $.ajax({
	    	url:url,
	    	success: function(data){
	    		if(data){

		    		$article = $('<button style="display:none;" id="editArticle" onclick="editArticle(\''+data.articleUUID+'\')"> Edit Article</button>'+

		    			'<div class="article_new"><h2>'+
		    		 data.articleTitle+'</h2><p>'+
		    		 data.articleContent+ '</p></div>'+
		    		 '<div class="addComments" style=>'+
  						'<label for="comment">Comment</label>'+
          				'<input name="comment" id="comment" type="text" class="form-control" placeholder="Add comment" autofocus="true"/>'+
          				'<button class="btn btn-lg btn-primary btn-block" onclick= "addComment(\''+data.articleUUID+'\')" >Add Comment</button>'+
		    		 '</div>'

		    		 );
		    		dataArticle = data.articleUUID;
		      		$('.displayArticles').html($article);
		    		for($i=0; $i<data.comments.length;$i++){
						var comm = data.comments[$i];
						$comments = $('<p class="comments">'+
								comm.comment + '</p>');
						$('.displayArticles').append($comments);
					}
					
		      	}
		      	verifyArticleCreator(dataArticle);
	    	}
	    	
		});
	});
}
function verifyArticleCreator(dataArticle){
	   
	var url = BASE_URL + "/verifyArticleCreator/"+dataArticle;		
	 
	var xhr = new XMLHttpRequest();
	xhr.open("GET",url,true);
	xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
	
	xhr.onload = function() {
	console.log("verifyArticleCreator ");
		if (xhr.status == 200) {
	        var json = JSON.parse(xhr.responseText);
	        $('#editArticle').style("display","block");
	        console.log(json);
	    }
	}

	xhr.send(null);
					

}

//addComment
function addComment(article_uuid){

		var url = BASE_URL + "/createComment";		
		var commentContent = document.getElementById("comment").value ;

		var data = {};
		data.comment = commentContent;
		data.article_uuid = article_uuid;
		var jsonSend = JSON.stringify(data);

		var xhr = new XMLHttpRequest();
    	xhr.open("POST",url,true);
    	xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
    	xhr.setRequestHeader('Content-Type','application/json; charset=utf-8');

    	xhr.onload = function() {
		console.log("addComment onload");
			if (xhr.readyState == 4 && xhr.status == 200) {
		        var json = JSON.parse(xhr.responseText);
		        console.log(json);
		    }
    	}

    	xhr.send(jsonSend);
		console.log("addComment send");

	}