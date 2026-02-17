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
  },
  {
    title: "Placeholder 4",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, quaerat blanditiis ipsam ducimus placeat sint, beatae consequuntur, nulla illum magni unde officiis. Provident alias corporis asperiores ea velit animi deserunt.",
    desktopCover: "assets/project-placeholder-4.png",
    mobileCover: "assets/luthen_mobile.png",
    stack: ["TypeScript", "Node.js", "Express.js", "PostgreSQL", "Redis"],
    links: {
      demo: '#',
      code: '#',
      design: '#'
    }
  },
  {
    title: "Placeholder 5",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, quaerat blanditiis ipsam ducimus placeat sint, beatae consequuntur, nulla illum magni unde officiis. Provident alias corporis asperiores ea velit animi deserunt.",
    desktopCover: "assets/project-placeholder-5.png",
    mobileCover: "assets/luthen_mobile.png",
    stack: ["TypeScript", "Node.js", "Express.js", "PostgreSQL", "Redis"],
    links: {
      demo: '#',
      code: '#',
      design: '#'
    }
  },
  {
    title: "Placeholder 6",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, quaerat blanditiis ipsam ducimus placeat sint, beatae consequuntur, nulla illum magni unde officiis. Provident alias corporis asperiores ea velit animi deserunt.",
    desktopCover: "assets/project-placeholder-6.png",
    mobileCover: "assets/luthen_mobile.png",
    stack: ["TypeScript", "Node.js", "Express.js", "PostgreSQL", "Sequelize"],
    links: {
      demo: '#',
      code: '#',
      design: '#'
    }
  },
  {
    title: "Placeholder 7",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, quaerat blanditiis ipsam ducimus placeat sint, beatae consequuntur, nulla illum magni unde officiis. Provident alias corporis asperiores ea velit animi deserunt.",
    desktopCover: "assets/project-placeholder-7.png",
    mobileCover: "assets/luthen_mobile.png",
    stack: ["TypeScript", "Node.js", "Express.js", "PostgreSQL", "Redis"],
    links: {
      demo: '#',
      code: '#',
      design: '#'
    }
  },
];

let centerProjectIndex = 2;
let coverOnLeft;
let coverOnRight;
let coverOnCenter;
let titleOnLeft;
let titleOnRight;
let titleOnCenter;

const titleContainerEl = document.getElementById('project-titles');
const imageContainerEl = document.getElementById('project-images');
const descriptionEl = document.getElementById('project-description');
const labels = document.getElementById('project-labels');
const links = document.getElementById('project-links');

function setProjects() {
  for (let index in projects) {
    const indexMultiplier = index == 0 ? 0 : index % 2 === 0 ? -index + 1 : index;

    const titleElement = document.createElement('li');
    titleElement.setAttribute('class', 'project-title');

    const title = document.createTextNode(projects[index].title);

    titleElement.appendChild(title);

    titleElement.setAttribute('style', `transform: translateX(${index * 500}px);`);

    titleElement.addEventListener('click', () => selectProject(index));

    titleContainerEl.appendChild(titleElement);
    
    const projectImages = document.createElement('li');
    projectImages.setAttribute('class', 'project-image');

    projectImages.addEventListener('click', () => {
      selectProject(index);
    });

    const mobileImg = document.createElement('img');
    mobileImg.setAttribute('class', 'project-image__mobile');
    mobileImg.setAttribute('src', projects[index].mobileCover);

    const desktopImg = document.createElement('img');
    desktopImg.setAttribute('class', 'project-image__desktop');
    desktopImg.setAttribute('src', projects[index].desktopCover);

    projectImages.appendChild(desktopImg);
    projectImages.appendChild(mobileImg);
    imageContainerEl.appendChild(projectImages);

    projectImages.setAttribute('style', `transform: rotate(${indexMultiplier * 5}deg) translateX(${indexMultiplier * 25}px); z-index: ${projects.length - index};`);
  }

  titleContainerEl.children[0].setAttribute('class', 'project-title project-title_selected');
  imageContainerEl.children[0].setAttribute('class', 'project-image project-image_selected');

  descriptionEl.textContent = projects[2].description;

  for (const technology of projects[centerProjectIndex].stack) {
    const label = document.createElement('span');
    label.appendChild(document.createTextNode(technology));
    label.setAttribute('class', 'label');
    labels.appendChild(label);
  }
}

async function selectProject(selected) {
  let counter = 0;
  let index = Number(selected);
  let indexMultiplier = 0;
  imageContainerEl.children[selected].setAttribute('class', 'project-image project-image_slide-from-right');
  focusTitle(Number(selected));
  do {
    const element = imageContainerEl.children[index];
    if (counter === 0) {
      await new Promise((resolve, reject) => setTimeout(() => {
        element.setAttribute('style', `z-index: ${projects.length};`);
        resolve();
      }, 500));
    } else {
      element.setAttribute('class', 'project-image');
      await new Promise((resolve, reject) => setTimeout(() => {
        element.setAttribute('style', `transform: rotate(${indexMultiplier * 5}deg) translateX(${indexMultiplier * 25}px); z-index: ${projects.length - counter};`);
        resolve();
      }, 50));
    }
    counter++;
    index = (index + 1 == projects.length) ? 0 : index + 1;
    indexMultiplier = counter % 2 === 0 ? -counter + 1 : counter;
  } while(counter < projects.length)
}

function focusTitle(index) {
  console.log(index);
  const titleElement = titleContainerEl.children[index];
  titleContainerEl.scrollTo({ left: index * 500, behavior: 'smooth' });
  titleElement.setAttribute('class', 'project-title project-title_selected');
  if (index > 0) titleContainerEl.children[Number(index) - 1].setAttribute('class', 'project-title');
  if (index + 1 < [projects.length]) titleContainerEl.children[Number(index) + 1].setAttribute('class', 'project-title');
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

  setLeftImages();
  setTimeout(() => {
    coverOnRight.setAttribute('class', 'project-image project-image_center');
    setListeners();
  }, 1000);  
}

function fadeText() {
  labels.setAttribute('class', 'label-container label-container_mt label-container_faded')
  descriptionEl.setAttribute('class', 'paragraph paragraph_faded');
  setTimeout(() => {
    setLabels();
    setDescription();
    labels.setAttribute('class', 'label-container label-container_mt');
    descriptionEl.setAttribute('class', 'paragraph');
  }, 200);
}

function setDescription() {
  descriptionEl.textContent = projects[centerProjectIndex].description;
}

function setLeftImages() {
  const previousIndex = centerProjectIndex == 0 ? projects.length - 1 : centerProjectIndex - 1;
  coverOnLeft.children[0].setAttribute('src', projects[previousIndex].desktopCover)
  coverOnLeft.children[1].setAttribute('src', projects[previousIndex].mobileCover)
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
// setListeners();
