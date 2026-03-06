import express from 'express';
import { checkAuth } from '../middleware/checkAuth';
import { checkAdmin } from '../middleware/checkAdmin';
import { supabase } from '../supabase-client';
const router = express.Router();

router.get('/:topicId', async (req, res) => {
  const { data, error } = await supabase.from('replies').select('*').eq('topic_id', req.params);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

router.post('/', checkAuth, async (req, res) => {
  const { topic_id, poster_id, content } = req.body;
  const { data, error } = await supabase
    .from('replies')
    .insert([{ topic_id, poster_id, content, createdAt: new Date(), modifiedAt: new Date() }]);

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

router.put('/:id', checkAuth, async (req, res) => {
  const { content } = req.body;
  const { data, error } = await supabase
    .from('replies')
    .update({ content, modifiedAt: new Date() })
    .eq('id', req.params.id);

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

router.delete('/:id', checkAuth, async (req, res) => {
  const { error } = await supabase.from('replies').delete().eq('id', req.params.id);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: 'Topic deleted' });
});

//admin route for deleting mean posts :<
router.delete('/admin/:id', checkAdmin, async (req, res) => {
  const { error } = await supabase.from('replies').delete().eq('id', req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Topic deleted' });
});

export default router;
