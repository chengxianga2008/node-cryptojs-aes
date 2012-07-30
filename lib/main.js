jQuery(document).ready(function($){
	var key = CryptoJS.enc.Base64.parse("2LcqL0CScAn05Cg7JxRuhA==");
	var iv = CryptoJS.enc.Base64.parse("2LcqL0CScAxRuhA==");
	
	var encrypted = CryptoJS.AES.encrypt("I love maccas", key, {iv: iv});
	var encrypted_base64 = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
	
	var encrypted_obj = CryptoJS.enc.Base64.parse(encrypted_base64);
	
	
	console.log(encrypted_base64);
	var decrypted = CryptoJS.AES.decrypt(encrypted, key, {iv: iv});
	
	var words = decrypted.words;
	console.log(words);
	var str = CryptoJS.enc.Utf8.stringify(decrypted);
	console.log(str);
	
	
});