<script>
  // 1. Svelte의 생명주기 함수와 자식 컴포넌트, Firebase 모듈을 가져옵니다.
  import { onMount } from "svelte"; // onMount: 컴포넌트가 DOM에 렌더링된 후 코드를 실행시켜주는 함수입니다.
  import Footer from "../components/Footer.svelte"; // Footer UI 컴포넌트
  import { getDatabase, ref, onValue } from "firebase/database"; // Firebase Realtime Database 관련 함수들

  // 2. 현재 시간을 표시하기 위한 변수들을 초기화합니다.
  // 이 코드는 컴포넌트가 처음 로드될 때 한 번만 실행되므로, 화면에 표시되는 시간은 고정됩니다.
  let hour = new Date().getHours().toString().padStart(2, "0");
  let min = new Date().getMinutes().toString().padStart(2, "0");

  // 3. 상품 목록을 담을 배열을 선언합니다.
  // 이 변수에 데이터가 할당되면, Svelte가 자동으로 UI를 업데이트합니다.
  let items = [];

  // 4. Firebase Realtime Database 연결 및 데이터 수신 설정
  // onMount는 컴포넌트가 화면에 마운트(표시)된 직후에 실행됩니다.
  // API 호출이나 데이터베이스 구독과 같은 초기화 작업에 적합합니다.
  onMount(() => {
    // firebase.js에서 초기화된 Firebase 앱의 데이터베이스 인스턴스를 가져옵니다.
    const db = getDatabase();
    // 데이터베이스의 'items' 경로에 대한 참조(reference)를 생성합니다.
    const itemsRef = ref(db, "/items/");

    // onValue: itemsRef 경로의 데이터를 실시간으로 수신 대기(구독)합니다.
    // 데이터베이스에서 해당 경로의 데이터가 추가/변경/삭제될 때마다 콜백 함수가 자동으로 실행됩니다.
    onValue(itemsRef, (snapshot) => {
      // snapshot.val()은 해당 경로의 데이터를 객체 형태로 가져옵니다.
      const data = snapshot.val();
      // 만약 데이터가 존재한다면 (null이 아니라면)
      if (data) {
        // Object.values()를 사용해 Firebase 객체를 배열로 변환하고,
        // reverse()를 사용해 최신 글이 위로 오도록 순서를 뒤집습니다.
        items = Object.values(data).reverse();
      } else {
        // 데이터가 없는 경우 빈 배열로 설정하여 오류를 방지합니다.
        items = [];
      }
    });
  });

  // 5. 게시글이 작성된 시간을 계산하는 유틸리티 함수
  // timestamp: 글이 데이터베이스에 저장될 때의 시간 (밀리초 단위)
  const calcTime = (timestamp) => {
    // 현재 시간과 글 작성 시간의 차이를 밀리초 단위로 계산합니다.
    const diff = new Date().getTime() - timestamp;

    // 밀리초를 초, 분, 시간, 일 단위로 변환합니다.
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // 경과 시간에 따라 다른 문자열을 반환합니다.
    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    if (minutes > 0) return `${minutes}분 전`;
    if (seconds > 0) return `${seconds}초 전`;
    return "방금 전";
  };
</script>

<!-- 6. 헤더 UI 부분: 앱의 상단 바와 메뉴를 표시합니다. -->
<header>
  <!-- 상단 상태 바 (시간, 아이콘 등) -->
  <div class="info-bar">
    <div class="info-bar__time">{hour}:{min}</div>
    <div class="info-bar__icons">
      <img src="assets/chart-bar.svg" alt="chart-bar" />
      <img src="assets/wifi.svg" alt="wifi" />
      <img src="assets/battery.svg" alt="battery" />
    </div>
  </div>
  <!-- 메뉴 바 (위치, 검색 등) -->
  <div class="menu-bar">
    <div class="menu-bar__location">
      <div>역삼1동</div>
      <div class="menu-bar__location-icon">
        <img src="assets/arrow.svg" alt="arrow" />
      </div>
    </div>
    <div class="menu-bar__icons">
      <img src="assets/search.svg" alt="search" />
      <img src="assets/menu.svg" alt="menu" />
      <img src="assets/alert.svg" alt="alert" />
    </div>
  </div>
</header>
<!-- 헤더 부분 끝 -->

<!-- 7. 메인 콘텐츠: 상품 목록을 동적으로 표시합니다. -->
<main>
  <!-- Svelte의 each 블록을 사용해 'items' 배열을 순회합니다. -->
  {#each items as item}
    <div class="item-list">
      <div class="item-list__img">
        <img src={item.imgUrl} alt={item.title} />
      </div>
      <div class="item-list__info">
        <div class="item-list__info-title">{item.title}</div>
        <div class="item-list__info-price">{item.price}원</div>
        <div class="item-list__info-description">{item.description}</div>
        <div class="item-list__info-meta">
          <span>{item.place}</span>
          <!-- calcTime 함수를 호출하여 경과 시간을 표시합니다. -->
          <span>{calcTime(item.insertAt)}</span>
        </div>
      </div>
    </div>
  {/each}
  <!-- 글쓰기 페이지로 이동하는 링크. 해시(#) 라우팅을 사용합니다. -->
  <a class="write-btn" href="#/Write">+ 글쓰기</a>
</main>

<!-- 8. Footer 컴포넌트를 렌더링하고, 현재 위치가 'home'임을 prop으로 전달합니다. -->
<Footer location="home" />

<!-- 9. 이 컴포넌트에만 적용되는 지역(scoped) 스타일입니다. -->
<style>
  /* 다른 스타일은 전역 CSS 파일에서 관리되고, 여기서는 이 컴포넌트만의 스타일을 정의합니다. */
  .info-bar__time {
    color: blue;
  }
  .item-list__info-price {
    font-weight: bold;
  }
  .item-list__info-meta span {
    margin-right: 6px;
    color: gray;
    font-size: 0.8em;
  }
</style>
