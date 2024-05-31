export const blobCsv = (prop) => {
    const blob = new Blob([prop.file], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = prop.title;
    downloadLink.click();
    window.URL.revokeObjectURL(url);
  };

  export function formatProfessionalDateAndTime(inputDate) {
    const date = new Date(inputDate);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC'
    };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate;
  }

  export function formatProfessionalDate(inputDate) {
    const date = new Date(inputDate);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate;
  }