var Signes=['X','O'];
var joueur=0;
var fontBottonsColor='white';
var winnerBottonsColor='blue';
var Faillure='red';
var messager=document.getElementById('message');
var fin=false;
var mesBoutons=document.querySelectorAll("#Ctn button");
var rePlay=document.getElementById('rejouer');
//Fonction afficheur de texte
/*var Texte=function(element){
    var endroit=element;
    function setText(leMessage) {
        endroit.innerHTML=leMessage;
    }
    return{envoyerUnMessage:setText};
};*/
//Fonction verifiant si le boutton est d�j� clique ou pas
function posValide(btn){
    if(btn.innerHTML!='_'){
        return false;
    }
    return true;
}
//Fonction verifiant si le jeu est fint ou pas
function JeuFinit(){
    var cpt=0;
    for(var i=0,len=mesBoutons.length; i<len;i++){
        if(mesBoutons[i].innerHTML=='_'){cpt=1;}
    }
    if(cpt==0)
    {return true;}
    else{return false;}
  
}
function color(a,b,c,d){
    mesBoutons[a].style.backgroundColor=d;
    mesBoutons[b].style.backgroundColor=d;
    mesBoutons[c].style.backgroundColor=d;
}
rePlay.addEventListener('click',main);
//Fonction verifiant si le jeu est gagn� ou pas
function Gagner(r){
    var i=0,j=0;
    for(i=0;i<3;i++){
    j=3*i;
    if(mesBoutons[j].innerHTML!='_' && mesBoutons[j].innerHTML==mesBoutons[j+1].innerHTML && mesBoutons[j].innerHTML==mesBoutons[j+2].innerHTML){color(j,j+1,j+2,r);return true;}
    if(mesBoutons[i].innerHTML!='_' && mesBoutons[i].innerHTML==mesBoutons[i+3].innerHTML && mesBoutons[i].innerHTML==mesBoutons[i+6].innerHTML){color(i,i+3,i+6,r);return true;}
    }
    if(mesBoutons[0].innerHTML!='_' && mesBoutons[0].innerHTML==mesBoutons[4].innerHTML && mesBoutons[0].innerHTML==mesBoutons[8].innerHTML){color(0,4,8,r);return true;}
    if(mesBoutons[2].innerHTML!='_' && mesBoutons[2].innerHTML==mesBoutons[4].innerHTML && mesBoutons[2].innerHTML==mesBoutons[6].innerHTML){color(2,4,6,r);return true;}
    
    return false;
}
//Fonction Motrice cool
function Une(){
    for(var i=0,len=mesBoutons.length; i<len;i++){
        //var text=new Texte(messager);
        
        mesBoutons[i].addEventListener("click",function(){
            if(fin){
                return;
            }
            else
            {
              if(posValide(this))
              {
                  this.innerHTML=Signes[joueur];
                  //Le jeu est il gagne ?
                   if(Gagner(winnerBottonsColor)){
                       fin=true;
                        messager.innerHTML='Bravo!! le joueur '+Signes[joueur]+' a gagn� le jeu';
                        rePlay.style.backgroundColor='red';
                        rePlay.innerHTML="Rejouer";
                        
                        
                    }
                    //Le jeu est il finit ?
                    else if(JeuFinit()){
                        rePlay.style.backgroundColor='red';
                        messager.innerHTML='Le jeux est finit avec un match NULL!! <br>cliquez sur le bouton <u>rejouer</u> pour recommencer';
                        rePlay.innerHTML="Rejouer";
                        fin=true;
                    }
                    //Si le jeu n'est ni finit ni gagn�...continuer
                    else{
                        joueur=joueur ^ 1;
                        messager.innerHTML='Joueur '+Signes[joueur]+' c\'est ton tour!!';
                    }
                
            }
            else{
                
                messager.innerHTMl='Vous ne pouvez pas choisir un emplacement d�j� occup�!!';
            }
              
               
        }
    
    });
        
    }
}


//Jeu avec ordinateur
function Ordinateur(pos){
   joueur=joueur^1;
   var t=mesBoutons;
   var j=0;
   var f=0;
   var tab=[];
   for(var i=0;i<3;i++){
      //Sens horizontal
      j=i*3;
      if(t[j].innerHTML!='_' && t[j].innerHTML==t[j+1].innerHTML && t[j+2].innerHTML=='_'){
       tab.push(j+2,t[j].innerHTML);
      }
      if(t[j+1].innerHTML!='_' && t[j+1].innerHTML==t[j+2].innerHTML && t[j].innerHTML=='_'){
       tab.push(j,t[j+1].innerHTML);
      }
      if(t[j+2].innerHTML!='_' && t[j+2].innerHTML==t[j].innerHTML && t[j+1].innerHTML=='_'){
       tab.push(j+1,t[j].innerHTML);
      }
      //Sens Vertical
      if(t[i].innerHTML!='_'&& t[i+3].innerHTML==t[i].innerHTML && t[i+6].innerHTML=='_'){
         tab.push(i+6,t[i].innerHTML);
      }
      if(t[i+3].innerHTML!='_'&& t[i+3].innerHTML==t[i+6].innerHTML && t[i].innerHTML=='_'){
         tab.push(i,t[i+3].innerHTML);
      }
      if(t[i+6].innerHTML!='_'&& t[i+6].innerHTML==t[i].innerHTML && t[i+3].innerHTML=='_'){
         tab.push(i+3,t[i].innerHTML);
      }
   }
//Diagonale partant de 0
   if(t[0].innerHTML!='_' && t[4].innerHTML==t[0].innerHTML && t[8].innerHTML=='_'){
      tab.push(8,t[0].innerHTML);
   }
   if(t[4].innerHTML!='_' && t[4].innerHTML==t[8].innerHTML && t[0].innerHTML=='_'){
      tab.push(0,t[8].innerHTML);
   }
   if(t[0].innerHTML!='_' && t[8].innerHTML==t[0].innerHTML && t[4].innerHTML=='_'){
      tab.push(4,t[0].innerHTML);
   }
//Diagonale partant de 2
   if(t[2].innerHTML!='_' && t[2].innerHTML==t[4].innerHTML && t[6].innerHTML=='_'){
      tab.push(6,t[2].innerHTML);
   }
   if(t[6].innerHTML!='_' && t[6].innerHTML==t[2].innerHTML && t[4].innerHTML=='_'){
      tab.push(4,t[2].innerHTML);
   }
   if(t[6].innerHTML!='_' && t[6].innerHTML==t[4].innerHTML && t[2].innerHTML=='_'){
      tab.push(2,t[4].innerHTML);
   }
   //---------------------------------------------

   if(tab.length==2){
      if(tab[1]==Signes[pos]){t[tab[0]].innerHTML=tab[1];}
      else{t[tab[0]].innerHTML=Signes[pos];}
      return;
   }
   if(tab.length==4){
      if(tab[1]==Signes[pos]){t[tab[0]].innerHTML=tab[1];}
      else if(tab[3]==Signes[pos]){t[tab[2]].innerHTML=tab[3];}
      else{t[tab[2]].innerHTML=Signes[pos];}
      return;
   }
   if(tab.length==6){
    if(tab[1]==Signes[pos]){t[tab[0]].innerHTML=tab[1];}
    else if(tab[3]==Signes[pos]){t[tab[2]].innerHTML=tab[3];}
    else if(tab[5]==Signes[pos]){t[tab[4]].innerHTML=tab[5];}
    return;

   }
   else{
      do{
         f=Math.floor(Math.random()*(8-0+1)+0);
      }while(!posValide(t[f]));
      t[f].innerHTML=Signes[pos];
   }
}


function Seul(){
    for(var i=0,len=mesBoutons.length; i<len;i++){
        //var text=new Texte(messager);
        
        mesBoutons[i].addEventListener("click",function(){
            if(fin){
                return;
            }
            else{
               if(posValide(this)){
                  this.innerHTML=Signes[joueur];
                  Signes[joueur]=="X"?this.style.color="red":this.style.color="white";
                  if(Gagner(winnerBottonsColor)){
                     messager.innerHTML='Bravo!! vous avez Gagn�';
                     fin=true;
                     rePlay.innerHTML='Rejouer';
                     return;
                  }
                  if(JeuFinit()){
                     rePlay.style.backgroundColor='red';
                        messager.innerHTML='Le jeux est finit avec un match NULL!! <br>cliquez sur le bouton <u>rejouer</u> pour recommencer';
                        rePlay.innerHTML="Rejouer";
                        fin=true;
                        return;
                  }
                  
                  Ordinateur(joueur^1);
                  joueur=joueur^1;
                  if(Gagner(Faillure)){
                     messager.innerHTML='Oups...!!! Vous avez Perdu';
                     fin=true;
                     rePlay.innerHTML.backgroundColor='red';
                     rePlay.innerHTML='Revange !';
                  }
                  else if(JeuFinit()){
                     rePlay.style.backgroundColor='red';
                        messager.innerHTML='Le jeux est finit avec un match NULL!! <br>cliquez sur le bouton <u>rejouer</u> pour recommencer';
                        rePlay.innerHTML="Rejouer";
                        fin=true;
                  }
                  
               }
               else{
                  messager.innerHTMl='Vous ne pouvez pas choisir un emplacement d�j� occup�!!';
               }
            }
            
              
    
    });
        
    }
}
//Fonction Motrice
function main(){
   var choix=prompt("1-Jouer Seul\n2-Jouer � deux");
   
      fin=false;
      for(var i=0,len=mesBoutons.length; i<len;i++){
           mesBoutons[i].innerHTML='_';
           mesBoutons[i].style.backgroundColor=fontBottonsColor;
       }
       
       rePlay.style.color='white';
       rePlay.innerHTML='Actualiser';
       messager.innerHTML='';
       if(choix==2){
         messager.innerHTML='Joueur '+Signes[joueur]+' c\'est ton tour';
         Une();
       }
       if(choix==1){
         var c=prompt('Voulez vous jouer avec \n1-[X] ou 2-[O]');
         if(c==1){joueur=0;}
         if(c==2){joueur=1;}
         else{joueur=0;}
         Seul();
       }
       else if (choix!=1 && choix!=2){
         alert('Faites un bon Choix svp\nTaper sur * Actualiser * pour reprendre');
       }

}
main();


