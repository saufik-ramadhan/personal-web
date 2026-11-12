/**
 * content.js — single source of truth for the whole site.
 *
 * Every user-visible string is an object keyed by language code:
 *   { en: "...", id: "...", ko: "...", ja: "...", zh: "..." }
 * All five translations must be updated together; scripts/check-profile.mjs
 * rejects missing locale values.
 *
 * Profile changes must stay aligned with both CV languages; see AGENTS.md.
 */

/* ── Supported languages ─────────────────────────────────────── */
const LANGS = [
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'id', short: 'ID', label: 'Bahasa Indonesia' },
  { code: 'ko', short: 'KO', label: '한국어' },
  { code: 'ja', short: 'JA', label: '日本語' },
  { code: 'zh', short: 'ZH', label: '中文' },
];

/* ── Interface strings ───────────────────────────────────────── */
const UI = {
  skip: { en: 'Skip to content', id: 'Lewati ke konten', ko: '본문으로 건너뛰기', ja: '本文へスキップ', zh: '跳至正文' },
  scroll: { en: 'Scroll', id: 'Gulir', ko: '스크롤', ja: 'スクロール', zh: '向下滚动' },
  basedIn: { en: 'Based in', id: 'Berdomisili di', ko: '거주지', ja: '拠点', zh: '所在地' },
  email: { en: 'Email', id: 'Surel', ko: '이메일', ja: 'メール', zh: '邮箱' },
  ctaWork: { en: 'View work', id: 'Lihat karya', ko: '작업 보기', ja: '作品を見る', zh: '查看作品' },
  ctaContact: { en: 'Get in touch', id: 'Hubungi saya', ko: '연락하기', ja: 'お問い合わせ', zh: '联系我' },
  menu: { en: 'Menu', id: 'Menu', ko: '메뉴', ja: 'メニュー', zh: '菜单' },
  language: { en: 'Language', id: 'Bahasa', ko: '언어', ja: '言語', zh: '语言' },
  toDark: { en: 'Switch to dark theme', id: 'Beralih ke tema gelap', ko: '다크 테마로 전환', ja: 'ダークテーマに切り替え', zh: '切换到深色主题' },
  toLight: { en: 'Switch to light theme', id: 'Beralih ke tema terang', ko: '라이트 테마로 전환', ja: 'ライトテーマに切り替え', zh: '切换到浅色主题' },
  level: { en: 'Level', id: 'Tingkat', ko: '수준', ja: 'レベル', zh: '水平' },

  stack: { en: 'Tech stack', id: 'Teknologi', ko: '기술 스택', ja: '技術スタック', zh: '技术栈' },
  tools: { en: 'Tools', id: 'Perkakas', ko: '사용 툴', ja: 'ツール', zh: '工具' },
  projects: { en: 'Key projects', id: 'Proyek utama', ko: '주요 프로젝트', ja: '主なプロジェクト', zh: '主要项目' },
  thesis: { en: 'Thesis', id: 'Tesis', ko: '학위논문', ja: '修士論文', zh: '学位论文' },
  issuedBy: { en: 'Issued by', id: 'Diterbitkan oleh', ko: '발급 기관', ja: '発行機関', zh: '颁发机构' },
  credential: { en: 'Credential ID', id: 'ID Kredensial', ko: '자격 번호', ja: '認定番号', zh: '证书编号' },
  viewMore: { en: 'View project', id: 'Lihat proyek', ko: '프로젝트 보기', ja: 'プロジェクトを見る', zh: '查看项目' },
  playDemo: { en: 'Play in browser', id: 'Mainkan di peramban', ko: '브라우저에서 플레이', ja: 'ブラウザでプレイ', zh: '在浏览器中试玩' },

  contactKicker: {
    en: 'Have a project in mind? Let’s talk.',
    id: 'Punya proyek yang ingin dikerjakan? Mari berbincang.',
    ko: '함께할 프로젝트가 있으신가요? 편하게 연락 주세요.',
    ja: 'プロジェクトのご相談はお気軽にどうぞ。',
    zh: '有合作想法？欢迎随时联系。',
  },
  builtWith: {
    en: 'Designed & built by hand.',
    id: 'Dirancang & dibangun sendiri.',
    ko: '직접 디자인하고 개발했습니다.',
    ja: '自ら設計・制作しています。',
    zh: '亲自设计与开发。',
  },
};

/* ── Navigation / section titles ─────────────────────────────── */
const SECTIONS = {
  "about": {
    "en": "About",
    "id": "Tentang",
    "ko": "소개",
    "ja": "概要",
    "zh": "关于"
  },
  "education": {
    "en": "Education",
    "id": "Pendidikan",
    "ko": "학력",
    "ja": "学歴",
    "zh": "教育"
  },
  "experience": {
    "en": "Experience",
    "id": "Pengalaman",
    "ko": "경력",
    "ja": "職歴",
    "zh": "经历"
  },
  "design": {
    "en": "3D Design",
    "id": "Desain 3D",
    "ko": "3D 디자인",
    "ja": "3Dデザイン",
    "zh": "3D 设计"
  },
  "electronics": {
    "en": "Electronics",
    "id": "Elektronika",
    "ko": "전자·임베디드",
    "ja": "電子・組込み",
    "zh": "电子与嵌入式"
  },
  "certifications": {
    "en": "Certifications",
    "id": "Sertifikasi",
    "ko": "자격증",
    "ja": "資格",
    "zh": "证书"
  },
  "awards": {
    "en": "Awards",
    "id": "Penghargaan",
    "ko": "수상",
    "ja": "受賞",
    "zh": "奖项"
  },
  "languages": {
    "en": "Languages",
    "id": "Bahasa",
    "ko": "언어 능력",
    "ja": "語学力",
    "zh": "语言能力"
  },
  "contact": {
    "en": "Contact",
    "id": "Kontak",
    "ko": "연락처",
    "ja": "連絡先",
    "zh": "联系"
  },
  "software": {
    "en": "Desktop Software",
    "id": "Software Desktop",
    "ko": "데스크톱 소프트웨어",
    "ja": "デスクトップソフトウェア",
    "zh": "桌面软件"
  },
  "training": {
    "en": "Additional Training",
    "id": "Pelatihan Tambahan",
    "ko": "교육이수사항",
    "ja": "追加研修",
    "zh": "补充培训"
  }
};

const CONTENT = {
  "meta": {
    "name": "Saufik Ramadhan (사우픽 라마단)",
    "role": {
      "en": "Software Engineer",
      "id": "Software Engineer",
      "ko": "소프트웨어 엔지니어",
      "ja": "ソフトウェアエンジニア",
      "zh": "软件工程师"
    },
    "status": {
      "en": "Open to new opportunities",
      "id": "Terbuka untuk peluang baru",
      "ko": "새로운 기회를 찾고 있습니다",
      "ja": "新しい機会を探しています",
      "zh": "正在寻找新机会"
    },
    "tagline": {
      "en": "Building web, mobile and desktop interfaces, with an electronics and microelectronics background in embedded firmware, sensors and device integration.",
      "id": "Membangun antarmuka web, mobile, dan desktop, dengan latar belakang elektronika dan mikroelektronika dalam firmware embedded, sensor, dan integrasi perangkat.",
      "ko": "전자공학·마이크로일렉트로닉스 배경을 바탕으로 웹·모바일·데스크톱 인터페이스와 임베디드 펌웨어, 센서 및 장치 연동을 개발합니다.",
      "ja": "電子工学・マイクロエレクトロニクスの知識を生かし、ウェブ・モバイル・デスクトップの画面と、組込みファームウェア、センサー、機器連携を開発しています。",
      "zh": "结合电子工程与微电子学背景，开发 Web、移动与桌面界面，以及嵌入式固件、传感器和设备集成。"
    },
    "location": {
      "en": "Bandung, Indonesia",
      "id": "Bandung, Indonesia",
      "ko": "인도네시아 반둥",
      "ja": "インドネシア・バンドン",
      "zh": "印度尼西亚万隆"
    },
    "email": "ramadhan.saufik@gmail.com",
    "links": [
      {
        "label": "GitHub",
        "url": "https://github.com/saufik-ramadhan"
      },
      {
        "label": "Website",
        "url": "https://saufik.web.id"
      },
      {
        "label": "LinkedIn",
        "url": "https://www.linkedin.com/in/saufikramadhan/"
      }
    ]
  },
  "about": {
    "paragraphs": [
      {
        "en": "I am a software engineer building web and mobile applications with React, Next.js, React Native and TypeScript. My professional experience includes responsive interfaces, REST API integration, asset-management applications and performance improvements.",
        "id": "Saya seorang software engineer yang membangun aplikasi web dan mobile dengan React, Next.js, React Native, dan TypeScript. Pengalaman profesional saya mencakup antarmuka responsif, integrasi REST API, aplikasi manajemen aset, dan peningkatan performa.",
        "ko": "React, Next.js, React Native, TypeScript로 웹·모바일 애플리케이션을 개발하는 소프트웨어 엔지니어입니다. 반응형 인터페이스, REST API 연동, 자산관리 애플리케이션 및 성능 개선 경험이 있습니다.",
        "ja": "React、Next.js、React Native、TypeScript でウェブ・モバイルアプリを開発するソフトウェアエンジニアです。レスポンシブな画面、REST API 連携、資産管理アプリ、性能改善の業務経験があります。",
        "zh": "我是一名使用 React、Next.js、React Native 和 TypeScript 开发 Web 与移动应用的软件工程师，工作涉及响应式界面、REST API 集成、资产管理应用及性能优化。"
      },
      {
        "en": "Alongside the web, I hold a master’s in microelectronics and an electronics engineering degree — so embedded systems, sensors and 3D-modelled enclosures remain part of how I think about a product, not just its interface.",
        "id": "Selain web, saya menempuh magister mikroelektronika dan sarjana teknik elektronika — sehingga sistem embedded, sensor, dan pemodelan 3D tetap menjadi bagian dari cara saya memandang sebuah produk, bukan sekadar antarmukanya.",
        "ko": "웹과 더불어 마이크로일렉트로닉스 석사와 전자공학 학사를 마쳤습니다. 그래서 임베디드 시스템, 센서, 3D로 설계한 하우징까지 제품을 바라보는 관점의 일부로 남아 있습니다.",
        "ja": "ウェブに加えてマイクロエレクトロニクスの修士号と電子工学の学士号を持っており、組込みシステムやセンサー、3D でモデリングした筐体まで含めて製品を考えることが習慣になっています。",
        "zh": "除了 Web，我还拥有微电子学硕士与电子工程学士学位。因此嵌入式系统、传感器与 3D 建模的外壳，始终是我思考产品的一部分，而不仅仅是界面。"
      },
      {
        "en": "For my master’s thesis, I implemented experimental ESP32/ESP-NOW mesh routing with MPR selection and an Electron serial-monitoring GUI. My other projects include STM32 temperature-control firmware, an ESP32-S3 BLE game controller, MagickGUI and the LensaLAN Qt/QML monitoring prototype. C# and WPF are also part of my skill set.",
        "id": "Untuk tesis magister, saya mengimplementasikan routing mesh eksperimental ESP32/ESP-NOW dengan pemilihan MPR dan GUI pemantauan serial Electron. Proyek lain mencakup firmware kendali suhu STM32, pengendali game BLE ESP32-S3, MagickGUI, dan prototipe pemantauan LensaLAN berbasis Qt/QML. Saya juga memiliki keterampilan C# dan WPF.",
        "ko": "석사 연구에서는 ESP32·ESP-NOW 기반 실험용 메시 라우팅, MPR 선택 및 Electron 시리얼 모니터링 GUI를 구현했습니다. 다른 프로젝트로 STM32 온도 제어 펌웨어, ESP32-S3 BLE 게임 컨트롤러, MagickGUI 및 Qt/QML 기반 LensaLAN 모니터링 프로토타입이 있습니다. C#과 WPF도 보유 기술에 포함됩니다.",
        "ja": "修士研究では ESP32/ESP-NOW の実験用メッシュルーティング、MPR 選択、Electron のシリアル監視 GUI を実装しました。ほかに STM32 温度制御ファームウェア、ESP32-S3 BLE ゲームコントローラー、MagickGUI、Qt/QML ベースの監視プロトタイプ LensaLAN を開発しています。C# と WPF もスキルに含まれます。",
        "zh": "硕士研究中，我实现了基于 ESP32/ESP-NOW 的实验性网状路由、MPR 选择和 Electron 串口监控 GUI。其他项目包括 STM32 温控固件、ESP32-S3 BLE 游戏控制器、MagickGUI 及基于 Qt/QML 的 LensaLAN 监控原型。技能还包括 C# 和 WPF。"
      }
    ],
    "skills": [
      {
        "label": {
          "en": "Embedded & hardware",
          "id": "Embedded & hardware",
          "ko": "임베디드·하드웨어",
          "ja": "組込み・ハードウェア",
          "zh": "嵌入式与硬件"
        },
        "items": [
          "C",
          "C++",
          "STM32",
          "ESP32 / ESP32-S3",
          "ESP-IDF",
          "FreeRTOS",
          "ESP-NOW",
          "PID",
          "ADC",
          "I2C",
          "UART / JSON",
          "USB CDC",
          "BLE",
          "MPR routing"
        ]
      },
      {
        "label": {
          "en": "CAD & PCB",
          "id": "CAD & PCB",
          "ko": "CAD·PCB",
          "ja": "CAD・PCB",
          "zh": "CAD 与 PCB"
        },
        "items": [
          "FreeCAD",
          "KiCad",
          "Altium Designer"
        ]
      },
      {
        "label": {
          "en": "Industrial & control",
          "id": "Industri & Kendali",
          "ko": "산업 제어",
          "ja": "産業制御",
          "zh": "工业控制"
        },
        "items": [
          "Wonderware HMI",
          "SCADA",
          "RS-232",
          "RS-485"
        ]
      },
      {
        "label": {
          "en": "Networking",
          "id": "Jaringan",
          "ko": "네트워크",
          "ja": "ネットワーク",
          "zh": "网络"
        },
        "items": [
          "Cisco",
          "Network management"
        ]
      },
      {
        "label": {
          "en": "Numerical computing",
          "id": "Komputasi Numerik",
          "ko": "수치 해석",
          "ja": "数値計算",
          "zh": "数值计算"
        },
        "items": [
          "MATLAB",
          "GNU Octave"
        ]
      },
      {
        "label": {
          "en": "Languages",
          "id": "Bahasa Pemrograman",
          "ko": "언어",
          "ja": "言語",
          "zh": "编程语言"
        },
        "items": [
          "JavaScript",
          "TypeScript",
          "C#",
          "PHP",
          "Java",
          "Python",
          "C",
          "C++",
          "SQL",
          "HTML",
          "CSS"
        ]
      },
      {
        "label": {
          "en": "Frameworks",
          "id": "Framework",
          "ko": "프레임워크",
          "ja": "フレームワーク",
          "zh": "框架"
        },
        "items": [
          "React",
          "Next.js",
          "React Native",
          "Angular",
          "Node.js",
          "Redux",
          "Electron",
          "WPF",
          "Qt 6/QML"
        ]
      },
      {
        "label": {
          "en": "UI & styling",
          "id": "UI & Styling",
          "ko": "UI·스타일링",
          "ja": "UI・スタイリング",
          "zh": "UI 与样式"
        },
        "items": [
          "Tailwind",
          "SASS",
          "Styled-Components",
          "CSS-in-JS"
        ]
      },
      {
        "label": {
          "en": "Testing",
          "id": "Pengujian",
          "ko": "테스트",
          "ja": "テスト",
          "zh": "测试"
        },
        "items": [
          "Jest",
          "React Testing Library"
        ]
      },
      {
        "label": {
          "en": "Tooling & platforms",
          "id": "Perkakas & Platform",
          "ko": "툴·플랫폼",
          "ja": "ツール・基盤",
          "zh": "工具与平台"
        },
        "items": [
          "Git",
          "Docker",
          "Linux",
          "Agile / Scrum"
        ]
      }
    ]
  },
  "education": [
    {
      "period": "2022.08 - 2025.08",
      "school": {
        "en": "Bandung Institute of Technology",
        "id": "Institut Teknologi Bandung",
        "ko": "반둥 공과대학교",
        "ja": "バンドン工科大学",
        "zh": "万隆理工学院"
      },
      "degree": {
        "en": "Master’s degree, Microelectronics",
        "id": "Magister, Mikroelektronika",
        "ko": "석사, 마이크로일렉트로닉스",
        "ja": "修士課程 マイクロエレクトロニクス",
        "zh": "硕士，微电子学"
      },
      "detail": {
        "en": "GPA 3.39 · Bandung, Indonesia",
        "id": "IPK 3.39 · Bandung, Indonesia",
        "ko": "평점 3.39 · 인도네시아 반둥",
        "ja": "GPA 3.39 · インドネシア・バンドン",
        "zh": "GPA 3.39 · 印度尼西亚万隆"
      },
      "thesis": "Design of a Mesh Network Using the OLSRv2 Protocol on Resource-Constrained Devices",
      "id": "ITB"
    },
    {
      "period": "2015.08 - 2019.08",
      "school": {
        "en": "Bandung State Polytechnic",
        "id": "Politeknik Negeri Bandung",
        "ko": "반둥 국립 폴리테크닉",
        "ja": "バンドン国立ポリテクニック",
        "zh": "万隆国立理工学院"
      },
      "degree": {
        "en": "Applied bachelor’s degree, Electronics Engineering",
        "id": "Sarjana Terapan, Teknik Elektronika",
        "ko": "응용학사, 전자공학",
        "ja": "応用学士、電子工学",
        "zh": "应用学士，电子工程"
      },
      "detail": {
        "en": "GPA 3.44 · Bandung, Indonesia",
        "id": "IPK 3.44 · Bandung, Indonesia",
        "ko": "평점 3.44 · 인도네시아 반둥",
        "ja": "GPA 3.44 · インドネシア・バンドン",
        "zh": "GPA 3.44 · 印度尼西亚万隆"
      },
      "id": "POLBAN"
    },
    {
      "id": "KATAPANG",
      "period": "2012.07 - 2015.06",
      "school": {
        "en": "Vocational School 1 Katapang",
        "id": "SMK Negeri 1 Katapang",
        "ko": "카타팡 제1직업고등학교",
        "ja": "Vocational School 1 Katapang（カタパン第1職業高校）",
        "zh": "Vocational School 1 Katapang（卡塔邦第一职业学校）"
      },
      "degree": {
        "en": "Highschool, Computer and Network Engineering",
        "id": "Sekolah Menengah Kejuruan, Teknik Komputer dan Jaringan",
        "ko": "고등학교 졸업, 컴퓨터·네트워크공학",
        "ja": "高校卒業、コンピューター・ネットワーク工学",
        "zh": "高中毕业，计算机与网络工程"
      },
      "detail": {
        "en": "Bandung, Indonesia",
        "id": "Bandung, Indonesia",
        "ko": "인도네시아 반둥",
        "ja": "インドネシア・バンドン",
        "zh": "印度尼西亚万隆"
      }
    }
  ],
  "experience": [
    {
      "period": {
        "en": "2023.01 - Present",
        "id": "2023.01 - Sekarang",
        "ko": "2023.01 - 현재",
        "ja": "2023.01 - 現在",
        "zh": "2023.01 - 至今"
      },
      "company": "PT Ecomindo Sarana Cipta",
      "role": {
        "en": "Software Engineer",
        "id": "Software Engineer",
        "ko": "소프트웨어 엔지니어",
        "ja": "ソフトウェアエンジニア",
        "zh": "软件工程师"
      },
      "location": {
        "en": "Jakarta, Indonesia",
        "id": "Jakarta, Indonesia",
        "ko": "인도네시아 자카르타",
        "ja": "インドネシア・ジャカルタ",
        "zh": "印度尼西亚 雅加达"
      },
      "bullets": [
        {
          "en": "Built and maintained web applications with modern frameworks (React, Next.js, TypeScript).",
          "id": "Membangun dan memelihara aplikasi web dengan framework modern (React, Next.js, TypeScript).",
          "ko": "모던 프레임워크(React, Next.js, TypeScript)로 웹 애플리케이션을 구축하고 유지보수.",
          "ja": "モダンなフレームワーク（React、Next.js、TypeScript）でウェブアプリケーションを構築・保守。",
          "zh": "使用现代框架（React、Next.js、TypeScript）构建并维护 Web 应用。"
        },
        {
          "en": "Translated UI/UX designs into responsive and accessible applications.",
          "id": "Menerjemahkan desain UI/UX menjadi aplikasi yang responsif dan aksesibel.",
          "ko": "UI/UX 디자인을 반응형·접근성 높은 애플리케이션으로 구현.",
          "ja": "UI/UX デザインをレスポンシブでアクセシブルなアプリケーションに落とし込み。",
          "zh": "将 UI/UX 设计落地为响应式且具备无障碍性的应用。"
        },
        {
          "en": "Optimised performance and ensured cross-browser and cross-device compatibility.",
          "id": "Mengoptimalkan performa serta memastikan kompatibilitas lintas peramban dan perangkat.",
          "ko": "성능을 최적화하고 크로스 브라우저·크로스 디바이스 호환성을 확보.",
          "ja": "パフォーマンスを最適化し、クロスブラウザ・クロスデバイス対応を担保。",
          "zh": "优化性能，确保跨浏览器与跨设备兼容性。"
        },
        {
          "en": "Collaborated in an agile team delivering scalable backoffice and client-facing dashboards.",
          "id": "Berkolaborasi dalam tim agile untuk menghadirkan dasbor backoffice dan klien yang skalabel.",
          "ko": "애자일 팀에서 확장 가능한 백오피스 및 고객용 대시보드를 함께 개발.",
          "ja": "アジャイルチームで、拡張性のあるバックオフィスおよび顧客向けダッシュボードを提供。",
          "zh": "在敏捷团队中协作交付可扩展的后台与面向客户的仪表盘。"
        }
      ],
      "stack": [
        "React",
        "Next.js",
        "TypeScript",
        "SASS",
        "REST APIs"
      ],
      "id": "PT Ecomindo Sarana Cipta"
    },
    {
      "period": {
        "en": "2021.01 - 2023.08",
        "id": "2021.01 - 2023.08",
        "ko": "2021.01 - 2023.08",
        "ja": "2021.01 - 2023.08",
        "zh": "2021.01 - 2023.08"
      },
      "company": "PT Colliers International Indonesia",
      "role": {
        "en": "Software Engineer — Asset Management Service",
        "id": "Software Engineer — Asset Management Service",
        "ko": "소프트웨어 엔지니어 — 자산관리 서비스",
        "ja": "ソフトウェアエンジニア — アセットマネジメントサービス",
        "zh": "软件工程师 — 资产管理服务"
      },
      "location": {
        "en": "Jakarta, Indonesia",
        "id": "Jakarta, Indonesia",
        "ko": "인도네시아 자카르타",
        "ja": "インドネシア・ジャカルタ",
        "zh": "印度尼西亚 雅加达"
      },
      "bullets": [
        {
          "en": "Developed hybrid Android/iOS apps for asset management and internal services.",
          "id": "Mengembangkan aplikasi hybrid Android/iOS untuk manajemen aset dan layanan internal.",
          "ko": "자산 관리 및 사내 서비스를 위한 Android/iOS 하이브리드 앱 개발.",
          "ja": "資産管理および社内サービス向けの Android/iOS ハイブリッドアプリを開発。",
          "zh": "开发用于资产管理与内部服务的 Android/iOS 混合应用。"
        },
        {
          "en": "Integrated backend APIs for logistics, mail and inspection systems.",
          "id": "Mengintegrasikan API backend untuk sistem logistik, surat, dan inspeksi.",
          "ko": "물류·우편·점검 시스템의 백엔드 API 연동.",
          "ja": "物流・郵便・点検システムのバックエンド API を統合。",
          "zh": "集成物流、邮件与巡检系统的后端 API。"
        },
        {
          "en": "Delivered real-time, performant mobile dashboards for corporate use.",
          "id": "Menghadirkan dasbor mobile real-time yang performan untuk kebutuhan korporat.",
          "ko": "기업용 실시간·고성능 모바일 대시보드 제공.",
          "ja": "法人向けにリアルタイムで軽快なモバイルダッシュボードを提供。",
          "zh": "交付面向企业的实时、高性能移动仪表盘。"
        }
      ],
      "projects": [
        "CFM System",
        "CFM Inspector",
        "CFM Mail & Courier"
      ],
      "stack": [
        "React Native",
        "TypeScript",
        "REST APIs",
        "Android",
        "iOS"
      ],
      "id": "PT Colliers International Indonesia"
    },
    {
      "period": {
        "en": "2019.09 - 2021.01",
        "id": "2019.09 - 2021.01",
        "ko": "2019.09 - 2021.01",
        "ja": "2019.09 - 2021.01",
        "zh": "2019.09 - 2021.01"
      },
      "company": "PT Nutech Integrasi",
      "role": {
        "en": "Software Engineer",
        "id": "Software Engineer",
        "ko": "소프트웨어 엔지니어",
        "ja": "ソフトウェアエンジニア",
        "zh": "软件工程师"
      },
      "location": {
        "en": "Jakarta, Indonesia",
        "id": "Jakarta, Indonesia",
        "ko": "인도네시아 자카르타",
        "ja": "インドネシア・ジャカルタ",
        "zh": "印度尼西亚 雅加达"
      },
      "bullets": [
        {
          "en": "Built mobile apps for logistics communication.",
          "id": "Membangun aplikasi mobile untuk komunikasi logistik.",
          "ko": "물류 커뮤니케이션용 모바일 앱 개발.",
          "ja": "物流コミュニケーション向けモバイルアプリを開発。",
          "zh": "构建用于物流沟通的移动应用。"
        },
        {
          "en": "Integrated UI/UX designs with backend services for real-time operations.",
          "id": "Mengintegrasikan desain UI/UX dengan layanan backend untuk operasi real-time.",
          "ko": "UI/UX 디자인과 백엔드 서비스를 연결해 실시간 운영을 지원.",
          "ja": "UI/UX デザインとバックエンドサービスを結び、リアルタイム運用を実現。",
          "zh": "将 UI/UX 设计与后端服务打通，支撑实时业务运营。"
        },
        {
          "en": "Contributed to a scalable mobile architecture in a consulting environment.",
          "id": "Berkontribusi pada arsitektur mobile yang skalabel di lingkungan konsultasi.",
          "ko": "컨설팅 환경에서 확장 가능한 모바일 아키텍처에 기여.",
          "ja": "コンサルティング環境で拡張性のあるモバイルアーキテクチャに貢献。",
          "zh": "在咨询项目环境中参与构建可扩展的移动端架构。"
        }
      ],
      "stack": [
        "React Native",
        "TypeScript",
        "REST APIs"
      ],
      "id": "PT Nutech Integrasi"
    }
  ],
  "design": [
    {
      "year": "2026",
      "title": {
        "en": "VESA Bracket to 1/4\" Thread Converter",
        "id": "Konverter Braket VESA ke Ulir 1/4\"",
        "ko": "VESA 브래킷 → 1/4\" 나사 변환 어댑터",
        "ja": "VESAブラケット → 1/4\"ネジ変換アダプター",
        "zh": "VESA 支架转 1/4\" 螺纹转换器"
      },
      "desc": {
        "en": "An adapter that turns a spare monitor arm into a flexible rig for a camera, webcam, ring light or microphone. It converts a standard VESA hole pattern — 75×75 mm and 100×100 mm both fit — into a 1/4\" tripod thread, with a recess on top that captures a 1/4\" hex nut. Modelled to print flat on the bed with no supports.",
        "id": "Adaptor yang mengubah lengan monitor menganggur menjadi rig fleksibel untuk kamera, webcam, ring light, atau mikrofon. Mengonversi pola lubang VESA standar — 75×75 mm maupun 100×100 mm — menjadi ulir tripod 1/4\", dengan cekungan di bagian atas untuk menahan mur segi enam 1/4\". Dimodelkan agar dapat dicetak rata di bed tanpa support.",
        "ko": "남는 모니터 암을 카메라, 웹캠, 링라이트, 마이크용 거치대로 바꿔 주는 어댑터입니다. 75×75 mm와 100×100 mm 모두 맞는 표준 VESA 홀 패턴을 1/4\" 삼각대 나사로 변환하며, 상단 홈이 1/4\" 육각 너트를 잡아 줍니다. 서포트 없이 베드에 평평하게 출력되도록 모델링했습니다.",
        "ja": "余っているモニターアームを、カメラ・ウェブカメラ・リングライト・マイク用のリグに変えるアダプターです。75×75 mm と 100×100 mm のどちらにも合う標準 VESA 穴を 1/4\" の三脚ネジに変換し、上面のくぼみが 1/4\" 六角ナットを保持します。サポートなしでベタ置き印刷できるようモデリングしています。",
        "zh": "一款把闲置显示器支架变成相机、网络摄像头、环形灯或麦克风支架的转接件。它将标准 VESA 孔位（75×75 mm 与 100×100 mm 均适配）转换为 1/4\" 三脚架螺纹，顶部凹槽可卡住 1/4\" 六角螺母。建模时即考虑平放打印，无需支撑。"
      },
      "tools": [
        "FreeCAD",
        "FDM printing"
      ],
      "images": [
        "assets/img/vesa-adapter/01.jpg",
        "assets/img/vesa-adapter/02.jpg",
        "assets/img/vesa-adapter/03.jpg"
      ],
      "link": "https://www.printables.com/model/1758140-vesa-bracket-to-14-thread-converter"
    },
    {
      "year": "2024",
      "title": {
        "en": "Speaker Enclosure 2.5\"",
        "id": "Boks Speaker 2.5\"",
        "ko": "2.5\" 스피커 인클로저",
        "ja": "2.5インチ スピーカーエンクロージャー",
        "zh": "2.5\" 音箱箱体"
      },
      "desc": {
        "en": "A simple cube enclosure for a 2.5\" full-range driver. The front baffle is a separate plate fastened with four screws, so a driver can be fitted or swapped without reprinting the box. Built as a pair for a desktop setup.",
        "id": "Boks kubus sederhana untuk driver full-range 2.5\". Baffle depan berupa pelat terpisah yang dipasang dengan empat sekrup, sehingga driver dapat dipasang atau diganti tanpa mencetak ulang boksnya. Dibuat sepasang untuk meja kerja.",
        "ko": "2.5\" 풀레인지 드라이버용 단순한 큐브형 인클로저입니다. 전면 배플을 별도 플레이트로 만들어 나사 네 개로 고정하므로, 박스를 다시 출력하지 않고도 드라이버를 장착하거나 교체할 수 있습니다. 데스크용으로 한 쌍 제작했습니다.",
        "ja": "2.5インチのフルレンジドライバー向けのシンプルなキューブ型エンクロージャーです。フロントバッフルを別板にして4本のネジで固定するため、本体を再プリントせずにドライバーの取り付けや交換ができます。デスク用にペアで製作しました。",
        "zh": "一款适配 2.5\" 全频单元的简约立方体箱体。前障板为独立面板，用四颗螺丝固定，因此更换或安装单元时无需重新打印箱体。为桌面场景制作了一对。"
      },
      "tools": [
        "FreeCAD",
        "FDM printing"
      ],
      "images": [
        "assets/img/speaker-enclosure/01.jpg",
        "assets/img/speaker-enclosure/02.jpg"
      ],
      "link": "https://www.printables.com/model/1022277-speaker-enclosure-25"
    },
    {
      "year": "2024",
      "title": {
        "en": "Simple Pen Drawer",
        "id": "Laci Alat Tulis Sederhana",
        "ko": "심플 펜 서랍",
        "ja": "シンプル ペン引き出し",
        "zh": "简约文具抽屉"
      },
      "desc": {
        "en": "A 150 × 150 × 50 mm desktop stationery organiser. The top tray splits into a long channel, two open wells and a row of six round holes for pens and tools, with a sliding drawer underneath for everything that should stay out of sight. Entered in the Printables \"Sorting Trays\" contest.",
        "id": "Pengatur alat tulis meja berukuran 150 × 150 × 50 mm. Baki atasnya terbagi menjadi satu kanal panjang, dua ceruk terbuka, dan deretan enam lubang bundar untuk pena serta perkakas, dengan laci geser di bawahnya untuk barang yang sebaiknya tak terlihat. Diikutsertakan dalam kontes \"Sorting Trays\" di Printables.",
        "ko": "150 × 150 × 50 mm 크기의 데스크 문구 정리함입니다. 상단 트레이는 긴 홈 하나, 열린 칸 두 개, 펜과 도구용 원형 구멍 여섯 개로 나뉘며, 아래에는 보이지 않게 두고 싶은 물건을 넣는 서랍이 있습니다. Printables \"Sorting Trays\" 콘테스트 출품작입니다.",
        "ja": "150 × 150 × 50 mm のデスク用文具オーガナイザーです。上段トレイは長い溝ひとつ、仕切りのない角穴2つ、ペンや工具を挿す丸穴6つに分かれ、その下に隠しておきたいものを入れる引き出しが付きます。Printables の「Sorting Trays」コンテスト出品作。",
        "zh": "一款 150 × 150 × 50 mm 的桌面文具收纳盒。上层托盘分为一条长槽、两个开放式方格和一排六个圆孔，用于插放笔与工具；下方是一个抽屉，收纳不想露在外面的物品。参加了 Printables 的 \"Sorting Trays\" 比赛。"
      },
      "tools": [
        "FreeCAD",
        "FDM printing"
      ],
      "images": [
        "assets/img/pen-drawer/01.jpg",
        "assets/img/pen-drawer/02.jpg",
        "assets/img/pen-drawer/03.jpg"
      ],
      "link": "https://www.printables.com/model/999099-simple-pen-drawer"
    }
  ],
  "electronics": [
    {
      "id": "THESIS",
      "year": "2025",
      "title": {
        "en": "ESP32 OLSRv2 Mesh Network Thesis",
        "id": "Tesis Jaringan Mesh OLSRv2 ESP32",
        "ko": "ESP32 OLSRv2 메시 네트워크 석사 연구",
        "ja": "ESP32 OLSRv2 メッシュネットワーク修士研究",
        "zh": "ESP32 OLSRv2 网状网络硕士研究"
      },
      "desc": {
        "en": "Implemented an experimental OLSRv2-style mesh stack on ESP32/ESP-NOW: neighbour and two-hop information, MPR selection, topology control, routing, segmentation/reassembly and messaging. Integrated UART/JSON, NVS, SSD1306 and an Electron/JavaScript serial GUI with vis-network topology views. The thesis reports a five-node study; historical single-hop results were 240 kbps, 25 ms latency and 100% packet delivery. The source uses parts of RFC 5444; full conformance and interoperability are not established. Firmware build and hardware tests have not been repeated. The repository contains source and four technical images; the full thesis is excluded.",
        "id": "Mengimplementasikan mesh eksperimental bergaya OLSRv2 pada ESP32/ESP-NOW: informasi tetangga dan dua-hop, pemilihan MPR, kendali topologi, routing, fragmentasi/perakitan ulang, serta pesan. Mengintegrasikan UART/JSON, NVS, SSD1306, dan GUI serial Electron/JavaScript dengan visualisasi topologi vis-network. Tesis melaporkan studi lima node; hasil historis single-hop: 240 kbps, latensi 25 ms, dan pengiriman paket 100%. Kode memakai sebagian RFC 5444; kepatuhan penuh dan interoperabilitas belum dibuktikan. Build firmware dan uji perangkat belum diulang. Repositori berisi kode dan empat gambar teknis; tesis lengkap tidak disertakan.",
        "ko": "ESP32·ESP-NOW에서 이웃·2홉 정보, MPR 선택, 토폴로지 제어, 라우팅, 패킷 분할·재조립 및 메시징을 포함한 실험용 OLSRv2 방식 메시 스택을 구현했습니다. UART/JSON, NVS, SSD1306 및 vis-network 토폴로지 시각화를 갖춘 Electron·JavaScript 시리얼 GUI를 통합했습니다. 논문은 ESP32 5대의 연구와 단일 홉 처리량 240 kbps, 지연 25 ms, 패킷 전달률 100%를 보고합니다. 이는 과거 연구 결과입니다. RFC 5444의 일부를 사용하며 완전한 적합성·상호운용성은 확인되지 않았습니다. 펌웨어 빌드와 하드웨어 시험은 재수행하지 않았습니다. 저장소에는 소스와 기술 이미지 4개가 있으며 전체 논문은 제외됩니다.",
        "ja": "ESP32/ESP-NOW 上に、近隣・2ホップ情報、MPR 選択、トポロジー制御、経路計算、パケット分割・再構成、メッセージングを備えた OLSRv2 方式の実験用メッシュスタックを実装。UART/JSON、NVS、SSD1306 と、vis-network で構成を可視化する Electron/JavaScript シリアル GUI を統合しました。論文は5台の研究を報告し、過去の1ホップ結果は240 kbps、遅延25 ms、パケット到達率100%でした。RFC 5444 の一部を使用しており、完全適合・相互運用性は未確認です。ファームウェアのビルドと実機試験は再実施していません。公開内容はコードと技術画像4枚で、論文全文は含みません。",
        "zh": "在 ESP32/ESP-NOW 上实现 OLSRv2 风格实验性网状协议栈，包括邻居与两跳信息、MPR 选择、拓扑控制、路由、分片重组和消息传递。集成 UART/JSON、NVS、SSD1306 及使用 vis-network 展示拓扑的 Electron/JavaScript 串口 GUI。论文报告了五节点研究；历史单跳结果为 240 kbps、25 ms 延迟、100% 包投递率。代码仅采用 RFC 5444 的部分内容，尚未确认完整符合性及互操作性。未重新进行固件构建和硬件测试。仓库仅含源码与四张技术图片，不含论文全文。"
      },
      "stack": [
        "C",
        "ESP32",
        "ESP-IDF",
        "FreeRTOS",
        "ESP-NOW",
        "MPR routing",
        "UART/JSON",
        "Electron",
        "JavaScript",
        "vis-network",
        "SSD1306"
      ],
      "link": "https://github.com/saufik-ramadhan/esp32-olsrv2-thesis"
    },
    {
      "id": "REFLOW",
      "year": "2026",
      "title": {
        "en": "STM32 Blue Pill Reflow / Hot-Plate Control Firmware",
        "id": "Firmware Kendali Reflow / Hot-Plate STM32 Blue Pill",
        "ko": "STM32 Blue Pill 리플로우 / 핫플레이트 제어 펌웨어",
        "ja": "STM32 Blue Pill リフロー／ホットプレート制御ファームウェア",
        "zh": "STM32 Blue Pill 回流／热板控制固件"
      },
      "desc": {
        "en": "Sunda Reflow Oven is a team prototype. I worked on the heating system and firmware integration. Experimental STM32F103C8T6 firmware with NTC temperature sensing, two-point calibration, PID control, SSD1306 and FreeRTOS tasks. USB CDC connects Raspberry Pi inspection results to conveyor PASS/FAIL sorting. The automatic proof-of-concept profile is capped at 120°C; the planned Sn63/Pb37 reflow cycle remains locked pending thermal validation.",
        "id": "Sunda Reflow Oven adalah prototipe tim. Saya mengerjakan sistem pemanas dan integrasi firmware. Firmware eksperimental STM32F103C8T6 dengan sensor suhu NTC, kalibrasi dua titik, kendali PID, SSD1306, dan task FreeRTOS. USB CDC menghubungkan hasil inspeksi Raspberry Pi ke penyortiran konveyor PASS/FAIL. Profil otomatis proof of concept dibatasi 120°C; siklus reflow Sn63/Pb37 yang direncanakan masih terkunci sampai validasi termal.",
        "ko": "Sunda Reflow Oven은 팀 시제품입니다. 저는 가열 시스템과 펌웨어 통합을 담당했습니다. NTC 온도 측정, 2점 보정, PID 제어, SSD1306 및 FreeRTOS 태스크를 통합한 STM32F103C8T6 실험용 펌웨어입니다. Raspberry Pi 검사 결과를 USB CDC로 받아 컨베이어 PASS/FAIL 분류에 연결합니다. 개념검증 자동 프로파일은 최고 120°C이며, 계획된 Sn63/Pb37 리플로우 사이클은 열 검증 전까지 잠금 상태입니다.",
        "ja": "Sunda Reflow Oven はチームで開発した試作機です。加熱システムとファームウェアの統合を担当しました。 NTC 温度計測、2点校正、PID 制御、SSD1306、FreeRTOS タスクを統合した STM32F103C8T6 実験用ファームウェア。Raspberry Pi の検査結果を USB CDC で受信しコンベアの PASS/FAIL 仕分けに接続します。自動プロファイルは概念実証用で上限120°C。計画中の Sn63/Pb37 リフローサイクルは熱検証までロックされています。",
        "zh": "Sunda Reflow Oven 是团队原型。我负责加热系统和固件集成。 实验性 STM32F103C8T6 固件，集成 NTC 测温、两点校准、PID 控制、SSD1306 和 FreeRTOS 任务。通过 USB CDC 将 Raspberry Pi 检测结果连接到传送带 PASS/FAIL 分拣。自动概念验证温度曲线上限为120°C，计划中的 Sn63/Pb37 回流周期在热验证前保持锁定。"
      },
      "stack": [
        "C",
        "STM32F103C8T6",
        "STM32 HAL",
        "FreeRTOS",
        "PID",
        "ADC",
        "I2C",
        "SSD1306",
        "USB CDC",
        "CMake"
      ],
      "link": "https://github.com/saufik-ramadhan/firware-reflow-oven-bluepill",
      "projectLinks": [
        {
          "url": "https://drive.google.com/drive/folders/1-HmwSTl4Mwm_-uYlWWNUzncq230t4D2V?usp=drive_link",
          "label": {
            "en": "Reflow PCB files",
            "id": "File PCB reflow",
            "ko": "리플로우 PCB 파일",
            "ja": "リフロー基板ファイル",
            "zh": "回流焊 PCB 文件"
          }
        },
        {
          "url": "https://drive.google.com/file/d/1VFEeOF6PuZsCFFgYCe0GbRXrp75BGyCV/view",
          "label": {
            "en": "Watch the recorded demo",
            "id": "Tonton rekaman demo",
            "ko": "시연 영상 보기",
            "ja": "デモ録画を見る",
            "zh": "观看演示录像"
          }
        }
      ],
      "media": [
        {
          "src": "assets/img/portfolio/reflow-system.jpg",
          "caption": {
            "en": "Reflow prototype test setup",
            "id": "Rangkaian uji prototipe reflow",
            "ko": "리플로우 시제품 시험 구성",
            "ja": "リフロー試作機の試験構成",
            "zh": "回流焊原型测试装置"
          }
        },
        {
          "src": "assets/img/portfolio/reflow-oled.jpg",
          "caption": {
            "en": "OLED operator interface",
            "id": "Antarmuka operator OLED",
            "ko": "OLED 조작 화면",
            "ja": "OLED 操作画面",
            "zh": "OLED 操作界面"
          }
        }
      ]
    },
    {
      "id": "FPGA-ROAD-SIGN",
      "year": "2026",
      "title": {
        "en": "Traffic Sign CNN on Basys 3",
        "id": "CNN Rambu Lalu Lintas pada Basys 3",
        "ko": "Basys 3 교통 표지판 분류 CNN",
        "ja": "Basys 3 による交通標識分類 CNN",
        "zh": "基于 Basys 3 的交通标志分类 CNN"
      },
      "desc": {
        "en": "In this team project, I worked on the top-level module, control FSM, timing and model builds. The Basys 3 runs integer CNN inference on 16 × 16 grayscale GTSRB inputs received over UART. The project report records 95.58% accuracy on 4,590 test images for the eight-class model, about 235 µs of core inference and 31.92 ms median host round-trip latency over UART.",
        "id": "Dalam proyek tim ini, saya mengerjakan modul top-level, FSM kontrol, timing, dan build model. Basys 3 menjalankan inferensi CNN bilangan bulat pada masukan grayscale GTSRB berukuran 16 × 16 yang diterima melalui UART. Laporan mencatat akurasi 95,58% pada 4.590 gambar uji untuk model delapan kelas, waktu inferensi inti sekitar 235 µs, dan median latensi pulang-pergi host via UART 31,92 ms.",
        "ko": "팀 프로젝트에서 최상위 모듈, 제어 FSM, 타이밍 및 모델 빌드를 담당했습니다. Basys 3는 UART로 받은 16 × 16 흑백 GTSRB 입력에 정수 CNN 추론을 수행합니다. 보고서의 8클래스 모델은 테스트 이미지 4,590장에서 정확도 95.58%를 기록했습니다. 코어 추론은 약 235 µs, UART를 통한 호스트 왕복 시간의 중앙값은 31.92 ms였습니다.",
        "ja": "チーム開発でトップレベルモジュール、制御 FSM、タイミング、モデルのビルドを担当しました。Basys 3 は UART で受け取った 16 × 16 のグレースケール GTSRB 入力に対して整数 CNN 推論を実行します。報告書の8クラスモデルは、テスト画像4,590枚で精度95.58%、コア推論時間約235 µs、UART 経由のホスト往復時間の中央値31.92 msを記録しました。",
        "zh": "在团队项目中，我负责顶层模块、控制状态机、时序和模型构建。Basys 3 对通过 UART 接收的 16 × 16 灰度 GTSRB 输入执行整数 CNN 推理。项目报告记录的八类模型在 4,590 张测试图像上达到 95.58% 的准确率，核心推理约 235 µs，UART 主机往返延迟中位数为 31.92 ms。"
      },
      "stack": [
        "Basys 3",
        "Artix-7 XC7A35T",
        "Vivado",
        "UART",
        "GTSRB"
      ],
      "media": [
        {
          "src": "assets/img/portfolio/fpga-architecture.png",
          "caption": {
            "en": "FPGA inference and UART data path",
            "id": "Alur inferensi FPGA dan data UART",
            "ko": "FPGA 추론 및 UART 데이터 경로",
            "ja": "FPGA 推論と UART データ経路",
            "zh": "FPGA 推理与 UART 数据通路"
          }
        },
        {
          "src": "assets/img/portfolio/fpga-waveform.png",
          "caption": {
            "en": "Convolution simulation waveform",
            "id": "Gelombang simulasi konvolusi",
            "ko": "합성곱 시뮬레이션 파형",
            "ja": "畳み込みシミュレーション波形",
            "zh": "卷积仿真波形"
          }
        }
      ],
      "projectLinks": [
        {
          "url": "https://drive.google.com/drive/folders/1lrYqiYobX5uXTVhgmyGzwcY8RfO950uk",
          "label": {
            "en": "Project documentation",
            "id": "Dokumentasi proyek",
            "ko": "프로젝트 자료",
            "ja": "プロジェクト資料",
            "zh": "项目文档"
          }
        },
        {
          "url": "https://drive.google.com/file/d/1HbAxrAeqbZolyB-Sv6DhuqTRDztYjVQj/view",
          "label": {
            "en": "Watch the recorded demo",
            "id": "Tonton rekaman demo",
            "ko": "시연 영상 보기",
            "ja": "デモ録画を見る",
            "zh": "观看演示录像"
          }
        },
        {
          "url": "projects/road-sign-cnn/",
          "label": {
            "en": "Related browser CNN lab",
            "id": "Lab CNN terkait di browser",
            "ko": "관련 브라우저 CNN 실습",
            "ja": "関連するブラウザー版 CNN ラボ",
            "zh": "相关浏览器 CNN 实验室"
          }
        }
      ]
    },
    {
      "id": "KICAD-BOARDS",
      "year": "2026",
      "title": {
        "en": "ATmega128 Minimum System & ESP32 MIPI–HDMI Bridge",
        "id": "Sistem Minimum ATmega128 & Bridge ESP32 MIPI–HDMI",
        "ko": "ATmega128 최소 시스템 및 ESP32 MIPI–HDMI 브리지",
        "ja": "ATmega128 最小システムと ESP32 MIPI–HDMI ブリッジ",
        "zh": "ATmega128 最小系统与 ESP32 MIPI–HDMI 桥接板"
      },
      "desc": {
        "en": "Co-designed two boards in KiCad. The two-layer ATmega128A board provides USB-C power, CH340C USB-to-UART and ISP/GPIO headers. The four-layer bridge routes two MIPI DSI data lanes from an ESP32-P4 host to an LT8912B for HDMI and LVDS output. The report documents zero DRC violations and zero unconnected items under the configured rules. Electrical and video-output validation on physical boards remains pending.",
        "id": "Mendesain dua PCB bersama tim di KiCad. Papan ATmega128A dua lapis menyediakan daya USB-C, USB-to-UART CH340C, serta header ISP dan GPIO. Papan bridge empat lapis merutekan dua jalur data MIPI DSI dari host ESP32-P4 ke LT8912B untuk keluaran HDMI dan LVDS. Laporan mencatat nol pelanggaran DRC dan nol sambungan yang terlewat berdasarkan aturan yang dikonfigurasi. Validasi kelistrikan dan keluaran video pada papan fisik masih menunggu pengujian.",
        "ko": "팀과 함께 KiCad로 두 기판을 설계했습니다. 2층 ATmega128A 기판은 USB-C 전원, CH340C USB-UART 및 ISP/GPIO 헤더를 제공합니다. 4층 브리지는 ESP32-P4 호스트의 MIPI DSI 데이터 2레인을 LT8912B로 연결해 HDMI와 LVDS 출력을 제공하도록 설계했습니다. 보고서에는 설정된 규칙 기준 DRC 위반과 미연결 항목이 각각 0건으로 기록되어 있습니다. 실물 기판의 전기적 동작과 영상 출력 검증은 남아 있습니다.",
        "ja": "チームで KiCad を使い2枚の基板を設計しました。2層の ATmega128A 基板には USB-C 電源、CH340C USB-UART、ISP/GPIO ヘッダーを搭載しています。4層のブリッジ基板は ESP32-P4 ホストからの MIPI DSI データ2レーンを LT8912B へ配線し、HDMI と LVDS に出力する設計です。報告書では設定ルール下で DRC 違反・未接続項目ともに0件でした。実基板の電気特性と映像出力は今後検証します。",
        "zh": "团队使用 KiCad 共同设计了两块电路板。双层 ATmega128A 板提供 USB-C 供电、CH340C USB 转 UART 及 ISP/GPIO 排针。四层桥接板将 ESP32-P4 主机的两条 MIPI DSI 数据通道连接到 LT8912B，用于 HDMI 和 LVDS 输出。报告记录了按已配置规则检查时的零 DRC 违规和零未连接项。实物板的电气和视频输出验证仍待完成。"
      },
      "stack": [
        "KiCad",
        "ATmega128A",
        "CH340C",
        "ESP32-P4",
        "LT8912B",
        "MIPI DSI",
        "HDMI / LVDS"
      ],
      "media": [
        {
          "src": "assets/img/portfolio/atmega128-kicad.png",
          "caption": {
            "en": "ATmega128 board in KiCad 3D view",
            "id": "Tampilan 3D KiCad papan ATmega128",
            "ko": "ATmega128 기판 KiCad 3D 화면",
            "ja": "ATmega128 基板の KiCad 3D 表示",
            "zh": "ATmega128 板的 KiCad 3D 视图"
          }
        },
        {
          "src": "assets/img/portfolio/mipi-hdmi-kicad.png",
          "caption": {
            "en": "MIPI–HDMI bridge in KiCad 3D view",
            "id": "Tampilan 3D KiCad bridge MIPI–HDMI",
            "ko": "MIPI–HDMI 브리지 KiCad 3D 화면",
            "ja": "MIPI–HDMI ブリッジの KiCad 3D 表示",
            "zh": "MIPI–HDMI 桥接板的 KiCad 3D 视图"
          }
        }
      ],
      "projectLinks": [
        {
          "url": "https://drive.google.com/drive/folders/1ggQQecsF_qoN7etlvN3Anhlk-Wa3iAyB",
          "label": {
            "en": "Project documentation",
            "id": "Dokumentasi proyek",
            "ko": "프로젝트 자료",
            "ja": "プロジェクト資料",
            "zh": "项目文档"
          }
        },
        {
          "url": "https://drive.google.com/file/d/1crhHV_IGX-wWJUWzOECkC1ixeB7NAKnq/view",
          "label": {
            "en": "Watch the recorded demo",
            "id": "Tonton rekaman demo",
            "ko": "시연 영상 보기",
            "ja": "デモ録画を見る",
            "zh": "观看演示录像"
          }
        }
      ]
    },
    {
      "year": "2026",
      "title": {
        "en": "IMU Racer — Tilt-Steered Browser Game",
        "id": "IMU Racer — Game Peramban Berkemudi Kemiringan",
        "ko": "IMU Racer — 기울여 조종하는 브라우저 게임",
        "ja": "IMU Racer — 傾けて操作するブラウザゲーム",
        "zh": "IMU Racer — 体感操控的浏览器游戏"
      },
      "desc": {
        "en": "An ESP32-S3 reads a GY-87 inertial module, turns the board’s roll angle into a steering value and streams it over Bluetooth Low Energy at 50 Hz. A three.js game picks it up through the Web Bluetooth API — no driver, no app, no install. The firmware runs two separate I²C buses so a slow OLED refresh never delays a sensor read, and probes for whichever magnetometer and barometer variant the board actually carries.",
        "id": "Sebuah ESP32-S3 membaca modul inersia GY-87, mengubah sudut kemiringan papan menjadi nilai kemudi, lalu mengirimkannya lewat Bluetooth Low Energy pada 50 Hz. Game three.js menerimanya melalui Web Bluetooth API — tanpa driver, tanpa aplikasi, tanpa instalasi. Firmware-nya menjalankan dua jalur I²C terpisah agar penyegaran OLED yang lambat tidak pernah menunda pembacaan sensor, dan memeriksa varian magnetometer serta barometer mana yang sebenarnya terpasang.",
        "ko": "ESP32-S3가 GY-87 관성 모듈을 읽어 보드의 롤 각도를 조향 값으로 바꾸고, 이를 50 Hz로 Bluetooth Low Energy를 통해 전송합니다. three.js 게임이 Web Bluetooth API로 이를 받습니다 — 드라이버도, 앱도, 설치도 필요 없습니다. 펌웨어는 느린 OLED 갱신이 센서 읽기를 지연시키지 않도록 I²C 버스를 두 개로 분리했고, 보드에 실제로 실장된 자력계와 기압계 종류를 탐지합니다.",
        "ja": "ESP32-S3 が GY-87 慣性モジュールを読み取り、基板のロール角をステアリング値に変換して Bluetooth Low Energy で 50 Hz 送信します。three.js のゲームが Web Bluetooth API 経由でそれを受け取ります — ドライバーもアプリもインストールも不要です。ファームウェアは OLED の遅い描画がセンサー読み取りを妨げないよう I²C バスを 2 系統に分け、基板に実装されている地磁気センサーと気圧センサーの種類を判別します。",
        "zh": "ESP32-S3 读取 GY-87 惯性模块，将板子的横滚角转换为转向值，并以 50 Hz 通过低功耗蓝牙发送。three.js 游戏经由 Web Bluetooth API 接收——无需驱动、无需应用、无需安装。固件使用两条独立的 I²C 总线，避免 OLED 的缓慢刷新拖慢传感器读取，并会自动探测板上实际搭载的磁力计与气压计型号。"
      },
      "stack": [
        "ESP32-S3",
        "ESP-IDF",
        "NimBLE",
        "I²C",
        "three.js",
        "Web Bluetooth",
        "Vite"
      ],
      "demo": "https://saufik.web.id/imu-racer/",
      "link": "https://github.com/saufik-ramadhan/imu-racer",
      "id": "IMU",
      "media": [
        {
          "src": "assets/img/portfolio/imu-racer-demo.png",
          "caption": {
            "en": "Browser race and motion controller",
            "id": "Balapan di browser dan pengendali gerak",
            "ko": "브라우저 레이싱과 모션 컨트롤러",
            "ja": "ブラウザーでのレースとモーションコントローラー",
            "zh": "浏览器赛车与动作控制器"
          }
        }
      ]
    },
    {
      "year": "2018",
      "title": {
        "en": "Smart Glove System for Aphasia Communication (SGSCA)",
        "id": "Smart Glove System for Aphasia Communication (SGSCA)",
        "ko": "실어증 의사소통을 위한 스마트 글러브 시스템 (SGSCA)",
        "ja": "失語症コミュニケーション支援スマートグローブ (SGSCA)",
        "zh": "面向失语症沟通的智能手套系统 (SGSCA)"
      },
      "desc": {
        "en": "A student wearable-glove project that converts gesture-sensor input to speech and text through a companion app. ESP32 firmware sends sensor data via REST APIs to a React Native app. No clinical approval or medical-device certification is claimed.",
        "id": "Proyek sarung tangan mahasiswa yang mengubah input sensor gerakan menjadi suara dan teks melalui aplikasi pendamping. Firmware ESP32 mengirim data sensor lewat REST API ke aplikasi React Native. Tidak ada klaim persetujuan klinis atau sertifikasi alat kesehatan.",
        "ko": "손동작 센서 입력을 연계 앱의 음성·텍스트로 변환하는 학생 웨어러블 장갑 프로젝트입니다. ESP32 펌웨어가 REST API로 React Native 앱에 데이터를 보냅니다. 임상 승인이나 의료기기 인증을 주장하지 않습니다.",
        "ja": "ジェスチャーセンサーの入力を連携アプリで音声・文字に変換する学生のウェアラブルグローブです。ESP32 から REST API で React Native アプリへデータを送信します。臨床承認や医療機器認証は取得していません。",
        "zh": "将手势传感器输入通过配套应用转为语音和文字的学生可穿戴手套项目。ESP32 固件通过 REST API 向 React Native 应用发送数据。不声称获得临床批准或医疗器械认证。"
      },
      "stack": [
        "ESP32",
        "Flex sensors",
        "REST APIs",
        "React Native",
        "IoT"
      ],
      "link": "",
      "id": "SGSCA"
    }
  ],
  "certifications": [],
  "awards": [
    {
      "year": "2018",
      "name": {
        "en": "Second place, Life Support category — Electromedical Innovation Week",
        "id": "Juara kedua, kategori Life Support — Electromedical Innovation Week",
        "ko": "Electromedical Innovation Week 생명유지 부문 2위",
        "ja": "Electromedical Innovation Week 生命維持部門 第2位",
        "zh": "Electromedical Innovation Week 生命支持组二等奖"
      },
      "issuer": {
        "en": "Politeknik Kemenkes Surabaya, 2018",
        "id": "Politeknik Kemenkes Surabaya, 2018",
        "ko": "Politeknik Kemenkes Surabaya, 2018",
        "ja": "Politeknik Kemenkes Surabaya, 2018",
        "zh": "Politeknik Kemenkes Surabaya, 2018"
      },
      "desc": {
        "en": "Awarded for the Smart Glove System for Aphasia Communication (SGSCA).",
        "id": "Diberikan atas karya Smart Glove System for Aphasia Communication (SGSCA).",
        "ko": "실어증 의사소통 스마트 글러브 시스템(SGSCA)으로 수상.",
        "ja": "失語症コミュニケーション支援スマートグローブ (SGSCA) により受賞。",
        "zh": "凭借面向失语症沟通的智能手套系统 (SGSCA) 获奖。"
      }
    }
  ],
  "languages": [
    {
      "name": {
        "en": "Indonesian",
        "id": "Bahasa Indonesia",
        "ko": "인도네시아어",
        "ja": "インドネシア語",
        "zh": "印尼语"
      },
      "level": 5,
      "note": {
        "en": "Native speaker",
        "id": "Penutur asli",
        "ko": "모국어",
        "ja": "母語",
        "zh": "母语"
      }
    },
    {
      "name": {
        "en": "English",
        "id": "Bahasa Inggris",
        "ko": "영어",
        "ja": "英語",
        "zh": "英语"
      },
      "note": {
        "en": "English test score reported in 2022",
        "id": "Skor tes bahasa Inggris dilaporkan pada 2022",
        "ko": "2022년 영어 시험 점수",
        "ja": "2022年の英語試験スコア",
        "zh": "2022 年英语考试成绩"
      },
      "score": {
        "en": "TOEIC Listening & Reading 890 (2022); local CV labels it EPT. Original certificate wording needs verification.",
        "id": "TOEIC Listening & Reading 890 (2022); CV lokal menuliskannya EPT. Nama tes perlu diverifikasi pada sertifikat asli.",
        "ko": "TOEIC 듣기·읽기 890점(2022); 기존 CV에는 EPT로 표기되어 있어 원본 증명서의 시험명 확인이 필요합니다.",
        "ja": "TOEIC Listening & Reading 890点（2022年）。元の履歴書は EPT と記載しているため、証明書原本で試験名の確認が必要です。",
        "zh": "TOEIC 听力与阅读 890 分（2022 年）；原简历标为 EPT，考试名称需核对原始证书。"
      }
    }
  ],
  "software": [
    {
      "id": "LENS",
      "year": "2026",
      "title": {
        "en": "LensaLAN",
        "id": "LensaLAN",
        "ko": "LensaLAN",
        "ja": "LensaLAN",
        "zh": "LensaLAN"
      },
      "desc": {
        "en": "A Windows LAN CCTV/NVR prototype with a separate engine and Qt 6/QML interface. Provides a 1/4/9/12-tile live grid, camera profiles, person-detection event recording, review and retention. Uses C++20, GStreamer, ONNX Runtime CUDA, SQLite, Windows Service and IPC. Real 12-camera RTSP capacity, long-duration performance and a 24-hour soak test remain unvalidated.",
        "id": "Prototipe CCTV/NVR LAN Windows dengan engine terpisah dan antarmuka Qt 6/QML. Menyediakan grid live 1/4/9/12 tile, profil kamera, perekaman kejadian deteksi orang, peninjauan, dan retensi. Menggunakan C++20, GStreamer, ONNX Runtime CUDA, SQLite, Windows Service, dan IPC. Kapasitas nyata 12 kamera RTSP, performa jangka panjang, dan uji 24 jam belum divalidasi.",
        "ko": "별도 엔진과 Qt 6/QML 인터페이스를 갖춘 Windows LAN CCTV/NVR 프로토타입입니다. 1/4/9/12 타일 라이브 그리드, 카메라 프로필, 사람 검출 이벤트 녹화·리뷰 및 보관 기능을 제공합니다. C++20, GStreamer, ONNX Runtime CUDA, SQLite, Windows Service, IPC를 사용합니다. 실제 RTSP 카메라 12대의 처리 성능, 장시간 성능 및 24시간 연속 시험은 미검증입니다.",
        "ja": "エンジンと Qt 6/QML 画面を分離した Windows LAN CCTV/NVR プロトタイプ。1/4/9/12タイルのライブ表示、カメラ設定、人物検出イベント録画、再生、保存期間管理を備えます。C++20、GStreamer、ONNX Runtime CUDA、SQLite、Windows Service、IPC を使用。実際の RTSP カメラ12台の処理能力、長期性能、24時間連続試験は未検証です。",
        "zh": "引擎与 Qt 6/QML 界面分离的 Windows LAN CCTV/NVR 原型。提供1/4/9/12格实时画面、摄像头配置、人员检测事件录像、回看和保留策略。采用 C++20、GStreamer、ONNX Runtime CUDA、SQLite、Windows Service、IPC。实际12台 RTSP 摄像头容量、长期性能及24小时连续测试尚未验证。"
      },
      "stack": [
        "C++20",
        "Qt 6/QML",
        "GStreamer",
        "ONNX Runtime CUDA",
        "SQLite",
        "Windows Service",
        "IPC"
      ],
      "link": "https://github.com/saufik-ramadhan/lensalan",
      "media": [
        {
          "src": "assets/img/portfolio/lensalan-live.png",
          "caption": {
            "en": "Live camera monitoring",
            "id": "Pemantauan kamera langsung",
            "ko": "실시간 카메라 모니터링",
            "ja": "カメラのライブ監視",
            "zh": "实时摄像监控"
          }
        },
        {
          "src": "assets/img/portfolio/lensalan-events.png",
          "caption": {
            "en": "Engine status and recorded events",
            "id": "Status engine dan rekaman peristiwa",
            "ko": "엔진 상태와 이벤트 기록",
            "ja": "エンジンの状態とイベント録画",
            "zh": "引擎状态与事件录像"
          }
        }
      ]
    },
    {
      "id": "MAGICK",
      "year": "",
      "title": {
        "en": "MagickGUI",
        "id": "MagickGUI",
        "ko": "MagickGUI",
        "ja": "MagickGUI",
        "zh": "MagickGUI"
      },
      "desc": {
        "en": "A Windows desktop image-processing application combining an Electron/React interface, ImageMagick 7 and Python/rembg background removal. Supports drag-and-drop input and batch workflows. Processing tools are bundled with an electron-builder/NSIS installer; background-removal models download on first use.",
        "id": "Aplikasi pengolahan gambar desktop Windows yang menggabungkan antarmuka Electron/React, ImageMagick 7, dan penghapusan latar Python/rembg. Mendukung input drag-and-drop dan alur pemrosesan batch. Perkakas disertakan dalam installer electron-builder/NSIS; model penghapus latar diunduh saat pertama digunakan.",
        "ko": "Electron·React 인터페이스에 ImageMagick 7과 Python/rembg 배경 제거를 통합한 Windows 이미지 처리 데스크톱 앱입니다. 드래그 앤 드롭 입력과 일괄 처리를 지원합니다. 처리 도구를 electron-builder/NSIS 설치 파일에 포함하며 배경 제거 모델은 최초 사용 시 다운로드합니다.",
        "ja": "Electron/React の画面に ImageMagick 7 と Python/rembg の背景除去を統合した Windows 画像処理アプリ。ドラッグ＆ドロップと一括処理に対応し、処理ツールを electron-builder/NSIS インストーラーに同梱します。背景除去モデルは初回使用時にダウンロードします。",
        "zh": "Windows 桌面图像处理应用，集成 Electron/React 界面、ImageMagick 7 与 Python/rembg 背景移除。支持拖放输入和批量处理。处理工具随 electron-builder/NSIS 安装包分发，背景移除模型在首次使用时下载。"
      },
      "stack": [
        "Electron",
        "React",
        "ImageMagick 7",
        "Python/rembg",
        "electron-builder / NSIS"
      ],
      "link": "https://github.com/saufik-ramadhan/magick-gui",
      "media": [
        {
          "src": "assets/img/portfolio/magickgui-preview.png",
          "caption": {
            "en": "Conversion interface preview from the project documentation",
            "id": "Pratinjau antarmuka konversi dari dokumentasi proyek",
            "ko": "프로젝트 문서의 변환 인터페이스 미리 보기",
            "ja": "プロジェクト文書の変換画面プレビュー",
            "zh": "项目文档中的转换界面预览"
          }
        }
      ]
    }
  ],
  "training": [
    {
      "id": "KCCI-2026",
      "start": "2026-07",
      "expected_end": "2026-11",
      "total_planned_hours": 500,
      "name": {
        "en": "Overseas Technical Talent Training Program (500 hours)",
        "id": "Program Pelatihan Talenta Teknis Luar Negeri (500 jam)",
        "ko": "해외 전문기술인력 양성교육 (총500시간)",
        "ja": "海外技術人材育成研修（計500時間）",
        "zh": "海外技术人才培养培训（共500小时）"
      },
      "provider": {
        "en": "Korea Chamber of Commerce and Industry (KCCI)",
        "id": "Kamar Dagang dan Industri Korea (KCCI)",
        "ko": "대한상공회의소",
        "ja": "大韓商工会議所（KCCI）",
        "zh": "大韩商工会议所（KCCI）"
      },
      "period": {
        "en": "2026.07 - 2026.11 (expected completion)",
        "id": "2026.07 - 2026.11 (rencana selesai)",
        "ko": "2026.07 - 2026.11 (예정)",
        "ja": "2026.07 - 2026.11（修了予定）",
        "zh": "2026.07 - 2026.11（预计完成）"
      },
      "description": {
        "en": "Planned curriculum: Korean language and culture, 200 hours; technical training, 300 hours, comprising Firmware Development, Electronic Hardware Design and Semiconductor Design, 100 hours each. Completion is expected in November 2026.",
        "id": "Kurikulum yang direncanakan: bahasa dan budaya Korea 200 jam; pelatihan teknis 300 jam, terdiri dari Pengembangan Firmware, Desain Hardware Elektronik, dan Desain Semikonduktor, masing-masing 100 jam. Selesai direncanakan pada November 2026.",
        "ko": "교육 구성: 한국어 및 한국문화 200시간, 직무교육 300시간. 직무교육은 Firmware Development, Electronic Hardware Design, Semiconductor Design 각 100시간으로 구성됩니다. 2026년 11월 이수 예정입니다.",
        "ja": "研修構成は韓国語・韓国文化200時間と職務研修300時間です。職務研修はファームウェア開発、電子ハードウェア設計、半導体設計の各100時間で構成され、2026年11月修了予定です。",
        "zh": "课程计划包括韩语与韩国文化200小时，以及专业技术培训300小时。技术培训分为固件开发、电子硬件设计、半导体设计，各100小时。预计2026年11月完成。"
      }
    }
  ]
};

window.SITE = { LANGS, UI, SECTIONS, CONTENT };
