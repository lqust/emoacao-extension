# emoacao-extension

## TODO
* Select project at first use
* Make UI pretty

## Related assets

**Spreadsheet:** https://docs.google.com/spreadsheets/d/1V3exFOzNPAp_TkYgONwpZCEcYqVFOeXhY_Ba7TLB3es/edit#gid=0
**Script:** https://script.google.com/a/thoughtworks.com/macros/d/MPkLRf72i-vExU-dW22manAmzn1S_adTp/edit?uiv=2&mid=ACjPJvHDOphq1fXM2bsUJAwK5JhBd16e31aJBI_XaDZD3lSImuoy9DrEl6f81xbHQG2BYfXxzk3hIU8qPgsDKwTAeHFHujcIjZJ-_gWM0g-VsFRZM3hfTcB_GYB1lQdxczk1IxtNniZfA1I

## Code.gs
```
function doPost(e) {
  
  var jsonString = e.postData.getDataAsString();
  var jsonData = JSON.parse(jsonString);
  
  var result = 'Ok'; // assume success

  if (e.parameter == undefined) {
    result = 'No Parameters';
  }
  else {
    result = e.parameter;
    var id = '1V3exFOzNPAp_TkYgONwpZCEcYqVFOeXhY_Ba7TLB3es'; // Spreadsheet id for responses
    var sheet = SpreadsheetApp.openById(id).getActiveSheet();
    var newRow = sheet.getLastRow() + 1;
    var rowData = [];
    rowData[0] = new Date(); // Timestamp
    rowData[1] = jsonData.foco;
    rowData[2] = jsonData.feliz;
    rowData[3] = jsonData.time;
    
    // Write new row to spreadsheet
    var newRange = sheet.getRange(newRow, 1, 1, rowData.length);
    newRange.setValues([rowData]);
  }

  // Return result of operation
  return ContentService.createTextOutput(result);
}

```
