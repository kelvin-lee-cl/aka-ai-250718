showTeacherArea();

let currentImageIndex = 0;
const images = [
    'highlight/1.png',
    'highlight/2.png',
    'highlight/3.jpeg',
    'highlight/4.png',
    'highlight/5.png',
    'highlight/6.png',
    'highlight/7.png',
    'highlight/9.jpg',
    'highlight/10.jpg',
    'highlight/11.jpg',
    'highlight/12.jpg',
    'highlight/13.jpg',
    'highlight/14.jpg'
];

function setImage(index) {
    currentImageIndex = index;
    document.getElementById('modalImage').src = images[currentImageIndex];
}



function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1; // Loop to last image
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0; // Loop to first image
    }
    document.getElementById('modalImage').src = images[currentImageIndex];
}

const rows = document.querySelectorAll('.row.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Fade in
        } else {
            entry.target.classList.remove('visible'); // Fade out
        }
    });
}, { threshold: 0.1 }); // Adjust threshold as needed

rows.forEach(row => {
    observer.observe(row);
});

// Add event listener for keydown events
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        changeImage(-1); // Trigger changeImage for left arrow
    } else if (event.key === 'ArrowRight') {
        changeImage(1); // Trigger changeImage for right arrow
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Slides inline viewer logic
    const totalSlides = 72;
    let currentSlide = 1;
    const slideImage = document.getElementById('slideImage');
    const slideCounter = document.getElementById('slideCounter');
    const slidePrevBtn = document.getElementById('slidePrevBtn');
    const slideNextBtn = document.getElementById('slideNextBtn');

    function updateSlide() {
        if (slideImage && slideCounter) {
            slideImage.src = `images/slides/${currentSlide}.png`;
            slideCounter.textContent = `${currentSlide} / ${totalSlides}`;
        }
    }

    if (slidePrevBtn && slideNextBtn) {
        slidePrevBtn.addEventListener('click', function () {
            currentSlide = currentSlide === 1 ? totalSlides : currentSlide - 1;
            updateSlide();
        });
        slideNextBtn.addEventListener('click', function () {
            currentSlide = currentSlide === totalSlides ? 1 : currentSlide + 1;
            updateSlide();
        });
    }

    // Keyboard navigation for inline slides viewer
    document.addEventListener('keydown', function (event) {
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
        if (slideImage) {
            if (event.key === 'ArrowLeft') {
                currentSlide = currentSlide === 1 ? totalSlides : currentSlide - 1;
                updateSlide();
            } else if (event.key === 'ArrowRight') {
                currentSlide = currentSlide === totalSlides ? 1 : currentSlide + 1;
                updateSlide();
            }
        }
    });

    // Initialize first slide
    updateSlide();
});

// Reset to first slide when modal opens
const slidesModal = document.getElementById('slidesModal');
if (slidesModal) {
    slidesModal.addEventListener('show.bs.modal', function () {
        currentSlide = 1;
        updateSlide();
    });
}

// Reverse mapping: passcode to user ID
const passcodeToUser = {
    // First set (1-35)
    '613': '1', '247': '2', '859': '3', '132': '4', '475': '5',
    '968': '6', '314': '7', '726': '8', '583': '9', '149': '10',
    '892': '11', '367': '12', '741': '13', '925': '14', '438': '15',
    '671': '16', '293': '17', '856': '18', '514': '19', '937': '20',
    '162': '21', '784': '22', '359': '23', '846': '24', '591': '25',
    '273': '26', '648': '27', '915': '28', '437': '29', '862': '30',
    '194': '31', '753': '32', '286': '33', '619': '34', '845': '35',

    // Second set (36-71)
    '372': '36', '916': '37', '548': '38', '173': '39', '794': '40',
    '251': '41', '637': '42', '891': '43', '415': '44', '769': '45',
    '283': '46', '654': '47', '197': '48', '832': '49', '465': '50',
    '918': '51', '346': '52', '781': '53', '524': '54', '967': '55',
    '138': '56', '592': '57', '847': '58', '261': '59', '735': '60',
    '489': '61', '912': '62', '357': '63', '684': '64', '219': '65',
    '563': '66', '848': '67', '192': '68', '635': '69', '478': '70',
    '921': '71',

    // Third set (72-107)
    '364': '72', '817': '73', '593': '74', '145': '75', '738': '76',
    '262': '77', '945': '78', '378': '79', '623': '80', '159': '81',
    '785': '82', '312': '83', '657': '84', '893': '85', '426': '86',
    '751': '87', '298': '88', '643': '89', '175': '90', '829': '91',
    '456': '92', '713': '93', '969': '94', '234': '95', '587': '96',
    '941': '97', '326': '98', '759': '99', '182': '100', '547': '101',
    '894': '102', '416': '103', '752': '104', '289': '105', '634': '106',
    '971': '107',

    // Fourth set (108-143)
    '385': '108', '729': '109', '164': '110', '837': '111', '594': '112',
    '946': '113', '271': '114', '658': '115', '394': '116', '818': '117',
    '253': '118', '679': '119', '142': '120', '895': '121', '328': '122',
    '764': '123', '519': '124', '873': '125', '246': '126', '691': '127',
    '358': '128', '824': '129', '169': '130', '736': '131', '482': '132',
    '917': '133', '254': '134', '678': '135', '942': '136', '387': '137',
    '652': '138', '195': '139', '867': '140', '321': '141', '758': '142',
    '493': '143',

    // Fifth set (144-179)
    '826': '144', '158': '145', '734': '146', '281': '147', '659': '148',
    '913': '149', '348': '150', '765': '151', '129': '152', '584': '153',
    '938': '154', '462': '155', '819': '156', '365': '157', '748': '158',
    '291': '159', '638': '160', '184': '161', '529': '162', '876': '163',
    '341': '164', '795': '165', '238': '166', '674': '167', '914': '168',
    '359': '169', '843': '170', '196': '171', '562': '172', '897': '173',
    '315': '174', '761': '175', '284': '176', '649': '177', '919': '178',
    '374': '179',

    // Sixth set (180-200)
    '816': '180', '259': '181', '743': '182', '168': '183', '595': '184',
    '927': '185', '361': '186', '786': '187', '432': '188', '869': '189',
    '215': '190', '673': '191', '948': '192', '384': '193', '721': '194',
    '156': '195', '898': '196', '248': '197', '615': '198', '952': '199',
    '389': '200', '724': '201'
};

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const passcode = document.getElementById('passcode').value.toUpperCase();
            const userId = passcodeToUser[passcode];

            if (userId) {
                // Store the user ID in localStorage
                localStorage.setItem('currentUserId', userId);

                // Hide the login button
                const loginBtn = document.querySelector('[data-bs-target="#loginModal"]');
                loginBtn.style.display = 'none';

                // Show logout button
                const logoutBtn = document.getElementById('logoutBtn');
                console.log('Current userId:', userId);
                if (logoutBtn && userId) {
                    logoutBtn.style.display = 'block';
                    console.log('Showing logout button');
                }

                // Add welcome message in place of the button
                const welcomeMsg = document.createElement('p');
                welcomeMsg.className = 'mt-5';
                welcomeMsg.innerHTML = `Welcome ID ${userId}`;
                loginBtn.parentNode.appendChild(welcomeMsg);

                // Show the class presentation link
                const classPptLink = document.getElementById('classPptLink');
                if (classPptLink) {
                    classPptLink.classList.remove('d-none');
                }
                const imgGenLink = document.getElementById('imgGenLink');
                if (imgGenLink) {
                    imgGenLink.classList.remove('d-none');
                }
                const aiArtStudio = document.getElementById('aiArtStudio');
                if (aiArtStudio) {
                    aiArtStudio.classList.remove('d-none');
                }

                // Show teacher area
                showTeacherArea();
            } else {
                alert('Wrong Password！');
            }
        });
    }
});

// Check login status when page loads
document.addEventListener('DOMContentLoaded', function () {
    const currentUserId = localStorage.getItem('currentUserId');
    console.log('Stored userId:', currentUserId);
    if (currentUserId) {
        // User is logged in, hide login button and show welcome message
        const loginBtn = document.querySelector('[data-bs-target="#loginModal"]');
        if (loginBtn) {
            loginBtn.style.display = 'none';

            const welcomeMsg = document.createElement('p');
            welcomeMsg.className = 'mt-5';
            welcomeMsg.innerHTML = `User ID ${currentUserId}`;
            loginBtn.parentNode.appendChild(welcomeMsg);
        }

        // Show logout button
        const logoutBtn = document.getElementById('logoutBtn');
        const userIdDisplay = document.getElementById('userIdDisplay');
        if (logoutBtn && userIdDisplay) {
            userIdDisplay.classList.remove('d-none');
            userIdDisplay.textContent = `User ID: ${currentUserId} ${getEmojiForUserId(currentUserId)}`;
            logoutBtn.style.display = 'block';
            console.log('Showing logout button on page load');
        }

        // Show the class presentation link
        const classPptLink = document.getElementById('classPptLink');
        if (classPptLink) {
            classPptLink.classList.remove('d-none');
        }

        // Show the AI Art Studio link
        const imgGenLink = document.getElementById('imgGenLink');
        if (imgGenLink) {
            imgGenLink.classList.remove('d-none');
        }

        // Show AI tools link
        const aiArtStudio = document.getElementById('aiArtStudio');
        if (aiArtStudio) {
            aiArtStudio.classList.remove('d-none');
        }
    }
});

// Optional: Add a logout function
function logout() {
    localStorage.removeItem('currentUserId');
    location.reload()
    window.location.href = '../static/index.html';

    // Refresh the page
}

// Check if currentUserId is already declared
if (!window.currentUserId) {
    window.currentUserId = localStorage.getItem('currentUserId');
}

// After successful login and user ID verification
function showTeacherArea() {
    const currentUserId = localStorage.getItem('currentUserId');
    console.log("it is working!");
    if (currentUserId) {
        const teacherArea = document.getElementById('teacherArea');
        teacherArea.classList.remove('d-none'); // Remove the 'd-none' class
    }
}

// Array of kid-friendly, positive emojis
const kidFriendlyEmojis = [
    '🌟', '🌈', '🦄', '🐱', '🐶', '🦁', '🐼', '🐨', '🦊', '🦋',
    '🌸', '🌺', '🌻', '🌞', '⭐', '🌙', '☀️', '🌤️', '🌺', '🌷',
    '🍀', '🌱', '🌳', '🌴', '🌵', '🌿', '🍄', '🌼', '🌻', '🌹',
    '🎨', '🎭', '🎪', '🎯', '🎲'
];

// Function to get emoji based on user ID
function getEmojiForUserId(userId) {
    // Subtract 1 from userId since we want to start from 0
    const index = (userId - 1) % kidFriendlyEmojis.length;
    return kidFriendlyEmojis[index];
}

