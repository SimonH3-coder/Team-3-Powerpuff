import express from 'express';
import { supabase } from '../supabase-client.js';
import { checkAdmin } from '../middleware/checkAdmin.js';
const router = express.Router();

router.get('/', async (req, res) => {
  //get logic
  const { data, error } = await supabase.from('news').select('*');

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

router.post('/', checkAdmin, async (req, res) => {
  const { writer_id, title, content } = req.body;
  const { data, error } = await supabase.from('news').insert([{ writer_id, title, content, created_at: new Date() }]);

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

router.put('/:id', checkAdmin, async (req, res) => {
  const { content } = req.body;
  const { data, error } = await supabase
    .from('news')
    .update({ content, modifiedAt: new Date() })
    .eq('id', req.params.id);

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

router.delete('/:id', checkAdmin, async (req, res) => {
  const { error } = await supabase.from('news').delete().eq('id', req.params.id);

  if (error) return res.status(400).json({ error: error.message });

  res.json('News item deleted');
});

export default router;
