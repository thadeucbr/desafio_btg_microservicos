function parseDateInput(input) {
  const months = {
      janeiro: '01', fevereiro: '02', março: '03', abril: '04', maio: '05', junho: '06',
      julho: '07', agosto: '08', setembro: '09', outubro: '10', novembro: '11', dezembro: '12'
  };

  const currentDate = new Date();
  const ninetyDaysInMillis = 90 * 24 * 60 * 60 * 1000;

  function parseDate(dateStr) {
      let [day, month, year] = dateStr.split('/');
      day = day.padStart(2, '0');
      month = month.padStart(2, '0');
      year = year ? (year.length === 2 ? '20' + year : year) : currentDate.getFullYear();
      return new Date(year, month - 1, day); // Note que subtraímos 1 de month para o objeto Date
  }

  function formatDate(date) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Acrescentamos 1 a month
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
  }

  function getMonthNumber(monthName) {
      return months[monthName.toLowerCase()];
  }

  function extractDates(text) {
      // Verifica frases relativas aos últimos 90 dias
      if (/últimos 90 dias/i.test(text)) {
          const endDate = currentDate;
          const startDate = new Date(endDate.getTime() - ninetyDaysInMillis);
          return [startDate, endDate];
      }

      // Verifica intervalos de meses por extenso
      let match = text.match(/de ([a-zA-Z]+) até ([a-zA-Z]+)/i);
      if (match) {
          const startMonth = getMonthNumber(match[1]);
          const endMonth = getMonthNumber(match[2]);
          const year = currentDate.getFullYear();
          const startDate = parseDate(`01/${startMonth}/${year}`);
          const endDate = new Date(year, parseInt(endMonth, 10), 0); // Último dia do mês
          return [startDate, endDate];
      }

      // Verifica frases com mês por extenso
      match = text.match(/extrato de ([a-zA-Z]+)/i);
      if (match) {
          const month = getMonthNumber(match[1]);
          const year = currentDate.getFullYear();
          const startDate = parseDate(`01/${month}/${year}`);
          const endDate = new Date(year, parseInt(month, 10), 0); // Último dia do mês
          return [startDate, endDate];
      }

      // Verifica datas no formato DD/MM/AAAA
      match = text.match(/(\d{1,2}\/\d{1,2}\/\d{2,4})/g);
      if (match) return match.map(date => parseDate(date));

      // Verifica datas no formato DD/MM
      match = text.match(/(\d{1,2}\/\d{1,2})/g);
      if (match) {
          return match.map(dateStr => parseDate(`${dateStr}/${currentDate.getFullYear()}`));
      }

      // Verifica intervalos no formato DD/MM até DD/MM
      match = text.match(/(\d{1,2}\/\d{1,2}) até (\d{1,2}\/\d{1,2})/i);
      if (match) {
          const year = currentDate.getFullYear();
          return [parseDate(`${match[1]}/${year}`), parseDate(`${match[2]}/${year}`)];
      }

      // Verifica data no formato "dia D"
      match = text.match(/dia (\d{1,2})/i);
      if (match) {
          const day = match[1].padStart(2, '0');
          const month = String(currentDate.getMonth() + 1).padStart(2, '0');
          const year = currentDate.getFullYear();
          return [parseDate(`${day}/${month}/${year}`)];
      }

      return [];
  }

  const dates = extractDates(input);

  if (dates.length === 1) {
      return formatDate(dates[0]);
  } else if (dates.length === 2) {
      const startDate = dates[0];
      const endDate = dates[1];
      const diffInMillis = endDate - startDate;

      if (diffInMillis <= ninetyDaysInMillis) {
          return `${formatDate(startDate)} - ${formatDate(endDate)}`;
      } else {
          return 'Período inválido: deve ser inferior a 90 dias';
      }
  } else {
      return 'Formato de data não reconhecido';
  }
}

// Exemplos de uso
console.log(parseDateInput("Preciso do extrato dos últimos 90 dias"));
console.log(parseDateInput("Quero consultar o extrato de junho"));
console.log(parseDateInput("Quero consultar o extrato de 10/05 até 10/06"));
console.log(parseDateInput("Quero consultar o extrato do dia 10 de maio até 15 de junho"));
console.log(parseDateInput("Quero consultar o extrato do dia 10"));
console.log(parseDateInput("Extrato de junho até julho"));
console.log(parseDateInput("Extrato do dia 01/05"));
