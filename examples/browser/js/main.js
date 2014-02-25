// browser side implementation

jQuery(document).ready(function($){
	$.get("/crypto", function(data){

	    // retrieve encrypted json string 
	    var encrypted_json_str = data.encrypted;

	    console.log("encrypted json string is: " + encrypted_json_str);

	    // retrieve passphrase string
	    var r_pass_base64 = data.passphrase;

	    console.log("passphrase is: " + r_pass_base64);

	    // decrypt data with encrypted json string, passphrase string and custom JsonFormatter
	    var decrypted = CryptoJS.AES.decrypt(encrypted_json_str, r_pass_base64, { format: JsonFormatter });

	    // convert to Utf8 format
	    var decrypted_str = CryptoJS.enc.Utf8.stringify(decrypted);

	    console.log("decrypted string: " + decrypted_str);
	});
});