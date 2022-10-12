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
function _curryr(fn) {
  //5 - 10 이라 표현력이 약간 안맞는것을 바로잡기위한 r(ight)함수
  return function (a, b) {
    //인자가 하나라면, 한번더인자를 받아와서 리턴을 미룸
    return arguments.length == 2
      ? fn(a, b)
      : function (b) {
          return fn(b, a);
        };
  };
}
var _get = _curryr(function (obj, key) {
  return obj == null ? undefined : obj[key]; //obj[key] = users[0]["name"]
});

// 리팩토링 보조함수1
function _each(list, iter) {
  for (var i = 0; i < list.length; i++) {
    iter(list[i]);
    //iter = new_list.push(mapper()
  }
  return list;
}
// function _map(list, mapper) {
//   var new_list = [];
//   for (var i = 0; i < list.length; i++) {
//     new_list.push(mapper(list[i]));
//   }
//   return new_list;
// }

// _each를 적용한 _map함수 리팩토링1
function _map(list, mapper) {
  var new_list = [];
  _each(list, function (val) {
    new_list.push(mapper(val));
  });
  return new_list;
}
//result
console.log(
  "curry,get을 활용한, 이름수집",
  _map(
    _filter(users, function (user) {
      return user.age >= 30;
    }),
    _get("name")
  )
);
console.log(
  "curry,get을 활용한,  나이수집",
  _map(
    _filter(users, function (user) {
      return user.age < 30;
    }), // return users[i].age < 30;

    // function (user) {
    //   return user.age;
    // }

    _get("age") // _get('name') 의 결과는 함수입니다.
  )
);
//풀면
function _filter(users, predi) {
  var new_list = [];
  for (var i = 0; i < users.length; i++) {
    if (predi(users[i])) {
      // -> users[i].age < 30
      //중복되는 영역의 추상화의 단위를 함수를 이용하는것이 함수형 프로그래밍
      new_list.push(users[i]);
    }
  }
  return new_list;
}
// users[i].age < 30 = 대입

//  predi(users[i])
