<?php
    phpinfo();
    $name = $_POST['name'];
    $email = $_POST['email'];
    $comment = $_POST['comment'];
    
    $from = 'From: ArtistFinder'; 
    $to = 'samuhill@gmail.com'; 
    $subject = "Contacting you through ArtistFinder";

    $body = "$name\n Comment:\n $comment\n From: $email";
    
    if (isset($_POST['submit'])) {
       if (mail ($to, $subject, $body, $from)) { 
	   echo '<p>Thanks for the comments!</p>';
       } else { 
	   echo '<p>Something is messed up. <a href="index.php">Go back.</a></p>'; 
	}
    }
?>

<!DOCTYPE html>
<!--[if lte IE 6]><html class="preIE7 preIE8 preIE9"><![endif]-->
<!--[if IE 7]><html class="preIE8 preIE9"><![endif]-->
<!--[if IE 8]><html class="preIE9"><![endif]-->
<!--[if gte IE 9]><!--><html><!--<![endif]-->
 <head>
  <meta charset="UTF-8">
  <title>Comments: Client-side programming: Project 1</title>
  <meta name="author" content="Samuel Hill">
  <meta name="description" content="artist finder - finds music you like based on your choices.">
  <link rel="shortcut icon" href="favicon.ico" type="img/favicon.ico">
  <link href='http://fonts.googleapis.com/css?family=Fauna+One' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="assets/css/main.css" type="text/css">
  
 </head>

 <body">
	<div id="header">
          <h1>Artist Finder - Comments</h1>
	  <a href="index.html">go back</a>
          <h3>Send a comment!</h3>
        </div>
       
       
       <div id="main">
	      <form id="comment-form" onsubmit="validate(['name'],['email'],['comment']);" method="post" action="comment.php">
		     <label for="name">Name<input type="text" name="name" id="name" /></label>
		     <label for="email">Email<input type="email" name="email" id="email" /></label>
		     <label for="comment">Comment<textarea name="comment" id="comment"></textarea></label>
		     <input type="submit" value="Send" />
	      </form>
       </div>
       
       <a href="index.html">go back</a>
       
   <div id="footer">
     <p>Uses the <a href="http://www.last.fm">Last.fm</a> API. Written by <a href="http://www.samjhill.com">Sam Hill</a> 2014.</p>
   </div>
  
  <script type="text/javascript" src="assets/js/validate.js"></script>
  
 </body>
</html>
