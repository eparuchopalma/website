let projects;

const titleContainer = document.getElementById('title-container');
const imageContainer = document.getElementById('image-container');
const description = document.getElementById('project-description');
const labelContainer = document.getElementById('label-container');
const links = document.getElementById('link-container');

async function setProjects() {
  await getProjects();

  for (let index in projects) {
    setProjectTitle(index);
    setProjectImages(index);
  }

  styleProjectOnFocus(0);
  setProjectText(0);
}

function getProjects() {
  return fetch('./projects.json')
    .then(response => response.json())
    .then(json => projects = json)
}

function setProjectText(index) {
  labelContainer.setAttribute('class', 'label-container label-container_mt label-container_faded')
  description.setAttribute('class', 'paragraph paragraph_faded');
  setTimeout(() => {
    setLabels(index);
    description.textContent = projects[index].description;
    labelContainer.setAttribute('class', 'label-container label-container_mt');
    description.setAttribute('class', 'paragraph');
  }, 200);
}

function setLabels(index) {
  while (labelContainer.firstChild) {
    labelContainer.removeChild(labelContainer.firstChild);
  }
  for (const technology of projects[index].stack) {
    const label = document.createElement('span');
    label.appendChild(document.createTextNode(technology));
    label.setAttribute('class', 'label');
    labelContainer.appendChild(label);
  }
}

function setProjectTitle(index) {
  const titleElement = document.createElement('li');
  const titleText = document.createTextNode(projects[index].title);
  titleElement.appendChild(titleText);
  titleElement.setAttribute('class', 'project-title');
  titleElement.setAttribute('style', `transform: translateX(${index * 500}px);`);
  titleElement.addEventListener('click', () => selectProject(index));
  titleContainer.appendChild(titleElement);
}

function setProjectImages(index) {
  const projectImages = document.createElement('li');
  projectImages.setAttribute('class', 'project-image');
  projectImages.addEventListener('click', () => selectProject(index));

  const mobileImg = document.createElement('img');
  mobileImg.setAttribute('class', 'project-image__mobile');
  mobileImg.setAttribute('src', projects[index].mobileCover);

  const desktopImg = document.createElement('img');
  desktopImg.setAttribute('class', 'project-image__desktop');
  desktopImg.setAttribute('src', projects[index].desktopCover);

  projectImages.appendChild(desktopImg);
  projectImages.appendChild(mobileImg);
  imageContainer.appendChild(projectImages);

  projectImages.setAttribute('style', `transform: rotate(${index * 5}deg) translateX(${index * 25}px); z-index: ${projects.length - index};`);
}

function styleProjectOnFocus(index) {
  titleContainer
    .children[index].setAttribute('class', 'project-title project-title_selected');
  imageContainer.children[index]
    .setAttribute('class', 'project-image project-image_selected project-image_slide-from-right');
}

async function selectProject(i) {
  const selectedIndex = Number(i);

  focusTitle(selectedIndex);
  styleProjectOnFocus(selectedIndex);
  setProjectText(selectedIndex);

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      imageContainer.children[selectedIndex]
        .setAttribute('style', `z-index: ${imageContainer.children.length};`);
      resolve();
    }, 500)
  });

  for (let index = 0; index < imageContainer.children.length; index++) {
    if (index === selectedIndex) continue;

    const element = imageContainer.children[index];
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
  const titleElement = titleContainer.children[index];
  titleContainer.scrollTo({ left: index * 500, behavior: 'smooth' });
  titleElement.setAttribute('class', 'project-title project-title_selected');
  if (index > 0) titleContainer.children[Number(index) - 1].setAttribute('class', 'project-title');
  if (index + 1 < [projects.length]) titleContainer.children[Number(index) + 1].setAttribute('class', 'project-title');
}

setProjects();