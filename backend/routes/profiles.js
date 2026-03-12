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

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return res.status(400).json({ error: uploadError.message });
      }

      const { data: publicUrl } = supabase.storage.from('avatars').getPublicUrl(fileName);

      avatar_url = publicUrl.publicUrl;
      console.log('Avatar URL:', avatar_url);
    } else {
      console.log('No file received in request');
    }

    const { data, error } = await supabase.from('profiles').update({ avatar_url }).eq('id', userId).select().single();

    if (error) return res.status(400).json({ error: error.message });

    res.json(data || { avatar_url });
  } catch (err) {
    console.error('Avatar upload error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', checkAuth, async (req, res) => {
  const userId = req.user.id;
  if (userId !== req.params.id) return res.status(403).json({ error: 'Can only delete your own account' });

  try {
    // delete user's interactions, replies, and posts first (foreign keys)
    await supabase.from('post_interactions').delete().eq('user_id', userId).then(() => {}).catch(() => {});
    await supabase.from('replies').delete().eq('poster_id', userId).then(() => {}).catch(() => {});
    await supabase.from('forum').delete().eq('poster_id', userId).then(() => {}).catch(() => {});

    const { error: profileError } = await supabase.from('profiles').delete().eq('id', userId);
    if (profileError) {
      console.error('Profile delete error:', profileError);
      return res.status(400).json({ error: profileError.message });
    }

    const { error: authError } = await supabase.auth.admin.deleteUser(userId);
    if (authError) {
      console.error('Auth delete error:', authError);
      return res.status(400).json({ error: authError.message });
    }

    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error('Delete account error:', err);
    res.status(500).json({ error: err.message });
  }
});

//admin route for deleting mean people :<
router.delete('/admin/:id', checkAdmin, async (req, res) => {
  const { error } = await supabase.from('profiles').delete().eq('id', req.params.id);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: 'User deleted' });
});

export default router;
