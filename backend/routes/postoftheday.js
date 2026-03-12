import express from 'express';
import { supabase } from '../supabase-client.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('post_of_the_day').select('forum_id').single();

  if (error) return res.status(400).json({ error: error.message });

  const { data: forumPost, error: forumError } = await supabase
    .from('forum')
    .select('*, profiles(username, avatar_url), post_interactions(interaction_type)')
    .eq('id', data.forum_id)
    .single();

  if (forumError) return res.status(400).json({ error: forumError.message });

  res.json(forumPost);
});

export default router;
