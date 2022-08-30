## 1. 프로젝트 실행 방법

1. VSCode로 프로젝트 오픈
2. 터미널 오픈하고 npm 또는 yarn install
3. npm run start 또는 yarn start로 로컬서버 실행

## 2. 주 사용 라이브러리와 사용 의도

- React : SPA & Component 개발 용도
- axios : http 비동기 통신 용도
- react-router-dom : Page Routing 용도
- react-hook-form : 로그인 화면에서 이메일, 비밀번호 입력을 효율적으로 처리하기 위해 사용
- @tanstack/react-query : 회원 정보 화면에서 서버상태(회원 정보)를 핸들링하기 위해 사용
- recoil : 비밀번호 변경 화면에서 prop drilling 방지 및 여러 컴포넌트로 분리한 input 값을 전역으로 관리하기 위해 사용

## 3. 프로젝트 폴더 구조와 설계 의도

- api : axios instance 관리 및 api 통신 관련 코드 폴더
- components : Reusable & 자체 비즈니스 로직이 없는 컴포넌트 폴더
- constant : 전역으로 사용할 상수 정의 폴더
- hooks : Page 혹은 Container 컴포넌트에서 react hook, UI, 비즈니스 처리하는 Custom Hook 폴더
- layouts : 화면 Layout 컴포넌트 폴더
- pages: route를 갖고 container 역할을 하는 page 컴포넌트 폴더
- recoils: recoil 코드 폴더. atom, selector 정의
- routes : Route Object 정의 및 생성
- types : 전역으로 사용할 type, interface 코드 폴더
- utils : 전역으로 사용할 유틸 함수 폴더
- 설계 의도
  폴더 구조는 코드의 기능, 용도 별로 구분되도록 의도했습니다. recoil, route와 같이 라이브러리를 사용하여 기능을 구현하는 코드는 각각 구분해서 완성된 모듈을 export 하고자했습니다.

## 4. 컴포넌트 구조와 설계 의도

- 컴포넌트 계층 구조
  - App (Provider, Root 등)
    - Layout
      - Page Component (Route)
        - Sub Page Component (필요시)
          - 공통 Componenet
- 설계 의도
  기능이 주입되는 App 컴포넌트는 제외하고 Layout 컴포넌트가 최상단이 되어 화면에서 기능 기준으로 구분합니다. Header, Content, Footer(본 프로젝트에는 없음) 등으로 나뉩니다. react-router를 이용해서 Content(Page)가 들어갈 영역을 지정합니다.
  Page Component는 Content의 마크업을 구성하고 커스텀훅을 통해 비즈니스 로직을 갖습니다. 마크업은 기본 앨리먼트와 공통 컴포넌트를 조합하여 구성합니다. 비밀번호 변경 화면과 같이 한 페이지에서 content의 구분이 필요하면 Sub Page Component로 분리합니다.
  공통 컴포넌트는 atomic 단위의 엘리먼트를 props로 재활용 할 수 있도록 구성하고 서로 참조 및 내부 로직을 금지하여 Page 컴포넌트에서 제어하도록 합니다.

## 5. (상태 관리를 사용한 경우) 상태 관리의 구조와 설계 의도

- Recoil
  사용하는 페이지 단위로 모듈을 구성합니다. 모듈은 한개의 atom으로 필요한 상태를 정의합니다. 실제 용도 단위로 쪼개서 selector를 구성합니다. 컴포넌트에서는 최대한 selector로 스토어에 접근합니다.

- React-Query
  서버상태를 관리하기 위해 사용합니다. 본 프로젝트에서는 UserInfo 화면에서 사용했습니다. 보통 전역 상태 관리에서 비동기 처리가 들어가는 경우가 많으나, 보일러플레이트가 과도해지고 서버상태를 관리하는 영역이 분리되는 단점이 있습니다. 서버상태관리 라이브러리로 컴포넌트 내에서 관리할 수 있도록 하고 콜백함수를 활용하여 받아온 서버상태에 따라 후속 처리를 할 수 있도록 했습니다.

## 6. (테스트를 작성한 경우) 테스트 시나리오 작성 의도와 목적

- N/A (테스트 미작성)

## 7. 리뷰어에게 강조하고 싶은 부분 또는 그 외 기타 내용

- react-query에 사용할 api 함수와 그 외 함수가 시그니처가 다릅니다. react-query api 함수는 콜백함수(onError)에서 에러 관리하기 위해 throw를 시키고 정상일 때는 데이터를 넘깁니다. 다른 api 함수는 성공,실패 interface의 유니온을 리턴타입으로 갖습니다. 직접 에러를 관리하기 위해 설계했습니다. 컴포넌트에서 호출 결과에 따라 구분하여 처리합니다.

- axios interceptor를 만들었으나, 요청 시에 authorization 세팅하는 코드만 추가했습니다. refreshToken이 있다면 interceptor에서 핸들링할 수 있기 때문에 남겨놨습니다.

- api 호출이 연동된 버튼은 중복클릭 방지 처리를 추가했습니다.
