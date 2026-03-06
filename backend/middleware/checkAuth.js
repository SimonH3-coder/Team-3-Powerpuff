import { supabase } from '../supabase-client';

export const checkAuth = async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) return res.status(401).json({ error: 'No user ID' });

  const { data, error } = await supabase.from('profiles').select('id', userId).single();

  if (error || !data) {
    return res.status(401).json({ error: 'No user found' });
  }

  next();
};
