document.getElementById('pdf-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const pdfData = e.target.result;
            // PDF 파일 처리로직 구현
            console.log("업로드된 PDF 데이터:", pdfData);
        };
        reader.readAsDataURL(file);
    }
});
