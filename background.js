function createNotification(text){
    var opt={
    type: "basic",
  title: "Quora Notification",
  message: String(text),
  iconUrl: "icons/icon-128.png",
  }
  chrome.notifications.create('quora',opt,function(id){});
}



function getNotifications(){
  console.log("Running");
  var request= new XMLHttpRequest();
  request.open("GET","http://www.quora.com/api/logged_in_user?fields=inbox,notifs",true);
  request.send();
  request.onreadystatechange= function(){

 var data=request.responseText;
 if (data!="while(1);"){
 data=data.replace("while(1);","");
 js=jQuery.parseJSON(data);
 chrome.storage.local.get(['message','notif'], function (result){
  messages=String(js.inbox.unread_count);
 notifs=String(js.notifs.unseen_count);
  chrome.storage.local.set({'message': messages});
 chrome.storage.local.set({'notif': notifs});
 if (result.message&&result.notif){
 if (messages>result.message&&notifs>result.notif){
   createNotification("You have "+ messages + " unread messages and " + notifs + " unread notifications");

 }

 else if (messages>result.message){
    createNotification("You have " + messages + " unread messages");

 }
 else if (notifs>result.notif){
  createNotification("You have "+ notifs + " unread notifications ");

 }
}
else{
  createNotification("You have "+ messages + " unread messages and " + notifs + " unread notifications");
}
 });
 

 }
 else{

 }
  }


}
setInterval(getNotifications,10000);

chrome.omnibox.onInputEntered.addListener(function(text){
  var textArray=text.split(" ");
  var output='';
  for (var i=0;i<textArray.length;i++){
    output= output + encodeURIComponent(textArray[i]) + "+";
  }
  console.log(output);
  nav("https://www.quora.com/search?q=" + output);
});
chrome.notifications.onClicked.addListener(function(){
  create("https://www.quora.com/notifications");
});
chrome.contextMenus.create({
    "title": "Open Quora",
    "contexts": ["page", "image", "link"],
    "onclick" : openIt
  });
chrome.contextMenus.create({
    "title": "Search On Quora",
    "contexts": [ "selection"],
    "onclick" : search
  });
function search(e){
   var textsArray=e.selectionText.split(" ");
  var outputs='';
  for (var i=0;i<textsArray.length;i++){
    outputs= outputs + encodeURIComponent(textsArray[i]) + "+";
  }
  create("https://www.quora.com/search?q=" + outputs);
}
function openIt(){
  create("https://www.quora.com");
}
function nav(url){
  chrome.tabs.query({active:true,currentWindow:true},function(tabs){
    chrome.tabs.update(tabs[0].id,{url:url});
  });
}
function create(argv){
  
  chrome.tabs.create({'url':argv});
}
