# elementary-auth

A simple auth library for the authentication of users in web apps or APIs

Developed By [MrShoe_](https://github.com/MrShoeShoe66/)

# Install

To install elementary-auth use this command:

```shell
npm install elementary-auth
```

# Usage

To use the library you first need to initalise the authentication object

```js
const authenticationManager = require('elementary-auth')

const authManager = new authenticationManager(
    encryption_key,
    salt
)
```

The encryption_key is used to encrypt and protect your users password for you so you dont need to encrypt the data yourself

and the salt is used to help protect the password so that any hacker cant brute force any passwords and help keep them protected

## createUser

Here is how you can create a user

```js
authManager.createUser(
    username,
    password,
    other
)
```

The username and password are obvious, but the other item is used to store data for or about the user. For example, you can store things like settings or user role

Return Value:
```js
    return {
        username: usernname,
        password: encrypted_password,
        data, other
    }
```

## checkUser

See if a username is valid

```js
authManager.checkUser(
    username,
    password,
    other
)
```

Return Value:
```js
    return
        true
            ||
        false
```

## getUser

Gets the user object bassed on username

```js
authManager.getUser(username)
```

Return Value:
```js
    return {
        username: usernname,
        password: encrypted_password,
        data, other
    }
```

## verifyUser

This simply checks the users password and verifys if they entered the correct password

```js
authManager.verifyUser(username, password)
```

this simply returns a true/false value

## deleteUser

Deletes a user bassed on the username

```js
authManager.deleteUser(username)
```

## changePassword

Simply changes the users password bassed on the username

```js
authManager.changePassword(username, newPassword)
```

## Tokens

Tokens are normaly used for authentication in web apps and can be stored in the cookies or as JWT on the client or browser  

### createToken

Create token generates a 50000 long string uniqe to there user sesson 

```js
authManager.createToken(username)
```

and this returns the token for the user

### checkToken

Check and verify the token for a user

```js
authManager.checkToken(token)
```

Return Value:
```js
    return  
        [true, username] // If token is valid
            ||
        [false, undefined] // if token is invalid
```

### deleteToken

Simply removes a token from being usable

```js
authManager.deleteToken(token)
```

## importData / exportData

This simply imports and exports the auth data with the `.importData()` and `.exportData()` functions to be stored in a database or other location

# Data storage

if you would like to store your data, we would recomend using a package we also developed, [elementary-db](https://www.npmjs.com/package/elementary-db) a simple database for storing json data