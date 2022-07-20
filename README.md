# Project name or Logo
<img src = "https://user-images.githubusercontent.com/102807742/180092865-f2a58318-edf1-4fb7-bbfa-b68b12a8d5d6.png">


## 프로잭트 소개

- 과거 10년간 어선 해양사고 유형별 현황을 살펴보면 해양사고 유형 중 어선 기관손상 사고가 26%로 2위를 차지하고 있습니다.
어선의 경우 어선 운영자의 어선 자율정비 및 안전관리 능력이 미흡하고, 안전관리 수행 인력과 전문성의 부족으로 사고 예방에 대한 적극적인 관리가 되지 못하고 있습니다. 
그렇기에 저희는 "어서어선"이라는 웹을 통해 이러한 문제를 해결해 보려 합니다.

## 기능 설명

- 일지 등록<br>
사용자는 항해 후 날짜, 시간, 특이사항을 기록합니다
항해 나갔던 날들을 한 눈에 확인할 수 있는 달력을 제공합니다.
- 점검 체크리스트<br>
일지에 기록된 시간을 누적하여 다음 점검일까지 남은 시간을 보여줍니다.
점검 체크리스트를 제공하여 체계적인 어선 관리를 할 수 있게 도와줍니다.
- 커뮤니티<br>
후기 게시판에서 호남에 위치한 84곳의 지정수리소 이용 후기를 적고 다른 사용자들과 공유할 수 있습니다.
문의 게시판에서 어선 관리에 대한 질문과 답변을 주고받을 수 있습니다.
공지사항에서 해양 관련 이슈들을 제공합니다.


## 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)

- ECMAScript 6 지원 브라우저 사용
- 권장: Google Chrome 버젼 77 이상

## 기술 스택 (Technique Used)

### Server(back-end)

- nodejs
- express
- mySQL

### Front-end

- html, ccs, javascript
- 기타 사용한 라이브러리(추후 추가)

## 설치 안내 (Installation Process)

```
$ git clone https://github.com/2022-oasis-hackathon/oasis-BecauseThisIsMyFirstHackathon.git
$ npm install
$ npm run start
```

## 프로젝트 사용법 (Getting Started)

1. http://localhost:3000에 접속한다.
2. 회원가입 후 로그인을 한다.
3. 일지 등록 페이지에서 운행 일지를 등록한다.
4. 일지 목록을 통해 운행 일지를 확인한다.
5. 점검 목록을 통해 점검 요소의 진행 상황을 확인한다.
6. 리뷰 게시판 및 문의 게시판을 통해 지정 수리소에 대한 정보를 확인할 수 있다.

## 팀 정보 (Team Information)

- 이승엽 - 기획자 
- 김종준 - 백엔드 개발자 
- 나혜연 - 프런트 개발자
- 조배경 - 디자이너 및 프런트 개발자

## 저작권 및 사용권 정보 (Copyleft / End User License)

- [MIT](https://github.com/osam2020-WEB/Sample-ProjectName-TeamName/blob/master/license.md)

This project is licensed under the terms of the MIT license.
