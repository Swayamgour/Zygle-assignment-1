import React from 'react';

function Canvas() {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'red';
    context.font = '20px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('A', canvas.width / 2, canvas.height / 2);
  }, []);

  function downloadCanvas() {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = canvas.toDataURL();
    link.click();

    const imageData = canvas
      .getContext('2d')
      .getImageData(0, 0, canvas.width, canvas.height).data;

    let hexData = '';
    for (let i = 0; i < imageData.length; i += 4) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      hexData += `#${r.toString(16)}${g.toString(16)}${b.toString(16)} `;
    }

    const file = new Blob([hexData], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = 'canvas.txt';
    link.click();
  }

  return (
    <div>
      <canvas ref={canvasRef} width={16} height={34} />
      <br />
      <a href="#" onClick={downloadCanvas}>
        Download
      </a>
    </div>
  );
}

export default Canvas;
