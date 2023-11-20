import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { language as sqlLanguage } from 'monaco-editor/esm/vs/basic-languages/sql/sql';


(function () {
    const div = document.createElement('div');
    div.id = 'root';
    div.style = 'width:100%; height:600px;';

    document.body.appendChild(div);


    document.getElementById('query-btn').onclick = search

})();


monaco.languages.registerCompletionItemProvider('sql', {
    provideCompletionItems: (
        model,
        position
    ) => {
        let suggestions = []
        const { lineNumber, column } = position
        const textBeforePointer = model.getValueInRange({
            startLineNumber: lineNumber,
            startColumn: 0,
            endLineNumber: lineNumber,
            endColumn: column,
        })
        const contents = textBeforePointer.trim().split(/\s+/)
        const lastContents = contents[contents?.length - 1]
        if (lastContents) {
            const sqlConfigKey = ['builtinFunctions', 'keywords', 'operators']
            sqlConfigKey.forEach(key => {
                sqlLanguage[key].forEach(sql => {
                    suggestions.push(
                        {
                            label: sql,
                            insertText: sql,
                        }
                    )
                })

            })
        }
        return {
            suggestions,
        }
    }
})

const editor = monaco.editor.create(document.getElementById('root'), {
    value: `SELECT * FROM res_users`,
    language: 'sql',
    theme: 'vs',
    codeLens: true,
});



function search() {
    console.log(editor.getValue());
}













