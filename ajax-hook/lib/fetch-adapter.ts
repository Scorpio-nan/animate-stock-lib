class FetchAdapter {
    
    private _fetch;

    constructor() {

        this._fetch = window.fetch;

        const result = this._fetch.apply(this, arguments);

        result.then(function(response){
            
            console.log('Request URL:', response.url);
            console.log('Request Method:', response.method);
            console.log('Request Body:', arguments[0].body);

            return response.text().then(function(text) {
                console.log('Response:', text);
                return Promise.resolve(response);
            })
        })

        return result;
    }
}

window.fetch = FetchAdapter;