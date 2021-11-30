
var config = {}

$.holdReady(true);
$.getJSON("config.json", function(json) {
	config = json
	$.holdReady(false);
});

$(function() {
	grecaptcha.ready(function(){
    grecaptcha.render("recaptcha", {
      sitekey: config.recaptchaKey
    });
  });

	var loader = $(".loading-container");
	$("#logo").attr("src", config.logoUrl);
	$("#title").html(config.title);
	$("#footer").html(config.footer);
	$("#requestTokens").html(config.buttonText);

	$( "#faucetForm" ).submit(function( e ) {
		e.preventDefault();
    	$this = $(this);
		loader.removeClass("hidden");
		var receiver = $("#receiver").val();
		$.ajax({
		  	url:"/",
		  	type:"POST",
		  	data: $this.serialize()
		}).done(function(data) {
			grecaptcha.reset("recaptcha");
			if (!data.success) {
				loader.addClass("hidden");
				console.log(data)
				console.log(data.error)
				swal("Error", data.error.message, "error");
				return;
			}

			$("#receiver").val('');
			loader.addClass("hidden");
			swal("Success",
			  `ETH has been successfully transferred to ${receiver}`,
			  "success"
			);
		}).fail(function(err) {
			grecaptcha.reset("recaptcha");
			console.log(err);
			loader.addClass("hidden");
		});
	});
});
