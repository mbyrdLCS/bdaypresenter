// Vercel Cron Job to keep Supabase project active
// Runs daily to prevent auto-pause on free tier

export default async function handler(req, res) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Missing Supabase credentials' });
  }

  try {
    // Simple query to keep the database active
    const response = await fetch(`${supabaseUrl}/rest/v1/profiles?select=id&limit=1`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Supabase responded with ${response.status}`);
    }

    const timestamp = new Date().toISOString();
    console.log(`Keep-alive ping successful at ${timestamp}`);

    return res.status(200).json({
      success: true,
      message: 'Supabase keep-alive ping successful',
      timestamp
    });
  } catch (error) {
    console.error('Keep-alive ping failed:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
