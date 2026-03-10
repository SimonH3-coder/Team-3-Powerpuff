import express from 'express';
import { checkAuth } from '../middleware/checkAuth.js';
import { checkAdmin } from '../middleware/checkAdmin.js';
import { supabase } from '../supabase-client.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('forum').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

router.post('/', checkAuth, upload.single('images'), async (req, res) => {
  try {
    const { poster_id, title, content } = req.body;
    let image_url = null;

    if (req.file) {
      const fileName = `${Date.now()}-${req.file.originalname}`;
      const { error: uploadError } = await supabase.storage.from('images').upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });

      if (uploadError) return res.status(400).json({ error: uploadError.message });
      const { data: publicUrl } = supabase.storage.from('images').getPublicUrl(fileName);

      image_url = publicUrl.publicUrl;
    }
    const { data, error } = await supabase
      .from('forum')
      .insert([{ poster_id, title, content, image_url, created_at: new Date(), modified_at: new Date() }]);

    if (error) return res.status(400).json({ error: error.message });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', checkAuth, async (req, res) => {
  const { content } = req.body;
  const { data, error } = await supabase
    .from('forum')
    .update({ content, modified_at: new Date() })
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
