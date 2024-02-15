const id_table = 1001112816; /// id таблицы
const token = '6889109671:AAGlcG64XUkY1ycp7mLastFRpuIhn6gOUtc'; /// токен бота телеграм
const id_master = 687252998; /// id получателя










const ss = SpreadsheetApp.getActiveSpreadsheet();
const getSheetById = (id) => ss.getSheets().filter(sh => sh.getSheetId() === id)[0];
const swOrder = getSheetById(id_table);

function sendTelegram() {
  let lastRow = swOrder.getLastRow();
  let lastColumn = swOrder.getLastColumn();
  let data = swOrder.getRange(lastRow, 1, 1, lastColumn).getDisplayValues()[0];
  let dataName = swOrder.getRange(1, 1, 1, lastColumn).getDisplayValues()[0];
  let text = ``

  for (let i = 1; i <= dataName.length - 1; i += 1) {          
    if (data[i] != ``) {
      text += `${dataName[i]}: ${data[i]}\r\n`
    } 
  }
  sendText(id_master,text)
}
 
function sendText(chatId, text) {
  let data = {
    method: 'sendMessage',
    chat_id: String(chatId),
    text: text,
    parse_mode: 'HTML'
  };
  let options = {
    method: 'post',
    payload: data
  };
  
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', options)
}