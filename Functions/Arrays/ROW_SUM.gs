/**
* Returns a sum for each row of a given array.
* @param {range} range The range or array to sum.
* @customfunction
*/
function ROW_SUM(range) {
  
  if (!range.map) {
    range = [[range]];
  }
  
  return range.map(function(row){ 
    return row.reduce(function(a, b) { return a + b; }, 0);
  });
}