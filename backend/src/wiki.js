const axios = require('axios');
async function fetchWikipedia(title){
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|pageimages&titles=${encodeURIComponent(title)}&exintro=1&explaintext=1&pithumbsize=800&redirects=1`;
  const r = await axios.get(url,{params:{origin:'*'}});
  const pages = r.data.query.pages;
  const p = Object.values(pages)[0];
  if(!p || p.missing){ const e = new Error('Page not found'); e.status=404; throw e; }
  return { title: p.title || '', extract: p.extract || '', thumbnail: p.thumbnail?.source||null, pageUrl:`https://en.wikipedia.org/?curid=${p.pageid}` };
}
module.exports={fetchWikipedia};
