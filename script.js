const canvas = document.querySelector("#signal-field");
const ctx = canvas.getContext("2d", { alpha: true });
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const stillMode = new URLSearchParams(window.location.search).has("still");
const DEFAULT_LANGUAGE = "en";
const LANGUAGE_STORAGE_KEY = "jyl-language-v4";
const CASE_IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

const translations = {
  zh: {
    navAbout: "关于我们",
    navServices: "服务",
    navCases: "案例",
    navContact: "联系",
    heroKicker: "关于我们 / 现场转播制作公司",
    heroText:
      "JYL Broadcast 是位于温哥华的多机位现场制作团队，服务演唱会、公司宴会、发布会、会议、音乐节、比赛和舞台活动。",
    heroLocation: "总部位于温哥华，服务北美现场活动制作。",
    heroStatement: "以可靠的 Flypack 系统和现场团队，完成稳定、清晰、可交付的现场画面。",
    heroPrimary: "我们的服务",
    heroSecondary: "联系我们",
    flypackKicker: "现场制作 FLYPACKS",
    flypackFx6: "Sony FX6 Flypack",
    flypackEfp: "松下 EFP Flypack",
    flypackNote: "适用于演唱会、会议、IMAG 大屏和直播交付。",
    servicesKicker: "服务",
    servicesTitle: "我们支持的活动场景",
    serviceConcertTitle: "演唱会与现场演出",
    serviceConcertText: "为演唱会和舞台演出提供多机位制作，兼顾舞台全景、艺人特写、观众反应和 IMAG 大屏输出。",
    serviceConcertMeta: "多机位 / IMAG / 节目信号",
    serviceConferenceTitle: "公司宴会与颁奖典礼",
    serviceConferenceText: "适用于公司晚宴、年会、颁奖典礼和品牌活动，稳定呈现嘉宾发言、舞台流程、现场氛围和关键时刻。",
    serviceConferenceMeta: "摄像团队 / 导播切换 / 录制交付",
    serviceFestivalTitle: "发布会与会议",
    serviceFestivalText: "支持品牌发布、论坛、峰会和会议直播，整合主持人、嘉宾、PPT、播放源和线上平台信号。",
    serviceFestivalMeta: "PPT接入 / 播放源 / 直播推流",
    serviceDanceTitle: "音乐节",
    serviceDanceText: "面向长时间、多节目、多舞台或户外场景，完成舞台切换、现场音频接入、备份录制和稳定节目输出。",
    serviceDanceMeta: "EFP Flypack / 现场音频 / 备份录制",
    serviceLaunchTitle: "比赛与赛事",
    serviceLaunchText: "适配舞蹈比赛、体育/专项赛事和评审流程，捕捉选手、评委、比分/信息、关键动作和现场氛围。",
    serviceLaunchMeta: "长焦机位 / 图文包装 / 多平台直播",
    serviceFieldTitle: "晚会与舞台活动",
    serviceFieldText: "适合文艺晚会、文化演出和特殊活动，根据节目 cue 和舞台流程完成稳定、精致的现场画面。",
    serviceFieldMeta: "导播流程 / 嘉宾特写 / 素材交付",
    coreCapabilitiesKicker: "核心制作能力",
    coreCapabilitiesList: "多机位现场制作 / 导播切换 / IMAG大屏 / 直播推流 / ISO录制 / Flypack系统",
    systemsKicker: "设备与系统",
    systemsTitle: "适配真实现场的制作系统",
    systemFx6Title: "Sony FX6 Flypack",
    systemFx6Text: "适合演唱会、会议、访谈、IMAG 和直播项目，在机动性和画质之间保持稳定平衡。",
    systemFx6Meta: "适合：演唱会 / 会议 / 直播",
    systemEfpTitle: "松下 EFP Flypack",
    systemEfpText: "广播级 EFP 制作系统，适合舞台演出、长焦机位、多机位现场制作和大型场馆节目信号输出。",
    systemEfpMeta: "适合：舞台演出 / 长焦 / 节目信号",
    systemWorkflowTitle: "切换与交付流程",
    systemWorkflowText: "把信号规划、导播流程、现场切换、监看、推流、录制和活动后素材交付整理成一条清晰制作链路。",
    systemWorkflowMeta: "包含：IMAG / 直播 / ISO录制",
    casesKicker: "案例",
    casesTitle: "案例介绍",
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
    caseDeyunsheTitle: "德云社三十周年世界巡演 温哥华",
    caseDeyunsheText: "不同舞台、不同节奏，但现场能量必须稳定传递。我们为温哥华站搭建 Sony FX6 多机位系统，并完成现场制作流程。",
    caseDeyunsheMeta: "服务：Sony FX6 套装 / 导播切换 / 摄像支持 / 多机位制作",
    caseTypeLabel: "类型",
    caseLocationLabel: "地点",
    caseSystemLabel: "系统",
    caseDeyunsheType: "巡演现场",
    caseDeyunsheLocation: "温哥华",
    caseDeyunsheSystem: "Sony FX6 Flypack",
    caseJeffTitle: "张信哲世界巡回演唱会 温哥华",
    caseJeffText: "熟悉的旋律在现场重新发生。我们为 Jeff Chang “Our Story” World Tour 温哥华站提供实时画面制作与现场技术支持。",
    caseJeffMeta: "服务：现场导播切换 / 设备租赁 / 技术支持",
    caseJeffType: "巡演现场",
    caseJeffLocation: "温哥华",
    caseJeffSystem: "现场切换系统",
    caseX9Title: "X9 Cup 射击比赛直播",
    caseX9Text: "从摄像到推流，赛事现场需要一条完整可靠的制作链路。我们为 X9 Cup 提供从现场采集到最终直播输出的一体化流程。",
    caseX9Meta: "服务：摄像团队 / 现场导播 / 图文包装 / 多平台直播 / 技术支持",
    caseX9Type: "比赛直播",
    caseX9Location: "温哥华",
    caseX9System: "多机位直播系统",
    caseLamTitle: "林峯世界巡回演唱会 温哥华",
    caseLamText: "为 LF LIVE AROUND THE WORLD 温哥华站提供多机位 IMAG 支持，让舞台细节和现场节奏稳定呈现在大屏与节目输出中。",
    caseLamMeta: "服务：导演与摄像团队 / Sony FX6 多机位系统 / IMAG / 现场切换",
    caseLamType: "演唱会 / IMAG",
    caseLamLocation: "温哥华",
    caseLamSystem: "Sony FX6 多机位",
    caseDeerTitle: "九色鹿舞台演出",
    caseDeerText: "一个 cue、一次切换、一个瞬间，都是现场制作的一部分。我们在 Queen Elizabeth Theatre 为演出提供完整现场支持。",
    caseDeerMeta: "服务：多机位记录 / 摄像团队 / 现场切换支持",
    caseDeerType: "舞台演出",
    caseDeerLocation: "Queen Elizabeth Theatre",
    caseDeerSystem: "多机位录制",
    caseRichieTitle: "任贤齐「齐迹」世界巡回演唱会",
    caseRichieText: "现场演出没有第二次机会。我们为 Richie Jen 温哥华站提供稳定、精准并具有画面感的演唱会现场制作系统。",
    caseRichieMeta: "服务：多机位搭建 / IMAG 系统 / 现场切换 / 现场团队",
    caseRichieType: "演唱会 / IMAG",
    caseRichieLocation: "温哥华",
    caseRichieSystem: "IMAG 转播系统",
    caseMoreTitle: "更多案例即将更新",
    caseMoreText: "第 6 个案例位已预留，可直接接入新的 Instagram 图集、活动信息和项目链接。",
    caseMoreMeta: "等待下一个项目",
    caseOpen: "查看 Instagram",
    caseViewPhotos: "展开照片",
    caseHidePhotos: "收起照片",
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
    contactTitle: "联系我们",
    contactText:
      "请告诉我们活动类型、日期、城市、场地、预计时长和直播平台。我们会根据现场需求为你回复机位、人员、设备和预算建议。",
    contactEmailLabel: "邮箱",
    contactPhoneLabel: "电话",
    contactInstagramLabel: "Instagram",
    contactWhatsappLabel: "WhatsApp",
    contactWhatsappAction: "发送消息",
    contactXhsLabel: "小红书",
    contactXhsAction: "查看主页",
    formName: "姓名",
    formEmail: "邮箱",
    formPhone: "电话 / WhatsApp",
    formEvent: "活动类型",
    optionConcert: "演唱会 / 现场演出",
    optionConference: "公司宴会 / 颁奖典礼",
    optionFestival: "发布会 / 会议",
    optionDance: "音乐节",
    optionLaunch: "比赛 / 赛事",
    optionField: "晚会 / 舞台活动",
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
      "JYL Broadcast is a Vancouver-based multicamera live production team for concerts, corporate galas, launches, conferences, festivals, competitions and stage events.",
    heroLocation: "Based in Vancouver. Supporting live events across North America.",
    heroStatement: "Reliable flypack systems and on-site crew for stable, clear and deliverable live images.",
    heroPrimary: "OUR SERVICES",
    heroSecondary: "GET IN TOUCH",
    flypackKicker: "PRODUCTION FLYPACKS",
    flypackFx6: "Sony FX6 Flypack",
    flypackEfp: "Panasonic EFP Flypack",
    flypackNote: "Configured for concerts, conferences, IMAG and livestream delivery.",
    servicesKicker: "SERVICES",
    servicesTitle: "Event coverage we support",
    serviceConcertTitle: "Concerts & Live Shows",
    serviceConcertText: "Multicamera coverage for concerts and live performances, keeping wide stage views, artist close-ups, audience moments and IMAG output in sync.",
    serviceConcertMeta: "Multicam / IMAG / Program Feed",
    serviceConferenceTitle: "Corporate Galas & Banquets",
    serviceConferenceText: "Coverage for company dinners, awards, gala programs and branded moments with clean speaker shots, guest reactions, live switching and recording.",
    serviceConferenceMeta: "Camera Crew / Live Switching / Recording",
    serviceFestivalTitle: "Launches & Conferences",
    serviceFestivalText: "Production support for product launches, forums, summits and meetings, integrating hosts, speakers, slides, playback and streaming platforms.",
    serviceFestivalMeta: "Slide Input / Playback / Streaming",
    serviceDanceTitle: "Music Festivals",
    serviceDanceText: "Long-duration festival production with stage switching, field audio, backup recording and reliable program delivery across changing show schedules.",
    serviceDanceMeta: "EFP Flypack / Field Audio / Backup Record",
    serviceLaunchTitle: "Competitions & Tournaments",
    serviceLaunchText: "Live coverage for dance, sports and specialty competitions, following judges, contestants, scores, key actions and audience atmosphere.",
    serviceLaunchMeta: "Long Lens / Graphics / Multi-platform Stream",
    serviceFieldTitle: "Evening Events & Stage Shows",
    serviceFieldText: "Flexible production for evening shows, cultural performances and special events where timing, cues and a polished live image matter.",
    serviceFieldMeta: "Director Workflow / Guest Close-ups / Final Delivery",
    coreCapabilitiesKicker: "CORE PRODUCTION CAPABILITIES",
    coreCapabilitiesList: "Multicam Production / Live Switching / IMAG / Live Streaming / ISO Recording / Flypack Systems",
    systemsKicker: "EQUIPMENT & SYSTEMS",
    systemsTitle: "Production systems ready for real venues",
    systemFx6Title: "Sony FX6 Flypack",
    systemFx6Text: "A flexible camera package for concerts, conferences, interviews, IMAG and livestream coverage where mobility and image quality both matter.",
    systemFx6Meta: "Best for: Concerts / Conferences / Livestream",
    systemEfpTitle: "Panasonic EFP Flypack",
    systemEfpText: "A broadcast-style EFP system for stage shows, long-lens coverage, multi-camera production and stable program output in larger venues.",
    systemEfpMeta: "Best for: Stage Shows / Long Lens / Program Feed",
    systemWorkflowTitle: "Switching & Delivery",
    systemWorkflowText: "Signal planning, director workflow, live switching, monitoring, streaming, recording and post-event material handoff in one production chain.",
    systemWorkflowMeta: "Includes: IMAG / Streaming / ISO Recording",
    casesKicker: "CASE STUDIES",
    casesTitle: "Case studies",
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
    caseDeyunsheTitle: "Deyunshe 30th Anniversary World Tour Vancouver",
    caseDeyunsheText: "Different stage, different rhythm, same live energy. We built a Sony FX6 multicam package and production workflow for the Vancouver stop.",
    caseDeyunsheMeta: "Services: Sony FX6 Package / Live Switching / Camera Support / Multicam Production",
    caseTypeLabel: "Type",
    caseLocationLabel: "Location",
    caseSystemLabel: "System",
    caseDeyunsheType: "Concert Tour",
    caseDeyunsheLocation: "Vancouver",
    caseDeyunsheSystem: "Sony FX6 Flypack",
    caseJeffTitle: "Jeff Chang World Tour Vancouver",
    caseJeffText: "Familiar melodies came alive in real time. We supported Jeff Chang “Our Story” World Tour Vancouver with live image delivery and on-site technical support.",
    caseJeffMeta: "Services: Live Switching / Equipment Rental / Technical Support",
    caseJeffType: "Concert Tour",
    caseJeffLocation: "Vancouver",
    caseJeffSystem: "Live Switching Package",
    caseX9Title: "X9 Cup Shooting Competition Live",
    caseX9Text: "From camera to stream, the competition needed one reliable production flow. We supported the full on-site path from capture to final live delivery.",
    caseX9Meta: "Services: Camera Crew / Live Switching / Graphics Packaging / Multi-platform Streaming / Technical Support",
    caseX9Type: "Competition Live",
    caseX9Location: "Vancouver",
    caseX9System: "Multicam Streaming",
    caseLamTitle: "Lam Fung Live Around The World Vancouver",
    caseLamText: "We provided multicam IMAG support for LF LIVE AROUND THE WORLD Vancouver, keeping stage detail and live rhythm clear across screen and program output.",
    caseLamMeta: "Services: Director & Camera Crew / Sony FX6 Multicam System / IMAG / Live Switching",
    caseLamType: "Concert / IMAG",
    caseLamLocation: "Vancouver",
    caseLamSystem: "Sony FX6 Multicam",
    caseDeerTitle: "The Legend of the Nine-Colored Deer",
    caseDeerText: "A cue, a cut, a moment. We supported the stage production at Queen Elizabeth Theatre with a clean multicam record and live switching workflow.",
    caseDeerMeta: "Services: Multicam Recording / Camera Crew / Live Switching Support",
    caseDeerType: "Stage Performance",
    caseDeerLocation: "Queen Elizabeth Theatre",
    caseDeerSystem: "Multicam Recording",
    caseRichieTitle: "Richie Jen QI JI World Tour Vancouver",
    caseRichieText: "Live events move fast, and broadcast has no second take. We delivered a stable, precise and cinematic concert production system for the Vancouver stop.",
    caseRichieMeta: "Services: Multicam Setup / IMAG System / Live Switching / On-site Crew",
    caseRichieType: "Concert / IMAG",
    caseRichieLocation: "Vancouver",
    caseRichieSystem: "IMAG Broadcast System",
    caseMoreTitle: "Additional Case Ready",
    caseMoreText: "This sixth case slot is ready for your next Instagram project, image set and production details.",
    caseMoreMeta: "Ready for next project",
    caseOpen: "View on Instagram",
    caseViewPhotos: "View photos",
    caseHidePhotos: "Hide photos",
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
    contactTitle: "Contact us",
    contactText:
      "Tell us your event type, date, city, venue, duration and delivery platform. We will reply with camera, crew, equipment and budget suggestions.",
    contactEmailLabel: "Email",
    contactPhoneLabel: "Phone",
    contactInstagramLabel: "Instagram",
    contactWhatsappLabel: "WhatsApp",
    contactWhatsappAction: "Message us",
    contactXhsLabel: "Xiaohongshu",
    contactXhsAction: "View profile",
    formName: "Name",
    formEmail: "Email",
    formPhone: "Phone / WhatsApp",
    formEvent: "Event Type",
    optionConcert: "Concert / Live Show",
    optionConference: "Corporate Gala / Banquet",
    optionFestival: "Launch / Conference",
    optionDance: "Music Festival",
    optionLaunch: "Competition / Tournament",
    optionField: "Evening Event / Stage Show",
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
let activeLanguageCode = DEFAULT_LANGUAGE;

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

function refreshCaseToggleLabels() {
  const dictionary = translations[activeLanguageCode] || translations[DEFAULT_LANGUAGE];
  document.querySelectorAll("[data-case-card]").forEach((card) => {
    const button = card.querySelector("[data-case-toggle]");
    const label = card.querySelector("[data-case-toggle-label]");
    if (!button || !label) return;

    const isOpen = button.getAttribute("aria-expanded") === "true";
    label.textContent = isOpen ? dictionary.caseHidePhotos : dictionary.caseViewPhotos;
  });
}

function setupCaseAccordions() {
  document.querySelectorAll("[data-case-card]").forEach((card) => {
    const button = card.querySelector("[data-case-toggle]");
    const panel = button ? document.getElementById(button.getAttribute("aria-controls")) : null;
    if (!button || !panel) return;

    function setOpen(isOpen) {
      button.setAttribute("aria-expanded", String(isOpen));
      card.classList.toggle("is-open", isOpen);
      panel.hidden = !isOpen;
      refreshCaseToggleLabels();
    }

    setOpen(false);
    button.addEventListener("click", () => {
      setOpen(button.getAttribute("aria-expanded") !== "true");
    });
  });
}

function setLanguage(language) {
  const activeLanguage = translations[language] ? language : DEFAULT_LANGUAGE;
  const dictionary = translations[activeLanguage];
  activeLanguageCode = activeLanguage;
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
  refreshCaseToggleLabels();
}

const languageToggle = document.querySelector("[data-lang-toggle]");
if (languageToggle) {
  languageToggle.addEventListener("click", () => {
    const currentLanguage = languageToggle.dataset.currentLanguage || readLanguagePreference() || DEFAULT_LANGUAGE;
    setLanguage(currentLanguage === "zh" ? "en" : "zh");
  });
}

setupCaseAccordions();
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
