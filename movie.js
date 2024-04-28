const searchButton = document.getElementById('search-button');
// 웹 페이지에서 id가 search-button인 html 요소를 찾아서 searchButton 상수에 할당
// 사용자가 클릭할 검색 버튼
const searchBar = document.querySelector('.search_bar');
// .search_bar를 사용해서 해당 클래스의 첫 번째 요소를 찾아 searchbar 상수에 할당
// 사용자가 검색어를 입력할 입력필드
let movieItems = [];
// 영 화 데이터를 저장할 배열 movieItems 을 선언하고 빈 배열로 초기화.
// 초기화한 배열은 나중에 API로 받은 영화 데이터는 저장하는데 사용


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOGNjYjM0YTlkYWUzNDNiNjk1MThjYzgzYTFhOTgzNSIsInN1YiI6IjY2Mjg3MjIxMzk1NDlhMDE4OTAwZTdjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j_2eVL6bSMS7aDfpvW6iOCgbTBSAgu4x7q9hsJufZCI'
  }
};
fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(data => {
    movieItems = data.results;
    // json에서 results를 사용해서 영화 데이터를 받아오고 movieItems에 저장
    TMDBMovies(movieItems);
    //  TMDBMovies를 호출, movieItems이 가지고 있는 API로 받은 영화 데이터 인자를 전달
  })
  .catch(err => console.error(err));


function TMDBMovies(movies) {
  // TMDBMovies 함수 선언 = movie 파라미터를 받아 html리스트를 만든다
  const list = document.getElementById('movie-list');
  // html 문서 내 id가 movie-list를 찾아 상수 list에 할당 -> 영화 목록을 표시하는데 사용하게 될 html요소
  list.innerHTML = '';
  // list 요소의 내부 html을 비운다 => list 안에 있던 내용을 없애고 새로운 영화 목록을 표시 => 새로운 검색 결과나,
  // 데이터 업데이트 시 이전과 중복이 안된다.

  movies.forEach(movie => {
    // movie 배열을 반복하기 위해 forEach를 사용한다 => forEach는 배열의 각 요소에 대해 한 번씩 함수를 실행
    const item = document.createElement('li');
    // createElement를 호출해서 새로운 li요소를 생성 -> li는 각 영화의 정보를 담는 컨테이너 역할
    item.className = 'movie-item';
    // 생성된 li요소에 className 속성을  설정해서 movie-item 이름의 클래스를 준다

    
    const img = document.createElement('img');
    // img 요소를 생성, 상수 img에 저장
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    // 각 영화의 poster_path를 붙여 완성( poster_path 는 해당 영화의 포스터 이미지에 대한 경로나 파일 이름을 포함하는 문자열)
    img.alt = `Poster of ${movie.title}`;
    // 이미지 대체 텍스트 -> poster of + 영화 제목으로 표시

    img.className = 'movie-poster';
    // img 요소에 클래스 이름 movie-poster를 준다
    img.setAttribute('data-id', movie.id);
    // img 태그에 data-id의 속성을 추가 / movie.id는 반복중인 영화의 고유 id, 이 값이 data-id에 할당되어 이미지에 id정보 부여
    img.addEventListener('click', function () {
      // addEventListener는 지정된 요소에 이벤트 추가하는 함수 -> img 요소에 클릭 이벤트 추가
      alert(`영화 ID: ${this.getAttribute('data-id')}`);
      // 함수 내부에 alert함수를 호출해서 팝업 창에 메시지 표기 / 현재 클릭된 img 요소의 data-id 속성 값을 가져옴
      // this는 이벤트가 발생한 현재 요소를 참조
    });

    const title = document.createElement('h2');
    // h2 를 생산하고 이걸 title 상수에 저장
    title.textContent = movie.title;
    // h2 요소의 텍스트 내용을 영화의 제목인 movie.title로 설절
    title.className = 'movie-title';
    // h2 요소에 클래스 이름 movie-title을 준다

    const rating = document.createElement('p');
    // p 요소를 만들고 상수 rating에 저장
    rating.textContent = `평점: ${movie.vote_average}`;
    // 생성된 p 요소에 텍스트 내용을 영화 평점을 나타내는 걸로 설정
    rating.className = 'movie-point';
    // p 요소에 클래스 이름 movie-point를 준다

    const overview = document.createElement('p');
    // 새로운 p 요소를 만들고 상수 overview 에 저장
    overview.textContent = movie.overview;
    // 새롭게 생성된 p 요소에 텍스트 내용을 영화 스토리 로 설정
    overview.className = 'movie-story';
    // 새로운 p 요소에 클래스 이름 movie-story를 준다



    // 웹 페이지 표시 순서대로 기입
    item.appendChild(img);  // li(item) 요소에 img요소를 자식으로 추가
    item.appendChild(title); // li(item) 요소에 title
    item.appendChild(rating); // li(item) 요소에 rating
    item.appendChild(overview); // li(item) 요소에 overview
    list.appendChild(item); // item 요소를 list에 추가
  });
}

// 검색 버튼 클릭 이벤트
searchButton.addEventListener('click', () => {
  // searchButton(검색버튼)에 클릭 이벤트를 추가해서 클릭 할 때 함수가 실행
  const searchText = searchBar.value.toLowerCase();
  // searchBar에 입력한 텍스트를 가져온다
  // toLowerCase를 사용해서 대소문자 구분하지 않고 검색이 가능하게 한다
  const filteredMovies = movieItems.filter(movie =>
    movie.title.toLowerCase().includes(searchText)
    // movieItems 배열(영화 데이터 저장 배열)을 filter 메소드로 처리한다 
    // filter는 조건에 맞는 요소만 새롭게 배열로 만들어 반환한다. => 각 영화 제목을 소문자로 변환 해서
    // includes(searchText)를 사용해서 사용자의 검색어에 포함되는 영화만 새로운 배열 filteredMovies에 저장한다

  );
  TMDBMovies(filteredMovies);
  // TMDBMovies 함수를 호출해서 필터링된 영화 목록 filteredMovies을 인자로 전달. 이 함수는 화면에 표시 역할을 한다
});


// Enter 키 입력 이벤트
searchBar.addEventListener('keypress', (e) => {
  // searchBar 요소에  keypress 이벤트를 추가한다 => 사용자가 키보드를 사용하여 입력할 때 이벤트 발생
  if (e.key === 'Enter') {
    // 이벤트 객체 e 에서 key 속성을 확인해서 사용자가 Enter키를 눌렀는지 확인한다
    searchButton.click();
    // Enter 키가 눌렸으면 searchButton의 클릭
  }
});

