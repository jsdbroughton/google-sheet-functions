/**
* Applys a JOIN on an array or range. JOIN() doesn't work with ArrayFormula. This function works.
*
* @param {string} delimeter The delimeter to use between array values int he joned string.
* @param {Range} range The specified range of cells.
* @param {boolean} all A flag swith between returning all values in two-dimensions as a single result or to return rows joined * 
* @customfunction
*/
function ARRAY_JOIN(delimeter, range, all) {
  
  delimeter = delimeter || "";
  all = all ? all != false : false;
  
  var result = [];
  
  if (!range.map) {
    return "Invalid Parameters";
  }
  
  result = range.map(function (row, i) {
    return row.filter(function(col) {
      return col != '';
    }).join(delimeter);
  })
  
  return !all ? result.map(function (r) { return [r]; }) : [result.join(delimeter)];
} 