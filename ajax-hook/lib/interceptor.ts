import { InitConfig } from './types';

export default class RequestIntercept {
    /**
     * 项目配置
     */
    private static config: InitConfig;

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
    ready() {
        
        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;
        const setHeader = XMLHttpRequest.prototype.setRequestHeader;

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
                console.log('%c Request', 'font-size: 20px; color: #17a2b8;', this._url + ' method ' + this._method + ' with data ' + data);
                console.log('%c Headers', 'font-size: 20px; color: #dc3545;', headers);
                console.log('%c getAllResponseHeaders', 'font-size: 20px; color: #007bff;', this.getAllResponseHeaders());
            })

            return originalSend.apply(this, arguments);
        }

    }   

    /**
     * 拦截结果发送到服务端, 包含 request, response
     */
    send() {

    }
}

new RequestIntercept({ project: 'name', matcher: [''] })