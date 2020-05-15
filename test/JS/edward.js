// use function to create Class
function Student() {}

// use normal Class
class Teacher {
  teach() {
      this.name = "Grace";
      this.gender = "female";
      var name = "aaa";
      console.log("this");
      console.log(this);
      console.log("this.name");
      console.log(this.name);
      console.log(this.gender);
      return name;
  }
}

let teacher = new Teacher();
let teach = teacher.teach;
const name = "Edward";
debugger;
let gTeach = teacher.teach();
// teach();
debugger;
gTeach;