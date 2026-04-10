const fs = require('fs');

const socialContent = JSON.parse(fs.readFileSync('apps/web/src/data/social_content_april.json', 'utf8'));
const productList = JSON.parse(fs.readFileSync('migration/product_list.json', 'utf8'));

const mapping = {};

socialContent.forEach(post => {
  const keyword = post.bot_keyword;
  const focus = post.product_focus.toLowerCase();
  
  // Find matching product
  const product = productList.find(p => 
    p.name_en.toLowerCase().includes(focus) || 
    focus.includes(p.name_en.toLowerCase())
  );
  
  if (product) {
    mapping[keyword] = {
      product_id: product.odoo_id,
      name: product.name_en,
      url: `/tienda/producto/${product.odoo_id}`
    };
  } else {
    console.warn(`⚠️ No match found for focus: ${focus} (Keyword: ${keyword})`);
  }
});

fs.writeFileSync('apps/web/src/data/keyword_mapping.json', JSON.stringify(mapping, null, 2));
console.log('✅ Keyword Mapping Created: apps/web/src/data/keyword_mapping.json');
