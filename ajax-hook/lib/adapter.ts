import { queryString } from './utils';
import type { InitConfig } from './types';


export default class AjaxAdapter extends XMLHttpRequest {

    private selfConfig = {
        url: 'https://xxxxx.com/api'
    }

    private initConfig: InitConfig;

    private _url:string | URL;
    private _method: string;
    private _headers:Record<string, any>;
    private _body:Document | XMLHttpRequestBodyInit | null;

    constructor(opts:InitConfig) {
        super();
        this.initConfig = opts;
    }

    public open(method: string, url: string | URL) {
        this._method = method;
        this._url = url;
        return super.open.apply(this, arguments);
    }

    public send(body?: Document | XMLHttpRequestBodyInit | null) {
        this._body = body;
        this.addEventListener('load', this.eventLoad.bind(this));
        return super.send.apply(this, arguments);
    }

    public setRequestHeader(name: string, value: string) {
        this._headers[name] = value;
        return super.setRequestHeader.apply(this, arguments)
    }

    private eventLoad() {
        const matchers = this.initConfig.matcher;
        const data = {
            request: this.organRequest(),
            response: this.organResponse(),
            project: this.initConfig.project,
            projectNo: this.initConfig.projectNo,
            remark: this.initConfig.remark
        }

        alert(JSON.stringify(data, null, 4));

        if (matchers.length && !matchers.some(ele => (data.request.url as string).match(ele))) return;
    }

    private organRequest () {

        const url = new URL(this._url);
        const data = this._method.toLowerCase() == 'get' ? queryString(this._url as string) : this._body;

        return {
            url: this._url,
            path: url.pathname,
            hostname: url.hostname,
            protocol: url.protocol,
            method: this._method,
            headers: this._headers,
            data: data
        }
    }

    private organResponse() {
        try{
            return JSON.parse(this.responseText);
        }catch (e) {
            return this.responseText;
        }
    }

    private ajax(data) {
        return new Promise((resolve, reject) => {
            fetch(this.selfConfig.url, {
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }).then(res => {
                res.json().then(result => {
                    resolve(result);
                })
            })
        })
    }
}

new AjaxAdapter({ project: '测试一下', matcher: [] });



