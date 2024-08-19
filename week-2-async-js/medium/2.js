

function hr12Format(){
    let date = new Date();
    console.clear();
    const currentTime = date.toLocaleTimeString([],{hour : "numeric", minute : "numeric" ,second : "numeric", hour12 : true});
    console.log(currentTime);
}

function hr24Format(){
    let date = new Date();
    console.clear();
    console.log(date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
}

setInterval(hr24Format,1000);