function fileToBuffer(file: File): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        // The result is an ArrayBuffer
        const arrayBuffer = event.target?.result as ArrayBuffer;
        // Convert the ArrayBuffer to a Buffer using Buffer.from()
        const buffer = Buffer.from(arrayBuffer);
        resolve(buffer);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      // Read the File as an ArrayBuffer
      reader.readAsArrayBuffer(file);
    });
  }

export default fileToBuffer;