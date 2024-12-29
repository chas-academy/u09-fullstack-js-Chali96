import jwt from 'jsonwebtoken';

export const verifyAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Förväntar sig "Bearer <token>"
    if (!authHeader) {
        return res.status(403).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'No token found' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Token verification failed:', err);
            return res.status(403).json({ message: 'Invalid token' });
        }

        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }

        req.user = decoded; // { id: "...", role: "admin", iat: ..., exp: ... }
        next();
    });
};

