document.getElementById('pdf-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();

        formData.append('file', file);

        // 로딩 모달 표시
        document.getElementById('loading-modal').style.display = 'flex';

        fetch('API-KEY', { 
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
            a.download = 'keypoint.pdf';
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
