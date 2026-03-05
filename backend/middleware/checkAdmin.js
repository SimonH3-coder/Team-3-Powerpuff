import { supabase } from '../supabase-client.js';

export const checkAdmin = async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) return res.status(401).json({ error: 'User ID required' });

  const { data, error } = await supabase.from('profiles').select('role').eq('id', userId).single();

  if (error || data.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Admin only' });
  }

  next();
};
