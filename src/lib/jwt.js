import jwt from "jsonwebtoken";

// Generate access token
export function generateToken(payload) {
    try {
        if (!payload) {
            throw new Error("Payload is required to generate token");
        }

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        return token;

    } catch (error) {
        throw new Error("Error generating token: " + error.message);
    }
}


// Validate access token
export function validateToken(token) {
    try {
        if (!token) {
            throw new Error("Token is required for validation");
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        return decoded;

    } catch (error) {
        throw new Error("Error validating token: " + error.message);
    }
}