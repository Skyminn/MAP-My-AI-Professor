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
        const formData = new FormData();

        const objectiveCheckbox = document.querySelector('input[type="checkbox"][name="objective"]');
        const shortAnswerCheckbox = document.querySelector('input[type="checkbox"][name="shortAnswer"]');
        const essayCheckbox = document.querySelector('input[type="checkbox"][name="essay"]');

        const numMcq = objectiveCheckbox.checked ? document.getElementById('objectiveField').value || 0 : 0;
        const numShort = shortAnswerCheckbox.checked ? document.getElementById('shortAnswerField').value || 0 : 0;
        const numLong = essayCheckbox.checked ? document.getElementById('essayField').value || 0 : 0;
        const subject = document.getElementById('subjectField').value || '';

        formData.append('file', file);
        formData.append('num_mcq', numMcq);
        formData.append('num_short', numShort);
        formData.append('num_long', numLong);
        formData.append('subject', subject);

        // 로딩 모달 표시
        document.getElementById('loading-modal').style.display = 'flex';

        fetch(`API-KEY`, { 
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            const fileName = `${subject}_예상문제.pdf`; // 과목명+예상문제.pdf 형식으로 파일 이름 설정
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

            // 다운로드가 완료되면 complete.html로 전환
            window.location.href = 'complete.html';
        })
        .catch(error => {
            console.error('Error:', error);
            // 오류 발생 시 home.html로 전환
            window.location.href = 'home.html';
        });
    }
});





