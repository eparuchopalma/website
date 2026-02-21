let projects;
let centerProjectIndex = 0;

const titleContainerEl = document.getElementById('project-titles');
const imageContainerEl = document.getElementById('project-images');
const descriptionEl = document.getElementById('project-description');
const labels = document.getElementById('project-labels');
const links = document.getElementById('project-links');

async function setProjects() {
  await fetch('./projects.json')
    .then(response => response.json())
    .then(json => projects = json)

  for (let index in projects) {
    const indexMultiplier = index;

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

async function selectProject(i) {
  const selectedIndex = Number(i);
  focusTitle(selectedIndex);

  imageContainerEl.children[selectedIndex]
    .setAttribute('class', 'project-image project-image_slide-from-right');
  
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      imageContainerEl.children[selectedIndex]
        .setAttribute('style', `z-index: ${imageContainerEl.children.length};`);
      resolve();
    }, 500)
  });

  for (let index = 0; index < imageContainerEl.children.length; index++) {
    if (index === selectedIndex) continue;

    const element = imageContainerEl.children[index];
    const stackPosition = (index < selectedIndex) ? projects.length - (selectedIndex - index) : projects.length - (index - selectedIndex);
    const rotationAngle = (index - selectedIndex) * 5;
    const translationX = (index - selectedIndex) * 25;
    const timeOut = (index < selectedIndex) ? 400 : 100;

    element.setAttribute('class', 'project-image');

    new Promise((resolve, reject) => setTimeout(() => {
      element.setAttribute('style', `z-index: ${stackPosition}; transform: rotate(${rotationAngle}deg) translate(${translationX}px);`);
      resolve();
    }, timeOut));
  }
}

function focusTitle(index) {
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