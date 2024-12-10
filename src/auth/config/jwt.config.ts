import { registerAs } from "@nestjs/config";


export default registerAs("JWT" , () => {
return {
    secret : process.env.JWT_SECRET,
    audience : process.env.JWT_TOKEN_AUDIENCE,
    issuer : process.env.JWT_TOKEN_ISSUER,
    accesTokenTtl : parseInt(process.env.JWT_TOKEN_TTL ?? "3600" ,10),
    JWT_REFRESH_TOKEN_TTL : parseInt(process.env.JWT_REFRESH_TOKEN_TTL ?? "86400" , 10),
    googleClientId : process.env.GOOGLE_CLIENT_ID,
    googleClientSecret : process.env.GOOGLE_CLIENT_SECRET,
}
})