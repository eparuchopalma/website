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
  }
];

let coverOnLeft;
let coverOnRight;
let coverOnCenter;
let titleOnLeft;
let titleOnRight;
let titleOnCenter;
const labels = document.getElementById('project-labels');
const description = document.getElementById('project-description');
const links = document.getElementById('project-links');

function setProjects() {
  const projectTitles = document.getElementById('project-titles').children;
  const desktopCovers = document.getElementsByClassName('project-cover__desktop');
  const mobileCovers = document.getElementsByClassName('project-cover__mobile');
  for (const index in projects) {
    projectTitles[index].textContent = projects[index].title;
    desktopCovers[index].children[0].setAttribute('src', projects[index].desktopCover);
    mobileCovers[index].children[0].setAttribute('src', projects[index].mobileCover);
  }
  for (const technology of projects[0].stack) {
    const label = document.createElement('span');
    label.appendChild(document.createTextNode(technology));
    label.setAttribute('class', 'label');
    labels.appendChild(label);
  }
}

function findCovers() {
  coverOnLeft = document.querySelector('.project-cover_left');
  coverOnRight = document.querySelector('.project-cover_right');
  coverOnCenter = document.querySelector('.project-cover_center');
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
  coverOnRight.addEventListener('click', nextProject);
  titleOnLeft.addEventListener('click', nextProject);
  titleOnRight.addEventListener('click', previousProject);
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
  fadeText();
  removeListeners();
  coverOnLeft.setAttribute('class', 'project-cover project-cover_center');
  coverOnCenter.setAttribute('class', 'project-cover project-cover_right');
  coverOnRight.setAttribute('class', 'project-cover project-cover_left');
  coverOnCenter.addEventListener('click', nextProject);
  coverOnRight.addEventListener('click', previousProject);
  titleOnLeft.setAttribute('class', 'project-title project-title_center');
  titleOnCenter.setAttribute('class', 'project-title project-title_right');
  titleOnRight.setAttribute('class', 'project-title project-title_left');
  titleOnCenter.addEventListener('click', nextProject);
  titleOnRight.addEventListener('click', previousProject);
}

function nextProject() {
  fadeText();
  removeListeners();
  coverOnLeft.setAttribute('class', 'project-cover project-cover_right');
  coverOnCenter.setAttribute('class', 'project-cover project-cover_left');
  coverOnRight.setAttribute('class', 'project-cover project-cover_center');
  coverOnCenter.addEventListener('click', previousProject);
  coverOnLeft.addEventListener('click', nextProject);
  titleOnLeft.setAttribute('class', 'project-title project-title_right');
  titleOnCenter.setAttribute('class', 'project-title project-title_left');
  titleOnRight.setAttribute('class', 'project-title project-title_center');
  titleOnCenter.addEventListener('click', previousProject);
  titleOnLeft.addEventListener('click', nextProject);
}

function fadeText() {
  labels.setAttribute('class', 'label-container label-container_mt label-container_faded')
  description.setAttribute('class', 'paragraph paragraph_faded');
  setTimeout(() => {
    labels.setAttribute('class', 'label-container label-container_mt');
    description.setAttribute('class', 'paragraph');
  }, 200);
}

function setDescription(projectIndex) {
  description.textContent = projects[projectIndex].description;
}

function setLabels(projectIndex) {
  while (labels.firstChild) {
    labels.removeChild(element.firstChild);
  }
  for (const technology of projects[projectIndex].stack) {
    const label = document.createElement('span');
    label.appendChild(document.createTextNode(technology));
    label.setAttribute('class', 'label');
    labels.appendChild(label);
  }
}

setProjects();
setListeners();
