import puppeteer from 'puppeteer'

const date = '27-03';

const crawler = async () => {
  const browser = await puppeteer.launch();//não esquecer de tirar após finalizar os testes
  const page = await browser.newPage();
  //preciso tornar a data da url dinâmica passando com parametro a data de quando o scheduler chamar
  await page.goto(`https://www.metropoles.com/vida-e-estilo/horoscopo/horoscopo-2022-confira-a-previsao-de-hoje-${date}-para-seu-signo`);

  const getSigno = await page.evaluate(() => {
    const nodeList = document.querySelectorAll('.columns');
    let arrayList = [...nodeList];
    arrayList = arrayList.slice(3, 15);

    const { innerText } = arrayList[3];
    const { src } = arrayList[3].childNodes[0].dataset;
    const signo = { innerText, src }

    return signo;
  })


  await browser.close();
  return getSigno
}


export default crawler