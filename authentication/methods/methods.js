const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const errors = require('../../responses/errors');
const keys = require('../../config/keys');

const algorithm = 'aes-256-cbc';
const clearEncoding = 'utf8';
const cipherEncoding = 'hex';

module.exports.authenticateToken = function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const { token } = req.body;
  const decryptedToken = decrypt(token);

  jwt.verify(decryptedToken, keys.JWT_TOKEN_KEY, function(err, decoded) {

    //Check if token is valid
    if (err) { //failed verification.
      return res.json(errors.INVALID_TOKEN);
    }

    const expdate = decoded.expiresIn;
    const iat = decoded.iat;

    //Token expiration check 
    const timeNow = Math.floor(Date.now() / 1000);
    if (timeNow - iat > expdate) {
      return res.json(errors.TOKEN_EXPIRED);
    }

    next();

  });

}

function encrypt(message) {
  try {
    var cipher = crypto.createCipheriv(algorithm, keys.ENCRYPTION_KEY_TOKEN, keys.TOKEN_CIPHER_IV);
    var cipherChunks = [];
    cipherChunks.push(cipher.update(message, clearEncoding, cipherEncoding));
    cipherChunks.push(cipher.final(cipherEncoding));
    var encstr = cipherChunks.join('');
    
  } catch (error) {
    console.warn("Error: ", error.message)
  }

  return encstr;
	
}

function decrypt(message) {
	try {
    var cipherChunks = [message];
    var decipher = crypto.createDecipheriv(algorithm, keys.ENCRYPTION_KEY_TOKEN, keys.TOKEN_CIPHER_IV);
		var plainChunks = [];
		for (var i = 0; i < cipherChunks.length; i++) {
			plainChunks.push(decipher.update(cipherChunks[i], cipherEncoding, clearEncoding));
		}
		plainChunks.push(decipher.final(clearEncoding));
		var decstr = plainChunks.join('');
	}
	catch (err) {
		console.log("An error occured while decryption: " + err);
	}
	return decstr;
}

module.exports.generateJWTToken = function generateJWTToken(values, expirationTime = 6000) {
  let encryptedToken;
  try {
    const newToken = jwt.sign({
      username: values.username,
      expiresIn: expirationTime
    }, keys.JWT_TOKEN_KEY);
  
    encryptedToken = encrypt(newToken);
    
  } catch (error) {
    console.warn(error);
  }

  return encryptedToken;
}