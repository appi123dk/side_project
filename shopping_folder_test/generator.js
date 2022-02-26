function* iterFunc(){
    yield console.log("1st");
    yield console.log("2nd");
    yield console.log("3rd");
    yield console.log("4th");
}

var iter = iterFunc();
iter.next();
iter.next();
iter.next();
iter.next();
