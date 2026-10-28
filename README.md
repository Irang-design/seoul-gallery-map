# SEOUL GALLERY MAP

서울의 갤러리 25곳을 지도와 목록에서 탐색하는 웹 애플리케이션입니다. HTML, CSS, JavaScript와 Leaflet·OpenStreetMap을 사용하며, 별도의 빌드 과정이나 API 키가 필요하지 않습니다.

## 주요 기능

- 갤러리 위치 마커와 이름·주소 팝업
- 확인된 공식 홈페이지를 새 탭으로 여는 링크
- 목록 클릭 시 해당 위치로 이동하고 팝업 열기
- 갤러리 이름 실시간 검색 및 목록·마커 동시 필터링
- 서울 중심 지도 이동 범위 및 최소 줌 제한
- PC 좌우 배치와 모바일 상하 배치의 반응형 화면

갤러리 정보의 출처와 홈페이지 점검 기록은 [gallery-sources.md](gallery-sources.md)에 정리되어 있습니다. 공식 홈페이지를 확인하지 못했거나 접속 오류가 확인된 곳은 링크를 표시하지 않습니다.

## 로컬 실행

Python 3와 웹 브라우저가 필요합니다. Leaflet CDN과 지도 타일을 불러오기 위해 인터넷에 연결되어 있어야 합니다.

### Windows

1. `start-map.cmd`를 실행합니다.
2. 브라우저에서 <http://127.0.0.1:8000>에 접속합니다.
3. 사용하는 동안 실행 창을 열어 둡니다. 서버를 종료하려면 실행 창에서 `Ctrl+C`를 누릅니다.

### 터미널에서 직접 실행

프로젝트 폴더에서 다음 명령을 실행한 뒤 같은 주소로 접속합니다.

```sh
python -m http.server 8000 --bind 127.0.0.1
```

환경에 따라 `python` 대신 `python3`를 사용합니다. `index.html`을 더블클릭하는 `file://` 방식 대신 로컬 HTTP 서버로 실행해 주세요.

## 파일 구성

- `index.html`: 기본 화면과 외부 라이브러리 연결
- `style.css`: PC·모바일 스타일
- `script.js`: 지도, 갤러리 데이터, 검색 및 목록 연동
- `gallery-sources.md`: 데이터 출처와 점검 기록
- `start-map.cmd`: Windows 로컬 서버 실행 도구

정적 호스팅에는 `index.html`, `style.css`, `script.js`를 같은 폴더 구조로 올리면 됩니다. 지도에는 OpenStreetMap 기여자 표시가 포함되어 있습니다.
