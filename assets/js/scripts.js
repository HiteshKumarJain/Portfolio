
// JavaScript to handle navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');
    const navbar = document.querySelector('.navbar-collapse');
    const emailBtn = document.querySelector('.btn-rounded');
    
    // Function to remove active class from all nav links
    function removeActiveClasses() {
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });
    }
    
    // Function to add active class to current nav link
    function addActiveClass(link) {
        removeActiveClasses();
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
    }
    
    // Handle click events on navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add active class to clicked link
            addActiveClass(this);
            
            // Get target section
            const targetId = this.getAttribute('href');
            
            // Handle home link (special case)
            if (targetId === 'index.html' || targetId === '#home') {
                const homeSection = document.querySelector('#home');
                if (homeSection) {
                    homeSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } else {
                // Handle other section links
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            
            // Close mobile menu if open
            if (navbar.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbar);
                bsCollapse.hide();
            }
        });
    });
    
    // Handle Email Me button click
    if (emailBtn) {
        emailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link to contact
                removeActiveClasses();
                const contactNavLink = document.querySelector('.navbar-nav .nav-link[href="#contact"]');
                if (contactNavLink) {
                    contactNavLink.classList.add('active');
                    contactNavLink.setAttribute('aria-current', 'page');
                }
                
                // Close mobile menu if open
                if (navbar.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbar);
                    bsCollapse.hide();
                }
            }
        });
    }
    
    // Handle scroll events to highlight current section
    function handleScroll() {
        let current = '';
        const scrollPosition = window.scrollY + 100; // Offset for fixed navbar
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active nav link based on current section
        if (current) {
            removeActiveClasses();
            
            // Handle home section specially
            if (current === 'home') {
                const homeNavLink = document.querySelector('.navbar-nav .nav-link[href="index.html"], .navbar-nav .nav-link[href="#home"]');
                if (homeNavLink) {
                    homeNavLink.classList.add('active');
                    homeNavLink.setAttribute('aria-current', 'page');
                }
            } else {
                const currentNavLink = document.querySelector(`.navbar-nav .nav-link[href="#${current}"]`);
                if (currentNavLink) {
                    currentNavLink.classList.add('active');
                    currentNavLink.setAttribute('aria-current', 'page');
                }
            }
        }
    }
    
    // Throttle scroll events for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 10);
    });
    
    // Initial call to set active link on page load
    handleScroll();
});

window.addEventListener('scroll', function() {
    const backToTopBtn = document.querySelector('.back-to-top');
    const aboutSection = document.querySelector('#about'); // or whatever your about section ID is
    
    if (aboutSection) {
        const aboutOffset = aboutSection.offsetTop;
        
        if (window.pageYOffset >= aboutOffset) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    }
});


// function sendMail(){
//   var subject = document.getElementById("subject").value;
//   var mailBody = document.getElementById("mailBody").value;
//   window.location.href = "mailto:hiteshkumarjainhkj@gmail.com?subject=" + subject + "&body=" + mailBody;
// }

function sendMail(){
  var subject = document.getElementById("subject").value;
  var mailBody = document.getElementById("mailBody").value;
  
  // Get the send button (assuming it has an id like "sendBtn" or "submitBtn")
  var sendButton = document.querySelector('button[onclick="sendMail()"]') || document.getElementById("sendBtn");
  
  // Change button text to indicate sending
  var originalButtonText = sendButton.innerHTML;
  sendButton.innerHTML = "Sending...";
  sendButton.disabled = true;
  
  // Encode the values for URL
  var encodedSubject = encodeURIComponent(subject);
  var encodedBody = encodeURIComponent(mailBody);
  
  // Gmail compose URL format  
  var gmailURL = "https://mail.google.com/mail/?view=cm&fs=1&to=hiteshkumarjainhkj@gmail.com&su=" + encodedSubject + "&body=" + encodedBody;
  
  // Open Gmail in a new tab
  window.open(gmailURL, '_blank');
  
  // Clear the form fields
  document.getElementById("subject").value = "";
  document.getElementById("mailBody").value = "";
  
  // Reset button after a short delay
  setTimeout(function() {
    sendButton.innerHTML = originalButtonText;
    sendButton.disabled = false;
  }, 2000);
}

let currentYearElement = document.getElementById('currentYear');
let currentYear = new Date().getFullYear();

currentYearElement.innerHTML = currentYear;