(function () {
    "use strict";

    /**
     * 外层　div 容器的 id
     */
    let ID = 'login-container-drag';
    // let ID = '';

    /**
     * 网站域名
     */
    let host = location.host;

    /**
     * 选中的账号
     */
    let currentAccount = JSON.parse(GM_getValue(host + 'currentAccount') || '{}');

    /**
     * 账号列表
     */
    let accoutListMap = {
        dev: [{
                'name': 'xiangyuan.nan',
                'pwd': 'Fj171216',
                'title': '南香元的 wiki 登录账号 -- xiangyuan.nan'
            },
            {
                'name': 'hui.zhan',
                'pwd': 'Fj171216',
                'title': '占辉的 wiki 登录账号 -- hui.zhan'
            },
            {
                'name': 'fangshang.gao',
                'pwd': 'Fj171216',
                'title': '高方上的 wiki 登录账号 -- fangshang.gao'
            }
        ]
    }

    const websites = {
        "crm": {
            "dev":  "testcrm.fjdynamics.com",
            "beta": "beta-crm.fjdynamics.com",
            "prod": "crm.fjdynamics.com"
        },
        "dms": {
            "dev":  "dmstest.fjdynamics.com",
            "beta": "beta-dms.fjdynamics.com",
            "prod": "dms.fjdynamics.com"
        },
        "crmoversea": {
            "dev":  "crmoverseatest.fjdynamics.com",
            "beta": "beta-crmoversea.fjdynamics.com",
            "prod": "crmoversea.fjdynamics.com"
        },
        "fcrm": {
            "dev":  "fdmstest.fjdynamics.com",
            "beta": "fdmsbeta.fjdynamics.com",
            "prod": "fdmsprod.fjdynamics.com"
        },
        "crmh5oversea": {
            "dev":  "dev-crmoverseah5.fjdynamics.com",
            "beta": "betacrmoverseah5.fjdynamics.com",
            "prod": "crmoverseah5.fjdynamics.com"
        },
        "shadmin": {
            "dev":  "192.168.32.21:9800",
            "prod": "ass.fjdynamics.com"
        },
        "storeh5": {
            "dev":  "test.fjd-mall.com",
            "prod": "www.fjd-mall.com"
        },
        "storeadmin": {
            "dev":  "testmanage.fjd-mall.com",
            "prod": "manage.fjd-mall.com"
        }
    }

    /**
     * 克隆一份数据, 保证账号密码在搜索完之后还能还原回去;
     */
    let clone = cloneDeep(accoutListMap);

    /**
     * 域名白名单, 进入下面的域名才触发油猴辅助登录
     */
    var wList = [
        "localhost", 
        "192.168.32.21", 
        "confluence.fjdynamics.com",
        "test-dms.fjdynamics.com"
    ];

    /**
     * 路由页面白名单, 只有在下面这些路由(页面)才触发油猴辅助登录
     */
    var pList = [
        "/#/login", 
        "login.action"
    ];

    console.log("%c 丰疆智能辅助登录插件就绪, 欢迎回来~", "font-size: 14px;color:#3cb371;font-weight:700;");

    main();

    function main() {
        var hostName = window.location.hostname;
        var href = window.location.href;

        if (
            wList.includes(hostName) &&
            pList.some((ele) => href.indexOf(ele) >= 0)
        ) {
            createFrom();
        }
    }

    function findId(preId) {
        let id = ID;
        if (preId) {
            id = ID + preId;
        }
        return document.getElementById(id);
    }

    function parseTry(str) {
        let obj = null;
        if (!str) {
            return obj;
        }
        try {
            obj = JSON.parse(str);
            if (typeof obj === "string") {
                parseTry(str);
            }
        } catch (e) {
            console.log(e);
        }
        return obj;
    }

    function click(el) {
        var e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);
        el.dispatchEvent(e);
        el.focus();
    }

    function getPosition(oldPoint, newPoint) {
        return {
            x: newPoint.x - oldPoint.x,
            y: newPoint.y - oldPoint.y,
        };
    }

    /**
     * 判断当前网页的运行环境;
     * 
     * @returns 
     */
    function getSiteType() {
        // let type = /(127|0)\.0\.0\.1|192\.168\.\d+\.\d+|localhost(:\d+)?/.test(location.href) ? 'dev' : location.href.match(/^https?:\/\/([^\.\-\/:]+)/)[1];
        // let type = /(127|0)\.0\.0\.1|192\.168\.\d+\.\d+|localhost(:\d+)?/.test(location.href) ? 'dev' : location.href.match(/^https?:\/\/([^\.\-\/:]+)/)[1];

        let type = 'dev';

        /**
         * todo 这里是根据进入域名的地址判断当前环境是哪个环境的, 暂时还不知道有哪些域名, 所以这里就像写死一为 dev 吧;
         */
        var href = location.href;
        var host = /(127|0)\.0\.0\.1|192\.168\.\d+\.\d+|localhost(:\d+)?/;
        if (host.test(href)) {
            type = 'dev';
        }
        
        return type.replace(/\d+/g, '');
    }

    function getOptionGroup() {
        let optionGroup = '';
        let index = 0;
        let type = getSiteType();
        for (let i in accoutListMap) {
            let list = accoutListMap[i];
            if (type === '' || accoutListMap[type] && type === i) {
                /**
                 * todo 这里不需要再进行过滤了, 直接拿账号循环出来就行了;
                 * list.filter(item => item.show)  --> list.map;
                 */
                let options = list.map(item => {
                    let value = `${item.name}_${type}`;
                    let str = `<option value='${value}' title='${item.title || item.name}'>(${item.title || item.name})</option>`;
                    index++;
                    return str;
                });
                
                optionGroup += `<optgroup label='${i}'}>${options}</optgroup>`;
            }
        }
        return optionGroup;
    }

    function accountHtml(form) {
        let optionGroup = getOptionGroup();

        console.log(getFormParent(form), 'parentForm');

        let rect = getFormParent(form).getBoundingClientRect();
        let count = 15;

        let pointPosition = parseTry(GM_getValue(host + 'browser_plugin_drag_position'));

        if (pointPosition === null) {
            pointPosition = {
                left: rect.left - rect.width - 40,
                top: rect.top,
            };
        }
        GM_setValue(host + 'browser_plugin_drag_position', JSON.stringify({
            left: pointPosition.left,
            top: pointPosition.top,
        }));
        return `
                <div
                  id='${ID}'
                  style='
                    position: fixed;
                    opacity:1;
                    left: ${pointPosition.left}px;
                    background: #fff;
                    padding: 0 1rem 1rem 1rem;
                    box-shadow: 0 0 10px;
                    z-index: 999;
                    width:${rect.width}px;
                    top: ${pointPosition.top}px;
                    font-size:16px;
                    height:${rect.height}px;
                    height:300px;
                    display:flex;
                    flex-direction: column;
                    border-radius: 4px;
                  '
                  >
                    <div
                        style='
                            height:50px;cursor:
                            grab;display:flex;
                            align-items:center;
                            user-select:none;
                        '
                        id='${ID}_header'>
                            辅助登录插件
                        </div>
                        <input type='search' id='${ID}_search' placeholder='搜索会员名，用户名' style='
                          outline: 0;
                          margin-bottom: 10px;
                          padding:5px 10px;
                          border: 1px solid #aaa;
                          border-radius: 4px;
                        '/>
                    <select
                        id='${ID}_select'
                        style='
                            user-select:none;
                            border: 1px solid #aaa;
                            border-radius: 4px;
                            min-height: 100px;
                        '
                        value=''
                        size='${count}'
    
                    >
                        ${optionGroup}
                    </select>
                    <div style='position:relative;flex:1;display:flex;'>
                        <div style='
                            position:absolute;
                            right:0;
                            top:0;
                            color:#1890FF;
                            cursor:pointer;
                            padding:5px 10px;
                        ' id='${ID}_copy'>复制</div>
                        <pre
                          id='${ID}_pre'
                          style="
                            flex:1;
                            transition-duration: .3s;
                            padding-top:10px;
                            font-family:'微软雅黑'
                          "></pre>
                      </div>
                </div>
            `;
    }

    function showDesc(obj, type) {
        if (!obj) { return ''; }
        let list = [];
        list = [
            '环境：' + type,
            '账号：' + obj.name,
            '密码：' + obj.pwd,
        ];
    
        if (obj.title) {
            list.splice(1, 0, '备注：' + obj.title);
        }
        findId('_pre').innerHTML = list.join('\n');
    }

    function outPreAppend(el, html) {
        el.querySelector('[id]').style.position = 'relative';
        el.querySelector('[id]').style.zIndex = 0;
        el.insertAdjacentHTML('beforebegin', html);
    }

    function inAppend(el, html) {
        el.querySelector('[id]').style.position = 'relative';
        el.querySelector('[id]').style.zIndex = 0;
        el.insertAdjacentHTML('beforeend', html);
    }


    /**
     * 登录表单的  class 类名
     * @param {*} form 
     * @returns 
     */
    function getFormParent(form) {
        return form.closest('[class*="login-form-container"]') || form.closest('[class*="login-wrap"]') || form.closest('[class*="el-form"]') || form.closest('[class*="login-form"]');
    }

    /**
     * hack 油猴插件代理方法
     * @param {*} key 
     */
    function GM_getValue(key) {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            return {};
        }
    }

    /**
     * hack 浏览器油猴插件代理方法
     * @param {*} key 
     * @param {*} value 
     */
    function GM_setValue(key, value) {
        return localStorage.setItem(key, value);
    }


    /**
     * hack clipboard 复制功能
     * @param {*} text 
     */
    function GM_setClipboard (target, text) {
        if(document.getElementById('copybroad')){
            document.body.removeChild(document.getElementById('copybroad'));
        }
        var Element = document.createElement('button');
        Element.id = 'copybroad';
        Element.onclick = function(){
            let clipboard = new ClipboardJS('#copybroad', {
                text: function() {
                    return text;
                }
            });
            clipboard.on('success', function(e) {
                console.log('copy 成功');
                clipboard.destroy()
            });
        
            clipboard.on('error', function(e) {
                console.log('copy 失败');
                clipboard.destroy()
            });
        }
        document.body.appendChild(Element); 
        document.getElementById('copybroad').click();
    }

    function autoInputToRight(form) {
        if (!currentAccount) {
            return;
        }

        let inputList = form.querySelectorAll('input');

        inputValue(inputList[0], currentAccount.name || '');

        setTimeout(() => {
            inputList[0].focus();
            inputValue(inputList[0], currentAccount.name || '');
            inputList[0].blur();
            inputList[1] && inputValue(inputList[1], currentAccount.pwd || '');
            setTimeout(() => {
                let firstNode = document.querySelector('[class*="select-tree-treenode-switcher-open"]>[class*="select-tree-node-content-wrapper"]');
                if (firstNode) {
                    firstNode.click();
                }
            }, 100);
        }, 100);
    }

    /**
     * 深拷贝方法
     * @param {*} target 
     * @param {*} map 
     * @returns 
     */
    function cloneDeep(target) {
        return JSON.parse(JSON.stringify(target));
    };

    /**
     * 将 select 选中的用户名和密码填进去登录框里面;
     * @param {*} el 
     * @param {*} value 
     */
    function inputValue(el, value) {
        const prop = HTMLInputElement.prototype;
        const setValue = Object.getOwnPropertyDescriptor(prop, 'value').set;
        setValue.call(el, value);
        const event = new Event('input', { bubbles: true });
        el.dispatchEvent(event);
    }

    /**
     * 创建选择账号的选择框;
     */
    function createFrom() {
        if ($("#userscript-dialog")) $("#userscript-dialog").remove();
        let form = document.forms[0];

        console.log(form, 'form  login');

        if (!form) {
            findId() && findId().parentElement.removeChild(findId());
        }
        /**
         * todo 这里就不需要 return 出去了;
         */
        // if (findId()) {
        //     return;
        // }

        outPreAppend(getFormParent(form), accountHtml(form));

        let copyBtn = findId('_copy');
        let searchInput = findId('_search');
        let select = findId('_select');
        let preTag = findId('_pre');
        let siteType = getSiteType();

        copyBtn.addEventListener('click', () => {
            GM_setClipboard(copyBtn, copyBtn.nextElementSibling.innerText, 'text');
            copyBtn.innerText = '复制成功';
            preTag.style.color = '#1890ff'
            setTimeout(() => {
                copyBtn.innerText = '复制';
                preTag.style.color = 'inherit'
            }, 1000);
        });

        select.value = `${currentAccount.name}_${siteType}`;

        showDesc(currentAccount, siteType);

        autoInputToRight(form);
        select.addEventListener('change', e => {
            let accountValue = e.target.value;
            let account = accountValue.split('_');
            siteType = account[2] || siteType;
            currentAccount = accoutListMap[siteType]?.filter(item => item.name === account[0])?.[0];

            GM_setValue(host + 'currentAccount', JSON.stringify(currentAccount));
            searchInput.value = '';
            for (let i in accoutListMap) {
                accoutListMap[i] = accoutListMap[i].map(item => {
                    item.show = true;
                    return item;
                });
            }
            select.innerHTML = getOptionGroup();

            select.value = `${currentAccount.name}_${siteType}`;
            showDesc(currentAccount, siteType);
            autoInputToRight(form);
        });

        $('#' + ID).draggable({
            start(ev,pos) {
                // console.log(ev, pos);
            },
            stop(ev,pos) {
                // console.log(ev, pos);
                GM_setValue(host + 'browser_plugin_drag_position', JSON.stringify({
                    left: ev.pageX,
                    top: ev.pageY,
                }));
            }
        });

        window.addEventListener('resize', e => {
            if (findId()) {
                let rect = getFormParent(form).getBoundingClientRect();
                findId().style.left = (rect.left - rect.width - 20) + 'px';
                findId().style.top = rect.top + 'px';
            }
        });
        
        // 搜索功能
        searchInput.addEventListener('input', (e) => {
            let val = e.target.value;
            let reg = new RegExp(val.replace(/[\/\\\*\.^$\!\(\)]/, ''), 'i');
            var reg2 = new RegExp(val, 'gim');
            if (val == '') accoutListMap = cloneDeep(clone);
            for (let i in accoutListMap) {
                /** 
                    accoutListMap[i] = accoutListMap[i].map(item => {
                        item.show = val === '' || reg.test(item.name);
                        return item;
                    });
                */
                accoutListMap[i] = accoutListMap[i].filter(item => reg2.test(item.name) || reg2.test(item.title));
            }
            select.innerHTML = getOptionGroup();
            select.value = `${currentAccount.name}_${siteType}`;
            showDesc(currentAccount, siteType);
        }, false);
    }
})();
