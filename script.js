// ==================== 전역 변수 ====================
const landingPage = document.getElementById('landing-page');
const navbar = document.querySelector('.navbar');
const destinationButtons = document.querySelectorAll('.destination-btn');
const navTabs = document.querySelectorAll('.nav-tab:not(.home-btn)');
const homeBtn = document.getElementById('home-btn');
const navBrand = document.getElementById('nav-brand');
const destinationContents = document.querySelectorAll('.destination-content');

// ==================== 배경 이미지 슬라이드쇼 ====================
// 런던 이미지 배열
const londonImages = [
    'img/london-eye.jpg',
    'img/london-bigben.jpg',
    'img/london-tower-bridge.jpg',
    'img/london-museum.jpg',
    'img/london-palace.jpg',
    'img/london-cruise.jpg',
    'img/london-night.jpg'
];

// 파리 이미지 배열
const parisImages = [
    'img/paris-eiffel.jpg',
    'img/paris-louvre.jpg',
    'img/paris-notredame.jpg',
    'img/paris-sacre.jpg',
    'img/paris-montmartre.jpg',
    'img/paris-versailles.jpg'
];

// 현재 이미지 인덱스
let londonCurrentIndex = 0;
let parisCurrentIndex = 0;

// 슬라이드쇼 인터벌 변수
let londonInterval = null;
let parisInterval = null;

// 런던 배경 변경 함수
function changeLondonBackground() {
    const londonHero = document.querySelector('.london-hero');
    if (londonHero) {
        londonCurrentIndex = (londonCurrentIndex + 1) % londonImages.length;
        const newImage = londonImages[londonCurrentIndex];
        
        // 부드러운 전환 효과
        londonHero.style.transition = 'background-image 1s ease-in-out';
        londonHero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('${newImage}')`;
    }
}

// 파리 배경 변경 함수
function changeParisBackground() {
    const parisHero = document.querySelector('.paris-hero');
    if (parisHero) {
        parisCurrentIndex = (parisCurrentIndex + 1) % parisImages.length;
        const newImage = parisImages[parisCurrentIndex];
        
        // 부드러운 전환 효과
        parisHero.style.transition = 'background-image 1s ease-in-out';
        parisHero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('${newImage}')`;
    }
}

// 슬라이드쇼 시작 함수
function startSlideshow(destination) {
    // 기존 인터벌 정리
    stopAllSlideshows();
    
    if (destination === 'london') {
        // U5: 런던 슬라이드쇼 시작 (5초 간격)
        londonInterval = setInterval(changeLondonBackground, 5000);
    } else if (destination === 'paris') {
        // U5: 파리 슬라이드쇼 시작 (5초 간격)
        parisInterval = setInterval(changeParisBackground, 5000);
    }
}

// 모든 슬라이드쇼 중지 함수
function stopAllSlideshows() {
    // U6: clearInterval로 슬라이드쇼 중지
    if (londonInterval) {
        clearInterval(londonInterval);
        londonInterval = null;
    }
    if (parisInterval) {
        clearInterval(parisInterval);
        parisInterval = null;
    }
}

// ==================== 랜딩 페이지에서 목적지 선택 ====================
destinationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const destination = button.getAttribute('data-destination');
        
        // 랜딩 페이지 숨기기 애니메이션
        landingPage.classList.add('hide');
        
        // U4: setTimeout - 애니메이션이 끝난 후 실행 (0.8초 후)
        setTimeout(() => {
            landingPage.style.display = 'none';
            
            // 네비게이션 바 표시
            navbar.classList.remove('hidden');
            
            // 선택한 목적지 컨텐츠 표시
            showDestination(destination);
            
            // 배경 슬라이드쇼 시작
            startSlideshow(destination);
            
            // 페이지 맨 위로 스크롤
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // U4: setTimeout - 환영 메시지를 1초 후에 표시
            setTimeout(() => {
                console.log(`🎉 ${destination === 'london' ? '런던' : '파리'} 여행 페이지에 오신 것을 환영합니다!`);
            }, 1000);
        }, 800);
    });
});

// ==================== 목적지 전환 함수 ====================
function showDestination(destination) {
    // 모든 컨텐츠 숨기기
    destinationContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // 모든 탭에서 active 클래스 제거
    navTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 선택한 목적지 컨텐츠 표시
    const selectedContent = document.getElementById(`${destination}-content`);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
    
    // 선택한 탭에 active 클래스 추가
    const selectedTab = document.querySelector(`.nav-tab[data-destination="${destination}"]`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
}

// ==================== 네비게이션 탭 클릭 이벤트 ====================
navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const destination = tab.getAttribute('data-destination');
        showDestination(destination);
        
        // 배경 슬라이드쇼 시작
        startSlideshow(destination);
        
        // 페이지 맨 위로 스크롤
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ==================== 홈 버튼 클릭 이벤트 ====================
homeBtn.addEventListener('click', () => {
    // 슬라이드쇼 중지
    stopAllSlideshows();
    
    // 네비게이션 바 숨기기
    navbar.classList.add('hidden');
    
    // 모든 컨텐츠 숨기기
    destinationContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // 랜딩 페이지 다시 표시
    landingPage.style.display = 'flex';
    landingPage.classList.remove('hide');
    
    // 인덱스 초기화
    londonCurrentIndex = 0;
    parisCurrentIndex = 0;
    
    // 페이지 맨 위로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== 브랜드 클릭 이벤트 (홈으로 이동) ====================
navBrand.addEventListener('click', () => {
    homeBtn.click();
});

// ==================== U7: 폼 유효성 검사 및 제출 ====================
// 런던 메모 폼
const londonForm = document.getElementById('london-memo-form');
const londonSuccessMsg = document.getElementById('london-memo-success');

if (londonForm) {
    londonForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 폼 데이터 수집
        const formData = new FormData(londonForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const memo = formData.get('memo');
        
        // U7: 유효성 검사
        if (!name || !memo) {
            alert('⚠️ 이름과 메모 내용은 필수 입력 항목입니다!');
            return;
        }
        
        // 이메일 유효성 검사 (선택 사항이지만 입력되었다면 검증)
        if (email && !validateEmail(email)) {
            alert('⚠️ 올바른 이메일 형식이 아닙니다!');
            return;
        }
        
        // 메모 저장 (localStorage에 저장)
        const memoData = {
            name: name,
            email: email,
            memo: memo,
            destination: 'london',
            timestamp: new Date().toISOString()
        };
        
        saveMemo('london', memoData);
        
        // U4: setTimeout - 성공 메시지를 0.5초 후에 표시
        setTimeout(() => {
            londonSuccessMsg.classList.remove('hidden');
            londonForm.reset();
            
            // U4: setTimeout - 3초 후 성공 메시지 자동 숨김
            setTimeout(() => {
                londonSuccessMsg.classList.add('hidden');
            }, 3000);
        }, 500);
    });
}

// 파리 메모 폼
const parisForm = document.getElementById('paris-memo-form');
const parisSuccessMsg = document.getElementById('paris-memo-success');

if (parisForm) {
    parisForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 폼 데이터 수집
        const formData = new FormData(parisForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const memo = formData.get('memo');
        
        // U7: 유효성 검사
        if (!name || !memo) {
            alert('⚠️ 이름과 메모 내용은 필수 입력 항목입니다!');
            return;
        }
        
        // 이메일 유효성 검사
        if (email && !validateEmail(email)) {
            alert('⚠️ 올바른 이메일 형식이 아닙니다!');
            return;
        }
        
        // 메모 저장 (localStorage에 저장)
        const memoData = {
            name: name,
            email: email,
            memo: memo,
            destination: 'paris',
            timestamp: new Date().toISOString()
        };
        
        saveMemo('paris', memoData);
        
        // U4: setTimeout - 성공 메시지를 0.5초 후에 표시
        setTimeout(() => {
            parisSuccessMsg.classList.remove('hidden');
            parisForm.reset();
            
            // U4: setTimeout - 3초 후 성공 메시지 자동 숨김
            setTimeout(() => {
                parisSuccessMsg.classList.add('hidden');
            }, 3000);
        }, 500);
    });
}

// 이메일 유효성 검사 함수
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 메모 저장 함수 (localStorage 활용)
function saveMemo(destination, memoData) {
    try {
        // 기존 메모 불러오기
        const existingMemos = JSON.parse(localStorage.getItem(`${destination}-memos`) || '[]');
        
        // 새 메모 추가
        existingMemos.push(memoData);
        
        // localStorage에 저장
        localStorage.setItem(`${destination}-memos`, JSON.stringify(existingMemos));
        
        console.log(`✅ ${destination} 메모가 저장되었습니다:`, memoData);
    } catch (error) {
        console.error('메모 저장 중 오류:', error);
    }
}

// ==================== 초기 설정 ====================
// 페이지 로드 시 모든 컨텐츠 숨기기
window.addEventListener('DOMContentLoaded', () => {
    destinationContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // U4: setTimeout - 페이지 로드 2초 후 환영 메시지
    setTimeout(() => {
        console.log('🌍 유럽 여행 회고 웹사이트에 오신 것을 환영합니다!');
        console.log('💡 단축키: 1 = 런던, 2 = 파리, ESC = 홈');
    }, 2000);
});

// ==================== 카드 호버 효과 강화 (선택 사항) ====================
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // 추가 인터랙션을 원하면 여기에 코드 추가
    });
    
    card.addEventListener('mouseleave', () => {
        // 추가 인터랙션을 원하면 여기에 코드 추가
    });
});

// ==================== 스크롤 이벤트 (네비게이션 바 효과) ====================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // 랜딩 페이지가 표시 중일 때는 실행하지 않음
    if (!landingPage.classList.contains('hide') && landingPage.style.display !== 'none') {
        return;
    }
    
    // 스크롤 다운 시 네비게이션 바를 약간 투명하게
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.opacity = '0.9';
    } else {
        navbar.style.opacity = '1';
    }
    
    lastScroll = currentScroll;
});

// ==================== 키보드 네비게이션 (선택 사항) ====================
document.addEventListener('keydown', (e) => {
    // 랜딩 페이지가 표시 중일 때만 작동
    if (!landingPage.classList.contains('hide') && landingPage.style.display !== 'none') {
        if (e.key === '1') {
            // 1번 키: 런던 선택
            document.querySelector('.london-btn').click();
        } else if (e.key === '2') {
            // 2번 키: 파리 선택
            document.querySelector('.paris-btn').click();
        }
    } else {
        // 컨텐츠 페이지에서 ESC 키: 홈으로
        if (e.key === 'Escape') {
            homeBtn.click();
        }
    }
});

// ==================== 애니메이션 지연 로딩 (성능 최적화) ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 모든 카드에 observer 적용 및 접근성 속성 추가
document.addEventListener('DOMContentLoaded', () => {
    const animatedCards = document.querySelectorAll('.card');
    animatedCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
        
        // A3: 키보드 접근성 - 카드에 tabindex 추가
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
        
        // 엔터 키 또는 스페이스바로 카드 활성화
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // 카드 클릭과 동일한 효과 (필요시 확장 가능)
                card.classList.toggle('active');
            }
        });
    });
});

// ==================== 페이지를 떠날 때 슬라이드쇼 정리 ====================
window.addEventListener('beforeunload', () => {
    stopAllSlideshows();
});

console.log('🌍 유럽 여행 웹사이트가 로드되었습니다!');
console.log('💡 단축키: 1 = 런던, 2 = 파리, ESC = 홈');
console.log('🎬 배경 슬라이드쇼: 5초마다 자동 변경');
console.log('📝 메모 기능: 각 도시 페이지 하단에서 메모를 남겨보세요!');
