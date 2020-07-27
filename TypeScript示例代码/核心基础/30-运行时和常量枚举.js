// 运行时枚举
// 枚举在编译之后是一个真实存储的对象, 所以可以在运行时使用
// 而像接口这种只是用来做约束做静态检查的代码, 编译之后是不存在的
/*
interface TestInterface {
    name:string;
    age:number;
}
enum Gender{
    Male,
    Female
}
*/
// 常量枚举
// 普通枚举和常量枚举的区别
// 普通枚举会生成真实存在的对象
// 常量枚举不会生成真实存在的对象, 而是利用枚举成员的值直接替换使用到的地方
var Gender1;
(function (Gender1) {
    Gender1[Gender1["Male"] = 0] = "Male";
    Gender1[Gender1["Female"] = 1] = "Female";
})(Gender1 || (Gender1 = {}));
console.log(Gender1.Male === 0);
console.log(0 /* Male */ === 0);
