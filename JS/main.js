/*
Global Variables 
@description
ulList --> Ul for the Main NavBar
sections --> All section nodes in the document
sideScroll__ul --> Ul for the side NavBar.

*/
const ulList = document.querySelector(
	'.main-nav__ul');
const sections = document
	.querySelectorAll('.section');
const btn_Top = document.querySelector(
   '.scroll-top');
   const btn_top2 = document.querySelector(
      '.top');
const sideScroll__ul = document
	.querySelector('.scroll-top__ul');
const hamburger = document
	.querySelector('.fa-bars');

const showNav = () => {
	if (!ulList.classList.contains(
			'show')) {
		ulList.classList.add('show')
	} else {
		ulList.classList.remove('show')
	}
}

let smoothScroll = (link) => {
	
	/*
	@param: link --> the smoothScroll() function takes a parameter (link)
	eventListener is called on this link,
	using the id on the link, (each link id is section name, 'sports' + '-link' eg sports-link,)
	use the substring function on the id to take out the '-link' from the string, 
	'-link' has a length of 5. minus 5 from the link.id.lenght
	we get a string that matches one of the sections.
	target the section with the same name as the string 
	call the scrollIntoView Method on the section.
	*/
	
	link.addEventListener('click', (e) => {
		e.preventDefault();
		const secId = link.id;
		let strLength = secId.length;
		let subLength = strLength - 5;
		let linkId = secId.substring(0, subLength);
		let togoSection = document.querySelector(`#${linkId}`)
		togoSection.scrollIntoView(true, {
			behavior: "smooth",
			block: "end",
			inline: "nearest"
		});
		
	})
}

let BuildNav = () => {
	/*
	    @Description BuildNav function Dynamically update the NavBar
	    and the Side NavBar
	     */
	
	// create a fragment of the document for optimization
	const fragment = document
		.createDocumentFragment();
	const fragment2 = document
		.createDocumentFragment();
	
	// call a forEach method on the list of Section Nodes in the  DOM
	
	sections.forEach((sec) => {
		/* @description 
           get id for each section from sections Nodelist
           create li tag,
           create anchor tag,
           update textContent of the anchor tag with the section id
            add href attribute using the section id
           append anchor tag to li tag 
           append li tag to document fragment.
           when the forEach loop is done, append the document fragment to the UL.
 
           this also dynamically load the mini side navigation bar simultanously, 
           using the seconf variables newLi2, liLink2 as seen below
       */
		let secId = sec.id;
		let newLi = document
			.createElement('li');
		let newLi2 = document
			.createElement('li');
		let liLink = document
			.createElement('a');
		let liLink2 = document
			.createElement('a');
		liLink.textContent = secId;
		liLink2.textContent = secId;
		liLink.id = `${secId}-link`
		liLink2.id = `${secId}-link`
		liLink.classList.add(
			'link-btn')
		liLink2.classList.add(
			'link-btn')
		liLink.href = " ";
		liLink2.href = " ";
		newLi.appendChild(liLink);
		newLi2.appendChild(liLink2);
		fragment.appendChild(newLi)
		fragment2.appendChild(
			newLi2)
	})
	ulList.appendChild(fragment);
	sideScroll__ul.appendChild(fragment2)
	
	/*
	@description: 
	get the list of all the anchor tags on the li element on the navbar
	calling the smoothScroll function on each of the links
	each link Id is used to get the section with the id contained in the link class.
	*/
	const links = document.querySelectorAll('.link-btn');
	
	links.forEach((link) => {
		smoothScroll(link);
	})
}

let isElActive = (el) => {
	
	/*
	 @description
	isElActive function check if document node is in viewport using the getBoundingClientRect()
	*/
	
	let cardRect = el
		.getBoundingClientRect();
	
	return ((cardRect.top < 40 &&
		cardRect.top > -550) || (
		cardRect.bottom < 485 &&
		cardRect.bottom > 100))
}

let addActiveClass = () => {
	/*
	@description
	the addActiveClass function runs a forEach method on list of sections, gets the section id 
	for each section and get the anchor tag that matches the id(have the same id name as the section id),
	if the section is in viewport, 
	active class is added to the matching anchor tag
	 
	*/
	
	sections.forEach((sec) => {
		let secId = sec.id;
		let activeLink = document
			.querySelector('#' +
				secId + '-link');
		if (isElActive(sec)) {
			activeLink.classList.add(
				'active');
		} else if (!isElActive(
				sec)) {
			activeLink.classList
				.remove('active');
		}
	})
	
}

let btnTop = () => {
	window.addEventListener('scroll', () => {
		if (scrollY > 700) {
			
			btn_Top.style.cssText =
				" display:block; position: fixed;"
			btn_top2.style.cssText =
				" display:block; position: fixed;"
		} else {
			btn_Top.style.cssText =
				"display:none"
			btn_top2.style.cssText =
				"display:none"
		}
		
	})
}

//check the optimization using the start time and end time
const t1 = performance.now()
BuildNav();
const t2 = performance.now()
const timeC = (t2 - t1)
	.toPrecision(2);
console.log(timeC)

// call the addActiveClass on window scroll
window.addEventListener('scroll', () => {
	addActiveClass();
})

btnTop();

hamburger.addEventListener('click', showNav);
