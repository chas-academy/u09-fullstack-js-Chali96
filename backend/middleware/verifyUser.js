import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization']; // Hämta token från cookies eller headers

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = decoded; // Sätt användarens info (t.ex., userId) i request
    next(); // Gå vidare till nästa middleware eller rutt
  });
};

// Verify Admin middleware
export const verifyAdmin = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Hämta token från headers
  
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      if (decoded.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized as admin' });
      }
  
      req.user = decoded;  // Sätt användarens info i request
      next();  // Gå vidare till nästa middleware eller rutt
    });
  };
