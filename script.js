// Cargar datos desde data.json
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.getElementById('sample-table');

    data.samples.forEach(sample => {
      const row = document.createElement('tr');

      // Columna de nombre
      const nameCell = document.createElement('td');
      nameCell.textContent = sample.name;
      row.appendChild(nameCell);

      // Columna de botón para descargar modelo 3D
      const modelCell = document.createElement('td');
      const modelButton = document.createElement('button');
      modelButton.textContent = "Descargar Modelo";
      modelButton.onclick = () => downloadModel(sample.model3D);
      modelCell.appendChild(modelButton);
      row.appendChild(modelCell);

      // Columna de imagen
      const imageCell = document.createElement('td');
      const img = document.createElement('img');
      img.src = sample.image;
      img.alt = `Imagen de ${sample.name}`;
      img.style.width = "100px";
      img.onclick = () => openModal(img.src, sample.description);
      imageCell.appendChild(img);
      row.appendChild(imageCell);

      // Columna de descripción
      const descCell = document.createElement('td');
      descCell.textContent = sample.description;
      row.appendChild(descCell);

      tableBody.appendChild(row);
    });
  })
  .catch(error => console.error("Error cargando los datos:", error));

// Función para descargar el modelo 3D
function downloadModel(modelPath) {
  const link = document.createElement('a');
  link.href = modelPath;
  link.download = modelPath.split('/').pop(); // Nombre del archivo
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Función para abrir el modal con la imagen
function openModal(imageSrc, captionText) {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-image');
  const caption = document.getElementById('caption');

  modal.style.display = "block";
  modalImg.src = imageSrc;
  caption.textContent = captionText;

  // Cierra el modal al hacer clic en la "X"
  const closeModal = document.getElementById('close-modal');
  closeModal.onclick = () => {
    modal.style.display = "none";
    modalImg.classList.remove('zoomed'); // Asegúrate de resetear el zoom
  };

  // Alterna entre zoom y no zoom al hacer clic en la imagen
  modalImg.onclick = () => {
    if (modalImg.classList.contains('zoomed')) {
      modalImg.classList.remove('zoomed');
    } else {
      modalImg.classList.add('zoomed');
    }
  };
}
