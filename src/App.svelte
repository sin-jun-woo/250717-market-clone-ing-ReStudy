<script>
  // 1. 페이지로 사용될 각 Svelte 컴포넌트들을 가져옵니다.
  // 이 컴포넌트들은 각각의 독립적인 페이지(뷰)를 구성합니다.
  import Main from "./pages/Main.svelte";
  import Signup from "./pages/Signup.svelte";
  import Write from "./pages/Write.svelte";
  import Login from "./pages/Login.svelte";

  // 2. 라우팅(경로 관리)을 위한 라이브러리와 404 페이지 컴포넌트를 가져옵니다.
  // svelte-spa-router: Svelte 앱을 Single Page Application(SPA)으로 만들어주는 경량 라우팅 라이브러리입니다.
  // URL의 해시(#) 부분을 감지하여 그에 맞는 컴포넌트를 보여줍니다.
  import Router from "svelte-spa-router";
  // Notfound.svelte: routes 객체에 정의되지 않은 URL로 접근했을 때 보여줄 "페이지 없음" 컴포넌트입니다.
  import Notfound from "./pages/Notfound.svelte";

  // 3. 앱 전체에 공통으로 적용될 전역 CSS 파일을 가져옵니다.
  import "./css/style.css";

  // 4. 라우트(경로) 규칙을 객체 형태로 정의합니다.
  // 이 객체는 URL 경로와 해당 경로에서 렌더링될 컴포넌트를 짝지어 놓은 "지도"와 같습니다.
  const routes = {
    // 키(key): URL의 해시('#') 뒤에 오는 경로 문자열
    // 값(value): 해당 경로에서 보여줄 Svelte 컴포넌트

    "/": Main, // 기본 경로(예: http://.../#/)에서는 Main 컴포넌트를 보여줍니다.
    "/login": Login, // '/login' 경로에서는 Login 컴포넌트를 보여줍니다.
    "/signup": Signup, // '/signup' 경로에서는 Signup 컴포넌트를 보여줍니다.
    "/write": Write, // '/write' 경로에서는 Write 컴포넌트를 보여줍니다.

    // 와일드카드 '*': 위에서 정의된 경로 외에 모든 경로와 일치합니다.
    // 사용자가 존재하지 않는 페이지로 접근할 경우 Notfound 컴포넌트를 보여주는 역할을 합니다.
    "*": Notfound,
  };
</script>

<!--
  5. <Router> 컴포넌트를 마크업에 배치하여 라우팅을 실제로 동작시킵니다.
  - `routes` prop으로 위에서 정의한 routes 객체를 전달합니다.
  - `{routes}`는 `{routes: routes}`와 동일한 Svelte의 단축 문법입니다.
  - <Router> 컴포넌트는 현재 브라우저의 URL을 확인하고, `routes` 객체의 규칙에 따라
    알맞은 컴포넌트(Main, Login 등)를 이 위치에 동적으로 렌더링합니다.
-->
<Router {routes}></Router>
