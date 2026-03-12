import express from 'express';
import { checkAuth } from '../middleware/checkAuth.js';
import { checkAdmin } from '../middleware/checkAdmin.js';
import { supabase } from '../supabase-client.js';
const router = express.Router();

router.get('/:topicId', async (req, res) => {
  const { data, error } = await supabase.from('replies').select('*').eq('topic_id', req.params);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

router.post('/', checkAuth, async (req, res) => {
  const { topic_id, poster_id, reply } = req.body;
  const { data, error } = await supabase
    .from('replies')
    .insert([{ topic_id, poster_id, reply, created_at: new Date(), modified_at: new Date() }]);

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

router.put('/:id', checkAuth, async (req, res) => {
  const { reply } = req.body;
  const { data, error } = await supabase
    .from('replies')
    .update({ reply, modifiedAt: new Date() })
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
