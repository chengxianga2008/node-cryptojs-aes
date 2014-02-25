// browser side implementation

jQuery(document).ready(function($){
	
	// define server cipherParams JSONP path
	var encrypted_url = "http://localhost:3000/crypto/encrypted?callback=?";
	
	// JSONP AJAX call to node.js server running on localhost:3000
	$.getJSON(encrypted_url, function(data){

	    // retrieve encrypted json string 
	    var encrypted_json_str = data.encrypted;

	    console.log("encrypted json string: ");
	    console.log(encrypted_json_str);

	});
	
	// define server passphrase JSONP path
	var passphrase_url = "http://localhost:3000/crypto/passphrase?callback=?";
	
	// JSONP AJAX call to node.js server running on localhost:3000
	$.getJSON(passphrase_url, function(data){

		// retrieve passphrase string
	    var r_pass_base64 = data.passphrase;

	    console.log("passphrase: ");
	    console.log(r_pass_base64);

	});
	
	
    // decrypt data with encrypted json string, passphrase string and custom JsonFormatter
    var decrypted = CryptoJS.AES.decrypt(encrypted_json_str, r_pass_base64, { format: JsonFormatter });

    // convert to Utf8 format
    var decrypted_str = CryptoJS.enc.Utf8.stringify(decrypted);

    console.log("decrypted string: " + decrypted_str);
});