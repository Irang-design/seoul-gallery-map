// file://에서는 지도 서버가 요구하는 HTTP Referer가 전송되지 않습니다.
if (window.location.protocol === 'file:') {
  const message = document.createElement('p');
  message.textContent = '지도 실행을 위해 start-map.cmd 파일을 실행한 뒤 http://127.0.0.1:8000 에 접속해 주세요.';
  message.style.padding = '24px';
  document.getElementById('map').appendChild(message);
} else {
  initializeMap();
}

function initializeMap() {
  // 서울 중심 탐색을 위한 사각 범위이며, 정확한 행정 경계는 아닙니다.
  const explorationBounds = L.latLngBounds([37.42, 126.75], [37.70, 127.20]);
  // 서울시청을 중심으로 지도를 표시합니다.
  const map = L.map('map', {
    dragging: true,
    scrollWheelZoom: true,
    zoomControl: true,
    minZoom: 11,
    maxBounds: explorationBounds,
    maxBoundsViscosity: 1,
  }).setView([37.5663, 126.9779], 13);

  // 넓은 화면에서도 탐색 범위 밖까지 축소되지 않도록 조정합니다.
  function updateMinimumZoom() {
    const minimumZoom = Math.max(11, map.getBoundsZoom(explorationBounds, true));
    map.setMinZoom(minimumZoom);
    map.panInsideBounds(explorationBounds, { animate: false });
  }

  map.on('resize', updateMinimumZoom);
  updateMinimumZoom();

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // 확인한 주소와 좌표 출처: gallery-sources.md (위도, 경도 순서)
  const galleries = [
    {
      name: '국제갤러리',
      website: 'https://www.kukjegallery.com/',
      address: '서울특별시 종로구 삼청로 54',
      // 출처의 도·분·초 좌표를 십진수로 변환합니다.
      coordinates: [37 + 34 / 60 + 50.614 / 3600, 126 + 58 / 60 + 50.203 / 3600],
    },
    {
      name: '갤러리현대',
      website: 'https://www.galleryhyundai.com/main',
      address: '서울특별시 종로구 삼청로 14',
      coordinates: [37.577203, 126.9799131],
    },
    {
      name: 'PKM갤러리',
      website: 'https://www.pkmgallery.com/',
      address: '서울특별시 종로구 삼청로7길 40',
      coordinates: [37.5841, 126.9801],
    },
    {
      name: '아라리오갤러리 서울',
      website: 'https://www.arariogallery.com/',
      address: '서울특별시 종로구 율곡로 85',
      coordinates: [37.57789, 126.98854],
    },
    {
      name: '페이스갤러리 서울',
      website: 'https://www.pacegallery.com/galleries/seoul/',
      address: '서울특별시 용산구 이태원로 267',
      coordinates: [37.5385678, 127.0014819],
    },
    {
      name: '리안갤러리 서울',
      website: null,
      address: '서울특별시 종로구 자하문로12길 9',
      coordinates: [37.579816300823, 126.97200000656],
    },
    {
      name: '아트사이드 갤러리',
      website: 'https://artside.org/contact',
      address: '서울특별시 종로구 자하문로6길 15',
      coordinates: [37.5782683, 126.9729461],
    },
    {
      name: '갤러리 시몬',
      website: 'https://www.gallerysimon.com/',
      address: '서울특별시 종로구 자하문로6길 20',
      coordinates: [37.5780538, 126.9732515],
    },
    {
      name: '타데우스 로팍 서울',
      website: 'https://ropac.net/contact/',
      address: '서울특별시 용산구 독서당로 122-1, 1–2층',
      coordinates: [37.536852, 127.0128664],
    },
    {
      name: '에스더쉬퍼 서울',
      website: 'https://www.estherschipper.com/gallery/',
      address: '서울특별시 용산구 한남대로46길 24',
      coordinates: [37.54357, 127.0024444],
    },
    {
      name: 'P21',
      website: 'https://p21.kr/',
      address: '서울특별시 용산구 회나무로 66, 1층',
      coordinates: [37.540140786529, 126.99384473733],
    },
    {
      name: '갤러리조은',
      website: 'https://galleryjoeun.com/kor/about/index.php',
      address: '서울특별시 용산구 이태원로55가길 3, 골든너겟 빌딩 1층',
      coordinates: [37.53806388831, 127.00064088705],
    },
    {
      name: '탕 컨템포러리 아트 서울',
      website: 'https://www.tangcontemporary.com/contact-en',
      address: '서울특별시 강남구 압구정로75길 6, 지하 2층',
      coordinates: [37.5261481, 127.0469826],
    },
    {
      name: '313아트프로젝트 청담',
      website: 'https://313artproject.com/contact/',
      address: '서울특별시 강남구 압구정로60길 11, K빌딩 5층',
      coordinates: [37.5264997, 127.0422025],
    },
    {
      name: '오페라갤러리 서울',
      website: 'https://operagallery.com/public/contact/seoul',
      address: '서울특별시 강남구 언주로164길 24, 5층',
      coordinates: [37.5254251, 127.0354742],
    },
    {
      name: '보자르갤러리',
      website: null,
      address: '서울특별시 강남구 도산대로99길 50-2, 1층',
      coordinates: [37.527051720817, 127.0493165947],
    },
    {
      name: '갤러리JJ',
      website: 'https://www.galleryjj.org/contact',
      address: '서울특별시 강남구 압구정로30길 63',
      coordinates: [37.523241201789, 127.029152232964],
    },
    {
      name: '더페이지갤러리',
      website: 'https://thepage-gallery.com/contact/',
      address: '서울특별시 성동구 서울숲2길 32-14, 갤러리아 포레 G층',
      coordinates: [37.54559326, 127.04291534],
    },
    {
      name: '갤러리27',
      website: 'https://gallery27ss.com/',
      address: '서울특별시 성동구 동일로 27, 2층',
      coordinates: [37.5357857, 127.0599344],
    },
    {
      name: '레온갤러리 성수스트릿',
      website: 'https://leongallery.co.kr/aboutstreet',
      address: '서울특별시 성동구 성덕정9가길 26-1, 1층',
      coordinates: [37.5389573, 127.052851],
    },
    {
      name: '챕터투 (CHAPTER II)',
      website: 'https://chapterii.org/ko/contact/',
      address: '서울특별시 마포구 동교로27길 54',
      coordinates: [37.560206971147, 126.92124621374],
    },
    {
      name: '갤러리 이트리움',
      website: 'https://etrium.art/',
      address: '서울특별시 마포구 동교로 233, 이트라이브연남빌딩 6–7층',
      coordinates: [37.560915420466, 126.92408392356],
    },
    {
      name: '온수공간',
      website: 'https://www.onsu-gonggan.com/',
      address: '서울특별시 마포구 월드컵북로1길 74',
      coordinates: [37.553441774528, 126.9177751719],
    },
    {
      name: '아트앤갤러리 (ArtNGallery)',
      website: null,
      address: '서울특별시 강서구 공항대로 219, 11층 1104호',
      coordinates: [37.559537749719, 126.83199337332],
    },
    {
      name: '강서아트리움 갤러리 서',
      website: 'https://culture.gangseo.seoul.kr/gsfc/main/contents.do?menuNo=800080',
      address: '서울특별시 강서구 가로공원로 195, 강서아트리움 1층',
      coordinates: [37.5368419885456, 126.83768473080757],
    },
  ];

  const galleryList = document.querySelector('#gallery-list ul');
  const searchInput = document.getElementById('gallery-search');
  const searchStatus = document.getElementById('search-status');

  const galleryEntries = galleries.map((gallery) => {
    const marker = L.marker(gallery.coordinates, { title: gallery.name, alt: gallery.name })
      .addTo(map)
      .bindPopup(createGalleryPopup(gallery));

    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery-button';
    button.textContent = gallery.name;
    button.addEventListener('click', () => {
      map.setView(gallery.coordinates, Math.max(map.getZoom(), 16), { animate: false });
      marker.openPopup();
    });

    item.appendChild(button);
    galleryList.appendChild(item);
    return { gallery, marker, item };
  });

  function filterGalleries() {
    const query = searchInput.value.trim().toLocaleLowerCase('ko-KR');
    let visibleCount = 0;

    galleryEntries.forEach(({ gallery, marker, item }) => {
      const matches = gallery.name.toLocaleLowerCase('ko-KR').includes(query);
      item.hidden = !matches;

      if (matches) {
        visibleCount += 1;
        if (!map.hasLayer(marker)) marker.addTo(map);
      } else if (map.hasLayer(marker)) {
        marker.closePopup();
        map.removeLayer(marker);
      }
    });

    searchStatus.hidden = visibleCount > 0;
  }

  searchInput.addEventListener('input', filterGalleries);
  filterGalleries();
}

function createGalleryPopup(gallery) {
  const popup = document.createElement('div');

  const name = document.createElement('strong');
  name.textContent = gallery.name;
  popup.appendChild(name);

  const address = document.createElement('p');
  address.textContent = gallery.address;
  popup.appendChild(address);

  // 공식 홈페이지가 확인된 갤러리에만 링크를 표시합니다.
  if (gallery.website) {
    const link = document.createElement('a');
    link.href = gallery.website;
    link.textContent = '공식 홈페이지 방문';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    popup.appendChild(link);
  }

  return popup;
}
