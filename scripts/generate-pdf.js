const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Load the HTML resume
  const htmlPath = path.join(__dirname, '../public/resume.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  await page.setContent(htmlContent);
  
  // Generate PDF with proper settings
  await page.pdf({
    path: path.join(__dirname, '../public/Aniruddha_HD_Resume.pdf'),
    format: 'Letter',
    margin: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in'
    },
    printBackground: true,
    preferCSSPageSize: true
  });
  
  await browser.close();
  console.log('PDF generated successfully!');
}

generatePDF().catch(console.error); 