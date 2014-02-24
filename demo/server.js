// import crypto module to generate random binary data
var crypto = require('crypto'); 

// generate random passphrase binary data
var r_pass = crypto.randomBytes(128);

// convert passphrase to base64 format
var r_pass_base64 = r_pass.toString("base64");

console.log(r_pass_base64);

// import node-cryptojs-aes modules to encrypt or decrypt data
var node_cryptojs = require('node-cryptojs-aes');

// node-cryptojs-aes main object;
var CryptoJS = node_cryptojs.CryptoJS;

// custom json serialization format
var JsonFormatter = node_cryptojs.JsonFormatter;

// encrypt plain text with passphrase and custom json serialization format, return CipherParams object
var encrypted = CryptoJS.AES.encrypt("I love maccas!", r_pass_base64, { format: JsonFormatter });

// convert CipherParams object to json string for transmission
var encrypted_json_str = encrypted.toString();

console.log(encrypted_json_str);

// browser side
//var encrypted_obj = CryptoJS.enc.Base64.parse(encrypted_base64);


//var jsonr = JSON.parse(encrypted_json_str);

var decrypted = CryptoJS.AES.decrypt(encrypted_json_str, r_pass_base64, { format: JsonFormatter });

//var words = decrypted.words;
//console.log(words);
var str = CryptoJS.enc.Utf8.stringify(decrypted);
console.log("str: " + str );
