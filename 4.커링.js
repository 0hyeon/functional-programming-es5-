// function _curry_Practice(function (a, b) {return a + b}){
//   return function(a){
//     return function(b){
//       return function (a, b) {return a + b};
//     }
//   }
// }

function _curry(fn) {
  //fn =  function (a, b) {return a + b} 이다.
  return function (a, b) {
    //인자가 하나라면, 한번더인자를 받아와서 리턴을 미룸
    return arguments.length == 2
      ? fn(a, b)
      : function (b) {
          return fn(a, b);
        };
  };
}

var add = _curry(function (a, b) {
  return a + b;
});
var add10 = add(10);
// fn =  function (a, b) {return a + b;}

var add5 = add(5);

//원하는 시점까지 밀워뒀다가 최종적으로 시도하는 커링 기법
console.log(add10(5));
console.log(add(5)(3));
console.log(add5(3));
console.log(add10(3));
//함수가 함수를 대신실행 하거나 리턴

//실행이안됨
console.log(add(1, 2));

// 오른쪽에서부터 빼는 curry r을 만들자

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

var sub = _curryr(function (a, b) {
  return a - b;
});
var sub10 = sub(10);
console.log("sub10", sub10);
console.log("sub(10, 5) : ", sub(10, 5));
console.log("sub10(5) :", sub10(5));

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
function _get(obj, key) {
  return obj == null ? undefined : obj[key]; //obj[key] = users[0]["name"]
}

//curryr을 활용하면
var _get = _curryr(function (obj, key) {
  return obj == null ? undefined : obj[key]; //obj[key] = users[0]["name"]
});

var user1 = users[0];
console.log("user1 : ", user1);
console.log(_get(user1, "name"));
// console.log(user[10], "name");//없어서 error
console.log(_get(users[10], "name")); //함수를 만들면 no error / undefined출력

//get함수를 cuuryr을 활용하여서 뒤바꾸어도
console.log(_get("name", users[9]));
