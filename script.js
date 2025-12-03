//전역 변수 
const landingPage = document.getElementById('landing-page');
const navbar = document.querySelector('.navbar');
const destinationButtons = document.querySelectorAll('.destination-btn');
const navTabs = document.querySelectorAll('.nav-tab:not(.home-btn)');
const homeBtn = document.getElementById('home-btn');
const navBrand = document.getElementById('nav-brand');
const destinationContents = document.querySelectorAll('.destination-content');

//환율 API 기능 
const EXCHANGE_API_BASE = 'https://api.exchangerate-api.com/v4/latest/KRW';

//통화 정보
const CURRENCIES = {
    london: {
        code: 'GBP',
        symbol: '£',
        name: '파운드',
        displayName: '원/파운드'
    },
    paris: {
        code: 'EUR',
        symbol: '€',
        name: '유로',
        displayName: '원/유로'
    }
};

//현재 환율 데이터 캐시
let exchangeRatesCache = null;
let exchangeRatesTimestamp = null;

//Async/Await를 사용한 환율 정보 가져오기
async function fetchExchangeRates() {
    // 캐시가 있고 10분 이내면 캐시 사용 (API 호출 절약)
    const now = Date.now();
    if (exchangeRatesCache && exchangeRatesTimestamp && (now - exchangeRatesTimestamp < 600000)) {
        console.log('💰 캐시된 환율 정보 사용');
        return exchangeRatesCache;
    }
    
    //try...catch로 에러 처리
    try {
        console.log('💰 환율 정보를 가져오는 중...');
        
        //fetch API로 외부 데이터 가져오기
        const response = await fetch(EXCHANGE_API_BASE);
        
        //HTTP 에러 처리
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        //JSON 데이터 변환
        const data = await response.json();
        
        // 캐시 저장
        exchangeRatesCache = data;
        exchangeRatesTimestamp = now;
        
        console.log('✅ 환율 정보 로드 완료:', data);
        
        return data;
        
    } catch (error) {
        //에러 발생 시 처리
        console.error('❌ 환율 정보 로드 실패:', error);
        throw error;
    }
}

//DOM 생성 -  환율 정보를 화면에 표시
function displayExchangeRate(city, ratesData) {
    const exchangeBanner = document.getElementById('exchange-banner');
    const exchangeText = document.getElementById('exchange-text');
    
    if (!exchangeBanner || !exchangeText) return;
    
    const currency = CURRENCIES[city];
    
    //KRW를 기준으로 하므로, 반대로 계산 (1 GBP = ? KRW)
    const rateFromKRW = ratesData.rates[currency.code];
    const krwPerForeignCurrency = (1 / rateFromKRW).toFixed(2);
    
    //날짜 포맷팅
    const date = new Date(ratesData.date);
    const dateString = date.toLocaleDateString('ko-KR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    //HTML 요소 생성 및 삽입
    exchangeText.innerHTML = `
        <span>현재 ${currency.displayName} 환율:</span>
        <span class="exchange-rate">1 ${currency.symbol} = ${krwPerForeignCurrency}원</span>
        <span class="exchange-date">(${dateString} 기준)</span>
    `;
    
    console.log(`💰 ${currency.displayName} 환율이 화면에 표시되었습니다.`);
}

//에러 발생 시 에러 메시지 표시
function displayExchangeError() {
    const exchangeText = document.getElementById('exchange-text');
    
    if (!exchangeText) return;
    
    exchangeText.innerHTML = `
        <span class="exchange-error">⚠️ 환율 정보를 불러올 수 없습니다.</span>
    `;
}

//환율 정보 로드 및 표시
async function loadExchangeRate(city) {
    const exchangeBanner = document.getElementById('exchange-banner');
    
    //배너 표시
    if (exchangeBanner) {
        exchangeBanner.classList.remove('hidden');
    }
    
    try {
        const ratesData = await fetchExchangeRates();
        displayExchangeRate(city, ratesData);
    } catch (error) {
        displayExchangeError();
    }
}

//환율 배너 숨기기
function hideExchangeBanner() {
    const exchangeBanner = document.getElementById('exchange-banner');
    if (exchangeBanner) {
        exchangeBanner.classList.add('hidden');
    }
}

function loadAllWeather() {
    loadWeather('london');
    loadWeather('paris');
}

//배경 이미지 슬라이드쇼
//런던 이미지 배열
const londonImages = [
    'img/london-station.jpeg',
    'img/london-tower-bridge.jpg',
    'img/london-museum1.jpeg',
    'img/london-palace.jpeg',
    'img/london-gallery.jpeg',
    'img/london-park.jpeg'
];

//파리 이미지 배열
const parisImages = [
    'img/paris-louvre1.jpeg',
    'img/paris-louvre2.jpeg',
    'img/paris-not1.jpeg',
    'img/paris-orse1.jpeg',
    'img/paris-orse2.jpeg',
    'img/paris-bers1.jpeg'
];

//현재 이미지 인덱스
let londonCurrentIndex = 0;
let parisCurrentIndex = 0;

//슬라이드쇼 인터벌 변수
let londonInterval = null;
let parisInterval = null;

//런던 배경 변경 함수
function changeLondonBackground() {
    const londonHero = document.querySelector('.london-hero');
    if (londonHero) {
        londonCurrentIndex = (londonCurrentIndex + 1) % londonImages.length;
        const newImage = londonImages[londonCurrentIndex];
        
        //부드러운 전환 효과
        londonHero.style.transition = 'background-image 1s ease-in-out';
        londonHero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('${newImage}')`;
    }
}

//파리 배경 변경 함수
function changeParisBackground() {
    const parisHero = document.querySelector('.paris-hero');
    if (parisHero) {
        parisCurrentIndex = (parisCurrentIndex + 1) % parisImages.length;
        const newImage = parisImages[parisCurrentIndex];
        
        //부드러운 전환 효과
        parisHero.style.transition = 'background-image 1s ease-in-out';
        parisHero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('${newImage}')`;
    }
}

//슬라이드쇼 시작 함수
function startSlideshow(destination) {
    //기존 인터벌 정리
    stopAllSlideshows();
    
    if (destination === 'london') {
        //런던 슬라이드쇼 시작 (5초 간격)
        londonInterval = setInterval(changeLondonBackground, 5000);
    } else if (destination === 'paris') {
        //파리 슬라이드쇼 시작 (5초 간격)
        parisInterval = setInterval(changeParisBackground, 5000);
    }
}

//모든 슬라이드쇼 중지 함수
function stopAllSlideshows() {
    //clearInterval로 슬라이드쇼 중지
    if (londonInterval) {
        clearInterval(londonInterval);
        londonInterval = null;
    }
    if (parisInterval) {
        clearInterval(parisInterval);
        parisInterval = null;
    }
}

//목적지 선택
destinationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const destination = button.getAttribute('data-destination');
        
        //랜딩 페이지 숨기기 애니메이션
        landingPage.classList.add('hide');
        
        //setTimeout - 애니메이션이 끝난 후 실행 (0.8초 후)
        setTimeout(() => {
            landingPage.style.display = 'none';
            
            //네비게이션 바 표시
            navbar.classList.remove('hidden');
            
            //선택한 목적지 컨텐츠 표시
            showDestination(destination);
            
            //배경 슬라이드쇼 시작
            startSlideshow(destination);
            
            //환율 정보 로드
            loadExchangeRate(destination);
            
            //페이지 맨 위로 스크롤
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            //setTimeout - 환영 메시지를 1초 후에 표시
            setTimeout(() => {
                console.log(`🎉 ${destination === 'london' ? '런던' : '파리'} 여행 페이지에 오신 것을 환영합니다!`);
            }, 1000);
        }, 800);
    });
});

//목적지 전환
function showDestination(destination) {
    //모든 컨텐츠 숨기기
    destinationContents.forEach(content => {
        content.classList.remove('active');
    });
    
    //모든 탭에서 active 클래스 제거
    navTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    //선택한 목적지 컨텐츠 표시
    const selectedContent = document.getElementById(`${destination}-content`);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
    
    //선택한 탭에 active 클래스 추가
    const selectedTab = document.querySelector(`.nav-tab[data-destination="${destination}"]`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
}

//네비게이션 클릭 이벤트
navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const destination = tab.getAttribute('data-destination');
        showDestination(destination);
        
        //배경 슬라이드쇼 시작
        startSlideshow(destination);
        
        //환율 정보 업데이트
        loadExchangeRate(destination);
        
        //페이지 맨 위로 스크롤
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ==================== 홈 버튼 클릭 이벤트 ====================
homeBtn.addEventListener('click', () => {
    // 슬라이드쇼 중지
    stopAllSlideshows();
    
    // 네비게이션 바 숨기기
    navbar.classList.add('hidden');
    
    // 환율 배너 숨기기
    hideExchangeBanner();
    
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
        const password = formData.get('password');
        
        // U7: 유효성 검사
        if (!name || !memo || !password) {
            alert('⚠️ 이름, 비밀번호, 메모 내용은 필수 입력 항목입니다!');
            return;
        }

        // 비밀번호 길이 검사
        if (password.length < 4) {
            alert('⚠️ 비밀번호는 4자리 이상 입력해주세요!');
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
            timestamp: new Date().toISOString(),
            passwordHash: hashPassword(password)
        };
        
        saveMemo('london', memoData);
        
        // 메모 목록 업데이트
        displaySavedMemos('london');
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
        const password = formData.get('password');
        
        // U7: 유효성 검사
        if (!name || !memo || !password) {
            alert('⚠️ 이름, 비밀번호, 메모 내용은 필수 입력 항목입니다!');
            return;
        }
        
        // 비밀번호 길이 검사
        if (password.length < 4) {
            alert('⚠️ 비밀번호는 4자리 이상 입력해주세요!');
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
            timestamp: new Date().toISOString(),
            passwordHash: hashPassword(password)
        };
        
        saveMemo('paris', memoData);
        
        // 메모 목록 업데이트
        displaySavedMemos('paris');
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

// 저장된 메모 목록 표시 함수
function displaySavedMemos(destination) {
    const memosList = document.getElementById(`${destination}-saved-memos`);
    
    if (!memosList) return;
    
    try {
        // localStorage에서 메모 불러오기
        const memos = JSON.parse(localStorage.getItem(`${destination}-memos`) || '[]');
        
        // 메모가 없는 경우
        if (memos.length === 0) {
            memosList.innerHTML = '<div class="no-memos">아직 저장된 메모가 없습니다.</div>';
            return;
        }
        
        // 메모를 최신순으로 정렬
        memos.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        // 메모 목록 생성
        memosList.innerHTML = memos.map((memo, index) => {
            const date = new Date(memo.timestamp);
            const formattedDate = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            
            return `
                <div class="memo-item" data-index="${index}">
                    <div class="memo-header">
                        <div class="memo-author">👤 ${memo.name}</div>
                        <div class="memo-date">📅 ${formattedDate}</div>
                    </div>
                    ${memo.email ? `<div class="memo-email">📧 ${memo.email}</div>` : ''}
                    <div class="memo-content">${memo.memo}</div>
                    <button class="memo-delete-btn" onclick="deleteMemo('${destination}', ${index})">
            🗑️ 삭제
        </button>
                </div>
            `;
        }).join('');
        
    } catch (error) {
        console.error('메모 불러오기 중 오류:', error);
        memosList.innerHTML = '<div class="no-memos">메모를 불러오는 중 오류가 발생했습니다.</div>';
    }
}

// JSON 파일 다운로드 함수
function downloadMemosAsJSON(destination) {
    try {
        // localStorage에서 메모 불러오기
        const memos = JSON.parse(localStorage.getItem(`${destination}-memos`) || '[]');
        
        if (memos.length === 0) {
            alert('⚠️ 다운로드할 메모가 없습니다!');
            return;
        }
        
        // JSON 데이터 생성
        const jsonData = {
            destination: destination,
            exportDate: new Date().toISOString(),
            totalMemos: memos.length,
            memos: memos
        };
        
        // JSON 문자열로 변환 (보기 좋게 포맷팅)
        const jsonString = JSON.stringify(jsonData, null, 2);
        
        // Blob 생성
        const blob = new Blob([jsonString], { type: 'application/json' });
        
        // 다운로드 링크 생성
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        // 파일명 생성 (예: london-memos-2024-11-19.json)
        const today = new Date().toISOString().split('T')[0];
        link.download = `${destination}-memos-${today}.json`;
        
        // 다운로드 실행
        document.body.appendChild(link);
        link.click();
        
        // 정리
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        console.log(`✅ ${destination} 메모가 JSON 파일로 다운로드되었습니다!`);
        
    } catch (error) {
        console.error('JSON 다운로드 중 오류:', error);
        alert('❌ 파일 다운로드 중 오류가 발생했습니다.');
    }
}


// 비밀번호 해시 함수 (간단한 해시)
function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString();
}

// 메모 삭제 함수 (비밀번호 확인 포함)
function deleteMemo(destination, index) {
    try {
        // localStorage에서 메모 불러오기
        const memos = JSON.parse(localStorage.getItem(`${destination}-memos`) || '[]');
        
        // 최신순 정렬된 인덱스를 실제 배열 인덱스로 변환
        const sortedMemos = [...memos].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        const memoToDelete = sortedMemos[index];
        const actualIndex = memos.findIndex(m => m.timestamp === memoToDelete.timestamp);
        
        // 비밀번호 입력 모달 생성
        showPasswordModal(destination, actualIndex, memoToDelete.passwordHash);
        
    } catch (error) {
        console.error('메모 삭제 중 오류:', error);
        alert('❌ 메모 삭제 중 오류가 발생했습니다.');
    }
}

// 비밀번호 입력 모달 표시
function showPasswordModal(destination, actualIndex, correctPasswordHash) {
    // 모달 HTML 생성
    const modal = document.createElement('div');
    modal.className = 'password-modal';
    modal.innerHTML = `
        <div class="password-modal-content">
            <h3>🔒 비밀번호 확인</h3>
            <p style="color: #aaa; text-align: center; margin-bottom: 15px;">
                메모 작성 시 입력한 비밀번호를 입력해주세요
            </p>
            <input type="password" class="password-modal-input" placeholder="비밀번호 입력" id="delete-password-input" autofocus>
            <div class="password-error" id="password-error" style="display: none;">
                ❌ 비밀번호가 일치하지 않습니다
            </div>
            <div class="password-modal-buttons">
                <button class="password-modal-btn cancel">취소</button>
                <button class="password-modal-btn confirm">삭제</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const input = modal.querySelector('#delete-password-input');
    const errorMsg = modal.querySelector('#password-error');
    const cancelBtn = modal.querySelector('.cancel');
    const confirmBtn = modal.querySelector('.confirm');
    
    // 취소 버튼
    cancelBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // 모달 외부 클릭 시 닫기
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // 확인 버튼
    const handleConfirm = () => {
        const enteredPassword = input.value;
        const enteredPasswordHash = hashPassword(enteredPassword);
        
        if (enteredPasswordHash === correctPasswordHash) {
            // 비밀번호 일치 - 메모 삭제
            try {
                const memos = JSON.parse(localStorage.getItem(`${destination}-memos`) || '[]');
                memos.splice(actualIndex, 1);
                localStorage.setItem(`${destination}-memos`, JSON.stringify(memos));
                displaySavedMemos(destination);
                document.body.removeChild(modal);
                
                // 삭제 성공 메시지
                const successToast = document.createElement('div');
                successToast.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #28a745 0%, #20833a 100%);
                    color: white;
                    padding: 15px 25px;
                    border-radius: 8px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                    z-index: 2000;
                    animation: slideInRight 0.3s ease;
                `;
                successToast.textContent = '✅ 메모가 삭제되었습니다';
                document.body.appendChild(successToast);
                
                setTimeout(() => {
                    successToast.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => document.body.removeChild(successToast), 300);
                }, 2000);
                
                console.log(`✅ ${destination} 메모가 삭제되었습니다.`);
            } catch (error) {
                console.error('메모 삭제 중 오류:', error);
                alert('❌ 메모 삭제 중 오류가 발생했습니다.');
            }
        } else {
            // 비밀번호 불일치
            errorMsg.style.display = 'block';
            input.value = '';
            input.focus();
            input.style.borderColor = '#e50914';
            
            setTimeout(() => {
                input.style.borderColor = '#444';
            }, 1000);
        }
    };
    
    confirmBtn.addEventListener('click', handleConfirm);
    
    // Enter 키로 확인
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleConfirm();
        }
    });
    
    // ESC 키로 취소
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape' && document.body.contains(modal)) {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', escHandler);
        }
    });
    
    // 입력 필드에 포커스
    setTimeout(() => input.focus(), 100);
}

// 다운로드 버튼 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', () => {
    // 런던 다운로드 버튼
    const londonDownloadBtn = document.getElementById('london-download-btn');
    if (londonDownloadBtn) {
        londonDownloadBtn.addEventListener('click', () => {
            downloadMemosAsJSON('london');
        });
    }
    
    // 파리 다운로드 버튼
    const parisDownloadBtn = document.getElementById('paris-download-btn');
    if (parisDownloadBtn) {
        parisDownloadBtn.addEventListener('click', () => {
            downloadMemosAsJSON('paris');
        });
    }
    
    // 초기 메모 목록 표시
    displaySavedMemos('london');
    displaySavedMemos('paris');
});


// 카드 이미지 슬라이더 초기화
document.addEventListener('DOMContentLoaded', () => {
    initCardSliders();
});

// 카드 슬라이더 초기화 함수
function initCardSliders() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const images = card.querySelectorAll('.card-images img');
        const dots = card.querySelectorAll('.card-slider-dots .dot');
        const prevBtn = card.querySelector('.card-slider-btn.prev');
        const nextBtn = card.querySelector('.card-slider-btn.next');
        
        // 이미지가 1개만 있으면 슬라이더 버튼/점 숨기기
        if (images.length <= 1) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            if (card.querySelector('.card-slider-dots')) {
                card.querySelector('.card-slider-dots').style.display = 'none';
            }
            return;
        }
        
        let currentIndex = 0;
        
        // 이미지 전환 함수
        function showImage(index) {
            images.forEach(img => img.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            images[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
            
            currentIndex = index;
        }
        
        // 이전 버튼
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const newIndex = (currentIndex - 1 + images.length) % images.length;
                showImage(newIndex);
            });
        }
        
        // 다음 버튼
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const newIndex = (currentIndex + 1) % images.length;
                showImage(newIndex);
            });
        }
        
        // 인디케이터 점 클릭
        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                showImage(index);
            });
        });
    });
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
console.log('💰 환율 정보: 실시간 원/파운드, 원/유로 환율 (ExchangeRate API)');