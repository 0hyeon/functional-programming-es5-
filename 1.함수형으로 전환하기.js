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
//1.명령형코드
//30세이상인 user를 거른다.
var temp_users = [];
for (var i = 0; i < users.length; i++) {
  if (users[i].age > 30) {
    temp_users.push(users[i]);
  }
}
console.log(temp_users);
//그중 30세 이상인 user의 name을 수집한다.
var names = [];
for (var i = 0; i < temp_users.length; i++) {
  names.push(temp_users[i].name);
}
console.log(names);

//30세미만인 user를거른다.
var temp_users = [];
for (var i = 0; i < users.length; i++) {
  if (users[i].age < 30) {
    temp_users.push(users[i]);
  }
}
console.log(temp_users);
//30세미만의 users의 ages를 수집한다.
var ages = [];
for (var i = 0; i < temp_users.length; i++) {
  ages.push(temp_users[i].age);
}
console.log(ages);

// 2._filter , _map으로 리팩터링하기

// 2-1 filter
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
var over_30 = _filter(users, function (user) {
  return user.age >= 30;
});

var under_30 = _filter(users, function (user) {
  return user.age < 30;
});

//users 뿐만아니라 fitler안에 배열이면 모두가능하다.
console.log(
  _filter([1, 2, 3, 4], function (num) {
    return num % 2;
  })
);

console.log(
  _filter([1, 2, 3, 4], function (num) {
    return !(num % 2);
  })
);

// 2-1 _map함수로 거르기
function _map(list, mapper) {
  var new_list = [];
  for (var i = 0; i < list.length; i++) {
    new_list.push(mapper(list[i]));
  }
  return new_list;
}

var names = _map(over_30, function (user) {
  return user.name;
});
console.log(names);
var ages = _map(under_30, function (user) {
  return user.age;
});
console.log(ages);

//위에코드 한번에쓰기

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
  "30대 미만 나이수집",
  _map(
    _filter(users, function (user) {
      return user.age < 30;
    }),
    function (user) {
      return user.age;
    }
  )
);
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
    }),
    function (user) {
      return user.age;
    }
  )
);
