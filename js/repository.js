(function () {
    window.repository = window.repository || {};

    repository.trackHrt = function (hrt) {
		    	var xhr = new XMLHttpRequest();
		    	xhr.open("POST", 'http://192.168.0.3:3000/hrt', true);
		
		    	xhr.setRequestHeader("Content-Type", "application/json");
		
		    	xhr.onreadystatechange = function() { // Call a function when the state changes.
		    	    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
		    	    	// fire and forget
		    	    }
		    	    console.log(this.readyState)
		    	    
		    	    console.log(this.status)
		    	}
		    	var param = {
		    			  "Rate": hrt,
		    			  "additionalProp1": {}
		    			}
		    	xhr.send(JSON.stringify(param));
    }

})();  