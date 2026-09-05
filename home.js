const translations = {
  en: {
    documentTitle: "Ziyang Cheng - Homepage",
    skipLink: "Skip to content",
    wordmarkAria: "Ziyang Cheng, home",
    navLabel: "Primary navigation",
    navAbout: "About",
    navNews: "News",
    navPublications: "Publications",
    navAwards: "Awards",
    navContact: "Contact",
    introEyebrow: "Robotics · Machine Learning",
    pageName: "Ziyang Cheng",
    role: "Ph.D. Student in Electronic Information at Tsinghua University",
    bioCurrent:
      'I am a first-year Ph.D. student in the <a href="https://www.au.tsinghua.edu.cn/" target="_blank" rel="noopener">Department of Automation</a> at Tsinghua University, advised by <a href="https://scholar.google.com/citations?user=TN8uDQoAAAAJ&amp;hl=en" target="_blank" rel="noopener">Prof. Jiwen Lu</a>.',
    bioPrevious:
      "Before that, I completed my undergraduate studies at Tsinghua University (2022–2026), earning bachelor's degrees in Mathematics and Physics &amp; Mechanical Engineering.",
    researchIntro: "I work on robotics and machine learning. My <strong>current research focuses on</strong>:",
    researchOne:
      "<strong>Whole-Body Control for Legged Robots</strong>, studying coordinated whole-body behaviors for loco-manipulation.",
    researchTwo:
      "<strong>Humanoid Teleoperation</strong>, developing intuitive teleoperation systems that transfer human intent to humanoid robots.",
    researchThree:
      "<strong>Safe and Robust Robotics</strong>, addressing both physical and semantic safety for robots operating in complex environments.",
    profileLinksLabel: "Profile links",
    email: "Email",
    scholar: "Google Scholar",
    profileAlt: "Ziyang Cheng at Tsinghua University",
    newsEyebrow: "Updates",
    newsTitle: "News",
    newsDate: "Aug 20, 2026",
    newsItem:
      'Released the technical report for <a href="https://arxiv.org/abs/2608.18234" target="_blank" rel="noopener">GigaBrain-WBC-0.5: A Behavior World Model for Robust Whole-Body Control with Environment Interaction</a>.',
    publicationsEyebrow: "Selected work",
    publicationsTitle: "Publications",
    paperOneAria: "Open the GigaBrain-WBC-0.5 paper",
    paperTwoAria: "Open the CMP paper",
    paperThreeAria: "Open the F2F-AP paper",
    paperFourAria: "Open the adaptive grasping force tracking paper",
    paperOneAlt: "Overview of the GigaBrain-WBC behavior world model and robot demonstrations",
    paperTwoAlt: "Robot demonstrations and competence manifold projection overview for CMP",
    paperThreeAlt: "F2F-AP real-time dynamic manipulation demonstrations",
    paperFourAlt: "Adaptive grasping force tracking control diagram and experimental platform",
    paperOneDescription:
      "We present GigaBrain-WBC-0.5, a behavior world model for humanoid whole-body control. It predicts actions, states, and behavior commands to support environment interaction, reject implausible commands, recover from falls, and withstand disturbances.",
    paperTwoDescription:
      "We propose CMP, a competence manifold projection method for robust whole-body tracking in loco-manipulation. It projects unsafe or out-of-distribution commands onto learned competence boundaries, improving survival by up to tenfold with limited tracking degradation.",
    paperThreeDescription:
      "We propose F2F-AP, a flow-to-future asynchronous policy for real-time dynamic manipulation. It predicts object flow to synthesize future observations and aligns visual features with future states, allowing policies to compensate for latency and interact with moving objects.",
    paperFourDescription:
      "We introduce generalized stiffness for nonlinear, time-varying grasp systems and estimate it online with an LSTM. The resulting adaptive PI strategy tracks grasp force accurately across unknown object behaviors, improving robotic grasping in unstructured environments.",
    authorNotes: "* Equal contribution, <sup>†</sup> Project leader, <sup>#</sup> Corresponding author.",
    technicalReport: "Technical Report",
    preprint: "Preprint",
    journal: "Journal",
    paper: "Paper",
    webpage: "Webpage",
    projectPage: "Project Page",
    code: "Code",
    awardsEyebrow: "Recognition",
    awardsTitle: "Grants, Honors & Awards",
    honorsPrograms: "Honors & Grants",
    competitionAwards: "Competitions",
    awardNational: "National Scholarship, China",
    awardInnovation: "Scientific and Technological Innovation Excellence Scholarship, Tsinghua University",
    awardComprehensive: "Comprehensive Excellence Scholarship, Tsinghua University",
    awardQiyan: "Undergraduate Qiyan Research Program, Beijing Natural Science Foundation",
    cohort18: "18th",
    awardSpark: "Selected Participant, Spark Scientific and Technological Innovation Fellowship, Tsinghua University",
    firstPrize: "First Prize",
    awardPhysics: "39th National Undergraduate Physics Competition",
    awardSrt: "2024 Student Research Training Program Outstanding Project",
    thirdSecond: "3rd Place & Second Prize",
    awardChallenge: "42nd Tsinghua University Challenge Cup Competition (First Author)",
    contactEyebrow: "Get in touch",
    contactTitle: "Let's talk about robots!",
    lastUpdated: "Last updated: Sep 5, 2026",
    switchLabel: "Switch to Chinese",
    switchText: "中文",
  },
  zh: {
    documentTitle: "程子扬｜个人主页",
    skipLink: "跳转到正文",
    wordmarkAria: "程子扬主页",
    navLabel: "页面导航",
    navAbout: "简介",
    navNews: "动态",
    navPublications: "论文",
    navAwards: "荣誉",
    navContact: "联系",
    introEyebrow: "机器人 · 机器学习",
    pageName: "程子扬",
    role: "清华大学自动化系电子信息专业直博生",
    bioCurrent:
      '现为清华大学<a href="https://www.au.tsinghua.edu.cn/" target="_blank" rel="noopener">自动化系</a>一年级直博生，师从<a href="https://scholar.google.com/citations?user=TN8uDQoAAAAJ&amp;hl=en" target="_blank" rel="noopener">鲁继文教授</a>。',
    bioPrevious:
      "本科就读于清华大学（2022—2026），获数理基础科学与机械工程双学士学位。",
    researchIntro: "我的研究聚焦于机器人学习与人形机器人控制，主要包括：",
    researchOne: "<strong>足式机器人全身控制</strong>：面向移动操作任务，研究全身协调策略与控制方法。",
    researchTwo: "<strong>人形机器人遥操作</strong>：探索自然、直观的遥操作方式，将操作者的意图准确转化为机器人动作。",
    researchThree: "<strong>机器人安全与鲁棒性</strong>：兼顾物理与语义层面的安全，提高机器人在复杂环境中的鲁棒性。",
    profileLinksLabel: "个人主页相关链接",
    email: "邮箱",
    scholar: "Google Scholar",
    profileAlt: "程子扬的个人照片",
    newsEyebrow: "近期动态",
    newsTitle: "动态",
    newsDate: "2026 年 8 月 20 日",
    newsItem:
      '技术报告 <a href="https://arxiv.org/abs/2608.18234" target="_blank" rel="noopener">GigaBrain-WBC-0.5: A Behavior World Model for Robust Whole-Body Control with Environment Interaction</a> 已发布。',
    publicationsEyebrow: "代表作",
    publicationsTitle: "论文",
    paperOneAria: "查看 GigaBrain-WBC-0.5 论文",
    paperTwoAria: "查看 CMP 论文",
    paperThreeAria: "查看 F2F-AP 论文",
    paperFourAria: "查看自适应抓取力跟踪论文",
    paperOneAlt: "GigaBrain-WBC 行为世界模型与机器人演示概览",
    paperTwoAlt: "CMP 机器人演示与能力流形投影方法概览",
    paperThreeAlt: "F2F-AP 实时动态操作演示",
    paperFourAlt: "自适应抓取力跟踪控制框图与实验平台",
    paperOneDescription:
      "我们提出 GigaBrain-WBC-0.5，一种用于人形机器人全身控制的行为世界模型。它联合预测动作、状态与行为指令，使机器人能够与环境交互、拒绝不可行指令、从跌倒中恢复并抵抗扰动。",
    paperTwoDescription:
      "我们提出 CMP，一种面向移动操作鲁棒全身跟踪的能力流形投影方法。它将不安全或分布外指令投影至已学习的能力边界，在仅带来有限跟踪性能损失的同时，将生存率最高提升十倍。",
    paperThreeDescription:
      "我们提出 F2F-AP，一种面向实时动态操作的流到未来异步策略。该方法预测物体运动流以合成未来观测，并将视觉特征与未来状态对齐，使策略能够补偿延迟并与运动物体交互。",
    paperFourDescription:
      "我们为非线性时变抓取系统引入广义刚度，并使用 LSTM 进行在线估计。由此得到的自适应 PI 策略可针对未知物体行为精确跟踪抓取力，提升机器人在非结构化环境中的抓取能力。",
    authorNotes: "* 同等贡献，<sup>†</sup> 项目负责人，<sup>#</sup> 通讯作者。",
    technicalReport: "技术报告",
    preprint: "预印本",
    journal: "期刊",
    paper: "论文",
    webpage: "项目主页",
    projectPage: "项目主页",
    code: "代码",
    awardsEyebrow: "荣誉与资助",
    awardsTitle: "科研资助与荣誉",
    honorsPrograms: "奖励资助",
    competitionAwards: "竞赛",
    awardNational: "国家奖学金",
    awardInnovation: "清华大学科技创新优秀奖学金",
    awardComprehensive: "清华大学综合优秀奖学金",
    awardQiyan: "北京市自然科学基金本科生“启研”计划（“北自然”）",
    cohort18: "第十八期",
    awardSpark: "清华大学“科技创新，星火燎原”学生创新人才培养计划（“星火计划”）",
    firstPrize: "一等奖",
    awardPhysics: "第三十九届全国部分地区大学生物理竞赛",
    awardSrt: "2024 年大学生研究训练计划（SRT）优秀项目",
    thirdSecond: "二等奖 · 第三名",
    awardChallenge: "清华大学第四十二届“挑战杯”学生课外学术科技作品竞赛（第一作者）",
    contactEyebrow: "联系我",
    contactTitle: "欢迎与我聊机器人！",
    lastUpdated: "更新于 2026 年 9 月 5 日",
    switchLabel: "切换为英文",
    switchText: "EN",
  },
};

const header = document.querySelector(".site-header");
const languageToggle = document.querySelector(".language-toggle");
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

let currentLanguage = "en";

const applyLanguage = (language) => {
  const copy = translations[language];

  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.title = copy.documentTitle;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = copy[element.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    element.innerHTML = copy[element.dataset.i18nHtml];
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", copy[element.dataset.i18nAriaLabel]);
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    element.alt = copy[element.dataset.i18nAlt];
  });

  languageToggle.querySelector("span").textContent = copy.switchText;
  languageToggle.setAttribute("aria-label", copy.switchLabel);
  languageToggle.title = copy.switchLabel;
};

languageToggle.addEventListener("click", () => {
  currentLanguage = currentLanguage === "en" ? "zh" : "en";
  applyLanguage(currentLanguage);
});

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  { rootMargin: "-20% 0px -65%", threshold: [0, 0.25, 0.6] },
);

sections.forEach((section) => sectionObserver.observe(section));
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

applyLanguage(currentLanguage);

if (window.lucide) {
  window.lucide.createIcons({ attrs: { "aria-hidden": "true" } });
}
