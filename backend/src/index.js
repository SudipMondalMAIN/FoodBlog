const express = require('express');
const cors = require('cors');
const wiki = require('./wiki');
const app = express();
app.use(cors());
app.get('/api/wiki', async (req,res) => {
  const title = req.query.title;
  if(!title) return res.status(400).json({error:'missing title'});
  try {
    const page = await wiki.fetchWikipedia(title);
    if(page) res.json(page);
    else res.status(404).json({error:'Page not found'});
  } catch(err){
    if(err.status===404) return res.status(404).json({error:'Page not found'});
    res.status(500).json({error:err.message||'server error'});
  }
});
const PORT = process.env.PORT||5173;
app.listen(PORT,()=>console.log('Server running on',PORT));
