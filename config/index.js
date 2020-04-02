module.exports = {
    secretKey: 'secretOrPrivateKey is a string, buffer, or object containing either the secret for HMAC algorithms or the PEM encoded private key for RSA and ECDSA.',
    userPermission: {
        user: ['get'],
        admin: ['get', 'create', 'update'],
        super: ['get', 'create', 'update', 'remove']
    }
}