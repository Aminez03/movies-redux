import { ADD, DELETE, EDIT, RATING } from "./actionsTypes";

 const initstate={

  list:[
    {
        id: 1,
        image:"https://fr.web.img6.acsta.net/pictures/22/01/18/10/13/5983633.jpg",
        rating:5,
        name:"Uncharted",
        date:"April 2022",
        description :"Street-smart Nathan Drake (Tom Holland) is recruited by seasoned treasure hunter Victor “Sully” Sullivan (Mark Wahlberg) to recover a fortune amassed by Ferdinand Magellan and lost 500 years ago by the House of Moncada.",
        trailer:"https://www.youtube.com/embed/eHp3MbsCbMg"
       
    },
    {
        id: 2,
        image:"https://m.media-amazon.com/images/I/81oND6XuHsL._AC_SY550_.jpg",
        rating:4,
        name:"Harry Potter",
        date:"December 2016",
        description:"Il a les mêmes cheveux noirs en bataille que son père et les yeux vert émeraude et en forme d'amande de sa mère. Il porte des lunettes rondes à monture noire et une fine cicatrice en forme d'éclair sur le front, souvent cachée par ses mèches. Harry est assez timide et plutôt modeste.",
        trailer:"https://www.youtube.com/embed/cD5S1ZvBd-0",


    },
    {
        id: 3,
        image:"https://www.zoomalia.com/blogz/1497/affiche-du-film-the-mask-dimensions-28-x-43-cm.jpg",
        rating:3,
        name:"Mask",
        date:"October 2014",
        description:"« The Mask » film culte de Chuck Russell . C'est l'histoire de Stanley Ipkiss ( Jim Carrey ) un modeste employée de banque qui est un gars gentil et timide passionner par l'univers des cartoon et qui n'ose pas aborder une magnifique chanteuse de cabaret nommer Tina Carlyle ( Cameron Diaz ) .",
        trailer:"https://www.youtube.com/embed/YRAImdAcl5g"
        
    },
    {
        id:4,
        image:"https://imgsrc.cineserie.com/2020/07/joker-est-le-film-qui-a-engendre-le-plus-de-plaintes-au-royaume-uni-en-2019.jpg?ver=1",
        rating:3,
        name:"Joker",
        date:"Janvier  2019",
        description:"Joker est un thriller psychologique américain réalisé par Todd Phillips et sorti en 2019. Il raconte, dans une histoire originale, la transformation d'Arthur Fleck en Joker, un dangereux tueur psychopathe qui deviendra, par la suite, le plus grand ennemi de Batman. Todd Phillips a coécrit le scénario avec Scott Silver.",
        trailer:"https://www.youtube.com/embed/zAGVQLHvwOY"
        



    }],
 }
export const reducer=(state=initstate,action)=>{
    switch(action.type){
        case DELETE:
          return {
            ...state,list:state.list.filter(el=>el.id!==action.payload)
          };
          case EDIT:
          return{
            ...state,list:state.list.map(el=>el.id===action.payload.id?{...el,...action.payload}:el)
          }
         
          case ADD:
            return{
              ...state,list:[...state.list,action.payload]
            }
          
            default:
            return state;
            
}
}
