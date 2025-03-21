import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import axios from 'axios';
import ClipboardJS from 'clipboard';
import iro from '@jaames/iro';

const creativitySlider = document.querySelector('#creativity-slider');
document.querySelector('#creativity-slider').value = 8;
let creativityValue = 0.8;

const getPaletteButton = document.querySelector('.generate-btn');
const paletteContainer = document.querySelector('.container');
const saveButton = document.querySelector('.save-button');
const copyBootstrapButton = document.querySelector('.copy-bootstrap-btn');

let bsClipboard = new ClipboardJS('.copy-bootstrap-btn');
bsClipboard.on('success', function(e) {
  console.log("Стили Bootstrap скопированы:", e.text);
  alert("Стили для Bootstrap скопированы!");
});
bsClipboard.on('error', function(e) {
  console.log("Ошибка копирования стилей Bootstrap:", e);
});

const colorPicker = new iro.ColorPicker('#picker', {
  width: 100,
  color: "#ffffff"
});
const colorPickerContainer = document.querySelector('.picker-container');

function generateDarkColor() {
  let r, g, b;
  let hex;
  let luminance;
  do {
    r = Math.floor(Math.random() * 129);
    g = Math.floor(Math.random() * 129);
    b = Math.floor(Math.random() * 129);
    luminance = (0.299 * r + 0.587 * g + 0.114 * b);
    hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  } while (luminance > 50);
  return hex;
}

let json_data = {
  mode: "transformer",
  num_colors: 6,
  temperature: creativityValue,
  num_results: 10,
  adjacency: ["0", "10", "60", "65", "45", "35",
    "10", "0", "90", "65", "45", "45",
    "65", "60", "0", "0", "0", "0",
    "65", "65", "0", "0", "35", "65",
    "45", "45", "0", "35", "0", "35",
    "35", "45", "0", "65", "35", "0"],
  palette: ["-", "#ffffff", "-", "-", "-", "-"]
};

let currentPalette = [...json_data.palette]; 

creativitySlider.addEventListener('input', (event) => {
  json_data.temperature = event.target.value / 10; 
});

async function getPalette() {
  try {
    const response = await axios.post("https://api.huemint.com/color", json_data);
    const palette = response.data.results[0].palette;
    console.log(palette);
    return palette;
  } catch (error) {
    alert("Ошибка при получении палитры: " + error);
  }
}

let selectedIndex = 0;

function selectEditSections() {
  const editSections = document.querySelectorAll('.bottom-section');
  for (const section of editSections) {
    section.addEventListener('click', (event) => {
      selectedIndex = event.target.getAttribute('editId');
      colorPickerContainer.classList.add('visible');
      colorPickerContainer.style.left = (event.clientX - 75) + 'px';
      colorPickerContainer.style.bottom = (event.clientY) + 'px';
      colorPicker.color.hexString = currentPalette[selectedIndex]; // Синхронизация с текущим цветом
    });
  }
}

const names = ['Светлый', 'Фон', 'Тёмный/текст', 'Основн. кнопки', 'Вторичн. кнопки', '"Инфо" кнопки'];

getPaletteButton.addEventListener('click', () => {
  json_data.palette[3] = generateDarkColor(); 
  paletteContainer.innerHTML = '';
  copyBootstrapButton.classList.remove('inactive');
  getPalette().then((palette) => {
    currentPalette = [...palette]; // Копировка палитры в currentPalette для кнопки Bootstrap
    for (let i = 0; i < palette.length; i++) {
      const colorBlock = document.createElement('div');
      colorBlock.classList.add('box');
      colorBlock.innerHTML = `
        <div class="top-section" style="background-color: ${palette[i]};">
          <div class="edit-container" data-clipboard-text="${palette[i]}">${palette[i]}</div>
        </div>
        <div class="bottom-section" editId="${i}">${names[i]}</div>
      `;
      paletteContainer.appendChild(colorBlock);
    }
    let clipboard = new ClipboardJS('.edit-container');
    clipboard.on('success', function(e) {
      console.log("Цвет скопирован:", e.text);
    });
    clipboard.on('error', function(e) {
      console.log("Ошибка копирования цвета:", e);
    });
    selectEditSections();
  });
});

let changedColor = '#ffffff';
colorPicker.on('color:change', function(color) {
  changedColor = color.hexString;
  currentPalette[selectedIndex] = changedColor; 
  const targetBox = paletteContainer.querySelector(`.bottom-section[editId="${selectedIndex}"]`).parentElement;
  const topSection = targetBox.querySelector('.top-section');
  const editContainer = targetBox.querySelector('.edit-container');
  topSection.style.backgroundColor = changedColor;
  editContainer.textContent = changedColor;
  editContainer.setAttribute('data-clipboard-text', changedColor);
});

saveButton.addEventListener('click', () => {
  colorPickerContainer.classList.remove('visible');
});

// Установка стилей Bootstrap в атрибут кнопки для копирования(идёт до самого копирования)
function setBootstrapStylesToButton() {
  const bootstrapStyles = `
    .text-light { color: ${currentPalette[0]} !important; }
    .text-white { color: ${currentPalette[1]} !important; }
    .text-dark { color: ${currentPalette[2]} !important; }
    .text-primary { color: ${currentPalette[3]} !important; }
    .text-secondary { color: ${currentPalette[4]} !important; }
    .text-info { color: ${currentPalette[5]} !important; }
    .bg-light { background-color: ${currentPalette[0]} !important; }
    .bg-white { background-color: ${currentPalette[1]} !important; }
    .bg-dark { background-color: ${currentPalette[2]} !important; }
    .bg-primary { background-color: ${currentPalette[3]} !important; }
    .bg-secondary { background-color: ${currentPalette[4]} !important; }
    .bg-info { background-color: ${currentPalette[5]} !important; }
  `.trim();
  copyBootstrapButton.setAttribute('data-clipboard-text', bootstrapStyles);
}

// Обработчик для кнопки "Скопировать стили для Bootstrap"
copyBootstrapButton.addEventListener('click', () => {
  setBootstrapStylesToButton(); // Устанавливаем стили в атрибут перед копированием
});