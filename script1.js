canvas=document.getElementById("canvas");
let multi_mode=localStorage.getItem("multi_mode")
let start=document.querySelector(".start");
let userName1=localStorage.getItem("userName1")
let userName2=localStorage.getItem("userName2")
console.log(userName1)
start.addEventListener("click", function strt(){
    countdown();
    
    start.removeEventListener("click",strt);
})
let playagain=document.querySelector(".playagain")
playagain.addEventListener("click",function (){
    localStorage.setItem("multi_mode",0)
    window.location.reload();
    
})
/*let Multi=document.querySelector(".multiplayer")
Multi.addEventListener("click", function mul(){
    
    multi_mode=1
    ctx.font = "50px 'Reggae One', cursive";
    ctx.fillText("MULTIPLAYER",canvas.width/2, (canvas.height/2)-70)
    Multi.removeEventListener("click", mul);
})*/
let h_sco=JSON.parse(localStorage.getItem("h_sco")) || [];
let ctx=canvas.getContext("2d");
ctx.fillStyle="#c2aef3";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.font = "60px 'Reggae One', cursive";
ctx.fillStyle = "black";
ctx.textAlign = "center";
if(multi_mode==1){
    ctx.font = "50px 'Reggae One', cursive";
    ctx.fillText("MULTIPLAYER",canvas.width/2, (canvas.height/2)-70)
}
ctx.fillText("Press START to Play", canvas.width/2, canvas.height/2);
ctx.fill();
pl1_placement=[100]
pl2_placement=[]
function time(ms){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,ms);
    })
}
async function countdown(){
    for(let i=3;i>0;i--){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle="#c2aef3";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = "100px 'Reggae One', cursive";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(`${i}`, canvas.width/2, canvas.height/2);
        await time(1000);
    }
    document.addEventListener("click", function (){
        bookarr[bookarr.length-1].book_on_click();
    }
    )
    if(multi_mode==1){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle="#c2aef3";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = "100px 'Reggae One', cursive";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(`${userName1}'s turn`, canvas.width/2, (canvas.height/2)-50);
        await time(1000)
    }
    
    animate();
}
function drawtable(){
    ctx.beginPath();
    ctx.fillStyle="black";
    ctx.fillRect((canvas.width/2)-200, 500, 400, 40);
    
    ctx.fillRect((canvas.width/2)-150, 500, 20, 100);
    ctx.fillRect((canvas.width/2)+130, 500, 20, 100);
    ctx.fill();

}

class Table{
    constructor(){
        this.y_top=500;
        this.y_leg=500
    }
    drawtable(){
        ctx.beginPath();
        ctx.fillStyle="black";
        ctx.fillRect((canvas.width/2)-200, this.y_top, 400, 40);
        ctx.fillRect((canvas.width/2)-150, this.y_leg, 20, 100);
        ctx.fillRect((canvas.width/2)+130, this.y_leg, 20, 100);
        ctx.fill();

    }
}
let table=new Table()
function basic_dis(){
    
    
    let ctx=canvas.getContext("2d");
    ctx.fillStyle="#c2aef3";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    table.drawtable()
}

class Book{
    constructor(left_top_x,left_top_y,color){
        this.color=color;
        this.width=115,
        this.height=45,
        this.left_top={
            x:left_top_x,
            y:left_top_y
        }
        /*this.left_bottom={
            x:this.left_top.x,
            y:this.left_top.y+this.height
        }
        this.right_top={
            x:this.left_top.x+this.width,
            y:this.left_top.y
        }
        this.right_bottom={
            x:this.left_top.x+this.width,
            y:this.left_top.y+this.height
        }*/
        this.velocity={
            x:4,
            y:0
        }

        
    }
    drawbook(){
        ctx.beginPath();
        ctx.fillStyle="#b4c9c0"
        ctx.fillRect(this.left_top.x+5,this.left_top.y+10,100,30);
        ctx.fill();
        for(let i=1;i<3;i++){
            ctx.strokeStyle="black"
            ctx.lineWidth="2"
            ctx.moveTo(this.left_top.x+5,this.left_top.y+10+10*i);
            ctx.lineTo(this.left_top.x+105,this.left_top.y+10+10*i);
            ctx.stroke();
        }
        ctx.strokeStyle=this.color
        ctx.beginPath();
        ctx.lineWidth="10";
        ctx.lineCap="round";
        ctx.moveTo(this.left_top.x+5,this.left_top.y+5);//upper part
        ctx.lineTo(this.left_top.x+this.width-5,this.left_top.y+5);
        
       
        
        ctx.moveTo(this.left_top.x+5,this.left_top.y+5);
        ctx.lineTo(this.left_top.x+5,this.left_top.y+this.height-5);
        
        ctx.moveTo(this.left_top.x+5,this.left_top.y+this.height-5);
        ctx.lineTo(this.left_top.x+this.width-5,this.left_top.y+this.height-5);
        ctx.stroke()
    }
    moveBook(){
        this.left_top.x+=this.velocity.x
        this.left_top.y+=this.velocity.y
    }
    book_on_click(){
        this.velocity.x=0,
        this.velocity.y=5
    }
}
class Surf_bndry{
    constructor(){
        this.x1=(canvas.width/2)-200,
        this.x2=(canvas.width/2)+200;
        this.y=500
    }
}
bndry=new Surf_bndry()
let bookarr=[];
let book1=new Book(100,100,"green");
let score=0;
let mul_score_1=0;
let mul_score_2=0;
let active_book=0;
bookarr.push(book1)
let n1=0;


async function animate(){
   
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle="#c2aef3";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    table.drawtable();
    ctx.font = "25px 'Reggae One', cursive";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    if(multi_mode==0){
        ctx.fillText(`SCORE :${score}`, 750,50);
    }
    
    if(multi_mode==1){
        ctx.fillText(`SCORE-1 :${mul_score_1}`, 100,50);
        ctx.fillText(`SCORE-2 :${mul_score_2}`, 750,50);
    }
    
    for(let i=0;i<bookarr.length;i++){
        
        if(bookarr[i].left_top.x>=bndry.x1-(bookarr[i].width/2) && bookarr[i].left_top.x<=bndry.x2-(bookarr[i].width/2) && bookarr[i].left_top.y+bookarr[i].height==bndry.y){
            
            bookarr[i].velocity.x=0;
            bookarr[i].velocity.y=0;
            if(active_book==i){
                if(multi_mode==1 && active_book%2==0){
                    mul_score_1+=10;
                    
                }
                else if(multi_mode==1 && active_book%2==1){
                    mul_score_2+=10
                }
                else{
                    score+=10
                }
                if(bookarr[i].left_top.x<=bndry.x1 &&  bookarr[i].left_top.x<=bndry.x2){
                    let a=bookarr[i].left_top.x-bndry.x1;
                    let b=bookarr[i].left_top.x-bndry.x2;
                    if(active_book%2==0 && active_book!=0){
                        pl1_placement.push((a/bookarr[i].width)*100)
                    }
                    if(active_book%2==1){
                        pl2_placement.push((a/bookarr[i].width)*100)
                    }

                }
                else if(bookarr[i].left_top.x>=bndry.x1 && bookarr[i].left_top.x<=bndry.x2 ){
                    console.log("in between")
                    let a=bookarr[i].left_top.x-bndry.x1;
                    let b=bndry.x2-bookarr[i].left_top.x;
                    if(a>=b){
                        if(active_book%2==0 && active_book!=0){
                            pl1_placement.push((b/bookarr[i].width)*100)
                        }
                        else if(active_book%2==1){
                            pl2_placement.push((b/bookarr[i].width)*100)
                        }
                        
                    }
                    else if(a<b){
                        if(active_book%2==0 && active_book!=0){
                            pl1_placement.push((a/bookarr[i].width)*100)
                        }
                        else if(active_book%2==1){
                            pl2_placement.push((a/bookarr[i].width)*100)
                        }
                        
                    }

                }
                
                for(let a=0;a<bookarr.length;a++){
                    bookarr[a].left_top.y+=35
                }
                table.y_top+=35;
                table.y_leg+=35;
                if(multi_mode==1){
                    
                    inter_screen(active_book);
                    await time(300);
                }
                pushbook();
                if(bookarr.length>1){
                    bookarr[bookarr.length-1].velocity.x+=0.5*i

                }
                
                active_book+=1;
            }
            bndry.x1=bookarr[i].left_top.x;
            bndry.x2=bndry.x1+bookarr[i].width;
            bndry.y=bookarr[i].left_top.y
            
            
            
            
        }
    }
    if(bookarr[active_book].left_top.x>=0 && bookarr[active_book].left_top.x<=canvas.width && (bookarr[active_book].left_top.y+bookarr[active_book].height)==canvas.height){
        savehighscore();
        if(multi_mode==0){
            gameover();
        }
        
        if(multi_mode==1){
            gameover_for_multi();
        }
        return;
    }
    for(let i=0;i<bookarr.length;i++){
        bookarr[i].moveBook();
        
    }
    for(let i=0;i<bookarr.length;i++){
        
        if(bookarr[i].left_top.x<=50 || (bookarr[i].left_top.x+bookarr[i].width)>=850){
            bookarr[i].velocity.x*=-1;
        }
    }
    for(let i=0;i<bookarr.length;i++){
        bookarr[i].drawbook();
    }
    
    window.requestAnimationFrame(animate);
}





function pushbook(){
    bookarr.push(new Book(100,100,rand_col()));
}
color_arr=["#213849","#41523e","#032941","#7a0f0f","green","#698544"];
color_order=["green"];


function rand_col(){
    let rand_ind=Math.floor(Math.random()*color_arr.length);
    
    let added=0;
    while(added==0){
        console.log(rand_ind);
        if(color_arr[rand_ind]===color_order[color_order.length-1]){
            console.log("color rejected");
            rand_ind=Math.floor(Math.random()*color_arr.length);
        }
        else{

            color_order.push(color_arr[rand_ind]);
            added=1;
            return color_arr[rand_ind];
            
        }
    }
    

}
function savehighscore(){
    let data_obj={
        points: score
    }
    h_sco.push(data_obj);
    h_sco.sort((a,b)=> b.points-a.points);
    h_sco.splice(1);
    localStorage.setItem("h_sco",JSON.stringify(h_sco));
    

}

function gameover(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="#c2aef3";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "800 30px 'Reggae One', cursive";
    
    ctx.fillStyle = "#150734";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width/2, (canvas.height/2)-50);
    ctx.fillText(`SCORE : ${score}`, canvas.width/2, (canvas.height/2));
    ctx.fillText(`BEST SCORE : ${h_sco.map(function(a) {return a.points;})}`, canvas.width/2, (canvas.height/2)+50);
}
async function gameover_for_multi(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="#c2aef3";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "800 30px 'Reggae One', cursive";
    
    ctx.fillStyle = "#150734";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width/2, (canvas.height/2)-50);
    if(mul_score_1>mul_score_2){
        ctx.fillText(`${userName1} WON!! Congrats`, canvas.width/2, (canvas.height/2));
        ctx.fillText(`SCORE : ${mul_score_1}`, canvas.width/2, (canvas.height/2)+50);
    }
    else if(mul_score_1<mul_score_2){
        ctx.fillText(`${userNmae2} WON!! Congrats`, canvas.width/2, (canvas.height/2));
        ctx.fillText(`SCORE : ${mul_score_2}`, canvas.width/2, (canvas.height/2)+50);
    }
    else if(mul_score_1==mul_score_2){
        equal_mul_score();
    }
}   
    
async function inter_screen(active_book){
    console.log("A")
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="#c2aef3";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "800 70px 'Reggae One', cursive";
    ctx.fillStyle = "#150734";
    ctx.textAlign = "center";
    if(active_book%2==1){
        ctx.fillText(`${userName1}'s turn`, canvas.width/2, (canvas.height/2)-50);
    }
    else if(active_book%2==0){
        ctx.fillText(`${userName2}'s turn`, canvas.width/2, (canvas.height/2)-50);
    }
}
function equal_mul_score(){
    pl_1=0
    pl_2=0
    for(let i=0;i<pl1_placement.length;i++){
        if(pl1_placement[i]>pl2_placement[i]){
            pl_2+=1
        }
        else if(pl1_placement[i]<pl2_placement[i]){
            pl_1+=1
        }
    }
    if(pl_1>pl_2){

        ctx.fillText(`${userName1} WON!! Congrats`, canvas.width/2, (canvas.height/2));
        ctx.font = "800 30px 'Reggae One', cursive";
        ctx.fillText("SCORE equal", canvas.width/2, (canvas.height/2)+50);
        ctx.font = "800 20px 'Reggae One', cursive";
        ctx.fillText(`${userName1} got ${pl_1-pl_2} better placement(s) compared to ${userName2}`, canvas.width/2, (canvas.height/2)+100);
    }
    else if(pl_1<pl_2){
        ctx.fillText(`${userName2} WON!! Congrats`, canvas.width/2, (canvas.height/2));
        ctx.font = "800 30px 'Reggae One', cursive";
        ctx.fillText("SCORE equal", canvas.width/2, (canvas.height/2)+50);
        ctx.font = "800 20px 'Reggae One', cursive";
        ctx.fillText(`${userName2} got ${pl_2-pl_1} better placement(s) compared to ${userName1}`, canvas.width/2, (canvas.height/2)+100);
    }
}