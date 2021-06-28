import React from 'react';
import * as FaIcon from 'react-icons/fa';                    
import * as AiIcon from 'react-icons/ai'; 
import * as IoIcon from 'react-icons/io';  

export const SidebarData = [{
    title:"Home",
    path: '/home',
    icon:<AiIcon.AiFillHome />,
    cName: 'nav-text'
},
{
    title:"Baptism",
    path: '/searchBaptism',
    icon:<FaIcon.FaWater />,
    cName: 'nav-text'
},
{
    title:"Holy Communion",
    path: '/holycommunion',
    icon:<FaIcon.FaPrayingHands />,
    cName: 'nav-text'
},
{
    title:"Marriage",
    path: '/marriage',
    icon:<FaIcon.FaRing/>,
    cName: 'nav-text'
},
{
    title:"Parishioners",
    path: '/parishioners',
    icon:<IoIcon.IoMdPeople />,
    cName: 'nav-text'
},
{
    title:"Mass Intentions",
    path: '/massintentions',
    icon:<FaIcon.FaCoins />,
    cName: 'nav-text'
},
{
    title:"Settings",
    path: '/settings',
    icon:<FaIcon.FaCogs />,
    cName: 'nav-text'
},
{
    title:"Exit",
    path: '/login',
    icon:<FaIcon.FaPowerOff />,
    cName: 'nav-text'
}
]