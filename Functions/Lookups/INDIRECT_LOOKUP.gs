/**
* Returns an array of indirect single cell references from different sheets.
* @param {A2:A}    sheets   The column containing sheets' names.
* @param {"E1"}    ref      The range to return from each sheet.
* @param {string}  key      Value to match
* @param {int}     column   The column from which to return a value
* @param {int}     headers  The number of header rows to ignore in the lookup range
* @customfunction
*/
function INDIRECT_LOOKUP(sheets, ref, keys, column, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet(),
      result = [];
  
  headers = headers || 0;
    
  var sheetList = (!sheets.map) ? [[sheets]] : sheets;
  var keyList = (!keys.map) ? [[keys]] : keys;
    
  if (keyList.length != sheetList.length) {
    if (keyList.length == 1) {
      keyList = Array(sheetList.length).fill(keys);
    } else {
      throw("Matching Keys should equal the number of referenced sheets");
    }
  }
  
  for (var i = 0, l = sheets.length; i < l; i+=1)
  {
    if (sheets[i] !='') {
    
    var values = ss.getSheetByName(sheets[i][0]).getRange(ref).getValues().slice(headers);
    
    var columnValues = values.filter(function(row){
      
      return row[0] == keyList[i];
      
    }).map(function(row, i){ return row[column-1]; });
    
      result.push(columnValues);
    } else {
      result.push([0]);
    }
  }
  
  // balance column in results
  var maxCols = result.reduce(function(count, row){ return (count < row.length) ? row.length : count; },0);
  
  result = result.map(function(row){
    if (row.length < maxCols) {
      return row.concat(Array(maxCols - row.length).fill(0));
    }
    return row;
  });
  
  //return JSON.stringify(result);
  return result;       
}