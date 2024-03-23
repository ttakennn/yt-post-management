export const base64ToFile = (base64String: string, fileName: string, contentType = ''): File => {
  const parts = base64String.split(';base64,');
  const contentTypePart = parts[0] || '';

  const byteString = atob(parts[1]);
  const mimeType = contentType || contentTypePart.split(':')[1];

  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([arrayBuffer], { type: mimeType });
  return new File([blob], fileName, { type: mimeType });
}