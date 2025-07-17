// /Users/shin-junwoo/슈퍼코딩/코드 설명/250717/250717-market-clone-ing-ReStudy/firebase.js

// 1. Firebase SDK에서 필요한 함수들을 가져옵니다.
// `initializeApp`: Firebase 프로젝트 설정을 사용하여 앱을 초기화하는 핵심 함수입니다.
import { initializeApp } from "firebase/app";
// `getDatabase`: Realtime Database 서비스에 대한 참조를 가져오는 함수입니다.
import { getDatabase } from "firebase/database";
// `getStorage`: Cloud Storage 서비스에 대한 참조를 가져오는 함수입니다. 이미지나 파일 저장에 사용됩니다.
import { getStorage } from "firebase/storage";

// 2. Firebase 프로젝트 구성(Configuration) 객체입니다.
// TODO: 주석에 명시된 대로, 이 부분은 자신의 Firebase 프로젝트 정보로 교체해야 합니다.
// Firebase 콘솔의 '프로젝트 설정' > '내 앱'에서 확인할 수 있습니다.
// 🚨 보안 주의: API 키와 같은 민감한 정보는 소스 코드에 직접 하드코딩하기보다,
// .env(환경 변수) 파일을 사용하여 관리하는 것이 훨씬 안전합니다.
const firebaseConfig = {
  // apiKey: "AIza...",
  // authDomain: "project-id.firebaseapp.com",
  // projectId: "project-id",
  // ... 기타 설정 값들

  // The value of `databaseURL` depends on the location of the database
  // Realtime Database의 고유 URL입니다. 데이터베이스 위치(리전)에 따라 주소가 달라집니다.
  databaseURL:
    "https://carrot-market-b2695-default-rtdb.asia-southeast1.firebasedatabase.app/",
  // Cloud Storage의 버킷(저장소) 주소입니다.
  storageBucket: "gs://carrot-market-b2695.firebasestorage.app",
};

// 3. Firebase 앱을 초기화합니다.
// 위에서 정의한 `firebaseConfig` 객체를 인자로 전달하여 Firebase 서비스에 연결합니다.
// 이 `app` 객체는 초기화된 Firebase 앱의 인스턴스를 나타냅니다.
const app = initializeApp(firebaseConfig);

// 4. 초기화된 앱을 통해 각 Firebase 서비스에 대한 참조(Reference)를 얻습니다.
// 이 참조 객체들을 다른 파일(컴포넌트)에서 가져가서 실제 기능을 구현하게 됩니다.

// Realtime Database 서비스에 대한 참조를 `database` 변수에 할당합니다.
const database = getDatabase(app);
// Cloud Storage 서비스에 대한 참조를 `storage` 변수에 할당합니다.
const storage = getStorage(app);

// 5. [코드 개선 제안] 다른 파일에서 `database`와 `storage` 객체를 사용하기 위해 export(내보내기) 합니다.
// 이렇게 해야 다른 Svelte 컴포넌트에서 `import { database, storage } from './firebase.js'` 와 같이
// 불러와서 Firebase 기능을 사용할 수 있습니다.
export { database, storage };
