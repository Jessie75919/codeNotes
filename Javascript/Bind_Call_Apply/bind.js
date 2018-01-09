/* bind : 複製一份fn，把裡面的this變數改成你指定給他的參數，然後回傳這個Fn
          不直接執行
*/

var person = {
    fisrtname : "JC",
    lastname : "Xie",
    getFullName(){
        var fullname =  this.fisrtname + "  " +  this.lastname;
        return fullname;
    }
}

var logname = function (pa1, pa2) {
    console.log("Logged : " + this.getFullName());
    console.log('args : ',pa1,pa2 );
    console.log("======================");
}


var logPersonName = logname.bind(person);
logPersonName("this is","bind");

