console.log("connected successfully");
let lay1=document.querySelector(".sec1");
let lay2=document.querySelector(".sec2");
lay2.parentNode.removeChild(lay2);
let layout=document.querySelector(".body");
function readybtn(){
    
    layout.appendChild(lay2);
    lay1.parentNode.removeChild(lay1);
    let script=document.createElement("script")
    script.setAttribute('src','script1.js')
    document.head.appendChild(script)
    
}

