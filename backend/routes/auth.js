import express from 'express';
import { supabase } from '../supabase-client.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ error: 'Email, password and username are required' });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username,
      },
    },
  });

  console.log('Supabase signup response:', { data, error });

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: 'Account created! Check your email to confirm.', user: data.user });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return res.status(400).json({ error: error.message });

  res.json({ token: data.session.access_token, user: data.user });
});

// Change password
router.post('/change-password', async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  const { data: { user }, error: userError } = await supabase.auth.getUser(token);
  if (userError || !user) return res.status(401).json({ error: 'Unauthorized' });

  const { error: signInError } = await supabase.auth.signInWithPassword({ email: user.email, password: currentPassword });
  if (signInError) return res.status(400).json({ error: 'Current password is incorrect' });

  const { error } = await supabase.auth.admin.updateUserById(user.id, { password: newPassword });
  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: 'Password updated' });
});

export default router;
