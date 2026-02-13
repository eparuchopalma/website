const projects = [
  {
    title: "Luthen",
    description: "A financial log web application. Save records, create funds, check your stats.",
    desktopCover: "assets/luthen_desktop.png",
    mobileCover: "assets/luthen_mobile.png",
    stack: ["TypeScript", "Vue.js", "Node.js", "Express.js", "PostgreSQL", "Sequelize"],
    links: {
      demo: '#',
      code: '#',
      design: '#'
    }
  },
  {
    title: "Placeholder 1",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, quaerat blanditiis ipsam ducimus placeat sint, beatae consequuntur, nulla illum magni unde officiis. Provident alias corporis asperiores ea velit animi deserunt.",
    desktopCover: "assets/project-placeholder-1.png",
    mobileCover: "assets/luthen_mobile.png",
    stack: ["TypeScript", "Vue.js"],
    links: {
      demo: '#',
      code: '#',
      design: '#'
    }
  },
  {
    title: "Placeholder 2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, quaerat blanditiis ipsam ducimus placeat sint, beatae consequuntur, nulla illum magni unde officiis. Provident alias corporis asperiores ea velit animi deserunt.",
    desktopCover: "assets/project-placeholder-2.png",
    mobileCover: "assets/luthen_mobile.png",
    stack: ["TypeScript", "Node.js", "Express.js", "PostgreSQL", "Sequelize"],
    links: {
      demo: '#',
      code: '#',
      design: '#'
    }
  },
  {
    title: "Placeholder 3",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, quaerat blanditiis ipsam ducimus placeat sint, beatae consequuntur, nulla illum magni unde officiis. Provident alias corporis asperiores ea velit animi deserunt.",
    desktopCover: "assets/project-placeholder-3.png",
    mobileCover: "assets/luthen_mobile.png",
    stack: ["TypeScript", "Node.js", "Express.js", "PostgreSQL", "Redis"],
    links: {
      demo: '#',
      code: '#',
      design: '#'
    }
  }
];

let centerProjectIndex = 0;
let coverOnLeft;
let coverOnRight;
let coverOnCenter;
let titleOnLeft;
let titleOnRight;
let titleOnCenter;

const titles = document.getElementById('project-titles').children;
const images = document.getElementsByClassName('project-image');
const description = document.getElementById('project-description');
const labels = document.getElementById('project-labels');
const links = document.getElementById('project-links');

function setProjects() {
  for (let index = 0; index < 3; index++) {
    titles[index].textContent = projects[index].title;

    const mobileImg = document.createElement('img');
    mobileImg.setAttribute('class', 'project-image__mobile');
    mobileImg.setAttribute('src', projects[index].mobileCover);

    const desktopImg = document.createElement('img');
    desktopImg.setAttribute('class', 'project-image__desktop');
    desktopImg.setAttribute('src', projects[index].desktopCover);

    images[index].appendChild(desktopImg);
    images[index].appendChild(mobileImg);
  }

  for (const technology of projects[centerProjectIndex].stack) {
    const label = document.createElement('span');
    label.appendChild(document.createTextNode(technology));
    label.setAttribute('class', 'label');
    labels.appendChild(label);
  }
}

function findCovers() {
  coverOnLeft = document.querySelector('.project-image_left');
  coverOnRight = document.querySelector('.project-image_right');
  coverOnCenter = document.querySelector('.project-image_center');
}

function findTitles() {
  titleOnLeft = document.querySelector('.project-title_left');
  titleOnRight = document.querySelector('.project-title_right');
  titleOnCenter = document.querySelector('.project-title_center');
}

function setListeners() {
  findCovers();
  findTitles();
  coverOnLeft.addEventListener('click', previousProject);
  titleOnLeft.addEventListener('click', previousProject);
  coverOnRight.addEventListener('click', nextProject);
  titleOnRight.addEventListener('click', nextProject);
}

function removeListeners() {
  findCovers();
  findTitles();
  coverOnLeft.removeEventListener('click', previousProject);
  coverOnRight.removeEventListener('click', nextProject);
  titleOnLeft.removeEventListener('click', previousProject);
  titleOnRight.removeEventListener('click', nextProject);
}

function previousProject() {
  if (centerProjectIndex > 0) centerProjectIndex--;
  else centerProjectIndex = projects.length - 1;
  fadeText();
  removeListeners();
  coverOnLeft.setAttribute('class', 'project-image project-image_slide-from-left');
  coverOnCenter.setAttribute('class', 'project-image project-image_right');
  coverOnRight.setAttribute('class', 'project-image project-image_left');
  titleOnLeft.setAttribute('class', 'project-title project-title_center');
  titleOnCenter.setAttribute('class', 'project-title project-title_right');
  titleOnRight.setAttribute('class', 'project-title project-title_left');

  setTimeout(() => {
    coverOnLeft.setAttribute('class', 'project-image project-image_center');
    setListeners();
  }, 1000);
}

function nextProject() {
  if (centerProjectIndex === projects.length - 1) centerProjectIndex = 0;
  else centerProjectIndex++;
  fadeText();
  removeListeners();
  coverOnRight.setAttribute('class', 'project-image project-image_slide-from-right');
  coverOnCenter.setAttribute('class', 'project-image project-image_left');
  coverOnLeft.setAttribute('class', 'project-image project-image_right');
  titleOnLeft.setAttribute('class', 'project-title project-title_right');
  titleOnCenter.setAttribute('class', 'project-title project-title_left');
  titleOnRight.setAttribute('class', 'project-title project-title_center');

  setTimeout(() => {
    coverOnRight.setAttribute('class', 'project-image project-image_center');
    setListeners();
  }, 1000);  
}

function fadeText() {
  labels.setAttribute('class', 'label-container label-container_mt label-container_faded')
  description.setAttribute('class', 'paragraph paragraph_faded');
  setTimeout(() => {
    setLabels();
    setDescription();
    labels.setAttribute('class', 'label-container label-container_mt');
    description.setAttribute('class', 'paragraph');
  }, 200);
}

function setDescription() {
  description.textContent = projects[centerProjectIndex].description;
}

function setLabels() {
  while (labels.firstChild) {
    labels.removeChild(labels.firstChild);
  }
  for (const technology of projects[centerProjectIndex].stack) {
    const label = document.createElement('span');
    label.appendChild(document.createTextNode(technology));
    label.setAttribute('class', 'label');
    labels.appendChild(label);
  }
}

setProjects();
setListeners();
