<script>
  // 1. 'export let'을 사용하여 부모 컴포넌트로부터 'location'이라는 이름의 prop(속성)을 받습니다.
  // 이 prop은 현재 어느 페이지에 있는지를 나타내는 문자열입니다. (예: "home", "write")
  export let location;

  // 2. 홈으로 이동하는 함수를 정의합니다.
  const moveTohome = () => {
    // window.location.hash를 변경하여 페이지를 이동시킵니다.
    // svelte-spa-router는 이 해시(#) 값의 변경을 감지하여 App.svelte에 정의된
    // 해당 경로의 컴포넌트를 렌더링합니다.
    window.location.hash = "/";
  };
</script>

<!-- 3. <footer> 태그로 하단 네비게이션 바의 전체 영역을 감쌉니다. -->
<footer>
  <!--
    4. [개선 제안] 현재는 전체 푸터 영역이 하나의 큰 <button>으로 되어 있습니다.
    on:click={moveTohome} 때문에 푸터의 어느 곳을 클릭해도 홈으로 이동하게 됩니다.
    각 아이콘이 독립적인 링크(<a> 태그) 역할을 하도록 수정하면 더 좋습니다.
  -->
  <button class="footer-block" on:click={moveTohome}>
    <!-- 홈 아이콘 영역 -->
    <div class="footer-icons">
      <div class="footer-icons__img">
        <!-- 5. Svelte의 if-else 블록을 사용한 조건부 렌더링 -->
        {#if location === "home"}
          <!-- 부모로부터 받은 location prop이 "home"과 일치하면, 채워진 모양의 SVG 아이콘을 보여줍니다. (활성 상태) -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"
            />
            <path
              d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"
            />
          </svg>
        {:else}
          <!-- location prop이 "home"이 아닐 경우, 일반 이미지 아이콘을 보여줍니다. (비활성 상태) -->
          <img src="assets/home.svg" alt="home" />
        {/if}
      </div>
      <div class="footer-icons__desc">홈</div>
    </div>

    <!-- 6. 나머지 아이콘들 (현재는 클릭 이벤트가 별도로 지정되어 있지 않습니다) -->
    <div class="footer-icons">
      <div class="footer-icons__img">
        <img src="assets/doc.svg" alt="doc" />
      </div>
      <div class="footer-icons__desc">동네생활</div>
    </div>
    <div class="footer-icons">
      <div class="footer-icons__img">
        <img src="assets/location.svg" alt="location" />
      </div>
      <div class="footer-icons__desc">내 근처</div>
    </div>
    <div class="footer-icons">
      <div class="footer-icons__img">
        <img src="assets/chat.svg" alt="chat" />
      </div>
      <div class="footer-icons__desc">채팅</div>
    </div>
    <div class="footer-icons">
      <div class="footer-icons__img">
        <img src="assets/user.svg" alt="user" />
      </div>
      <div class="footer-icons__desc">나의 당근</div>
    </div>
  </button>
</footer>
