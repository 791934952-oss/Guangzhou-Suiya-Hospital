const pageName = document.body.dataset.page || "";
const navLinks = document.querySelectorAll(".site-nav a");
const nav = document.querySelector(".site-nav");
const menuToggle = document.querySelector(".menu-toggle");

navLinks.forEach((link) => {
  if (link.dataset.page === pageName) {
    link.classList.add("active");
  }
});

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

document.querySelectorAll("[data-count]").forEach((el) => {
  const target = Number(el.dataset.count) || 0;
  let value = 0;
  const step = Math.max(1, Math.floor(target / 35));
  const timer = setInterval(() => {
    value += step;
    if (value >= target) {
      value = target;
      clearInterval(timer);
    }
    el.textContent = value;
  }, 22);
});

const form = document.querySelector("#appointmentForm");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const msg = document.querySelector(".success-msg");
    if (msg) {
      msg.style.display = "block";
    }
    form.reset();
  });
}

const articleDetail = document.querySelector("#articleDetail");
if (articleDetail) {
  const articles = {
    anxiety: {
      title: "焦虑管理：从识别身体信号开始",
      date: "2026-04-10",
      content:
        "焦虑常表现为心慌、注意力下降和过度担忧。建议先记录触发场景，并通过规律呼吸训练、固定作息和逐步暴露法降低回避行为。如果焦虑持续超过两周并影响学习、工作或睡眠，应尽早到精神心理专科进行系统评估。"
    },
    sleep: {
      title: "睡眠改善策略：建立稳定生物钟",
      date: "2026-04-02",
      content:
        "睡眠障碍与情绪问题互相影响。建议固定起床时间、减少午后咖啡因、睡前一小时停止高刺激信息输入，并建立放松仪式。如果长期入睡困难、频繁早醒或白天功能明显下降，可结合医生指导进行睡眠行为干预。"
    },
    depression: {
      title: "抑郁识别与支持：及时求助很重要",
      date: "2026-03-24",
      content:
        "抑郁并非单纯“心情不好”，常伴随兴趣下降、疲乏、睡眠与食欲改变。家庭支持与专业治疗同样关键。建议尽早评估症状严重度，制定药物、心理治疗和生活方式管理的综合方案。规范诊疗有助于恢复社会功能和生活质量。"
    }
  };

  const params = new URLSearchParams(window.location.search);
  const key = params.get("id") || "anxiety";
  const article = articles[key] || articles.anxiety;

  articleDetail.innerHTML = `
    <h1>${article.title}</h1>
    <p class="article-date">发布时间：${article.date}</p>
    <p>${article.content}</p>
    <p>温馨提示：本文用于健康科普，不能替代个体化诊疗建议。如有持续不适，请及时到院就诊。</p>
    <a class="btn btn-secondary" href="articles.html">返回文章列表</a>
  `;
}
