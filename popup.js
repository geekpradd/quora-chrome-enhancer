var request= new XMLHttpRequest();
  request.open("GET","http://www.quora.com/api/logged_in_user?fields=inbox,notifs",true);
  request.send();
  request.onreadystatechange= function(){

 var data=request.responseText;
 if (data!="while(1);"){
 data=data.replace("while(1);","");
 js=jQuery.parseJSON(data);
 messages=String(js.inbox.unread_count);
 notifs=String(js.notifs.unseen_count);
 if (messages!=0&& notifs!=0){
 $('.message').text("You have " + messages + " messages and " + notifs + " notifications");
}
else if(messages!=0){
	$('.message').text("You have " + messages + " messages ");
}
else if (notifs!=0){

	$('.message').text("You have " + notifs + " notifications ");
}
else{
	$('.message').text("You don't have any new notifications and messages");
}
}
else{
	$('.content').html("<p align='center'>Log in to Quora to use this extension</p><center><a class='button' href='http://www.quora.com' target='_blank'>Log In</a><br><br></center>");
}
}