document.addEventListener('DOMContentLoaded', (event) => {
    const outputDiv = document.getElementById('output');
    const inputField = document.getElementById('input');
    const shell = new SimpleShell();

    function updateOutput(text) {
        outputDiv.innerHTML += `<div>${text}</div>`;
        outputDiv.scrollTop = outputDiv.scrollHeight;
    }

    inputField.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const command = inputField.value;
            inputField.value = '';
            updateOutput(`$ ${command}`);
            const result = shell.executeCommand(command);
            updateOutput(result);
        }
    });
});