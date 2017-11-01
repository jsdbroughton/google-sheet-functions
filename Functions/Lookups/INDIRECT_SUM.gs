/**
* Returns an array of indirect single cell references from different sheets.
* @param {A2:A}  sheets   The column containing sheets' names or an array of sheet names
* @param {"E1:E50"}  range   The single column range reference to totalise from each sheet.
* @customfunction
*/
function INDIRECT_SUM(sheets, range) {
  var ss = SpreadsheetApp.getActiveSpreadsheet(),
      result = [];

  if (!sheets.map) {
    sheets = [sheets];
  }

  for (var i in sheets)
  {
    if (sheets[i] =='') break;
    
//    result.push(sheets[i]);
    
    var values = ss.getSheetByName(sheets[i][0]).getRange(range).getValues()
    var sum = values.reduce(function(total, row) {
    
      if (row.length > 1) {
        throw("Only a single Column may be totalised");
      }
      
      return total += row[0];
    
    }, 0);
    
    result.push(sum);
  }
  return result;       
}