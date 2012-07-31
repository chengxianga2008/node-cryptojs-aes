node-cryptojs-aes
=================

**node-cryptojs-aes** is a minimalist port of cryptojs javascript library to node.js, that supports AES symmetric key cryptography.

Unlike node.js native crypto library, **node-cryptojs-aes** removes openssl dependency.

It is built upon award winning browser side javascript library CryptoJS. currently, it has been updated to be compatible with CryptoJS version 3.0.2. 

**node-cryptojs-aes** doesn't make any modification to original cryptojs library, the syntax remains the same in accordance with [CryptoJS documentation](http://code.google.com/p/crypto-js/). 

**node-cryptojs-aes** doesn't rely on any external library, such as native openssl libary or any external node.js modules. As a node.js module, it can simply be installed through npm package management system. There is no configuration needed also.

**node-cryptojs-aes** maximises node.js design spirit. Browser side and server side are running identical javascript cryptography codebase. It allows coder to migrate any browser side logic to server or vice versa without any modification. The message passing between server side and client side has been drastically simplified. The encrypted JSON data is passed between client side and server side without any additional parsing or encoding effort made on both side.

## Features

  * **Self Contained** It doesn't rely on any external dependency.
  * **Server Side Cryptography** It is the only up and running server side javascript cryptography library so far. 
  * **Cross Platform** It is working across all node.js supported platform.
  * **Code Base** Browser and Server share same codebase.
  * **AES symmetric key cryptography** It supports AES-128, AES-192 and AES-256 Encryption.
  * **Encoding** It supports Base64 encoding, Hexadecimal, Utf-8 and binary.
  * **Cipher Input** The key or iv(initialization vector) can be passed in as parameter of encryption function, or single passphrase can be passed in as parameter.

## Sample Usage

This is a complete example of server encrypt data, browser request encrypted data and passphrase, and processing decipher subsequently.

The logic on node.js server http request handler consists of two parts.

Right off the bat, it generates random passphrase.

```javascript
//import crypto module to generate random binary data
var crypto = require('crypto');

// generate random passphrase binary data
var r_pass = crypto.randomBytes(128);

// convert passphrase to base64 format
var r_pass_base64 = r_pass.toString("base64");

console.log(r_pass_base64);
```

Then, it performs data encryption

```javascript
//import node-cryptojs-aes modules to encrypt or decrypt data
var node_cryptojs = require('node-cryptojs-aes');

//node-cryptojs-aes main object;
var CryptoJS = node_cryptojs.CryptoJS;

// custom json serialization format
var JsonFormatter = node_cryptojs.JsonFormatter;

// encrypt plain text with passphrase and custom json serialization format, return CipherParams object
var encrypted = CryptoJS.AES.encrypt("I love maccas!", r_pass_base64, { format: JsonFormatter });

// convert CipherParams object to json string for transmission
var encrypted_json_str = encrypted.toString();

console.log(encrypted_json_str);
```

JsonFormatter is a custom json serialization implementation, you might create your prefered json serialization to fit into your own structure. The code snippets of JsonFormatter shipped with **node-cryptojs-aes** is as follows.

```javascript
//create custom json serialization format
var JsonFormatter = {
	stringify: function (cipherParams) {
		// create json object with ciphertext
		var jsonObj = {
			ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
		};
		
		// optionally add iv and salt
		if (cipherParams.iv) {
			jsonObj.iv = cipherParams.iv.toString();
		}
		
		if (cipherParams.salt) {
			jsonObj.s = cipherParams.salt.toString();
		}

		// stringify json object
		return JSON.stringify(jsonObj)
	},

	parse: function (jsonStr) {
		// parse json string
		var jsonObj = JSON.parse(jsonStr);
		
		// extract ciphertext from json object, and create cipher params object
		var cipherParams = CryptoJS.lib.CipherParams.create({
			ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
		});
		
		// optionally extract iv and salt
		if (jsonObj.iv) {
			cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv);
		}
            
		if (jsonObj.s) {
			cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s);
		}
		
		return cipherParams;
	}
};
```

If running express to serve http request on node.js, the response can be

```javascript
app.get('/crypto', function(request, response) {

    // encryption logic here

    response.json({
	encrypted : encrypted_json_str,
	passphrase : r_pass_base64
    });

});
```

On browser side, it will query the encrypted json string and also passphrase. If using AJAX to access, the code can be

```javascript
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
```

Also remember to add cryptojs javascript library and JsonFormatter to your index.html file.

```html
<script type="text/javascript" src="http://chengxianga2008.github.com/node-cryptojs-aes/client/aes.js"></script>
<script type="text/javascript" src="http://chengxianga2008.github.com/node-cryptojs-aes/client/jsonformatter.js"></script>
```


## Installation

Install through npm

```
npm install node-cryptojs-aes
```

## Changelog

**node-cryptojs-aes** Version 0.3.7 - 01/08/2012
  
  * Add browser side support

**node-cryptojs-aes** Version 0.3.4 - 21/07/2012

  * update to cryptojs v3.0.2

## Donation

To support the developer's development and contribute to open source community and node.js community, you might donate money to help out your fellowmen, no matter how large or small, it all counts. With your effort, we can make a better world, Thank you.

[![Donate to developer](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QPDFGUA4XRX5E)


