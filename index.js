const encryption = require('./tools/encryption')
const token = require('./tools/token')

class AuthManager {
    constructor(encryption_key, salt) {
        this.users = {}
        this.tokens = {}
        this.key = encryption_key
        this.salt = salt
    }

    getUsers() {
        return this.users
    }

    createUser(username, unencrypted_password, other) {
        let password = this.encryptPassword(unencrypted_password)
        this.users[username] = {
            username: username,
            password: password,
            data: other
        }
        return this.users[username]
    }

    verifyUser(password, username) {
        const usersPassword = this.decryptPassword(
            this.users[username]?.password
        )
        if (password === usersPassword) {
            return true
        } else {
            return false
        }
    }

    getUser(username) {
        return this.users[username] || {}
    }

    deleteUser(username) {
        this.users[username] = undefined
    }

    changePassword(username, newPassword) {
        this.users[username].password = this.encryptPassword(newPassword)
    }

    encryptPassword(password) {
        return encryption.encrypt(
            this.salt + encryption.encrypt(
                this.salt + password,
                this.key
            ),
            this.key
        )
    }

    decryptPassword(encrypted_password) {
        return encryption.decrypt(
            encryption.decrypt(
                encrypted_password,
                this.key
            ).substring(this.salt.length),
            this.key
        ).substring(this.salt.length)
    }

    createToken(TokenUsername) {
        let tokenValue = token(50000)
        if (this.tokens[tokenValue] === undefined) {
            this.tokens[tokenValue] = {
                username: TokenUsername
            }
        } else {
            return this.createToken(TokenUsername)
        }
        return tokenValue
    }

    checkToken(tokenValue) {
        if (this.tokens[tokenValue] === undefined) {
            return [false, undefined]
        }

        const user = this.tokens[token].username

        return [true, user]
    }

    deleteToken(token) {
        if (this.checkToken(token)[1]) {
            this.tokens[token] = undefined
        }
    }

    inportData(data) {
        this.users = data.users
        this.key = data.key
        this.salt = data.salt
        this.tokens = {}
    }

    exportData() {
        return {
            users: this.users,
            key: this.key,
            salt: this.salt
        }
    }
}

module.exports = AuthManager