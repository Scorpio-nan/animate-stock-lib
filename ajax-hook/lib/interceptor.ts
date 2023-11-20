import { InitConfig } from './types';
import { queryString, headerStruct, responseStruct, paramsStruct } from './utils';

export default class RequestIntercept {
    /**
     * 项目配置
     */
    public static config: InitConfig;

    /**
     * 当前上报的 uri 配置
     */
    private selfConfig = {
        uri: 'http://127.0.0.1/api/xhr/send'
    }

    constructor(opts:InitConfig) {

        RequestIntercept.config = opts;
        
        this.ready();
    };

    /**
     * 初始化 http 拦截器
     */
    private ready() {
        
        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;
        const setHeader = XMLHttpRequest.prototype.setRequestHeader;
        const self = this;

        var headers = {};

        XMLHttpRequest.prototype.open = function() {
            this._method = arguments[0];
            this._url = arguments[1];
            return originalOpen.apply(this, arguments);
        }

        XMLHttpRequest.prototype.setRequestHeader = function(header, value) {
            headers[header] = value;
            return setHeader.apply(this, arguments);
        }

        XMLHttpRequest.prototype.send = function(data) {

            this.addEventListener('load', function() {
                console.log(this, '==')
                // this.responseText 是返回值
                console.log('%c Request', 'font-size: 20px; color: #17a2b8;', this._url + ' method ' + this._method + ' with data ' + data);
                console.log('%c Headers', 'font-size: 20px; color: #dc3545;', headers);
                console.log('%c getAllResponseHeaders', 'font-size: 20px; color: #007bff;', this.getAllResponseHeaders());
                
                const isGet = this._method.toLocaleLowerCase() == 'get';
                const requestParams = isGet ? queryString(this.url) : data;
                let response = {};

                try {
                    response = JSON.parse(this.responseText);
                } catch (error) {
                    response = this.responseText
                }

                const params = {
                    title: RequestIntercept.config.project + 'Fetch In Website',
                    description: '',
                    method: this._method,
                    contentType: headers['Content-Type'],
                    url: this._url,
                    status: 'done',
                    requestHeaders: headerStruct(headers),
                    requestParams: paramsStruct(requestParams),
                    response: responseStruct(response)
                }

                self.send({
                    headers: headers,
                    method: this._method,
                    url: this._url,
                    data: data || {}
                })
            })

            return originalSend.apply(this, arguments);
        }

    }  
    

    /**
     * 拦截结果发送到服务端, 包含 request, response
     * 通过配置里面的 matcher 来判定哪些是需要进行拦截的, 哪些是不需要的
     */
    private send(data) {
        
        const matchers = RequestIntercept.config.matcher;

        /**
         * 如果一个都没有命中, 那就不管了;
         */
        // if (matchers.length && !matchers.some(ele => data.url.match(ele))) return;
    
        // this.ajax(data);
    }

    /**
     * 简单的封装一个 ajax 用来发送
     */
    private ajax (data) {
        return new Promise((resolve, reject) => {
            fetch(this.selfConfig.uri, {
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

new RequestIntercept({ project: 'Api接口文档', matcher: [''] })