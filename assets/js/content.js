/**
 * content.js — single source of truth for the whole site.
 *
 * Every user-visible string is an object keyed by language code:
 *   { en: "...", id: "...", ko: "...", ja: "...", zh: "..." }
 * Missing languages silently fall back to `en`, so you can add a new entry in
 * English first and translate it later.
 *
 * Items marked  // TODO  are placeholders — replace them with your real data.
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
  skip:      { en: 'Skip to content', id: 'Lewati ke konten', ko: '본문으로 건너뛰기', ja: '本文へスキップ', zh: '跳至正文' },
  scroll:    { en: 'Scroll', id: 'Gulir', ko: '스크롤', ja: 'スクロール', zh: '向下滚动' },
  basedIn:   { en: 'Based in', id: 'Berdomisili di', ko: '거주지', ja: '拠点', zh: '所在地' },
  email:     { en: 'Email', id: 'Surel', ko: '이메일', ja: 'メール', zh: '邮箱' },
  ctaWork:   { en: 'View work', id: 'Lihat karya', ko: '작업 보기', ja: '作品を見る', zh: '查看作品' },
  ctaContact:{ en: 'Get in touch', id: 'Hubungi saya', ko: '연락하기', ja: 'お問い合わせ', zh: '联系我' },
  menu:      { en: 'Menu', id: 'Menu', ko: '메뉴', ja: 'メニュー', zh: '菜单' },
  language:  { en: 'Language', id: 'Bahasa', ko: '언어', ja: '言語', zh: '语言' },
  toDark:    { en: 'Switch to dark theme', id: 'Beralih ke tema gelap', ko: '다크 테마로 전환', ja: 'ダークテーマに切り替え', zh: '切换到深色主题' },
  toLight:   { en: 'Switch to light theme', id: 'Beralih ke tema terang', ko: '라이트 테마로 전환', ja: 'ライトテーマに切り替え', zh: '切换到浅色主题' },
  level:     { en: 'Level', id: 'Tingkat', ko: '수준', ja: 'レベル', zh: '水平' },

  stack:     { en: 'Tech stack', id: 'Teknologi', ko: '기술 스택', ja: '技術スタック', zh: '技术栈' },
  tools:     { en: 'Tools', id: 'Perkakas', ko: '사용 툴', ja: 'ツール', zh: '工具' },
  projects:  { en: 'Key projects', id: 'Proyek utama', ko: '주요 프로젝트', ja: '主なプロジェクト', zh: '主要项目' },
  issuedBy:  { en: 'Issued by', id: 'Diterbitkan oleh', ko: '발급 기관', ja: '発行機関', zh: '颁发机构' },
  credential:{ en: 'Credential ID', id: 'ID Kredensial', ko: '자격 번호', ja: '認定番号', zh: '证书编号' },
  viewMore:  { en: 'View project', id: 'Lihat proyek', ko: '프로젝트 보기', ja: 'プロジェクトを見る', zh: '查看项目' },

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
  about:          { en: 'About',          id: 'Tentang',     ko: '소개',   ja: '概要',   zh: '关于' },
  education:      { en: 'Education',      id: 'Pendidikan',  ko: '학력',   ja: '学歴',   zh: '教育' },
  experience:     { en: 'Experience',     id: 'Pengalaman',  ko: '경력',   ja: '職歴',   zh: '经历' },
  design:         { en: '3D Design',      id: 'Desain 3D',   ko: '3D 디자인', ja: '3Dデザイン', zh: '3D 设计' },
  electronics:    { en: 'Electronics',    id: 'Elektronika', ko: '전자·임베디드', ja: '電子・組込み', zh: '电子与嵌入式' },
  certifications: { en: 'Certifications', id: 'Sertifikasi', ko: '자격증', ja: '資格',   zh: '证书' },
  awards:         { en: 'Awards',         id: 'Penghargaan', ko: '수상',   ja: '受賞',   zh: '奖项' },
  languages:      { en: 'Languages',      id: 'Bahasa',      ko: '언어 능력', ja: '語学力', zh: '语言能力' },
  contact:        { en: 'Contact',        id: 'Kontak',      ko: '연락처', ja: '連絡先', zh: '联系' },
};

/* ── Content ─────────────────────────────────────────────────── */
const CONTENT = {
  meta: {
    name: 'Saufik Ramadhan',
    role: {
      en: 'Frontend Engineer',
      id: 'Frontend Engineer',
      ko: '프론트엔드 엔지니어',
      ja: 'フロントエンドエンジニア',
      zh: '前端工程师',
    },
    status: {
      en: 'Open to new opportunities',
      id: 'Terbuka untuk peluang baru',
      ko: '새로운 기회를 찾고 있습니다',
      ja: '新しい機会を探しています',
      zh: '正在寻找新机会',
    },
    tagline: {
      en: 'Six years of building responsive, high-performance web and mobile products — with a microelectronics background that still pulls me back to the workbench.',
      id: 'Enam tahun membangun produk web dan mobile yang responsif dan berperforma tinggi — dengan latar belakang mikroelektronika yang masih menarik saya kembali ke meja kerja.',
      ko: '반응형·고성능 웹과 모바일 제품을 만들어 온 6년, 그리고 여전히 작업대로 이끄는 마이크로일렉트로닉스 배경.',
      ja: 'レスポンシブで高性能なウェブ・モバイル製品を6年間つくり続け、今も作業台に引き戻すマイクロエレクトロニクスの素養を持っています。',
      zh: '六年专注于构建响应式、高性能的 Web 与移动产品，微电子学的背景仍不断把我拉回工作台。',
    },
    location: {
      en: 'Jakarta, Indonesia',
      id: 'Jakarta, Indonesia',
      ko: '인도네시아 자카르타',
      ja: 'インドネシア・ジャカルタ',
      zh: '印度尼西亚 雅加达',
    },
    email: 'ramadhan.saufik@gmail.com',
    links: [
      { label: 'GitHub',  url: 'https://github.com/saufik-ramadhan' },
      { label: 'Website', url: 'https://saufik-ramadhan.github.io' },
      // TODO: add your LinkedIn / Behance / Instagram here
    ],
  },

  /* ── 01 About ──────────────────────────────────────────────── */
  about: {
    paragraphs: [
      {
        en: 'I’m a frontend engineer with more than six years of experience building responsive, scalable and high-performance web and mobile applications. My work centres on React, Next.js, React Native and TypeScript, and has covered multi-tenant applications, API integrations and pixel-perfect UI/UX.',
        id: 'Saya seorang frontend engineer dengan pengalaman lebih dari enam tahun membangun aplikasi web dan mobile yang responsif, skalabel, dan berperforma tinggi. Pekerjaan saya berpusat pada React, Next.js, React Native, dan TypeScript, mencakup aplikasi multi-tenant, integrasi API, serta UI/UX yang presisi.',
        ko: '반응형·확장 가능하고 고성능인 웹·모바일 애플리케이션을 6년 넘게 만들어 온 프론트엔드 엔지니어입니다. React, Next.js, React Native, TypeScript를 중심으로 멀티테넌트 애플리케이션, API 연동, 픽셀 단위까지 정확한 UI/UX를 다뤄 왔습니다.',
        ja: 'レスポンシブでスケーラブル、かつ高性能なウェブ・モバイルアプリケーションを6年以上つくってきたフロントエンドエンジニアです。React、Next.js、React Native、TypeScript を軸に、マルチテナント構成のアプリケーション、API 連携、ピクセル単位まで忠実な UI/UX を手がけてきました。',
        zh: '我是一名前端工程师，拥有六年以上构建响应式、可扩展、高性能 Web 与移动应用的经验。工作以 React、Next.js、React Native 和 TypeScript 为核心，涵盖多租户应用、API 集成以及像素级还原的 UI/UX。',
      },
      {
        en: 'Alongside the web, I hold a master’s in microelectronics and an electronics engineering degree — so embedded systems, sensors and 3D-modelled enclosures remain part of how I think about a product, not just its interface.',
        id: 'Selain web, saya menempuh magister mikroelektronika dan sarjana teknik elektronika — sehingga sistem embedded, sensor, dan pemodelan 3D tetap menjadi bagian dari cara saya memandang sebuah produk, bukan sekadar antarmukanya.',
        ko: '웹과 더불어 마이크로일렉트로닉스 석사와 전자공학 학사를 마쳤습니다. 그래서 임베디드 시스템, 센서, 3D로 설계한 하우징까지 제품을 바라보는 관점의 일부로 남아 있습니다.',
        ja: 'ウェブに加えてマイクロエレクトロニクスの修士号と電子工学の学士号を持っており、組込みシステムやセンサー、3D でモデリングした筐体まで含めて製品を考えることが習慣になっています。',
        zh: '除了 Web，我还拥有微电子学硕士与电子工程学士学位。因此嵌入式系统、传感器与 3D 建模的外壳，始终是我思考产品的一部分，而不仅仅是界面。',
      },
    ],
    skills: [
      {
        label: { en: 'Languages', id: 'Bahasa Pemrograman', ko: '언어', ja: '言語', zh: '编程语言' },
        items: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'SQL'],
      },
      {
        label: { en: 'Frameworks', id: 'Framework', ko: '프레임워크', ja: 'フレームワーク', zh: '框架' },
        items: ['React', 'Next.js', 'React Native', 'Node.js', 'Redux'],
      },
      {
        label: { en: 'UI & styling', id: 'UI & Styling', ko: 'UI·스타일링', ja: 'UI・スタイリング', zh: 'UI 与样式' },
        items: ['Tailwind', 'SASS', 'Styled-Components', 'CSS-in-JS'],
      },
      {
        label: { en: 'Tooling', id: 'Perkakas', ko: '툴', ja: 'ツール', zh: '工具' },
        items: ['Git', 'Docker', 'Agile / Scrum'],
      },
      {
        label: { en: 'Testing', id: 'Pengujian', ko: '테스트', ja: 'テスト', zh: '测试' },
        items: ['Jest', 'React Testing Library'],
      },
    ],
  },

  /* ── 02 Education ──────────────────────────────────────────── */
  education: [
    {
      period: '2022 — 2025',
      school: {
        en: 'Bandung Institute of Technology',
        id: 'Institut Teknologi Bandung',
        ko: '반둥 공과대학교',
        ja: 'バンドン工科大学',
        zh: '万隆理工学院',
      },
      degree: {
        en: 'Master’s degree, Microelectronics',
        id: 'Magister, Mikroelektronika',
        ko: '석사, 마이크로일렉트로닉스',
        ja: '修士課程 マイクロエレクトロニクス',
        zh: '硕士，微电子学',
      },
      detail: {
        en: 'Semiconductor devices, IC design methodology and embedded system architecture.',
        id: 'Perangkat semikonduktor, metodologi desain IC, dan arsitektur sistem embedded.',
        ko: '반도체 소자, IC 설계 방법론, 임베디드 시스템 아키텍처.',
        ja: '半導体デバイス、IC 設計手法、組込みシステムアーキテクチャ。',
        zh: '半导体器件、集成电路设计方法与嵌入式系统架构。',
      },
    },
    {
      period: '2015 — 2019',
      school: {
        en: 'Bandung State Polytechnic',
        id: 'Politeknik Negeri Bandung',
        ko: '반둥 국립 폴리테크닉',
        ja: 'バンドン国立ポリテクニック',
        zh: '万隆国立理工学院',
      },
      degree: {
        en: 'Bachelor’s degree, Electronics Engineering',
        id: 'Sarjana Terapan, Teknik Elektronika',
        ko: '학사, 전자공학',
        ja: '学士課程 電子工学',
        zh: '学士，电子工程',
      },
      detail: {
        en: 'Analogue and digital electronics, microcontrollers, instrumentation and control.',
        id: 'Elektronika analog dan digital, mikrokontroler, instrumentasi, dan kendali.',
        ko: '아날로그·디지털 전자공학, 마이크로컨트롤러, 계측 및 제어.',
        ja: 'アナログ・デジタル電子回路、マイコン、計測と制御。',
        zh: '模拟与数字电子、微控制器、仪器仪表与控制。',
      },
    },
  ],

  /* ── 03 Experience ─────────────────────────────────────────── */
  experience: [
    {
      period: 'Jan 2023 — Present',
      company: 'Ecomindo Sarana Cipta',
      role: {
        en: 'Software Engineer',
        id: 'Software Engineer',
        ko: '소프트웨어 엔지니어',
        ja: 'ソフトウェアエンジニア',
        zh: '软件工程师',
      },
      location: {
        en: 'Jakarta, Indonesia',
        id: 'Jakarta, Indonesia',
        ko: '인도네시아 자카르타',
        ja: 'インドネシア・ジャカルタ',
        zh: '印度尼西亚 雅加达',
      },
      bullets: [
        {
          en: 'Built and maintained web applications with modern frameworks (React, Next.js, TypeScript).',
          id: 'Membangun dan memelihara aplikasi web dengan framework modern (React, Next.js, TypeScript).',
          ko: '모던 프레임워크(React, Next.js, TypeScript)로 웹 애플리케이션을 구축하고 유지보수.',
          ja: 'モダンなフレームワーク（React、Next.js、TypeScript）でウェブアプリケーションを構築・保守。',
          zh: '使用现代框架（React、Next.js、TypeScript）构建并维护 Web 应用。',
        },
        {
          en: 'Translated UI/UX designs into responsive and accessible applications.',
          id: 'Menerjemahkan desain UI/UX menjadi aplikasi yang responsif dan aksesibel.',
          ko: 'UI/UX 디자인을 반응형·접근성 높은 애플리케이션으로 구현.',
          ja: 'UI/UX デザインをレスポンシブでアクセシブルなアプリケーションに落とし込み。',
          zh: '将 UI/UX 设计落地为响应式且具备无障碍性的应用。',
        },
        {
          en: 'Optimised performance and ensured cross-browser and cross-device compatibility.',
          id: 'Mengoptimalkan performa serta memastikan kompatibilitas lintas peramban dan perangkat.',
          ko: '성능을 최적화하고 크로스 브라우저·크로스 디바이스 호환성을 확보.',
          ja: 'パフォーマンスを最適化し、クロスブラウザ・クロスデバイス対応を担保。',
          zh: '优化性能，确保跨浏览器与跨设备兼容性。',
        },
        {
          en: 'Collaborated in an agile team delivering scalable backoffice and client-facing dashboards.',
          id: 'Berkolaborasi dalam tim agile untuk menghadirkan dasbor backoffice dan klien yang skalabel.',
          ko: '애자일 팀에서 확장 가능한 백오피스 및 고객용 대시보드를 함께 개발.',
          ja: 'アジャイルチームで、拡張性のあるバックオフィスおよび顧客向けダッシュボードを提供。',
          zh: '在敏捷团队中协作交付可扩展的后台与面向客户的仪表盘。',
        },
      ],
      stack: ['React', 'Next.js', 'TypeScript', 'SASS', 'REST APIs'],
    },
    {
      period: 'Jan 2021 — Aug 2023',
      company: 'Colliers International Indonesia',
      role: {
        en: 'Software Engineer — Asset Management Service',
        id: 'Software Engineer — Asset Management Service',
        ko: '소프트웨어 엔지니어 — 자산관리 서비스',
        ja: 'ソフトウェアエンジニア — アセットマネジメントサービス',
        zh: '软件工程师 — 资产管理服务',
      },
      location: {
        en: 'Jakarta, Indonesia',
        id: 'Jakarta, Indonesia',
        ko: '인도네시아 자카르타',
        ja: 'インドネシア・ジャカルタ',
        zh: '印度尼西亚 雅加达',
      },
      bullets: [
        {
          en: 'Developed hybrid Android/iOS apps for asset management and internal services.',
          id: 'Mengembangkan aplikasi hybrid Android/iOS untuk manajemen aset dan layanan internal.',
          ko: '자산 관리 및 사내 서비스를 위한 Android/iOS 하이브리드 앱 개발.',
          ja: '資産管理および社内サービス向けの Android/iOS ハイブリッドアプリを開発。',
          zh: '开发用于资产管理与内部服务的 Android/iOS 混合应用。',
        },
        {
          en: 'Integrated backend APIs for logistics, mail and inspection systems.',
          id: 'Mengintegrasikan API backend untuk sistem logistik, surat, dan inspeksi.',
          ko: '물류·우편·점검 시스템의 백엔드 API 연동.',
          ja: '物流・郵便・点検システムのバックエンド API を統合。',
          zh: '集成物流、邮件与巡检系统的后端 API。',
        },
        {
          en: 'Delivered real-time, performant mobile dashboards for corporate use.',
          id: 'Menghadirkan dasbor mobile real-time yang performan untuk kebutuhan korporat.',
          ko: '기업용 실시간·고성능 모바일 대시보드 제공.',
          ja: '法人向けにリアルタイムで軽快なモバイルダッシュボードを提供。',
          zh: '交付面向企业的实时、高性能移动仪表盘。',
        },
      ],
      projects: ['CFM System', 'CFM Inspector', 'CFM Mail & Courier'],
      stack: ['React Native', 'TypeScript', 'REST APIs', 'Android', 'iOS'],
    },
    {
      period: 'Sep 2019 — Jan 2021',
      company: 'Nutech Integrasi',
      role: {
        en: 'Software Engineer',
        id: 'Software Engineer',
        ko: '소프트웨어 엔지니어',
        ja: 'ソフトウェアエンジニア',
        zh: '软件工程师',
      },
      location: {
        en: 'Jakarta, Indonesia',
        id: 'Jakarta, Indonesia',
        ko: '인도네시아 자카르타',
        ja: 'インドネシア・ジャカルタ',
        zh: '印度尼西亚 雅加达',
      },
      bullets: [
        {
          en: 'Built mobile apps for logistics communication.',
          id: 'Membangun aplikasi mobile untuk komunikasi logistik.',
          ko: '물류 커뮤니케이션용 모바일 앱 개발.',
          ja: '物流コミュニケーション向けモバイルアプリを開発。',
          zh: '构建用于物流沟通的移动应用。',
        },
        {
          en: 'Integrated UI/UX designs with backend services for real-time operations.',
          id: 'Mengintegrasikan desain UI/UX dengan layanan backend untuk operasi real-time.',
          ko: 'UI/UX 디자인과 백엔드 서비스를 연결해 실시간 운영을 지원.',
          ja: 'UI/UX デザインとバックエンドサービスを結び、リアルタイム運用を実現。',
          zh: '将 UI/UX 设计与后端服务打通，支撑实时业务运营。',
        },
        {
          en: 'Contributed to a scalable mobile architecture in a consulting environment.',
          id: 'Berkontribusi pada arsitektur mobile yang skalabel di lingkungan konsultasi.',
          ko: '컨설팅 환경에서 확장 가능한 모바일 아키텍처에 기여.',
          ja: 'コンサルティング環境で拡張性のあるモバイルアーキテクチャに貢献。',
          zh: '在咨询项目环境中参与构建可扩展的移动端架构。',
        },
      ],
      stack: ['React Native', 'TypeScript', 'REST APIs'],
    },
  ],

  /* ── 04 3D design portfolio ────────────────────────────────── */
  // `images` is a list of paths — the first is the cover, the rest become
  // thumbnails. `image` (single path) still works. Leave both empty and a
  // generated cover is used instead.
  design: [
    {
      year: '2026',
      title: {
        en: 'VESA Bracket to 1/4" Thread Converter',
        id: 'Konverter Braket VESA ke Ulir 1/4"',
        ko: 'VESA 브래킷 → 1/4" 나사 변환 어댑터',
        ja: 'VESAブラケット → 1/4"ネジ変換アダプター',
        zh: 'VESA 支架转 1/4" 螺纹转换器',
      },
      desc: {
        en: 'An adapter that turns a spare monitor arm into a flexible rig for a camera, webcam, ring light or microphone. It converts a standard VESA hole pattern — 75×75 mm and 100×100 mm both fit — into a 1/4" tripod thread, with a recess on top that captures a 1/4" hex nut. Modelled to print flat on the bed with no supports.',
        id: 'Adaptor yang mengubah lengan monitor menganggur menjadi rig fleksibel untuk kamera, webcam, ring light, atau mikrofon. Mengonversi pola lubang VESA standar — 75×75 mm maupun 100×100 mm — menjadi ulir tripod 1/4", dengan cekungan di bagian atas untuk menahan mur segi enam 1/4". Dimodelkan agar dapat dicetak rata di bed tanpa support.',
        ko: '남는 모니터 암을 카메라, 웹캠, 링라이트, 마이크용 거치대로 바꿔 주는 어댑터입니다. 75×75 mm와 100×100 mm 모두 맞는 표준 VESA 홀 패턴을 1/4" 삼각대 나사로 변환하며, 상단 홈이 1/4" 육각 너트를 잡아 줍니다. 서포트 없이 베드에 평평하게 출력되도록 모델링했습니다.',
        ja: '余っているモニターアームを、カメラ・ウェブカメラ・リングライト・マイク用のリグに変えるアダプターです。75×75 mm と 100×100 mm のどちらにも合う標準 VESA 穴を 1/4" の三脚ネジに変換し、上面のくぼみが 1/4" 六角ナットを保持します。サポートなしでベタ置き印刷できるようモデリングしています。',
        zh: '一款把闲置显示器支架变成相机、网络摄像头、环形灯或麦克风支架的转接件。它将标准 VESA 孔位（75×75 mm 与 100×100 mm 均适配）转换为 1/4" 三脚架螺纹，顶部凹槽可卡住 1/4" 六角螺母。建模时即考虑平放打印，无需支撑。',
      },
      tools: ['FreeCAD', 'FDM printing'],
      images: [
        'assets/img/vesa-adapter/01.jpg',
        'assets/img/vesa-adapter/02.jpg',
        'assets/img/vesa-adapter/03.jpg',
      ],
      link: 'https://www.printables.com/model/1758140-vesa-bracket-to-14-thread-converter',
    },
    {
      year: '2024',
      title: {
        en: 'Speaker Enclosure 2.5"',
        id: 'Boks Speaker 2.5"',
        ko: '2.5" 스피커 인클로저',
        ja: '2.5インチ スピーカーエンクロージャー',
        zh: '2.5" 音箱箱体',
      },
      desc: {
        en: 'A simple cube enclosure for a 2.5" full-range driver. The front baffle is a separate plate fastened with four screws, so a driver can be fitted or swapped without reprinting the box. Built as a pair for a desktop setup.',
        id: 'Boks kubus sederhana untuk driver full-range 2.5". Baffle depan berupa pelat terpisah yang dipasang dengan empat sekrup, sehingga driver dapat dipasang atau diganti tanpa mencetak ulang boksnya. Dibuat sepasang untuk meja kerja.',
        ko: '2.5" 풀레인지 드라이버용 단순한 큐브형 인클로저입니다. 전면 배플을 별도 플레이트로 만들어 나사 네 개로 고정하므로, 박스를 다시 출력하지 않고도 드라이버를 장착하거나 교체할 수 있습니다. 데스크용으로 한 쌍 제작했습니다.',
        ja: '2.5インチのフルレンジドライバー向けのシンプルなキューブ型エンクロージャーです。フロントバッフルを別板にして4本のネジで固定するため、本体を再プリントせずにドライバーの取り付けや交換ができます。デスク用にペアで製作しました。',
        zh: '一款适配 2.5" 全频单元的简约立方体箱体。前障板为独立面板，用四颗螺丝固定，因此更换或安装单元时无需重新打印箱体。为桌面场景制作了一对。',
      },
      tools: ['FreeCAD', 'FDM printing'],
      images: [
        'assets/img/speaker-enclosure/01.jpg',
        'assets/img/speaker-enclosure/02.jpg',
      ],
      link: 'https://www.printables.com/model/1022277-speaker-enclosure-25',
    },
    {
      year: '2024',
      title: {
        en: 'Simple Pen Drawer',
        id: 'Laci Alat Tulis Sederhana',
        ko: '심플 펜 서랍',
        ja: 'シンプル ペン引き出し',
        zh: '简约文具抽屉',
      },
      desc: {
        en: 'A 150 × 150 × 50 mm desktop stationery organiser. The top tray splits into a long channel, two open wells and a row of six round holes for pens and tools, with a sliding drawer underneath for everything that should stay out of sight. Entered in the Printables "Sorting Trays" contest.',
        id: 'Pengatur alat tulis meja berukuran 150 × 150 × 50 mm. Baki atasnya terbagi menjadi satu kanal panjang, dua ceruk terbuka, dan deretan enam lubang bundar untuk pena serta perkakas, dengan laci geser di bawahnya untuk barang yang sebaiknya tak terlihat. Diikutsertakan dalam kontes "Sorting Trays" di Printables.',
        ko: '150 × 150 × 50 mm 크기의 데스크 문구 정리함입니다. 상단 트레이는 긴 홈 하나, 열린 칸 두 개, 펜과 도구용 원형 구멍 여섯 개로 나뉘며, 아래에는 보이지 않게 두고 싶은 물건을 넣는 서랍이 있습니다. Printables "Sorting Trays" 콘테스트 출품작입니다.',
        ja: '150 × 150 × 50 mm のデスク用文具オーガナイザーです。上段トレイは長い溝ひとつ、仕切りのない角穴2つ、ペンや工具を挿す丸穴6つに分かれ、その下に隠しておきたいものを入れる引き出しが付きます。Printables の「Sorting Trays」コンテスト出品作。',
        zh: '一款 150 × 150 × 50 mm 的桌面文具收纳盒。上层托盘分为一条长槽、两个开放式方格和一排六个圆孔，用于插放笔与工具；下方是一个抽屉，收纳不想露在外面的物品。参加了 Printables 的 "Sorting Trays" 比赛。',
      },
      tools: ['FreeCAD', 'FDM printing'],
      images: [
        'assets/img/pen-drawer/01.jpg',
        'assets/img/pen-drawer/02.jpg',
        'assets/img/pen-drawer/03.jpg',
      ],
      link: 'https://www.printables.com/model/999099-simple-pen-drawer',
    },
  ],

  /* ── 05 Electronics / embedded ─────────────────────────────── */
  electronics: [
    {
      year: '2018',
      title: {
        en: 'Smart Glove System for Aphasia Communication (SGSCA)',
        id: 'Smart Glove System for Aphasia Communication (SGSCA)',
        ko: '실어증 의사소통을 위한 스마트 글러브 시스템 (SGSCA)',
        ja: '失語症コミュニケーション支援スマートグローブ (SGSCA)',
        zh: '面向失语症沟通的智能手套系统 (SGSCA)',
      },
      desc: {
        en: 'A wearable glove that reads hand gestures and turns them into speech and text, giving people with aphasia a faster way to communicate. The ESP32 firmware streams sensor data over REST APIs to a companion mobile app. Runner-up at National Electromedical Weeks 2018.',
        id: 'Sarung tangan wearable yang membaca gerakan tangan dan mengubahnya menjadi suara serta teks, memberi penyandang afasia cara berkomunikasi yang lebih cepat. Firmware ESP32 mengirim data sensor melalui REST API ke aplikasi mobile pendamping. Juara kedua National Electromedical Weeks 2018.',
        ko: '손동작을 읽어 음성과 텍스트로 바꿔 주는 웨어러블 장갑으로, 실어증 환자가 더 빠르게 의사소통할 수 있게 합니다. ESP32 펌웨어가 센서 데이터를 REST API로 전용 모바일 앱에 전송합니다. 2018 National Electromedical Weeks 준우승.',
        ja: '手の動きを読み取り音声とテキストに変換するウェアラブルグローブで、失語症のある人がより速く意思疎通できるようにします。ESP32 のファームウェアがセンサーデータを REST API 経由で専用モバイルアプリへ送信します。National Electromedical Weeks 2018 準優勝。',
        zh: '一款可穿戴手套，可读取手部动作并转换为语音与文字，让失语症人士更快地进行沟通。ESP32 固件通过 REST API 将传感器数据传送至配套移动应用。获 2018 年全国电子医学周亚军。',
      },
      stack: ['ESP32', 'Flex sensors', 'REST APIs', 'React Native', 'IoT'],
      link: '',
    },
    // TODO: add more embedded projects here — same shape as above.
  ],

  /* ── 06 Certifications ─────────────────────────────────────── */
  // TODO: replace with your real certifications, or delete the entries you
  // don't need — the section hides itself when the list is empty.
  certifications: [
    {
      year: '20XX',
      name: { en: 'Certification name', id: 'Nama sertifikasi', ko: '자격증 이름', ja: '資格名', zh: '证书名称' },
      issuer: { en: 'Issuing organisation', id: 'Lembaga penerbit', ko: '발급 기관', ja: '発行機関', zh: '颁发机构' },
      id: '',
      link: '',
    },
    {
      year: '20XX',
      name: { en: 'Certification name', id: 'Nama sertifikasi', ko: '자격증 이름', ja: '資格名', zh: '证书名称' },
      issuer: { en: 'Issuing organisation', id: 'Lembaga penerbit', ko: '발급 기관', ja: '発行機関', zh: '颁发机构' },
      id: '',
      link: '',
    },
  ],

  /* ── 07 Awards ─────────────────────────────────────────────── */
  awards: [
    {
      year: '2018',
      name: {
        en: 'Runner-up — National Electromedical Weeks',
        id: 'Juara Kedua — National Electromedical Weeks',
        ko: '준우승 — National Electromedical Weeks',
        ja: '準優勝 — National Electromedical Weeks',
        zh: '亚军 —— 全国电子医学周',
      },
      issuer: {
        en: 'National Electromedical Weeks 2018',
        id: 'National Electromedical Weeks 2018',
        ko: 'National Electromedical Weeks 2018',
        ja: 'National Electromedical Weeks 2018',
        zh: '全国电子医学周 2018',
      },
      desc: {
        en: 'Awarded for the Smart Glove System for Aphasia Communication (SGSCA).',
        id: 'Diberikan atas karya Smart Glove System for Aphasia Communication (SGSCA).',
        ko: '실어증 의사소통 스마트 글러브 시스템(SGSCA)으로 수상.',
        ja: '失語症コミュニケーション支援スマートグローブ (SGSCA) により受賞。',
        zh: '凭借面向失语症沟通的智能手套系统 (SGSCA) 获奖。',
      },
    },
  ],

  /* ── 08 Language proficiency ───────────────────────────────── */
  // TODO: adjust the levels, and add any language I don't know about.
  // `level` is a value from 0 to 5 used to draw the meter.
  languages: [
    {
      name: { en: 'Indonesian', id: 'Bahasa Indonesia', ko: '인도네시아어', ja: 'インドネシア語', zh: '印尼语' },
      level: 5,
      note: {
        en: 'Native speaker',
        id: 'Penutur asli',
        ko: '모국어',
        ja: '母語',
        zh: '母语',
      },
    },
    {
      name: { en: 'English', id: 'Bahasa Inggris', ko: '영어', ja: '英語', zh: '英语' },
      level: 4,
      note: {
        en: 'Professional working proficiency',
        id: 'Kemampuan kerja profesional',
        ko: '업무 활용 가능 수준',
        ja: 'ビジネスレベル',
        zh: '专业工作水平',
      },
    },
  ],
};

/* Exposed for app.js (plain script tags, no bundler). */
window.SITE = { LANGS, UI, SECTIONS, CONTENT };
