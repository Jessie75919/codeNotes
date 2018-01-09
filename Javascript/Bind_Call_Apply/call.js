/* call ： 第一個參數放在這個Fn內要指定為this的參數，之後則是這個Fn所需要的參數
                  直接執行
           call( 要指定為this的物件, arg1 , arg2 .... ,)
*/

var person = {
    fisrtname: "JC",
    lastname: "Xie",
    getFullName() {
        var fullname = this.fisrtname + "  " + this.lastname;
        return fullname;
    }
}

var logname = function (pa1, pa2) {
    console.log("Logged : " + this.getFullName());
    console.log('args : ', pa1, pa2);
    console.log("======================");
}


logname.call(person, "this is", 'call');