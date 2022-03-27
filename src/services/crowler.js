import puppeteer from 'puppeteer'

const crowler = async () => {
    const browser = await puppeteer.launch({devtools:true});
    const page = await browser.newPage();
    
    await page.goto('https://www.metropoles.com/vida-e-estilo/horoscopo/horoscopo-2022-confira-a-previsao-de-hoje-26-03-para-seu-signo');
    
    const getSigno = await page.evaluate(()=>{
        const nodeList = document.querySelectorAll('.columns');
        let arrayList = [...nodeList];
        arrayList = arrayList.slice(3, 15);

        const { innerText } = arrayList[3];
        const { src } = arrayList[3].childNodes[0].dataset;
        const signo = {innerText, src}
        
        return signo;
    })
    
    
   // await browser.close();
    return getSigno
  }


export default crowler