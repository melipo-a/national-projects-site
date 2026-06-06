const OFFICIAL_LINKS = Object.freeze({
  decree309: "https://kremlin.ru/events/president/news/73986",
  governmentProjects: "https://government.ru/rugovclassifier/section/2641/",
  governmentBudget: "https://government.ru/news/53627/",
  officialPortal: "https://национальныепроекты.рф/",
  newProjects: "https://национальныепроекты.рф/new-projects/",
  wciom2024: "https://wciom.ru/analytical-reviews/analiticheskii-obzor/nacionalnye-proekty-2024",
  wciomMonitoring: "https://wciom.ru/analytical-reviews/analiticheskii-obzor/nacionalnye-proekty-monitoring-2",
  budget: "https://budget.gov.ru/",
  minfinExecution: "https://minfin.gov.ru/ru/press-center/?id_4=40228-ispolnenie_raskhodov_federalnogo_byudzheta_na_realizatsiyu_natsionalnykh_proektov"
});

document.addEventListener("DOMContentLoaded", () => {
  setupImageFallbacks();
  setupHomeQuiz();
  setupSystemLevels();
  setupProjectMap();
  setupLifeRoute();
  setupHumanQuiz();
  setupEconomyLayers();
  setupRegionSelect();
  setupSourceFilter();
  setupFactPassport();
});

function setupImageFallbacks() {
  document.querySelectorAll(".media-img[data-file]").forEach((image) => {
    const hideBrokenImage = () => image.removeAttribute("src");
    image.addEventListener("error", hideBrokenImage);
    if (image.complete && image.naturalWidth === 0) hideBrokenImage();
  });
}

function setupHomeQuiz() {
  const root = document.querySelector("[data-home-quiz]");
  if (!root) return;

  const data = {
    system: {
      title: "Начните со страницы “Система”",
      text: "Там показано, как цели переходят в проекты, меры, регионы и результаты.",
      href: "pages/system.html"
    },
    projects: {
      title: "Откройте карту проектов",
      text: "Фильтры помогут увидеть проекты по четырем смысловым контурам.",
      href: "pages/projects.html"
    },
    human: {
      title: "Посмотрите маршрут жизни",
      text: "Раздел показывает проекты через семью, учебу, профессию, здоровье и город.",
      href: "pages/human.html"
    },
    regions: {
      title: "Перейдите к регионам и экономике",
      text: "Там видны связи транспорта, бизнеса, технологий, туризма и экологии.",
      href: "pages/economy-regions.html"
    },
    data: {
      title: "Откройте данные и источники",
      text: "Раздел показывает, где проверять цифры, документы и научную базу.",
      href: "pages/data-sources.html"
    }
  };

  const buttons = Array.from(root.querySelectorAll("[data-quiz-target]"));
  const title = root.querySelector("[data-quiz-title]");
  const text = root.querySelector("[data-quiz-text]");
  const link = root.querySelector("[data-quiz-link]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const item = data[button.dataset.quizTarget];
      if (!item) return;
      buttons.forEach((node) => node.classList.toggle("is-active", node === button));
      title.textContent = item.title;
      text.textContent = item.text;
      link.href = item.href;
    });
  });
}

function setupSystemLevels() {
  const root = document.querySelector("[data-system-levels]");
  if (!root) return;

  const buttons = Array.from(root.querySelectorAll("[data-level]"));
  const title = root.querySelector("[data-level-title]");
  const text = root.querySelector("[data-level-text]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((node) => node.classList.toggle("is-active", node === button));
      title.textContent = button.dataset.title || "";
      text.textContent = button.dataset.text || "";
    });
  });
}

function setupProjectMap() {
  const root = document.querySelector("[data-project-map]");
  if (!root) return;

  const filterButtons = Array.from(root.querySelectorAll("[data-project-filter]"));
  const points = Array.from(root.querySelectorAll("[data-map-contour]"));
  const cards = Array.from(document.querySelectorAll("[data-project-contour]"));
  const title = root.querySelector("[data-project-title]");
  const region = root.querySelector("[data-project-region]");
  const direction = root.querySelector("[data-project-direction]");
  const effect = root.querySelector("[data-project-effect]");
  const source = root.querySelector("[data-project-source]");
  const national = root.querySelector("[data-project-national]");
  const result = root.querySelector("[data-project-result]");
  const image = root.querySelector("[data-project-image]");
  const link = root.querySelector("[data-project-link]");
  const moreButton = root.querySelector("[data-project-more-button]");
  const more = root.querySelector("[data-project-more]");
  const count = root.querySelector("[data-project-count]");
  const status = root.querySelector("[data-project-status]");

  const filterLabels = {
    all: "Все региональные примеры и карточки направлений",
    human: "Показаны примеры и карточки про человека: семья, образование, здоровье, кадры",
    regions: "Показаны среда и регионы: транспорт, инфраструктура, экология, туризм",
    economy: "Показана экономика: производство, бизнес, экспорт и данные",
    tech: "Показаны технологии: данные, новые отрасли и технологическое лидерство"
  };

  const activatePoint = (point) => {
    points.forEach((node) => node.classList.toggle("is-active", node === point));
    title.textContent = point.dataset.mapTitle || "";
    region.textContent = point.dataset.mapRegion || "";
    direction.textContent = point.dataset.mapDirection || "";
    effect.textContent = point.dataset.mapEffect || "";
    source.textContent = point.dataset.mapSource || "";
    if (national) national.textContent = point.dataset.mapNational || "";
    if (result) result.textContent = point.dataset.mapResult || "";
    if (image && point.dataset.mapImage) {
      image.src = point.dataset.mapImage;
      image.dataset.file = point.dataset.mapImage;
    }
    if (link && point.dataset.mapLink) link.href = point.dataset.mapLink;
    if (more) {
      more.textContent = point.dataset.mapDetail || "";
      more.hidden = true;
    }
    if (moreButton) moreButton.textContent = "Подробнее";
  };

  const applyFilter = (filter) => {
    points.forEach((point) => {
      const show = filter === "all" || point.dataset.mapContour === filter;
      point.classList.toggle("hidden", !show);
    });
    cards.forEach((card) => {
      const show = filter === "all" || card.dataset.projectContour === filter;
      card.classList.toggle("hidden", !show);
    });
    const visiblePoints = points.filter((point) => !point.classList.contains("hidden"));
    const visibleCards = cards.filter((card) => !card.classList.contains("hidden"));
    if (count) count.textContent = String(visiblePoints.length);
    if (status) status.textContent = `${filterLabels[filter] || filterLabels.all}. Карточек: ${visibleCards.length}.`;
    const firstVisible = points.find((point) => !point.classList.contains("hidden"));
    if (firstVisible) activatePoint(firstVisible);
  };

  points.forEach((point) => {
    point.addEventListener("click", () => activatePoint(point));
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((node) => node.classList.toggle("is-active", node === button));
      applyFilter(button.dataset.projectFilter);
    });
  });

  if (moreButton && more) {
    moreButton.addEventListener("click", () => {
      more.hidden = !more.hidden;
      moreButton.textContent = more.hidden ? "Подробнее" : "Свернуть";
    });
  }

  applyFilter("human");
}

function setupLifeRoute() {
  const root = document.querySelector("[data-life-route]");
  if (!root) return;

  const buttons = Array.from(root.querySelectorAll("[data-life-title]"));
  const image = root.querySelector("[data-life-image-output]");
  const heading = root.querySelector("[data-life-heading]");
  const copy = root.querySelector("[data-life-copy]");
  const projects = root.querySelector("[data-life-projects-output]");
  const verify = root.querySelector("[data-life-verify-output]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((node) => node.classList.toggle("is-active", node === button));
      heading.textContent = button.dataset.lifeTitle || "";
      copy.textContent = button.dataset.lifeText || "";
      projects.textContent = button.dataset.lifeProjects || "";
      if (verify) verify.textContent = button.dataset.lifeVerify || "";
      if (image && button.dataset.lifeImage) {
        image.src = button.dataset.lifeImage;
        image.dataset.file = button.dataset.lifeImage;
      }
    });
  });
}

function setupHumanQuiz() {
  const root = document.querySelector("[data-human-quiz]");
  if (!root) return;

  const data = {
    family: {
      title: "Семья и поддержка",
      projects: "Семья; Молодёжь и дети",
      notice: "меры поддержки семей, инфраструктуру для детей, образовательные возможности.",
      verify: "официальный портал нацпроектов и материалы Правительства РФ.",
      href: "data-sources.html"
    },
    education: {
      title: "Образование",
      projects: "Молодёжь и дети; Кадры",
      notice: "образовательную инфраструктуру, наставничество, маршруты от учебы к профессии.",
      verify: "официальный портал, Правительство РФ и профильные ведомства.",
      href: "data-sources.html"
    },
    career: {
      title: "Профессия и навыки",
      projects: "Кадры; Эффективная и конкурентная экономика",
      notice: "переобучение, занятость, связь навыков с рынком труда.",
      verify: "карточки проектов, материалы Правительства РФ и бюджетные источники.",
      href: "data-sources.html"
    },
    health: {
      title: "Здоровье",
      projects: "Продолжительная и активная жизнь; Новые технологии сбережения здоровья",
      notice: "профилактику, диспансеризацию, первичную помощь и медицинские технологии.",
      verify: "официальный портал и материалы Правительства РФ.",
      href: "data-sources.html"
    },
    city: {
      title: "Комфортный город",
      projects: "Инфраструктура для жизни; Эффективная транспортная система",
      notice: "дворы, общественные пространства, маршруты, дороги и транспорт.",
      verify: "официальные карточки проектов, региональные материалы и бюджетные данные.",
      href: "data-sources.html"
    },
    senior: {
      title: "Старшее поколение",
      projects: "Семья; Продолжительная и активная жизнь",
      notice: "активное долголетие, профилактику и связь поколений.",
      verify: "паспорт факта 78/81, Указ № 309 и официальный портал.",
      href: "data-sources.html"
    }
  };

  const buttons = Array.from(root.querySelectorAll("[data-human-target]"));
  const title = root.querySelector("[data-human-quiz-title]");
  const text = root.querySelector("[data-human-quiz-text]");
  const projects = root.querySelector("[data-human-quiz-projects]");
  const verify = root.querySelector("[data-human-quiz-verify]");
  const link = root.querySelector("[data-human-quiz-link]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const item = data[button.dataset.humanTarget];
      if (!item) return;
      buttons.forEach((node) => node.classList.toggle("is-active", node === button));
      title.textContent = item.title;
      text.textContent = item.notice;
      if (projects) projects.textContent = item.projects;
      if (verify) verify.textContent = item.verify;
      if (link) link.href = item.href;
    });
  });
}

function setupEconomyLayers() {
  const root = document.querySelector("[data-economy-layers]");
  if (!root) return;

  const data = {
    regions: {
      label: "Регионы",
      title: "Территории и качество жизни",
      text: "Развитие региона видно через среду, услуги, дороги, туризм и рабочие места.",
      image: "../assets/images/russia-map-interface.jpg",
      tags: ["инфраструктура", "туризм", "среда"]
    },
    transport: {
      label: "Транспорт",
      title: "Связность страны",
      text: "Транспорт соединяет людей, рынки, туризм и региональные возможности.",
      image: "../assets/images/transport-train.jpg",
      tags: ["дороги", "логистика", "140 тыс. км"]
    },
    economy: {
      label: "Экономика",
      title: "Бизнес и производство",
      text: "Предпринимательство, экспорт и производительность связывают проекты с рабочими местами.",
      image: "../assets/images/machine-tools-factory.jpg",
      tags: ["производство", "экспорт", "оборудование"]
    },
    tech: {
      label: "Технологии",
      title: "Технологический суверенитет",
      text: "Роботизация, данные, материалы и новые рынки создают основу будущих результатов.",
      image: "../assets/images/space-technology.jpg",
      tags: ["роботизация", "данные", "новые отрасли"]
    },
    ecology: {
      label: "Экология",
      title: "Среда и природные ресурсы",
      text: "Экология связана с качеством жизни, туризмом и ответственным развитием территорий.",
      image: "../assets/images/ecology-recycling.jpg",
      tags: ["экология", "переработка", "туризм"]
    }
  };

  const buttons = Array.from(root.querySelectorAll("[data-economy-layer]"));
  const label = root.querySelector("[data-layer-label]");
  const title = root.querySelector("[data-layer-title]");
  const text = root.querySelector("[data-layer-text]");
  const image = root.querySelector("[data-layer-image]");
  const tags = root.querySelector("[data-layer-tags]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const item = data[button.dataset.economyLayer];
      if (!item) return;
      buttons.forEach((node) => node.classList.toggle("is-active", node === button));
      label.textContent = item.label;
      title.textContent = item.title;
      text.textContent = item.text;
      image.src = item.image;
      image.dataset.file = item.image;
      tags.innerHTML = item.tags.map((tag) => `<span>${tag}</span>`).join("");
    });
  });
}

function setupRegionSelect() {
  const select = document.querySelector("[data-region-select]");
  if (!select) return;

  const data = {
    spb: ["Городская среда и транспорт", "Инфраструктура для жизни", "Маршруты, общественные пространства, связность"],
    tatarstan: ["Образование и экономика", "Молодёжь и дети; экономика", "Школы, кадры, технологические отрасли"],
    krasnodar: ["Агросектор и туризм", "Экономика; туризм", "Производство, маршруты, сервисы"],
    novosibirsk: ["Технологии и данные", "Экономика данных", "Кадры, сервисы, цифровые решения"],
    krasnoyarsk: ["Инфраструктура и промышленность", "Инфраструктура для жизни", "Связность, производство, городские проекты"],
    fareast: ["Транспортная связность", "Эффективная транспортная система", "Доступность территорий и логистика"]
  };

  const direction = document.querySelector("[data-region-direction]");
  const project = document.querySelector("[data-region-project]");
  const effect = document.querySelector("[data-region-effect]");

  select.addEventListener("change", () => {
    const item = data[select.value];
    if (!item) return;
    direction.textContent = item[0];
    project.textContent = item[1];
    effect.textContent = item[2];
  });
}

function setupSourceFilter() {
  const buttons = Array.from(document.querySelectorAll("[data-source-filter]"));
  const cards = Array.from(document.querySelectorAll("[data-source-type]"));
  if (!buttons.length || !cards.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.sourceFilter;
      buttons.forEach((node) => node.classList.toggle("is-active", node === button));
      cards.forEach((card) => {
        const show = filter === "all" || card.dataset.sourceType === filter;
        card.classList.toggle("hidden", !show);
      });
    });
  });
}

function setupFactPassport() {
  const root = document.querySelector("[data-facts]");
  if (!root) return;

  const buttons = Array.from(root.querySelectorAll("[data-fact]"));
  const title = root.querySelector("[data-fact-heading]");
  const meaning = root.querySelector("[data-fact-meaning-output]");
  const source = root.querySelector("[data-fact-source-output]");
  const type = root.querySelector("[data-fact-type-output]");
  const use = root.querySelector("[data-fact-use-output]");
  const note = root.querySelector("[data-fact-note-output]");
  const link = root.querySelector("[data-fact-link]");
  const extraLink = root.querySelector("[data-fact-extra-link]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((node) => node.classList.toggle("is-active", node === button));
      title.textContent = button.dataset.factTitle || "";
      if (meaning) meaning.textContent = button.dataset.factMeaning || "";
      source.textContent = button.dataset.factSource || "";
      if (type) type.textContent = button.dataset.factType || "";
      use.textContent = button.dataset.factUse || "";
      if (note) note.textContent = button.dataset.factNote || "";
      if (link) {
        const url = button.dataset.factUrl || "";
        link.hidden = !url;
        link.href = url || "#";
        link.textContent = button.dataset.factLinkLabel || "Открыть источник";
      }
      if (extraLink) {
        const extraUrl = button.dataset.factExtraUrl || "";
        extraLink.hidden = !extraUrl;
        extraLink.href = extraUrl || "#";
        extraLink.textContent = button.dataset.factExtraLabel || "Дополнительный источник";
      }
    });
  });
}
