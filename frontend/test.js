// 과목명 입력 필드에서는 문자만 입력 가능하도록 설정
document.getElementById('subjectField').addEventListener('input', function(event) {
    this.value = this.value.replace(/[^A-Za-zㄱ-ㅎㅏ-ㅣ가-힣\s]/g, '');
});

// 문항수 입력 필드에서는 숫자만 입력 가능하도록 설정
document.getElementById('objectiveField').addEventListener('input', function(event) {
    this.value = this.value.replace(/\D/g, '');
});

document.getElementById('shortAnswerField').addEventListener('input', function(event) {
    this.value = this.value.replace(/\D/g, '');
});

document.getElementById('essayField').addEventListener('input', function(event) {
    this.value = this.value.replace(/\D/g, '');
});

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
