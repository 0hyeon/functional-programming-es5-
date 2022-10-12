function _each(list, iter) {
  for (var i = 0; i < list.length; i++) {
    iter(list[i]);
    //iter = new_list.push(mapper()
  }
  return list;
}

function _reduce(list, iter, memo) {
  return memo;
}

console.log(
  _reduce(
    [1, 2, 3],
    function (a, b) {
      return a + b;
    },
    0
  )
);
