console.log("connected successfully");

localStorage.setItem("multi_mode",0);
let lay1=document.querySelector(".sec1");
let lay2=document.querySelector(".sec2");
let lay3=document.querySelector(".sec3");
lay2.parentNode.removeChild(lay2);
lay3.parentNode.removeChild(lay3);
let layout=document.querySelector(".body");
function multi_player(){
    layout.appendChild(lay3);
    lay1.parentNode.removeChild(lay1);
}
function readybtn(){
    localStorage.setItem("multi_mode",0)
    layout.appendChild(lay2);
    lay1.parentNode.removeChild(lay1);
    let script=document.createElement("script")
    script.setAttribute('src','script1.js')
    document.head.appendChild(script)
    
    
}
function readybtn_mul(){
    localStorage.setItem("multi_mode",1)
    localStorage.setItem("userName1",`${document.getElementById("username_1").value}`)
    localStorage.setItem("userName2",`${document.getElementById("username_2").value}`)
    let script=document.createElement("script")
    script.setAttribute('src','script1.js')
    document.head.appendChild(script);
    layout.appendChild(lay2);
    lay3.parentNode.removeChild(lay3);
}

