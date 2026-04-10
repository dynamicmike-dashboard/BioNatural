const fs = require('fs');

async function parseMenuFile() {
  console.log('📖 Parsing legacy menu crawl data...');
  const filePath = '../BioNatural - firecrawl json 28mar26 en menu.txt';
  const rawData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(rawData);
  const markdown = data.markdown;

  const items = [];
  
  // Split by the pattern that starts an item: "- !["
  const rawItems = markdown.split(/\n- !\[/);
  
  for (let i = 1; i < rawItems.length; i++) {
    const block = rawItems[i];
    
    // Extract Image URL
    const urlMatch = block.match(/^(.+?)\]\((https?:\/\/.+?)\)/);
    if (!urlMatch) continue;
    
    const altText = urlMatch[1];
    const imageUrl = urlMatch[2];
    
    // Extract Name: usually the first non-empty line after the image
    const contentLines = block.split('\n').filter(l => l.trim().length > 0 && !l.startsWith(']('));
    if (contentLines.length < 2) continue;
    
    const name = contentLines[1].trim();
    
    // Extract Price: Look for $ followed by digits
    const priceMatch = block.match(/\$\s*([\d,]+)/);
    const price = priceMatch ? parseInt(priceMatch[1].replace(',', '')) : 0;
    
    // Extract Description: everything after the price line, or the rest of the block
    const description = contentLines.slice(2).join(' ').replace(/\$ \d+/, '').trim();

    if (name && price) {
        items.push({
            name_en: name,
            category: "Restaurant",
            price: price,
            image_url: imageUrl,
            description_en: description,
            odoo_id: `REST-${name.substring(0, 10).toUpperCase().replace(/[^A-Z]/g, '-')}`
        });
    }
  }

  console.log(`✅ Extracted ${items.length} dishes from the menu file.`);
  fs.writeFileSync('./automation/data/menu_extraction.json', JSON.stringify(items, null, 2));
}

parseMenuFile();
