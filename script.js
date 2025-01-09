// Carga los datos de las muestras
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

      // Columna de modelo 3D
      const modelCell = document.createElement('td');
      const modelButton = document.createElement('button');
      modelButton.textContent = "Ver Modelo";
      modelButton.onclick = () => {
        const viewer = document.getElementById('model-viewer');
        viewer.src = sample.model3D;
      };
      modelCell.appendChild(modelButton);
      row.appendChild(modelCell);

      // Columna de imagen
      const imageCell = document.createElement('td');
      const img = document.createElement('img');
      img.src = sample.image;
      img.alt = `Imagen de ${sample.name}`;
      img.style.width = "100px";
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