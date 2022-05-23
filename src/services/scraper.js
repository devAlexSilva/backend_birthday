import puppeteer from 'puppeteer'


const dateLocal = new Date().toLocaleString('pt-BR', { timezone: 'America/Sao_Paulo' });
const currentDate = dateLocal.slice(0, 5).replace('/', '-');

const selectDate = (date) => {
  let sign = 0;
  date = date.replace('-', '');
  date = [...date];

  if (date[2] === '0') date.splice(2, 1);

  if (date[1] === '0') {
    date[1] = date[2];
    date[2] = '0';
  }
  else {
    let memory = date[0];
    date[0] = date[2];
    date[2] = date[1];
    date[1] = memory;
  }

  date = date.join('');
  date = Number(date) / 100;

  if (date > 3.20 && date <= 4.20) return sign = 0
  else if (date > 4.20 && date <= 5.20) return sign = 1
  else if (date > 5.20 && date <= 6.22) return sign = 2
  else if (date > 6.20 && date <= 7.22) return sign = 3
  else if (date > 7.22 && date <= 8.22) return sign = 4
  else if (date > 8.22 && date <= 9.22) return sign = 5
  else if (date > 9.22 && date <= 10.22) return sign = 6
  else if (date > 10.22 && date <= 11.21) return sign = 7
  else if (date > 11.21 && date <= 12.21) return sign = 8
  else if (date > 12.21 && date <= 1.20) return sign = 9
  else if (date > 1.20 && date <= 2.18) return sign = 10
  else return sign = 11
}

const sign = selectDate(currentDate);
const timeInSeconds = 90 * 1000

const crawler = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(timeInSeconds)

  try {
    await page.goto(`https://www.metropoles.com/vida-e-estilo/horoscopo/horoscopo-2022-confira-a-previsao-de-hoje-${currentDate}-para-seu-signo`);
    await page.waitForSelector('.m-wrapper .m-content .columns')

    const getSigno = await page.evaluate(() => {
      const nodeList = document.querySelectorAll('.m-wrapper .m-content .columns');
      let arrayList = [...nodeList];

      //take the field of the crawler's results according with the sign (date)
      let formated = arrayList.map(item => {
        return obj = {
          imgOfSign: item.children[0].dataset.src,
          textOfSign: item.children[1].innerHTML //options: innerText or innerHTML
        }
      });

      return formated;
    })

    await browser.close();
    return getSigno
  }
  catch (err) {
    console.log(err)
  }
}
export { crawler, sign }

//make a algorithm to select the sign according to the date

/**
 * Áries: de 21 de março a 20 de abril;           return sign = 0
Touro: de 21 de abril a 20 de maio;               return sign = 1
Gêmeos: de 21 de maio a 20 de junho;              return sign = 2
Câncer: de 21 de junho a 22 de julho;             return sign = 3
Leão: de 23 de julho a 22 de agosto;              return sign = 4
Virgem: de 23 de agosto a 22 de setembro;         return sign = 5
Libra: de 23 de setembro a 22 de outubro;         return sign = 6
Escorpião: de 23 de outubro a 21 de novembro;     return sign = 7
Sagitário: de 22 de novembro a 21 de dezembro;    return sign = 8
Capricórnio: de 22 de dezembro a 20 de janeiro;   return sign = 9
Aquário: de 21 de janeiro a 18 de fevereiro;      return sign = 10
Peixes: de 19 de fevereiro a 20 de março;         return sign = 11

 */

// date formate = '28-03'
