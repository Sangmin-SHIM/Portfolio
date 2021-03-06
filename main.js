'use strict';


// Scrolling for NavBar Transparent when it is on the top

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll',() =>{
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark');
    }
    else{
        navbar.classList.remove('navbar--dark');
    }
})



// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) =>{
    const target = event.target;
    const link = target.dataset.link;

    if (link ==null) {
        return;
    }

    navbarMenu.classList.remove('open');
    scrollIntoView(link);
});

// Navbar toggle button for small screen
const toggle = document.querySelector('.navbar__toggle-btn');

toggle.addEventListener('click',(event)=>{
    navbarMenu.classList.toggle('open');
    
})


// Contact Me Button 
const ContactButton = document.querySelector('.home__contact');
ContactButton.addEventListener('click', (event)=>{

    scrollIntoView('#contact');

});


//Transparent Slowly for Section Home when Scrolling Down
const home = document.querySelector('.home__container');
const homHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll', ()=>{

    var opacity = 1-window.scrollY/homHeight;

    home.style.opacity = opacity;
})


//Arrow Up
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll',()=>{

    if(scrollY > navbarHeight + homHeight)
    {
        arrowUp.classList.add('visible');

    }
    else
    {
        arrowUp.classList.remove('visible');
    }
});

// Arrow Up Button Click => Home

arrowUp.addEventListener('click',(event)=>{
    
    scrollIntoView('#home');
});




// Work Selector with Button
const workCategories = document.querySelector('.work__categories');
const workProjects = document.querySelector('.work__projects');

// Array for project
const projects = document.querySelectorAll('.project');

workCategories.addEventListener('click',(event)=>{
    const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;
    // *, frontend, backend, mobile <= data-filter
    if(filter ==null){
        return;
    }

    workProjects.classList.add('anim-out');

    // for(let project of projects)
    // for(let i=0; i< projects.legnth; i++){
    //  project=projects[i];
    // }
   
    setTimeout(()=> {
        projects.forEach((project) => {
            console.log(project.dataset.type);
    
            if(filter === '*' || filter === project.dataset.type){
                project.classList.remove('invisible')
            }
            else{
                project.classList.add('invisible')
            }
        })
    

        workProjects.classList.remove('anim-out');
    },300);

})


// 1. ?????? ?????? ???????????? ?????? ??????????????? ????????? ??????.

const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonial',
    '#contact',
];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id=>document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected){
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

// 2. IntersectionObserver??? ???????????? ?????? ???????????? ????????????.

const observerOptions = {
    root: null, // viewPort
    rootMargin: '0px',
    threshold: 0.3,
}

const observerCallback = (entries, observer) => {
    entries.forEach(entry=> {
        if(!entry.isIntersecting && entry.intersectionRatio>0){
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            
            let selectedIndex;
            // ??????????????? ????????? ????????? ???????????? ?????????
            if(entry.boundingClientRect.y<0){
                selectedNavIndex = index + 1;
            } else{
                selectedNavIndex = index-1;
            }

        }
    })
}
const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => observer.observe(section));


window.addEventListener('wheel',()=>{
    if(window.scrollY ==0){
        selectedNavIndex=0;
    }
    // ???????????? ????????? ?????? ????????? ????????? ??? 
    
    else if (Math.round(window.scrollY + window.innerHeight) === document.body.clientHeight || window.scrollY + window.innerHeight === document.body.clientHeight)
    {
        console.log("Hey");
        selectedNavIndex= navItems.length-1;
    }
        
    selectNavItem(navItems[selectedNavIndex]);
})
// 3. ???????????? ????????? ???????????? ?????? ???????????? ????????? ?????????.

