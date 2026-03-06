import express from 'express';
import { checkAuth } from '../middleware/checkAuth';
import { checkAdmin } from '../middleware/checkAdmin';
import { supabase } from '../supabase-client';
const router = express.Router();

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('pins').select('*');

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

router.post('/', checkAuth, async (req, res) => {
  const { user_id, x_coord, y_coord, comment } = req.body;
  const { data, error } = await supabase
    .from('pins')
    .insert([{ user_id, x_coord, y_coord, comment, createdAt: new Date(), modifiedAt: new Date() }]);

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

router.put('/:id', checkAuth, async (req, res) => {
  const { x_coord, y_coord, comment } = req.body;
  const { data, error } = await supabase.from('pins').update({ x_coord, y_coord, comment }).eq('id', req.params.id);

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

router.delete('/:id', checkAuth, async (req, res) => {
  const { error } = await supabase.from('pins').delete().eq('id', req.params.id);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: 'Pin deleted' });
});

//admin route for deleting mean PINS (or actually just pins in general?) :<
router.delete('/admin/:id', checkAdmin, async (req, res) => {
  const { error } = await supabase.from('pins').delete().eq('id', req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Pin deleted' });
});

export default router;
