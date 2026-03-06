import express from 'express';
import { checkAuth } from '../middleware/checkAuth';
import { checkAdmin } from '../middleware/checkAdmin';
import { supabase } from '../supabase-client';
const router = express.Router();

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('forum').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

router.post('/', checkAuth, async (req, res) => {
  const { poster_id, title, content } = req.body;
  const { data, error } = await supabase
    .from('forum')
    .insert([{ poster_id, title, content, createdAt: new Date(), modifiedAt: new Date() }]);

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

router.put('/:id', checkAuth, async (req, res) => {
  const { content } = req.body;
  const { data, error } = await supabase
    .from('forum')
    .update({ content, modifiedAt: new Date() })
    .eq('id', req.params.id);

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

router.delete('/:id', checkAuth, async (req, res) => {
  const { error } = await supabase.from('forum').delete().eq('id', req.params.id);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: 'Topic deleted' });
});
//admin route for deleting mean posts :<
router.delete('/admin/:id', checkAdmin, async (req, res) => {
  const { error } = await supabase.from('forum').delete().eq('id', req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Topic deleted' });
});

export default router;
