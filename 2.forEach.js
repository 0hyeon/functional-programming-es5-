var users = [
  { id: 1, name: "ID", age: 20 },
  { id: 2, name: "YH", age: 32 },
  { id: 3, name: "JH", age: 36 },
  { id: 4, name: "SH", age: 42 },
  { id: 5, name: "GS", age: 55 },
  { id: 6, name: "OJ", age: 11 },
  { id: 7, name: "YR", age: 26 },
  { id: 8, name: "SB", age: 25 },
];
function _filter(users, predi) {
  var new_list = [];
  for (var i = 0; i < users.length; i++) {
    if (predi(users[i])) {
      //중복되는 영역의 추상화의 단위를 함수를 이용하는것이 함수형 프로그래밍
      new_list.push(users[i]);
    }
  }
  return new_list;
}
function _map(list, mapper) {
  //maper는 function (user) { return user.age;}
  var new_list = [];
  for (var i = 0; i < list.length; i++) {
    new_list.push(mapper(list[i]));
  }
  return new_list;
}

// 리팩토링 보조함수1
function _each(list, iter) {
  for (var i = 0; i < list.length; i++) {
    iter(list[i]);
    //iter = new_list.push(mapper()
  }
  return list;
}

// _each를 적용한 _map함수 리팩토링1
function _map(list, mapper) {
  var new_list = [];
  _each(list, function (val) {
    new_list.push(mapper(val));
  });
  return new_list;
}

// _each를 적용한 _filter함수 리팩토링1
function _filter(list, predi) {
  var new_list = [];
  _each(list, function (val) {
    if (predi(val)) {
      //val = list[i],
      //predi = function (user) {return user.age >= 30;}
      new_list.push(val);
    }
  });

  return new_list;
}
console.log(
  "30대이상 이름수집",
  _map(
    _filter(users, function (user) {
      return user.age >= 30;
    }),
    function (user) {
      return user.name;
    }
  )
);
console.log(
  "30대미만 나이수집",
  _map(
    _filter(users, function (user) {
      return user.age < 30;
    }),
    function (user) {
      return user.age;
    }
  )
);
