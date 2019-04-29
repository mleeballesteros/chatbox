var socket  = io.connect("http://localhost:7000");

$(document).on("click", "#send", function(){
	sendMessage();
});

$('#message').keyup(function(e){
  if(e.keyCode == 13){
		sendMessage();
  }
});

function sendMessage(){
	var message = $("#message").val();

	socket.emit("chat", {
		message: message,
		user: "Anonymous User",
	});

	$("#message").val("");
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}   

socket.on("chat", function(data){
	var date = formatAMPM(new Date());
	// $("#output").append(`<li><strong>${data.user}</strong>: ${data.message}</li>`);
  control = `<li style="width:100%">
              <div class="msj macro">
              	<div class="avatar"><img class="img-circle" style="width:100%;" src="/default-user.png" /></div>
                <div class="text text-l">
                  <p><strong>${data.user}</strong></p>
                  <p>${data.message}</p>
                  <p><small>${date}</small></p>
                </div>
              </div>
            </li>`;                    

	$("#output").append(control);
});