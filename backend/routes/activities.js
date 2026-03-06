import express from 'express';
import { supabase } from '../supabase-client';
import { checkAuth } from '../middleware/checkAuth';

const router = express.Router();

router.get('/', checkAuth, async (req, res) => {
  const { userId } = req.body;
  const { data, error } = await supabase.from('activities').select('*').eq('user_id', userId);

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

router.post('/', checkAuth, async (req, res) => {
  //post logic
  const { user_id, activity_name, cost, time } = req.body;
  const { data, error } = await supabase.from('activities').insert([{ user_id, activity_name, cost, time }]);

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

router.put('/:id', checkAuth, async (req, res) => {
  const { activity_name, cost, time } = req.body;
  const { data, error } = await supabase.from('activities').update({ activity_name, cost, time });

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

router.delete('/:id', checkAuth, async (req, res) => {
  const { error } = await supabase.from('activities').delete().eq('id', req.params.id);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: 'Activity deleted' });
});

export default router;
