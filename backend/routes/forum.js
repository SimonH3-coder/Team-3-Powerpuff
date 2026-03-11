import express from 'express';
import { checkAuth } from '../middleware/checkAuth.js';
import { checkAdmin } from '../middleware/checkAdmin.js';
import { supabase, createUserClient } from '../supabase-client.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', async (_req, res) => {
  const { data, error } = await supabase
    .from('forum')
    .select('*, profiles(username, avatar_url)')
    .order('id', { ascending: false });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

router.get('/user/:userId', checkAuth, async (req, res) => {
  const userId = req.params.userId;

  const { data, error } = await supabase
    .from('forum')
    .select('*, profiles(username, avatar_url)')
    .eq('poster_id', userId);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

router.post('/', checkAuth, upload.single('image'), async (req, res) => {
  try {
    console.log('Body:', req.body);     
    console.log('File:', req.file);  
    const { title, content } = req.body;
    const poster_id = req.user.id;
    const token = req.headers.authorization.replace('Bearer ', '');
    const userSupabase = createUserClient(token);
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

    const { data, error } = await userSupabase
      .from('forum')
      .insert([{ poster_id, title, content, image_url, created_at: new Date(), modified_at: new Date() }]);

    if (error) return res.status(400).json({ error: error.message });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Section for like/reblog routes - MUST come BEFORE generic /:id routes

router.post('/:id/like', checkAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.id;

    //Checks for duplicates so users cant just infinitely like posts.
    //TODO: Maybe use this for logic that'll make it so we DECREMENT and REMOVE the interaction if we find a duplicate? Could be kinda sick
    const { data: existing, error: checkError } = await supabase
      .from('post_interactions')
      .select('*')
      .eq('user_id', userId)
      .eq('post_id', postId)
      .eq('interaction_type', 'like')
      .single();

    if (existing) return res.status(400).json({ error: 'Already liked this post' });

    await supabase
      .from('post_interactions')
      .insert([{ user_id: userId, post_id: postId, interaction_type: 'like', created_at: new Date() }]);

    //Makes the number go up
    const { error } = await supabase.rpc('increment_likes', { post_id: parseInt(postId) });

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: 'Post liked' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Here we just use the same pattern for everything but with retweets, so just refer back to the corresponding section in the like code!
router.post('/:id/retweet', checkAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.id;

    const { data: existing, error: checkError } = await supabase
      .from('post_interactions')
      .select('*')
      .eq('user_id', userId)
      .eq('post_id', postId)
      .eq('interaction_type', 'retweet')
      .single();

    if (existing) return res.status(400).json({ error: 'Already retweeted this post' });

    await supabase
      .from('post_interactions')
      .insert([{ user_id: userId, post_id: postId, interaction_type: 'retweet', created_at: new Date() }]);

    const { error } = await supabase.rpc('increment_retweets', { post_id: parseInt(postId) });

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: 'Post retweeted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generic /:id routes AFTER specific ones

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
