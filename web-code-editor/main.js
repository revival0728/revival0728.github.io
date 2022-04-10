var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    lineNumbers: true,
    mode: "text/plain",
    theme: "material",
    tabSize: 4,
});

var stdIn = CodeMirror.fromTextArea(document.getElementById('std-in'), {
    lineNumbers: true,
    mode: "text/plain",
    theme: "material",
    tabSize: 4,
});

var stdOut = CodeMirror.fromTextArea(document.getElementById('std-out'), {
    lineNumbers: true,
    mode: "text/plain",
    theme: "material",
    tabSize: 4,
});

var jdoodle_args = {
    clientId: '',
    clientSecret: '',
    script: '',
    stdin: '',
    language: '',
    versionIndex: ''
}

const languageArgs = {
    "cpp": "5",
    "cpp14": "3",
    "cpp17": "0",
    "python3": "4",
    "java": "4",
    "nodejs": "4"
}

const codeMirrorMode = {
    "plain": "text/plain",
    "cpp": "text/x-c++src",
    "cpp14": "text/x-c++src",
    "cpp17": "text/x-c++src",
    "python3": "text/x-python",
    "java": "text/x-java",
    "nodejs":"text/javascript"
}

run()

function run() {
    setupCodeMirror()
    syncFile()
    syncJoodleSetting()
    syncLanguageMode()
}

function setupCodeMirror() {
    stdIn.setSize(400, 200)
    stdOut.setSize(400, 200)
}

function syncFile() {
    let input = document.getElementById('editor-source')
    input.addEventListener('change', (event) => {
        let reader = new FileReader()
        let file = event.target.files[0]
        reader.addEventListener('load', (event2) => {
            editor.getDoc().setValue(event2.target.result)
        })
        reader.readAsText(file)
    })
}

function syncJoodleSetting() {
    let input = document.getElementById('jdoodle-setting')
    input.addEventListener('change', (event) => {
        let reader = new FileReader()
        let file = event.target.files[0]
        reader.addEventListener('load', (event2) => {
            let json = JSON.parse(event2.target.result)
            jdoodle_args.clientId = json['jdoodle-client-id']
            jdoodle_args.clientSecret = json['jdoodle-client-secret']
        })
        reader.readAsText(file)
    })
}

function syncLanguageMode() {
    let language = document.getElementById('select-language')
    language.addEventListener('change', (event) => {
        editor.setOption('mode', codeMirrorMode[event.target.value])
    })
}

function onSaveFile() {
    let a = document.createElement('a')
    let fileName = document.getElementById('save-file-name')
    if(fileName.value) {
        a.setAttribute('href', URL.createObjectURL(new Blob([editor.getDoc().getValue()], {type: "text/plain"})))
        a.download = fileName.value
        a.click()
    } else {
        alert('Please enter a file name')
    }
}


async function onRun() {
    let language = document.getElementById('select-language')
    jdoodle_args.script = editor.getDoc().getValue()
    jdoodle_args.language = language.value
    jdoodle_args.stdin = stdIn.getDoc().getValue()
    jdoodle_args.verionIndex = languageArgs[language.value]
    console.log(jdoodle_args)
    await fetch('https://api.jdoodle.com/v1/execute', {
        method: 'POST',
        body: JSON.stringify(jdoodle_args),
        headers: new Headers({
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        })
    }).then((res) => {
        return res.json()
    })
    .catch((err) => console.log(err))
    .then((res) => {
        let output = res.output + '\n\n' + `Time used: ${res.cpuTime}\n Memory used: ${res.memory}`
        stdOut.getDoc().setValue()
    })
}
