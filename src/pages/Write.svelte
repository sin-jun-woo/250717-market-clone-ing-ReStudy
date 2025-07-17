<script>
  // 필요한 모듈들을 import 합니다.
  // Footer 컴포넌트: 하단 네비게이션 바
  import Footer from "../components/Footer.svelte";
  // Firebase Realtime Database 관련 함수들
  import { getDatabase, ref, push } from "firebase/database";
  // Firebase Storage 관련 함수들
  import {
    getStorage,
    ref as refImage,
    uploadBytes,
    getDownloadURL,
  } from "firebase/storage";

  // 게시글 작성에 필요한 데이터 변수들
  let title; // 제목
  let price; // 가격
  let description; // 설명
  let place; // 장소
  let files; // 이미지 파일 (사용자가 선택한 파일 목록)

  // Firebase Storage와 Database 클라이언트 초기화
  const storage = getStorage();
  const db = getDatabase();

  // Firebase Database에 데이터를 쓰는 함수
  function writeUserData(imgUrl) {
    // 'items/' 경로에 새 데이터를 push 합니다.
    push(ref(db, "items/"), {
      title,
      price,
      description,
      place,
      insertAt: new Date().getTime(), // 현재 시간을 timestamp로 저장
      imgUrl, // 업로드된 이미지 URL
    });
    alert("글쓰기 완료"); // 알림 메시지 표시
    window.location.hash = "/"; // 메인 페이지로 이동
  }

  // 파일을 Storage에 업로드하고 다운로드 URL을 반환하는 함수
  const uploadFile = async () => {
    const file = files[0]; // 선택된 파일 중 첫 번째 파일
    const name = file.name; // 파일 이름
    const imgRef = refImage(storage, name); // Storage에 저장될 경로/이름
    await uploadBytes(imgRef, file); // 파일 업로드
    const url = await getDownloadURL(imgRef); // 업로드된 파일의 다운로드 URL 가져오기
    return url;
  };

  // 폼 제출(글쓰기 완료) 시 실행되는 함수
  const handleSubmit = async () => {
    const url = await uploadFile(); // 이미지 업로드 및 URL 가져오기
    writeUserData(url); // 데이터베이스에 글 정보 저장
  };
</script>

<!-- 폼 시작 -->
<form id="write-form" on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="image">이미지</label>
    <input type="file" bind:files id="image" name="image" />
  </div>
  <div>
    <label for="title">제목</label>
    <input type="text" id="title" name="title" bind:value={title} />
  </div>
  <div>
    <label for="price">가격</label>
    <input type="number" id="price" name="price" bind:value={price} />
  </div>
  <div>
    <label for="description">설명</label>
    <input
      type="text"
      id="description"
      name="description"
      bind:value={description}
    />
  </div>
  <div>
    <label for="place">장소</label>
    <input type="text" id="place" name="place" bind:value={place} />
  </div>
  <div>
    <button class="write-button" type="submit">글쓰기 완료</button>
  </div>
</form>
<!-- 폼 끝 -->

<!-- 하단 네비게이션 바 -->
<Footer location="write" />

<!-- 스타일 (CSS) -->
<style>
  .write-button {
    background-color: tomato;
    margin: 10px;
    border-radius: 10px;
    padding: 5px 12px 5px 12px;
    color: white;
    cursor: pointer;
  }
</style>
