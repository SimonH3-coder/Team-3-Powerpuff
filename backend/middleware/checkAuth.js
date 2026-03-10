import { supabase } from '../supabase-client.js';

export const checkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Attach user info to request for later use
    req.user = data.user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token verification failed' });
  }
};
