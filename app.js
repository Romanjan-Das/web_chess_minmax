var arr=[-4,-3,-2,-5,-6,-2,-3,-4,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,4,3,2,5,6,2,3,4];
//var arr=[0,-1,-1,-1,0,0,0,-2,0,-4,0,0,-6,0,0,0,0,0,0,0,-4,0,0,0,0,0,0,0,5,0,0,0,1,1,1,0,0,0,3,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
function main(){
    create_board();
    populate_board();
}
function create_board(){
    var board=document.getElementById("board");
    var i;
    for(i=0;i<64;i++){
        var j=document.createElement("div");
        var img=document.createElement("img");
        img.setAttribute("class","chess_piece");
        img.setAttribute("id","img_"+i);
        j.setAttribute("class","box");
        j.setAttribute("id","box_"+i);
        j.setAttribute("onclick","select("+i+");");
        j.appendChild(img);
        board.appendChild(j);
    }
}
function populate_board(){
    var i;
    for(i=0;i<64;i++){
        document.getElementById("img_"+i).setAttribute("src","assets/"+arr[i]+".png");
    }
}
var move; var chosen=false; var prev;
function select(i){
    if(!chosen){ var n;
        if(arr[i]>0 || arr[i]<0){
            document.getElementById("box_"+i).style.backgroundColor="yellow";
        }

        if(arr[i]==1||arr[i]==-1){
            move=pawn(i);
        }
        else if(arr[i]==4||arr[i]==-4){
            if(arr[i]<0){
                arr=mirror_arr(arr);
                move=rook(i);
                arr=mirror_arr(arr);
            }
            else{
                move=rook(i);
            }
        }
        else if(arr[i]==2||arr[i]==-2){
            if(arr[i]<0){
                arr=mirror_arr(arr);
                move=bishop(i);
                arr=mirror_arr(arr);
            }
            else{
                move=bishop(i);
            }
        }
        else if(arr[i]==5||arr[i]==-5){
            if(arr[i]<0){
                arr=mirror_arr(arr);
                move=queen(i);
                arr=mirror_arr(arr);
            }
            else{
                move=queen(i);
            }
        }
        else if(arr[i]==3||arr[i]==-3){
            if(arr[i]<0){
                arr=mirror_arr(arr);
                move=knight(i);
                arr=mirror_arr(arr);
            }
            else{
                move=knight(i);
            }
        }
        else if(arr[i]==6||arr[i]==-6){
            if(arr[i]<0){
                arr=mirror_arr(arr);
                move=king(i);
                arr=mirror_arr(arr);
            }
            else{
                move=king(i);
            }
        }
        chosen=true;
        prev=i;
        paint_box_wrt_status(i);
    }
    else{
        var k=0;
        if(move.length==0){
            reset_board_colours();
            chosen=false;
        }
        else{
            for(k=0;k<move.length;k++){
                if(i==move[k]){ n=arr[i];
                    arr[i]=arr[prev];
                    arr[prev]=0;
                    reset_board_colours();
                    populate_board();
                    chosen=false;
                    move=[];
                    if(n==-6){
                        setTimeout(() => {
                            victory_message();
                        }, 1000);
                    }
                    else{
                        
                        setTimeout(() => {
                            ai();
                        }, 1000);
                        
                       //ai();
                    }
                    break;
                }
                else if(i==prev){
                    reset_board_colours();
                    chosen=false;
                    move=[];
                }
            }
        }
    }

}
function pawn(i){
    var arr2=[];
    if(arr[i]>0){   
        if(i>47 && arr[i-16]==0 && arr[i-8]==0){
            arr2=[i-8,i-16];
        }
        else if(i>7 && arr[i-8]==0){
            arr2=[i-8];
        }
        else{
            arr2=[];
        }
        if(arr[i-7]<0 && (i+1)%8!=0){
            arr2.push(i-7);
        }
        if(arr[i-9]<0 && i%8!=0){
            arr2.push(i-9);
        }
        return arr2;
    }
    else if(arr[i]<0){
        if(i<16 && arr[i+16]==0 && arr[i+8]==0){
            arr2=[i+8,i+16];
        }
        else if(i<56 && arr[i+8]==0){
            arr2=[i+8];
        }
        else{
            arr2=[];
        }
        if(arr[i+7]>0 && i%8!=0){
            arr2.push(i+7);
        }
        if(arr[i+9]>0 && (i+1)%8!=0){
            arr2.push(i+9);
        }
        return arr2;
    }
}
function rook(i){
    var arr2=[];
    var j=i;
    while(j>-1){
        if(j-8>-1){
            if(arr[j-8]>0){
                break;
            }
            else if(arr[j-8]<0){
                arr2.push(j-8);
                break;
            }
            else{
                arr2.push(j-8);
            }
        }
        j=j-8;
    }
    j=i;
    while(j<64){
        if(j+8<64){
            if(arr[j+8]>0){
                break;
            }
            else if(arr[j+8]<0){
                arr2.push(j+8);
                break;
            }
            else{
                arr2.push(j+8);
            }
        }
        j=j+8;
    }
    j=i;
    while(j>-1 && j%8!=0){
        if(j>-1 && j%8!=0){
            if(arr[j-1]>0){
                break;
            }
            else if(arr[j-1]<0){
                arr2.push(j-1);
                break;
            }
            else{
                arr2.push(j-1);
            }
        }
        j=j-1;
    }
    j=i;
    while(j<64 && (j+1)%8!=0){
        if(j<64 && (j+1)%8!=0){
            if(arr[j+1]>0){
                break;
            }
            else if(arr[j+1]<0){
                arr2.push(j+1);
                break;
            }
            else{
                arr2.push(j+1);
            }
        }
        j=j+1;
    }
    return arr2;
}
function bishop(i){
    var arr2=[];
    var j=i;
    while(j>-1 && j%8!=0 && j-9>-1){
        if(j>-1 && j%8!=0){
            if(arr[j-9]>0){
                break;
            }
            else if(arr[j-9]<0){
                arr2.push(j-9);
                break;
            }
            else{
                arr2.push(j-9);
            }
        }
        j=j-9;
    }
    j=i;
    while(j>-1 && (j+1)%8!=0 && j-7>-1){
        if(j>-1 && (j+1)%8!=0){
            if(arr[j-7]>0){
                break;
            }
            else if(arr[j-7]<0){
                arr2.push(j-7);
                break;
            }
            else{
                arr2.push(j-7);
            }
        }
        j=j-7;
    }
    j=i;
    while(j<64 && j%8!=0 && j+7<64){
        if(j<64 && j%8!=0){
            if(arr[j+7]>0){
                break;
            }
            else if(arr[j+7]<0){
                arr2.push(j+7);
                break;
            }
            else{
                arr2.push(j+7);
            }
        }
        j=j+7;
    }
    j=i;
    while(j<64 && (j+1)%8!=0 && j+9<64){
        if(j<64 && (j+1)%8!=0){
            if(arr[j+9]>0){
                break;
            }
            else if(arr[j+9]<0){
                arr2.push(j+9);
                break;
            }
            else{
                arr2.push(j+9);
            }
        }
        j=j+9;
    }
    return arr2;
}
function queen(i){
    var arr2=[];
    var j=i;
    while(j>-1){
        if(j-8>-1){
            if(arr[j-8]>0){
                break;
            }
            else if(arr[j-8]<0){
                arr2.push(j-8);
                break;
            }
            else{
                arr2.push(j-8);
            }
        }
        j=j-8;
    }
    j=i;
    while(j<64){
        if(j+8<64){
            if(arr[j+8]>0){
                break;
            }
            else if(arr[j+8]<0){
                arr2.push(j+8);
                break;
            }
            else{
                arr2.push(j+8);
            }
        }
        j=j+8;
    }
    j=i;
    while(j>-1 && j%8!=0){
        if(j>-1 && j%8!=0){
            if(arr[j-1]>0){
                break;
            }
            else if(arr[j-1]<0){
                arr2.push(j-1);
                break;
            }
            else{
                arr2.push(j-1);
            }
        }
        j=j-1;
    }
    j=i;
    while(j<64 && (j+1)%8!=0){
        if(j<64 && (j+1)%8!=0){
            if(arr[j+1]>0){
                break;
            }
            else if(arr[j+1]<0){
                arr2.push(j+1);
                break;
            }
            else{
                arr2.push(j+1);
            }
        }
        j=j+1;
    }
    j=i;
    while(j>-1 && j%8!=0 && j-9>-1){
        if(j>-1 && j%8!=0){
            if(arr[j-9]>0){
                break;
            }
            else if(arr[j-9]<0){
                arr2.push(j-9);
                break;
            }
            else{
                arr2.push(j-9);
            }
        }
        j=j-9;
    }
    j=i;
    while(j>-1 && (j+1)%8!=0 && j-7>-1){
        if(j>-1 && (j+1)%8!=0){
            if(arr[j-7]>0){
                break;
            }
            else if(arr[j-7]<0){
                arr2.push(j-7);
                break;
            }
            else{
                arr2.push(j-7);
            }
        }
        j=j-7;
    }
    j=i;
    while(j<64 && j%8!=0 && j+7<64){
        if(j<64 && j%8!=0){
            if(arr[j+7]>0){
                break;
            }
            else if(arr[j+7]<0){
                arr2.push(j+7);
                break;
            }
            else{
                arr2.push(j+7);
            }
        }
        j=j+7;
    }
    j=i;
    while(j<64 && (j+1)%8!=0 && j+9<64){
        if(j<64 && (j+1)%8!=0){
            if(arr[j+9]>0){
                break;
            }
            else if(arr[j+9]<0){
                arr2.push(j+9);
                break;
            }
            else{
                arr2.push(j+9);
            }
        }
        j=j+9;
    }

    return arr2;
}
function knight(i){
    var arr2=[];
    if(i>15 && i%8!=0 && arr[i-17]<=0){
        arr2.push(i-17);
    }
    if(i>15 && (i+1)%8!=0 && arr[i-15]<=0){
        arr2.push(i-15);
    }
    if(i>7 && (i-1)%8!=0 && i%8!=0 && arr[i-10]<=0){
        arr2.push(i-10);
    }
    if(i<56 && (i-1)%8!=0 && i%8!=0 && arr[i+6]<=0){
        arr2.push(i+6);
    }
    if(i<48 && i%8!=0 && arr[i+15]<=0){
        arr2.push(i+15);
    }
    if(i<48 && (i+1)%8!=0 && arr[i+17]<=0){
        arr2.push(i+17);
    }
    if(i<56 && (i+1)%8!=0 && (i+2)%8!=0 && arr[i+10]<=0){
        arr2.push(i+10);
    }
    if(i>7 && (i+1)%8!=0 && (i+2)%8!=0 && arr[i-6]<=0){
        arr2.push(i-6);
    }
    return arr2;
}
function king(i){
    var arr2=[];
    if(i<56 && arr[i+8]<=0){
        arr2.push(i+8);
    }
    if((i+1)%8!=0 && i<64 && arr[i+1]<=0){
        arr2.push(i+1);
    }
    if((i+1)%8!=0 && i<56 && arr[i+9]<=0){
        arr2.push(i+9);
    }
    if(i%8!=0 && i<56 && arr[i+7]<=0){
        arr2.push(i+7);
    }
    if(i>7 && arr[i-8]<=0){
        arr2.push(i-8);
    }
    if(i%8!=0 && i>0 && arr[i-1]<=0){
        arr2.push(i-1);
    }
    if(i>7 && i%8!=0 && arr[i-9]<=0){
        arr2.push(i-9);
    }
    if((i+1)%8!=0 && i>7 && arr[i-7]<=0){
        arr2.push(i-7);
    }
    return arr2;
}
function mirror_arr(a){
    var t;
    for(t=0;t<64;t++){
        a[t]=-1*a[t];
    }
    return a;
}
function paint_box_wrt_status(i){
    var j;
    for(j=0;j<move.length;j++){
        document.getElementById("box_"+move[j]).style.backgroundColor="cyan";
        if(arr[i]<0 && arr[move[j]]>0){
            document.getElementById("box_"+move[j]).style.backgroundColor="magenta";
        }
        else if(arr[i]>0 && arr[move[j]]<0){
            document.getElementById("box_"+move[j]).style.backgroundColor="magenta";
        }
    }
}
function reset_board_colours(){
    var l;
    for(l=0;l<64;l++){
        document.getElementById("box_"+l).style.backgroundColor="transparent";
    }
}
var val=[]; var r=[]; var uu=0; var vv=00; var r_temp=[]; var r_s1=[]; var r_s2=[]; var r_s3=[];
function ai(){
    g=[]; f=[]; b_prev=0; c_prev=0; f_prev=[];
    val=[]; r=[]; uu=0; vv=00; r_temp=[]; r_s1=[]; r_s2=[]; r_s3=[];

    //console.clear();
    find_moves(1,0,0,0,-10);
    r=r_temp; r_temp=[];

    //console.log("r_s1: "); console.log(r_s1);

    for(x=0;x<r_s1.length;x++){
        uu=arr[r_s1[x][1]]; vv=arr[r_s1[x][0]];
        arr[r_s1[x][1]]=vv; arr[r_s1[x][0]]=0;
        find_moves(2,x,0,10,0);
        arr[r_s1[x][1]]=uu; arr[r_s1[x][0]]=vv;
        r[x]=r_temp; r_temp=[];

    }

    //console.log("---------------------------------------------------------------------------");
    //console.log("r_s2: "); console.log(r_s2);

    var s; var u; var v;
    for(s=0;s<r_s1.length;s++){
        u=arr[r_s1[s][1]]; v=arr[r_s1[s][0]];
        arr[r_s1[s][1]]=v; arr[r_s1[s][0]]=0;
        for(x=0;x<r_s2[s].length;x++){
            uu=arr[r_s2[s][x][1]]; vv=arr[r_s2[s][x][0]];
            arr[r_s2[s][x][1]]=vv; arr[r_s2[s][x][0]]=0;
            find_moves(3,s,x,0,-10);
            arr[r_s2[s][x][1]]=uu; arr[r_s2[s][x][0]]=vv;
            r[x]=r_temp; r_temp=[];
    
        }
        arr[r_s1[s][1]]=u; arr[r_s1[s][0]]=v;
    }
    //console.log("---------------------------------------------------------------------------");
    //console.log("r_s3: "); console.log(r_s3);

    evaluate_moves();
}
var g=[]; var f=[]; var b_prev=0; var c_prev=0; var f_prev=[];
function find_moves(stat,b,c,ii,jj){
    var x; var y=[]; var z=[]; var w; var u; var v; var e=[]; var kk=0;
    for(x=0;x<64;x++){
        select(x);y.push([x,move]);select(x);
    }
    for(x=0;x<64;x++){
        if(y[x][1].length>0 && arr[x]<ii && arr[x]>jj){
            for(w=0;w<y[x][1].length;w++){
                u=arr[y[x][0]]; v=arr[y[x][1][w]];
                arr[y[x][1][w]]=arr[y[x][0]]; arr[y[x][0]]=0;
                kk=total_value(arr);
                r_temp.push([y[x][0],y[x][1][w]]);
                if(stat==1){
                    r_s1.push([y[x][0],y[x][1][w],kk]);
                }
                else if(stat==2){
                    e.push([y[x][0],y[x][1][w],kk]);
                    r_s2[b]=e;
                }
                else if(stat==3){
                    if(b_prev==b){
                        if(c_prev==c){
                            f.push([y[x][0],y[x][1][w],kk]);
                        }
                        else{
                            f=[];
                            f.push([y[x][0],y[x][1][w],kk]);
                            c_prev=c;
                        }
                        if(f_prev!=f){
                            g.push(f);
                            f_prev=f;
                        }
                    }
                    else{
                        g=[]; f=[]; c_prev=c; b_prev=b;
                        f.push([y[x][0],y[x][1][w],kk]);
                        if(f_prev!=f){
                            g.push(f);
                            f_prev=f;
                        }
                    }
                    //console.log("c:"+c+" b:"+b)
                    r_s3[b]=g;
                }
                arr[y[x][0]]=u; arr[y[x][1][w]]=v;
            }
            
        }
    }
    y=[];z=[];
}
function evaluate_moves(){
    var x,y,z,tmp3=1000,tmp2=-1000,tmp1=1000,ab=0,cd=0,ef=0;
    for(x=0;x<r_s3.length;x++){
        for(y=0;y<r_s3[x].length;y++){
            for(z=0;z<r_s3[x][y].length;z++){
                if(tmp3>r_s3[x][y][z][2]){
                    tmp3=r_s3[x][y][z][2];
                }
            }
            r_s2[x][y][2]=tmp3;
            tmp3=1000;
        }
    }

    for(x=0;x<r_s2.length;x++){
        for(y=0;y<r_s2[x].length;y++){
            if(tmp2<r_s2[x][y][2]){
                tmp2=r_s2[x][y][2];
            }
        }
        r_s1[x][2]=tmp2;
        tmp2=-1000;
    }

    for(x=0;x<r_s1.length;x++){
        if(tmp1>r_s1[x][2]){
            ab=r_s1[x][0];
            cd=r_s1[x][1];
            tmp1=r_s1[x][2];
        }
    }
    tmp1=1000;
    //console.log(ab+","+cd);
    ef=arr[cd];
    arr[cd]=arr[ab]; arr[ab]=0;
    populate_board();
    if(ef==6){
        setTimeout(() => {
            window.alert("Computer wins !!");
        }, 1500);
    }
}
function total_value(a){
    var x=0; var t=0;
    for(x=0;x<64;x++){
        t=t+a[x];
    }
    return t;
}
function victory_message(){
    window.alert("Hurray! You win!!");
}
function defeat_message(){
    window.alert("Game Over. Blacks win!!");
}