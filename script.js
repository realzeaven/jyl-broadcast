const canvas = document.querySelector("#signal-field");
const ctx = canvas.getContext("2d", { alpha: true });
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const stillMode = new URLSearchParams(window.location.search).has("still");
const DEFAULT_LANGUAGE = "en";
const LANGUAGE_STORAGE_KEY = "jyl-language-v2";
const CASE_IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

const translations = {
  zh: {
    navAbout: "关于我们",
    navServices: "服务",
    navCases: "案例",
    navContact: "联系",
    heroKicker: "关于我们 / 现场转播制作公司",
    heroText:
      "JYL Broadcast 是一个面向现场活动的 EFP 多机位转播与直播制作团队。我们为演唱会、会议、音乐节、舞蹈比赛、发布会和户外活动提供从前期规划到现场执行的完整制作服务。",
    heroStatement: "用稳定的现场系统，呈现更好的远端观看体验。",
    heroPrimary: "我们的服务",
    heroSecondary: "联系我们",
    servicesKicker: "服务",
    servicesTitle: "我们提供什么服务。",
    serviceConcertTitle: "演唱会",
    serviceConcertText: "多机位切换、舞台全景、歌手特写、乐手细节、现场大屏与线上直播同步输出。",
    serviceConcertMeta: "箱式镜头 / 舞台机位 / 节目信号",
    serviceConferenceTitle: "会议",
    serviceConferenceText: "嘉宾席、主持人、PPT、视频源和线上平台信号整合，适合论坛、峰会和企业大会。",
    serviceConferenceMeta: "嘉宾特写 / PPT接入 / 直播推流",
    serviceFestivalTitle: "音乐节",
    serviceFestivalText: "长时间户外拍摄、舞台切换、现场音频接入、备用录制和多平台分发。",
    serviceFestivalMeta: "户外流程 / 音频接入 / 备份录制",
    serviceDanceTitle: "舞蹈比赛",
    serviceDanceText: "完整舞台动线、评委席、选手特写和成绩/流程信息，兼顾记录与传播。",
    serviceDanceMeta: "全景 / 特写 / 全程录制",
    serviceLaunchTitle: "发布会",
    serviceLaunchText: "品牌发布、访谈、揭幕、互动环节和媒体素材输出，保证画面统一和流程清晰。",
    serviceLaunchMeta: "品牌画面 / 访谈 / 素材交付",
    serviceFieldTitle: "赛事与户外活动",
    serviceFieldText: "远距离长焦跟拍、解说音频、现场无线沟通和复杂场地的信号规划。",
    serviceFieldMeta: "长焦 / 现场音频 / 信号规划",
    casesKicker: "案例",
    casesTitle: "案例介绍。",
    casesText:
      "不同活动对机位、镜头、音频和信号稳定性的要求完全不同。我们会根据现场规模和交付平台，为每个项目配置清晰的制作方案。",
    caseForumTitle: "大型会议",
    caseForumText: "主会场多机位、嘉宾特写、PPT/视频信号接入、平台直播与全程录制。",
    caseForumMeta: "EFP x 4 / 导播切换 / 直播推流 / ISO录制",
    casePerformanceTitle: "舞台演出",
    casePerformanceText: "远距离箱式镜头、舞台全景、演员特写、现场大屏与线上同步输出。",
    casePerformanceMeta: "箱式镜头 / 多机位 / 节目信号",
    caseFieldTitle: "赛事户外",
    caseFieldText: "长焦跟拍、现场解说音频、备用录制和网络条件不稳定时的交付预案。",
    caseFieldMeta: "长焦 / 现场音频 / 备份信号",
    caseJeffTitle: "张信哲世界巡回演唱会 温哥华",
    caseJeffText: "为 Jeff Chang “Our Story” World Tour 温哥华站提供现场导播切换、设备租赁和技术支持，确保演唱会画面稳定交付。",
    caseJeffMeta: "导播切换 / 设备租赁 / 技术支持",
    caseX9Title: "X9 Cup 射击比赛直播",
    caseX9Text: "从摄像团队、现场导播、图文包装到多平台直播，完成赛事现场的一体化制作流程。",
    caseX9Meta: "摄像团队 / 图文包装 / 多平台直播",
    caseLamTitle: "林峯世界巡回演唱会 温哥华",
    caseLamText: "为 LF LIVE AROUND THE WORLD 温哥华站提供多机位 IMAG 支持、Sony FX6 系统和现场导播流程。",
    caseLamMeta: "Sony FX6 / IMAG / 现场切换",
    caseDeerTitle: "九色鹿舞台演出",
    caseDeerText: "在 Queen Elizabeth Theatre 提供多机位记录、摄像团队和现场切换支持。",
    caseDeerMeta: "多机位记录 / 摄像团队 / 现场切换",
    caseRichieTitle: "任贤齐「齐迹」世界巡回演唱会",
    caseRichieText: "为 Richie Jen 温哥华站提供多机位、IMAG 系统、现场切换和团队支持。",
    caseRichieMeta: "多机位 / IMAG / 现场团队",
    caseMoreTitle: "更多案例即将更新",
    caseMoreText: "第 6 个案例位已预留，可直接接入新的 Instagram 图集、活动信息和项目链接。",
    caseMoreMeta: "等待下一个项目",
    caseOpen: "查看 Instagram",
    caseFestivalTitle: "音乐节转播",
    caseFestivalText: "长时间舞台拍摄、现场音频接入、节目切换、备份录制和多平台同步交付。",
    caseFestivalMeta: "户外舞台 / 现场音频 / 多平台",
    caseDanceTitle: "舞蹈比赛",
    caseDanceText: "完整舞台记录、评委席、选手特写和干净的节目输出，适合赛事归档与传播。",
    caseDanceMeta: "全景 / 特写 / 归档录制",
    caseLaunchTitle: "发布会制作",
    caseLaunchText: "品牌演讲、揭幕瞬间、访谈环节和活动后媒体素材交付，保持统一的视觉表达。",
    caseLaunchMeta: "演讲 / 揭幕 / 素材交付",
    caseHybridTitle: "混合会议",
    caseHybridText: "现场演示、远程嘉宾连线、PPT信号接入和稳定直播交付，兼顾现场与线上观众。",
    caseHybridMeta: "远程嘉宾 / PPT / 直播推流",
    caseStreamingTitle: "多平台直播",
    caseStreamingText: "节目信号输出、备份录制、平台分发和信号监看，适合需要稳定线上传播的活动。",
    caseStreamingMeta: "节目信号 / 备份 / 监看",
    contactKicker: "联系",
    contactTitle: "联系我们。",
    contactText:
      "请告诉我们活动类型、日期、城市、场地、预计时长和直播平台。我们会根据现场需求为你回复机位、人员、设备和预算建议。",
    formName: "姓名",
    formEmail: "邮箱",
    formPhone: "电话 / WhatsApp",
    formEvent: "活动类型",
    optionConcert: "演唱会",
    optionConference: "会议",
    optionFestival: "音乐节",
    optionDance: "舞蹈比赛",
    optionLaunch: "发布会",
    optionField: "赛事或户外活动",
    formDateCity: "日期与城市",
    formVenue: "场地",
    formMessage: "需求说明",
    formSubmit: "发送需求",
    formNote: "我们会查看活动信息，并通过邮箱或电话回复你。",
  },
  en: {
    navAbout: "ABOUT US",
    navServices: "SERVICES",
    navCases: "CASES",
    navContact: "CONTACT",
    heroKicker: "ABOUT US / LIVE PRODUCTION COMPANY",
    heroText:
      "JYL Broadcast is an EFP multi-camera and live production team for live events. We support concerts, conferences, music festivals, dance competitions, launches and outdoor productions from planning through on-site delivery.",
    heroStatement: "Stable production systems for a better remote viewing experience.",
    heroPrimary: "OUR SERVICES",
    heroSecondary: "GET IN TOUCH",
    servicesKicker: "SERVICES",
    servicesTitle: "What we provide.",
    serviceConcertTitle: "Concerts",
    serviceConcertText: "Multi-camera switching, stage wides, artist close-ups, musician details, IMAG and online live delivery.",
    serviceConcertMeta: "Box lens / Stage camera / Program feed",
    serviceConferenceTitle: "Conferences",
    serviceConferenceText: "Speaker coverage, host shots, slides, video sources and platform delivery for forums, summits and corporate events.",
    serviceConferenceMeta: "Speaker close-up / Slides / Streaming",
    serviceFestivalTitle: "Music Festivals",
    serviceFestivalText: "Long-duration outdoor coverage, stage switching, field audio, backup recording and multi-platform distribution.",
    serviceFestivalMeta: "Outdoor workflow / Audio / Backup",
    serviceDanceTitle: "Dance Competitions",
    serviceDanceText: "Full-stage coverage, judge table shots, performer close-ups and program recording for competition workflows.",
    serviceDanceMeta: "Wide shot / Close-up / Recording",
    serviceLaunchTitle: "Launch Events",
    serviceLaunchText: "Brand reveals, interviews, key moments, live packages and media-ready deliverables with a consistent visual language.",
    serviceLaunchMeta: "Brand feed / Interview / Clip delivery",
    serviceFieldTitle: "Field Production",
    serviceFieldText: "Long-lens tracking, commentary audio, crew communication and signal planning for complex venues.",
    serviceFieldMeta: "Long lens / Field audio / Signal plan",
    casesKicker: "CASE STUDIES",
    casesTitle: "Case studies.",
    casesText:
      "Every event has different requirements for camera positions, lensing, audio and signal reliability. We build a clear production plan for each venue, scale and delivery platform.",
    caseForumTitle: "Forum Live",
    caseForumText: "Multi-camera main hall coverage, speaker close-ups, slide/video source integration, streaming and full recording.",
    caseForumMeta: "EFP x 4 / Switcher / Streaming / ISO Record",
    casePerformanceTitle: "Performance Broadcast",
    casePerformanceText: "Long-lens stage detail, wide stage coverage, performer close-ups, IMAG and online output.",
    casePerformanceMeta: "Box Lens / Multi-cam / Program Feed",
    caseFieldTitle: "Field Production",
    caseFieldText: "Long-lens tracking, commentary audio, backup recording and delivery planning for unstable field conditions.",
    caseFieldMeta: "Long Lens / Field Audio / Backup Signal",
    caseJeffTitle: "Jeff Chang World Tour Vancouver",
    caseJeffText: "Live switching, equipment rental and technical support for Jeff Chang “Our Story” World Tour in Vancouver.",
    caseJeffMeta: "Live Switching / Equipment Rental / Technical Support",
    caseX9Title: "X9 Cup Shooting Competition Live",
    caseX9Text: "An end-to-end competition workflow from camera crew and live switching to graphics and multi-platform streaming.",
    caseX9Meta: "Camera Crew / Graphics / Streaming",
    caseLamTitle: "Lam Fung Live Around The World Vancouver",
    caseLamText: "Multicam IMAG support with a Sony FX6-based camera system, director workflow and on-site switching.",
    caseLamMeta: "Sony FX6 / IMAG / Live Switching",
    caseDeerTitle: "The Legend of the Nine-Colored Deer",
    caseDeerText: "On-site multicam recording, camera crew and live switching support at Queen Elizabeth Theatre.",
    caseDeerMeta: "Multicam Record / Camera Crew / Switching",
    caseRichieTitle: "Richie Jen QI JI World Tour Vancouver",
    caseRichieText: "Multicam setup, IMAG system, live switching and on-site crew support for a concert production with no second take.",
    caseRichieMeta: "Multicam / IMAG / On-site Crew",
    caseMoreTitle: "Additional Case Ready",
    caseMoreText: "This sixth case slot is ready for your next Instagram project, image set and production details.",
    caseMoreMeta: "Ready for next project",
    caseOpen: "View on Instagram",
    caseFestivalTitle: "Festival Coverage",
    caseFestivalText: "Long-duration stage coverage with live audio feed, program switching, backup recording and multi-platform delivery.",
    caseFestivalMeta: "Outdoor Stage / Live Audio / Multi-platform",
    caseDanceTitle: "Dance Competition",
    caseDanceText: "Full-stage recording, judge table shots, performer close-ups and clean program output for competition archives.",
    caseDanceMeta: "Wide Shot / Close-up / Archive Record",
    caseLaunchTitle: "Launch Event",
    caseLaunchText: "Brand presentation coverage with keynote, reveal moments, interviews and media-ready delivery for post-event use.",
    caseLaunchMeta: "Keynote / Reveal / Clip Delivery",
    caseHybridTitle: "Hybrid Conference",
    caseHybridText: "On-site presentation, remote guest connection, slide source integration and stable live delivery for hybrid audiences.",
    caseHybridMeta: "Remote Guest / Slides / Streaming",
    caseStreamingTitle: "Multi-platform Live",
    caseStreamingText: "Program output, recording backup, platform delivery and signal monitoring for events that need reliable online reach.",
    caseStreamingMeta: "Program Feed / Backup / Monitoring",
    contactKicker: "CONTACT",
    contactTitle: "Contact us.",
    contactText:
      "Tell us your event type, date, city, venue, duration and delivery platform. We will reply with camera, crew, equipment and budget suggestions.",
    formName: "Name",
    formEmail: "Email",
    formPhone: "Phone / WhatsApp",
    formEvent: "Event Type",
    optionConcert: "Concert",
    optionConference: "Conference",
    optionFestival: "Music Festival",
    optionDance: "Dance Competition",
    optionLaunch: "Launch Event",
    optionField: "Field Production",
    formDateCity: "Date & City",
    formVenue: "Venue",
    formMessage: "Message",
    formSubmit: "SEND REQUEST",
    formNote: "We will review your event details and reply by email or phone.",
  },
};

const pointer = {
  x: 0,
  y: 0,
  tx: 0,
  ty: 0,
  sx: 0,
  sy: 0,
  active: false,
  lastMove: 0,
};

const particles = [];
const sparks = [];
let width = 0;
let height = 0;
let dpr = 1;
let frame = 0;
let lastPaint = 0;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function addParticle(x, y, z, color, alpha, size, drift = 1) {
  particles.push({
    x,
    y,
    z,
    color,
    alpha,
    size,
    drift,
    phase: random(0, Math.PI * 2),
    speed: random(0.45, 1.35),
  });
}

function buildCameraRig() {
  particles.length = 0;
  sparks.length = 0;

  const rose = "255,46,170";
  const deepRose = "176,23,112";
  const cyan = "112,247,255";
  const amber = "255,211,108";
  const softWhite = "245,241,244";

  function color(primary) {
    const roll = Math.random();
    if (roll > 0.9) return cyan;
    if (roll > 0.78) return softWhite;
    if (roll > 0.55) return primary;
    return deepRose;
  }

  function addLine(x1, y1, z1, x2, y2, z2, count, particleColor, alpha = 0.42, size = 0.9, drift = 1) {
    for (let i = 0; i < count; i += 1) {
      const t = count === 1 ? 0 : i / (count - 1);
      addParticle(
        x1 + (x2 - x1) * t + random(-0.004, 0.004),
        y1 + (y2 - y1) * t + random(-0.004, 0.004),
        z1 + (z2 - z1) * t + random(-0.004, 0.004),
        particleColor,
        random(alpha * 0.5, alpha),
        random(size * 0.55, size),
        drift,
      );
    }
  }

  function addCuboidSurface(x1, x2, y1, y2, z1, z2, count, particleColor, alpha = 0.28, size = 0.85) {
    for (let i = 0; i < count; i += 1) {
      const face = Math.floor(random(0, 6));
      let x = random(x1, x2);
      let y = random(y1, y2);
      let z = random(z1, z2);
      if (face === 0) x = x1;
      if (face === 1) x = x2;
      if (face === 2) y = y1;
      if (face === 3) y = y2;
      if (face === 4) z = z1;
      if (face === 5) z = z2;
      addParticle(x, y, z, color(particleColor), random(alpha * 0.4, alpha), random(size * 0.45, size), 0.8);
    }
  }

  function addCuboidEdges(x1, x2, y1, y2, z1, z2, particleColor, alpha = 0.55, size = 0.95) {
    const xs = [x1, x2];
    const ys = [y1, y2];
    const zs = [z1, z2];
    for (const x of xs) {
      for (const y of ys) addLine(x, y, z1, x, y, z2, 58, particleColor, alpha, size, 0.42);
      for (const z of zs) addLine(x, y1, z, x, y2, z, 58, particleColor, alpha, size, 0.42);
    }
    for (const y of ys) {
      for (const z of zs) addLine(x1, y, z, x2, y, z, 80, particleColor, alpha, size, 0.42);
    }
  }

  function addCylinder(x1, x2, radiusY, radiusZ, count, particleColor, alpha = 0.28, size = 0.86) {
    for (let i = 0; i < count; i += 1) {
      const t = random(0, 1);
      const theta = random(0, Math.PI * 2);
      const surface = Math.pow(random(0.62, 1), 0.35);
      addParticle(
        x1 + (x2 - x1) * t,
        Math.cos(theta) * radiusY * surface,
        Math.sin(theta) * radiusZ * surface,
        color(particleColor),
        random(alpha * 0.45, alpha),
        random(size * 0.45, size),
        0.75,
      );
    }
  }

  function addRing(x, radiusY, radiusZ, count, particleColor, alpha = 0.62, size = 1) {
    for (let i = 0; i < count; i += 1) {
      const theta = (i / count) * Math.PI * 2;
      addParticle(
        x,
        Math.cos(theta) * radiusY,
        Math.sin(theta) * radiusZ,
        particleColor,
        random(alpha * 0.45, alpha),
        random(size * 0.48, size),
        0.42,
      );
    }
  }

  function addFrontGlass(x, count) {
    for (let i = 0; i < count; i += 1) {
      const theta = random(0, Math.PI * 2);
      const radius = Math.pow(random(0.08, 1), 0.5);
      addParticle(
        x + random(-0.012, 0.012),
        Math.cos(theta) * 0.31 * radius,
        Math.sin(theta) * 0.31 * radius,
        Math.random() > 0.55 ? cyan : amber,
        random(0.16, 0.52),
        random(0.38, 1.05),
        0.55,
      );
    }
  }

  addCuboidSurface(-1.92, -1.52, -0.5, 0.5, -0.48, 0.48, 1800, rose, 0.36, 1);
  addCuboidEdges(-1.92, -1.52, -0.5, 0.5, -0.48, 0.48, cyan, 0.68, 1);
  addCuboidEdges(-1.82, -1.62, -0.38, 0.38, -0.38, 0.38, amber, 0.54, 0.86);
  addFrontGlass(-1.96, 1600);
  addRing(-1.96, 0.36, 0.36, 520, amber, 0.62, 1);
  addRing(-1.9, 0.45, 0.45, 560, cyan, 0.48, 0.9);

  addCylinder(-1.52, -0.5, 0.34, 0.32, 2200, rose, 0.32, 0.88);
  [-1.38, -1.15, -0.9, -0.64].forEach((x, index) => {
    addRing(x, 0.36 - index * 0.012, 0.34 - index * 0.012, 340, index % 2 ? amber : cyan, 0.52, 0.95);
  });
  addLine(-1.35, -0.42, -0.36, -0.54, -0.36, -0.3, 210, cyan, 0.38, 0.75, 0.45);
  addLine(-1.35, 0.42, 0.36, -0.54, 0.35, 0.28, 210, cyan, 0.32, 0.75, 0.45);

  addCuboidSurface(-0.52, 0.86, -0.38, 0.34, -0.34, 0.34, 2100, deepRose, 0.3, 0.9);
  addCuboidEdges(-0.52, 0.86, -0.38, 0.34, -0.34, 0.34, rose, 0.5, 0.96);
  addCuboidSurface(-0.05, 0.68, -0.68, -0.48, -0.18, 0.18, 620, rose, 0.3, 0.82);
  addCuboidEdges(-0.05, 0.68, -0.68, -0.48, -0.18, 0.18, cyan, 0.42, 0.82);
  addCuboidSurface(-0.38, 0.56, -0.54, -0.46, 0.22, 0.34, 460, cyan, 0.24, 0.72);
  addCuboidSurface(-0.2, 0.72, 0.36, 0.48, -0.21, 0.2, 470, amber, 0.28, 0.78);
  addCuboidSurface(0.82, 1.02, -0.26, 0.2, -0.22, 0.22, 360, cyan, 0.22, 0.72);
  addCuboidEdges(0.82, 1.02, -0.26, 0.2, -0.22, 0.22, cyan, 0.34, 0.72);

  addLine(-0.52, 0.43, -0.2, 0.72, 0.42, -0.2, 180, cyan, 0.38, 0.82, 0.5);
  addLine(-0.52, 0.43, 0.2, 0.72, 0.42, 0.2, 180, cyan, 0.34, 0.82, 0.5);
  addLine(0.14, 0.48, 0, -0.72, 1.12, 0.08, 180, rose, 0.44, 0.88, 0.62);
  addLine(0.14, 0.48, 0, 0.18, 1.13, -0.05, 175, cyan, 0.36, 0.85, 0.62);
  addLine(0.14, 0.48, 0, 1.02, 1.06, 0.14, 170, rose, 0.4, 0.85, 0.62);

  for (let i = 0; i < 260; i += 1) {
    const t = i / 259;
    const theta = -0.38 + t * 4.7;
    const x = 0.62 + Math.cos(theta) * 0.23 + t * 0.44;
    const y = -0.04 + Math.sin(theta) * 0.48;
    const z = -0.39 - t * 0.25;
    addParticle(x, y, z, t > 0.5 ? cyan : rose, random(0.12, 0.38), random(0.45, 0.9), 1.45);
  }

  for (let trail = 0; trail < 8; trail += 1) {
    for (let i = 0; i < 150; i += 1) {
      const t = i / 149;
      const x = -1.88 - t * random(0.42, 1.18);
      const y = -0.34 + trail * 0.1 + Math.sin(t * Math.PI * 2 + trail) * 0.04;
      const z = Math.cos(t * Math.PI * 1.4 + trail) * 0.2;
      addParticle(x, y, z, trail % 2 ? cyan : rose, random(0.07, 0.25), random(0.34, 0.86), 1.8);
    }
  }

  for (let i = 0; i < 260; i += 1) {
    sparks.push({
      x: random(0, 1),
      y: random(0, 1),
      speed: random(0.00028, 0.0011),
      size: random(0.36, 1.1),
      alpha: random(0.04, 0.18),
      color: Math.random() > 0.68 ? cyan : rose,
    });
  }
}

function resize() {
  width = window.innerWidth || document.documentElement.clientWidth || canvas.clientWidth || 1280;
  height = window.innerHeight || document.documentElement.clientHeight || canvas.clientHeight || 720;
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (!pointer.active) {
    pointer.sx = width * 0.72;
    pointer.sy = height * 0.42;
  }
}

function project(p, time) {
  const autoScale = 1 + Math.sin(time * 0.00042) * 0.035;
  const scale = Math.min(width, height) * (width < 700 ? 0.27 : width > 1500 ? 0.42 : 0.36) * autoScale;
  const centerX = width * (width < 700 ? 1.08 : width > 1500 ? 0.82 : 0.87);
  const centerY = height * (width < 700 ? 0.34 : 0.43);
  const breathe = Math.sin(time * 0.0007 + p.phase) * 0.01 * p.drift;
  const autoOrbit = Math.sin(time * 0.00023) * 0.12;
  const turn = -0.16 + autoOrbit + pointer.x * 0.12;
  const tilt = -0.05 + Math.cos(time * 0.00019) * 0.045 + pointer.y * 0.08;

  const x = p.x + breathe;
  const y = p.y + Math.cos(time * 0.00055 + p.phase) * 0.012 * p.drift;
  const z = p.z + Math.sin(time * 0.00048 + p.phase) * 0.018 * p.drift;
  const cos = Math.cos(turn);
  const sin = Math.sin(turn);
  const rx = x * cos - z * sin;
  const rz = x * sin + z * cos;
  const ry = y * Math.cos(tilt) - rz * Math.sin(tilt);
  const perspective = 1 / (1 + rz * 0.12);
  const depth = 1 + rz * 0.22;

  return {
    x: centerX + (rx + rz * 0.26) * scale * perspective,
    y: centerY + (ry + rz * 0.06) * scale * perspective,
    depth,
  };
}

function drawBackground() {
  const gradient = ctx.createRadialGradient(width * 0.78, height * 0.24, 0, width * 0.78, height * 0.24, width * 0.74);
  gradient.addColorStop(0, "rgba(255,46,170,0.105)");
  gradient.addColorStop(0.38, "rgba(75,13,39,0.16)");
  gradient.addColorStop(1, "rgba(5,4,7,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const cyanWash = ctx.createRadialGradient(width * 0.52, height * 0.62, 0, width * 0.52, height * 0.62, width * 0.44);
  cyanWash.addColorStop(0, "rgba(112,247,255,0.035)");
  cyanWash.addColorStop(1, "rgba(112,247,255,0)");
  ctx.fillStyle = cyanWash;
  ctx.fillRect(0, 0, width, height);
}

function drawSparks(time) {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (const spark of sparks) {
    spark.x += spark.speed;
    if (spark.x > 1.08) spark.x = -0.08;
    const wave = Math.sin(time * 0.001 + spark.x * 18) * 18;
    ctx.fillStyle = `rgba(${spark.color}, ${spark.alpha})`;
    ctx.beginPath();
    ctx.arc(spark.x * width, spark.y * height + wave, spark.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawMouseGlow(time) {
  if (!pointer.active || time - pointer.lastMove > 2200) return;
  const scrollFade = Math.max(0.14, 1 - (window.scrollY || 0) / 820);
  if (scrollFade < 0.45) return;
  const pulse = 0.65 + Math.sin(time * 0.0038) * 0.35;
  const radius = width < 700 ? 150 : 230;

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  const glow = ctx.createRadialGradient(pointer.sx, pointer.sy, 0, pointer.sx, pointer.sy, radius);
  glow.addColorStop(0, `rgba(112,247,255,${0.18 * scrollFade * pulse})`);
  glow.addColorStop(0.38, `rgba(255,46,170,${0.1 * scrollFade})`);
  glow.addColorStop(1, "rgba(255,46,170,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(pointer.sx, pointer.sy, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawScanLines(time) {
  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.strokeStyle = "rgba(255,255,255,0.16)";
  ctx.lineWidth = 1;
  const step = 72;
  const drift = (time * 0.018) % step;
  for (let y = -step; y < height + step; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y + drift);
    ctx.lineTo(width, y + drift);
    ctx.stroke();
  }
  ctx.restore();
}

function paint(time = 0) {
  pointer.x += (pointer.tx - pointer.x) * 0.07;
  pointer.y += (pointer.ty - pointer.y) * 0.07;

  ctx.clearRect(0, 0, width, height);
  drawBackground();
  drawSparks(time);

  const activeInteraction = pointer.active && time - pointer.lastMove < 2600;
  const radius = width < 700 ? 125 : 190;
  const scrollFade = Math.max(0.14, 1 - (window.scrollY || 0) / 820);

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (const particle of particles) {
    const point = project(particle, time);
    if (point.x < -100 || point.x > width + 100 || point.y < -100 || point.y > height + 100) continue;

    let drawX = point.x;
    let drawY = point.y;
    let field = 0;

    if (activeInteraction) {
      const dx = point.x - pointer.sx;
      const dy = point.y - pointer.sy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        field = Math.pow(1 - dist / radius, 2);
      }
    }

    const textZone =
      width < 700
        ? point.x < width * 0.94 && point.y < height * 0.56
        : point.x < width * 0.56 && point.y < height * 0.68;
    const textFade = textZone ? (width < 700 ? 0.16 : 0.34) : 1;
    const twinkle = 0.74 + Math.sin(time * 0.001 * particle.speed + particle.phase) * 0.26;
    const alpha = Math.max(0.025, particle.alpha * twinkle * Math.min(1.28, point.depth) * textFade * scrollFade + field * 0.46 * scrollFade);
    const size = particle.size * Math.max(0.55, point.depth) * (1 + field * 0.62);
    ctx.fillStyle = `rgba(${particle.color}, ${alpha})`;
    ctx.beginPath();
    ctx.arc(drawX, drawY, size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  drawMouseGlow(time);
  drawScanLines(time);
}

function render(time = 0) {
  frame = requestAnimationFrame(render);
  if (time - lastPaint < 33) return;
  lastPaint = time;
  paint(time);
}

function setPointer(event) {
  pointer.active = true;
  pointer.lastMove = performance.now();
  pointer.sx = event.clientX;
  pointer.sy = event.clientY;
  pointer.tx = (event.clientX / width - 0.5) * 2;
  pointer.ty = (event.clientY / height - 0.5) * 2;
}

function hydrateCaseImages() {
  document.querySelectorAll("[data-case-image]").forEach((node) => {
    const basePath = node.dataset.caseImage;
    if (!basePath) return;

    let extensionIndex = 0;
    function tryNextImage() {
      if (extensionIndex >= CASE_IMAGE_EXTENSIONS.length) return;
      const url = `${basePath}.${CASE_IMAGE_EXTENSIONS[extensionIndex]}`;
      const image = new Image();
      image.onload = () => {
        node.style.setProperty("--case-image", `url("${url}")`);
      };
      image.onerror = () => {
        extensionIndex += 1;
        tryNextImage();
      };
      image.src = url;
    }

    tryNextImage();
  });
}

function readLanguagePreference() {
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch (error) {
    return null;
  }
}

function saveLanguagePreference(language) {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    // Language switching still works when browser storage is unavailable.
  }
}

function setLanguage(language) {
  const activeLanguage = translations[language] ? language : DEFAULT_LANGUAGE;
  const dictionary = translations[activeLanguage];
  document.documentElement.lang = activeLanguage === "zh" ? "zh-CN" : "en";

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const text = dictionary[node.dataset.i18n];
    if (text) node.textContent = text;
  });

  const toggle = document.querySelector("[data-lang-toggle]");
  if (toggle) {
    toggle.textContent = activeLanguage === "zh" ? "EN" : "中文";
    toggle.setAttribute("aria-label", activeLanguage === "zh" ? "Switch to English" : "切换到中文");
    toggle.dataset.currentLanguage = activeLanguage;
  }

  saveLanguagePreference(activeLanguage);
}

const languageToggle = document.querySelector("[data-lang-toggle]");
if (languageToggle) {
  languageToggle.addEventListener("click", () => {
    const currentLanguage = languageToggle.dataset.currentLanguage || readLanguagePreference() || DEFAULT_LANGUAGE;
    setLanguage(currentLanguage === "zh" ? "en" : "zh");
  });
}

setLanguage(readLanguagePreference() || DEFAULT_LANGUAGE);
hydrateCaseImages();

window.addEventListener("resize", resize);
window.addEventListener("pointermove", setPointer, { passive: true });
window.addEventListener("pointerleave", () => {
  pointer.active = false;
});

resize();
buildCameraRig();

if (!prefersReducedMotion.matches && !stillMode) {
  render();
} else {
  paint(0);
}

window.addEventListener(
  "load",
  () => {
    resize();
    if (stillMode || prefersReducedMotion.matches) {
      paint(0);
    }
  },
  { once: true },
);

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    cancelAnimationFrame(frame);
  } else if (!prefersReducedMotion.matches && !stillMode) {
    render();
  }
});
