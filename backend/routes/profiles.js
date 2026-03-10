import express from 'express';
import { supabase } from '../supabase-client.js';
import { checkAuth } from '../middleware/checkAuth.js';
import { checkAdmin } from '../middleware/checkAdmin.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

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

router.put('/:id/avatar', checkAuth, upload.single('image'), async (req, res) => {
  try {
    const userId = req.params.id;
    let avatar_url = null;

    if (req.file) {
      const fileName = `${userId}-${Date.now()}`;
      const { error: uploadError } = await supabase.storage.from('avatars').upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });

      if (uploadError) return res.status(400).json({ error: uploadError.message });

      const { data: publicUrl } = supabase.storage.from('avatars').getPublicUrl(fileName);

      avatar_url = publicUrl.publicUrl;
    }

    const { data, error } = await supabase.from('profiles').update({ avatar_url }).eq('id', userId).single();

    if (error) return res.status(400).json({ error: error.message });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
