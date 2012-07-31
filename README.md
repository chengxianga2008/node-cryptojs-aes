node-cryptojs-aes
=================

**node-cryptojs-aes** is a minimalist port of cryptojs javascript library to node.js, that supports AES symmetric key cryptography.

Unlike node.js native crypto library, **node-cryptojs-aes** removes openssl dependency.

It is built upon award winning browser side javascript library CryptoJS. currently, it has been updated to be compatible with CryptoJS version 3.0.2. 

**node-cryptojs-aes** doesn't make any modification to original cryptojs library, the syntax remains the same in accordance with [CryptoJS documentation](http://code.google.com/p/crypto-js/). 

**node-cryptojs-aes** doesn't rely on any external library, such as native openssl libary or any external node.js modules. As a node.js module, it can simply be installed through npm package management system. There is no configuration needed also.

## Features

  * **Self Contained** It doesn't rely on any external dependency.
  * **Server Side Cryptography** It is the only up and running server side javascript cryptography library so far. 
  * **Cross Platform** It is working across all node.js supported platform.
  * **Code Base** Browser side and server side are running identical javascript cryptography codebase. It allows coder to migrate any browser side logic to server or vice versa without any modification. The message passing between server side and client side has been drastically simplified. The encrypted JSON data is passed between client side and server side without any additional parsing or encoding effort made on both side.
  * **AES symmetric key cryptography** It supports AES-128, AES-192 and AES-256 Encryption.
  * **Encoding** It supports Base64 encoding, Hexadecimal, Utf-8 and binary.
  * **Cipher Input** The key or iv(initialization vector) can be passed in as parameter of encryption function, or single passphrase can be passed in as parameter.

## Sample Usage

## Installation

Install through npm

```
npm install node-cryptojs-aes
```

## Donation

To support the developer's development and contribute to open source community and node.js community, you might donate money to help out your fellowmen, no matter how large or small, it all counts. With your effort, we can make a better world, Thank you.

[![Donate to author](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=DB26KWR2BQX5W)




