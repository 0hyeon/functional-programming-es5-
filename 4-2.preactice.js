//map 함수를 보면 2번째 인자로 함수를 받아서 _each 함수를 실행하는 과정에서 받는 인자 val 값을 _get('name')의 실행인자로 넣어줍니다! 이미 해결하셨을것 같은데 저도 이부분이 처음에 이해안됐다가 이해된것같아서 적어봅니다!
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
// console.log("temp_users : ", temp_users);
//그중 30세 이상인 user의 name을 수집한다.
var names = [];
for (var i = 0; i < temp_users.length; i++) {
  names.push(temp_users[i].name);
}
// console.log("names : ", names);
////30세미만인 user를거른다.
var temp_users = [];
for (var i = 0; i < users.length; i++) {
  if (users[i].age < 30) {
    temp_users.push(users[i]);
  }
}
// console.log("temp_user_under_age30 : ", temp_users);
//30세미만의 users의 ages를 수집한다.
var ages = [];
for (var i = 0; i < temp_users.length; i++) {
  ages.push(temp_users[i].age);
}
// console.log("ages : ", ages);

// 2._filter , _map으로 리팩터링하기
//filter


var over_30 = _filter(users, function (user) {return user.age >= 30;})
var under_30 = _filter(users, function (user) {return user.age < 30;});
console.log("over_30 : ",over_30);console.log("under_30",under_30);


var names = _map(over_30, function (user) {return user.name;});
//mapper(list[i]) =  function (list[i]) {return list[i].name;}
console.log(names);

var ages = _map(under_30, function (user) {return user.age;});
//mapper(list[i]) =  function (list[i]) {return list[i].age;}
console.log(ages);

// function _filter(users, predi) {
//   var new_list = [];
//   // for문 _each로 리팩토링 대기
//   for (var i = 0; i < users.length; i++) {
//     if (predi(users[i])) {// predi에 users[i] 가  function (여기) {return 여기.age >= 30;}) 로 들어감
//       //중복되는 영역의 추상화의 단위를 함수를 이용하는것이 함수형 프로그래밍
//       new_list.push(users[i]);
//     }
//   }
//   return new_list;
// }
// function _map(list, mapper) {//list : fitler된 users, mapper : 조건 
//   var new_list = [];
  
//   // for문 _each로 리팩토링 전
//   for (var i = 0; i < list.length; i++) {
//     new_list.push(mapper(list[i]));
//   }
//   return new_list;
// }
// 3.fiter와map의 중복 루프부분을 줄여주는 each함수
function _each(list,iter){
  for(var i = 0; i<list.length;i++){ 
    iter(list[i])//안에서 하는일을 완전히 위임 ==> map함수 val구멍에 list[i]가 들어감
  }
  return list;
}

function _map(list, mapper) {//list : fitler된 users, mapper : 조건 
  var new_list = [];
  
  // for문 _each로 리팩토링 후
  _each(list, function(val){//두번째 인자 함수실행하면 
    new_list.push(mapper(val));
  })
  return new_list;
}

function _filter(users, predi) {
  var new_list = [];
  // for문 _each로 리팩토링 
  _each(users,function(val){
    if(predi(val)) new_list.push(val);
  })
  return new_list;
}

// 3. _curry, _curryr
function _curry(fn){
  // return function(a){
  //   return function(b){
  //     return fn(a,b);
  //   }
  // }
  return function (a, b) {
    //인자가 하나라면, 한번더인자를 받아와서 리턴을 미룸
    return arguments.length == 2
      ? fn(a, b)
      : function (b) {
          return fn(a, b);
        };
  };
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
// 3-1 get을 만들어 좀 더 간단하게 하기 
function _get(obj,key){
  return obj == null ? undefined : obj[key] ;//error가 나지않기위한 안전막 함수
}

//4. get 활용
var user1 = users[0];
console.log(
  "get : ",
  _get(user1,"name")
);
console.log(
  "get : ",
  _get(users[10],"name")
);

//4-1. _get함수를 _curry을 활용하여 리팩토링하기
 var _get =  _curryr(function(obj,key){
  return obj == null ? undefined : obj[key];
})

console.log(_get("name")(user1)); 

var get_name = _get("name");
console.log(get_name(users[4])); 
console.log(get_name(users[5]));
console.log(get_name(users[6]));

//_get을 활용하여 _map함수 출력 응용
console.log(
  _map(
    _filter(users, function (user) {
      return user.age >= 30;
    }),

    _get('name')//obj[name]
    // function (user) {
    //   return user.name;
    // }
  )
);
console.log(
  _map(
    _filter(users, function (user) {
      return user.age < 30;
    }),
    _get('age')
    
     // _get('age')(user) 

    // function (user) {
    //   return user.age;
    // }
  )
);
// 참고
function _map(list, mapper) {//list : fitler된 users, mapper : 조건 
  var new_list = [];
  _each(list, function(val){//두번째 인자 함수실행하면 
    new_list.push(mapper(val));
  })
  return new_list;
}
function _each(list,iter){
  for(var i = 0; i<list.length;i++){ 
    iter(list[i])//안에서 하는일을 완전히 위임 ==> map함수 val구멍에 list[i]가 들어감
  }
  return list;
}
console.clear();

// - reduce함수
var add = function(a,b){
  return a + b;
}

function _reduce(list,iter,memo){
  _each(list,function(val){
    memo = iter(memo,val); //memo + val 
    //0 = add()
  })
  return memo;
}

console.log(
  _reduce([1,2,3,4],add,0)
);