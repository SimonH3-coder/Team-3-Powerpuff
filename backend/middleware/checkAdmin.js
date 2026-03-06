import { supabase } from '../supabase-client.js';

export const checkAdmin = async (req, res, next) => {
  const { userId } = req.body;

  const { data, error } = await supabase.from('profiles').select('role').eq('id', userId).single();

  if (error || !data || data.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Admin only' });
  }

  next();
};
