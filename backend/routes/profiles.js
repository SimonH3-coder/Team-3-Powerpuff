import express from 'express';
import { supabase } from '../supabase-client.js';
import { checkAuth } from '../middleware/checkAuth.js';
import { checkAdmin } from '../middleware/checkAdmin.js';

const router = express.Router();

router.get('/', checkAuth, async (req, res) => {
  const userId = req.user.id;
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

router.put('/:id', checkAuth, async (req, res) => {
  const { username, bio, avatarUrl } = req.body;
  const { data, error } = await supabase
    .from('profiles')
    .update({ username, bio, avatarUrl })
    .eq('id', req.params.id)
    .single();

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

router.delete('/:id', checkAuth, async (req, res) => {
  const { userId } = req.body;
  if (userId !== req.params.id) return res.status(403).json({ error: 'Can only delete your own account' });

  const { error } = await supabase.from('profiles').delete().eq('id', req.params.id);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: 'User deleted' });
});

//admin route for deleting mean people :<
router.delete('/admin/:id', checkAdmin, async (req, res) => {
  const { error } = await supabase.from('profiles').delete().eq('id', req.params.id);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: 'User deleted' });
});

export default router;
