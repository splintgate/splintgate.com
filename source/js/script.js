gsap.registerPlugin(ScrollTrigger);
const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll]'),
  smooth: true
});

scroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(" #root-div", {
  scrollTop(value) {
    return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(" #root-div").style.transform ? "transform" : "fixed"
});
const tl = gsap.from('.hero_text', {
  opacity: 0,
  y: 500,
  stagger: {
    each: 0.1,
    ease: "power2.outIn",}
})

ScrollTrigger.create({
  trigger:'#steps_heading',
  pin:true,
  scroller:'#work-steps-container',
	start:"20% 20%",
	end:"80% 80%",

  markers:true
}
);
hideNavbarOnscroll()
/* addHovereffectInServicePage();
 */function hideNavbarOnscroll() {
/*   const container = document.querySelector('#root-div');
 */  const showAnim = gsap.from('#nav_bar', { 
    yPercent: -100,
    paused: true,
    duration: 0.2
  }).progress(1);
  
  ScrollTrigger.create({
    start: "top top",
    end: 99999,
    scroller:"#root-div",
    onUpdate: (self) => {
      self.direction === -1 ? showAnim.play() : showAnim.reverse()
    }
  });
}
function addHovereffectInServicePage() {
  let serviceItems = document.getElementsByClassName('service_item');
  const serviceSection = document.querySelector('.service_section');

  Array.from(serviceItems).forEach((ele) => {

    ele.addEventListener('mouseover', (e) => {
      const backgroundColor = ele.getAttribute('data-background');
      const serviceId = ele.getAttribute('data-service-id');
      const serviceImage = document.querySelector(`.service_background_images[data-service-id = "${serviceId}"]`)
      removeActiveCLassInAllImages();
      serviceSection.style.backgroundColor = 'transparent';
      gsap.to(serviceImage,{opacity: 1,
        transform:' scale(1)',
      duration:'0.3s'})
     serviceImage.classList.add('service_background_images_active');
      
      function removeActiveCLassInAllImages() {
        /* gsap.to('.service_background_images_active',{opacity: 0,
          display: 'non',
          transform:' scale(1.2)',
        duration:0}) */
        document.querySelectorAll('.service_background_images_active').forEach((ele) => { ele.classList.remove('service_background_images_active'); })
      }
    })
  })
}

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => scroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();