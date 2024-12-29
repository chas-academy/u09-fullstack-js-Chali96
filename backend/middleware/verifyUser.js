import jwt from 'jsonwebtoken';


export const verifyUser = (req, res, next) => {
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

      console.log('Decoded token:', decoded); // För debugging

      // Tillåt både 'user' och 'admin'
      if (decoded.role !== 'user' && decoded.role !== 'admin') {
          return res.status(403).json({ message: 'Invalid token - not user or admin' });
      }

      req.user = decoded; // ex: { id: "...", role: "admin", iat: 123, exp: 456 }
      next();
  });
};
