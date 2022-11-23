/**
 * 输入
 * let arr = [
        {id: 1, name: '1', pid: 0},
        {id: 2, name: '2', pid: 1},
        {id: 3, name: '3', pid: 1},
        {id: 4, name: '4', pid: 3},
        {id: 5, name: '5', pid: 3},
    ]
 * 
 */

/**
 * 输出
 * let tree = [
        {
            "id": 1,
            "name": "1",
            "pid": 0,
            "children": [
                {
                    "id": 2,
                    "name": "2",
                    "pid": 1,
                    "children": []
                },
                {
                    "id": 3,
                    "name": "3",
                    "pid": 1,
                    "children": [
                    {
                        "id": 4,
                        "name": "4",
                        "pid": 3,
                        "children": []
                    }
                    ]
                }
            ]
        }
    ]
 */

let arr = [
    { id: 1, name: '1', pid: 0 },
    { id: 2, name: '2', pid: 1 },
    { id: 3, name: '3', pid: 1 },
    { id: 4, name: '4', pid: 3 },
    { id: 5, name: '5', pid: 3 },
]

let tree = [
    {
        "id": 1,
        "name": "1",
        "pid": 0,
        "children": [
            {
                "id": 2,
                "name": "2",
                "pid": 1,
                "children": []
            },
            {
                "id": 3,
                "name": "3",
                "pid": 1,
                "children": [
                    {
                        "id": 4,
                        "name": "4",
                        "pid": 3,
                        "children": []
                    }
                ]
            }
        ]
    }
]

/**
 * tree to array  递归实现
 */

function treeToArray(tree) {
    let res = []
    for (const item of tree) {
        const { children, ...i } = item
        if (children && children.length) {
            res = res.concat(treeToArray(children))
        }
        res.push(i)
    }
    return res
}


/**
 * tree to array  reduce 实现
 */
function treeToArrayReduce(tree) {
    return tree.reduce((res, item) => {
        const { children, ...i } = item
        return res.concat(i, children && children.length ? treeToArray(children) : [])
    }, [])
}


/**
 * array to  tree 递归实现
 * O(2^n)
 */
function arrayToTree(items) {
    let res = []
    let getChildren = (res, pid) => {
        for (const i of items) {
            if (i.pid === pid) {
                const newItem = { ...i, children: [] }
                res.push(newItem)
                getChildren(newItem.children, newItem.id)
            }
        }
    }
    getChildren(res, 0)
    return res
}


/**
 * array to  tree  map对象实现
 * O(2n)
 */
function arrayToTreeMap(items) {
    let res = [] // 存放结果集
    let map = {}

    // 先转成map存储
    for (const i of items) {
        map[i.id] = { ...i, children: [] }
    }

    for (const i of items) {
        const newItem = map[i.id]
        if (i.pid === 0) {
            res.push(newItem)
        } else {
            if (Object.prototype.hasOwnProperty.call(map, i.pid)) {
                map[i.pid].children.push(newItem)
            }
        }
    }
    return res
}



/**
 * array to  tree  map对象实现, 一次循环搞定
 * O(2n)
 */
function arrayToTreeMapOnce(items) {
    let res = [] // 存放结果集
    let map = {}
    // 判断对象是否有某个属性
    let getHasOwnProperty = (obj, property) => Object.prototype.hasOwnProperty.call(obj, property)

    // 边做map存储，边找对应关系
    for (const i of items) {
        map[i.id] = {
            ...i,
            children: getHasOwnProperty(map, i.id) ? map[i.id].children : []
        }
        const newItem = map[i.id]
        if (i.pid === 0) {
            res.push(newItem)
        } else {
            if (!getHasOwnProperty(map, i.pid)) {
                map[i.pid] = {
                    children: []
                }
            }
            map[i.pid].children.push(newItem)
        }
    }
    return res
}



/**
 * array to  tree  reduce 实现
 * O(2n)
 */
let list = [{
    id: '1',
    menu_name: '设置',
    menu_url: 'setting',
    parent_id: 0
}, {
    id: '1-1',
    menu_name: '权限设置',
    menu_url: 'setting.permission',
    parent_id: '1'
}, {
    id: '1-1-1',
    menu_name: '用户管理列表',
    menu_url: 'setting.permission.user_list',
    parent_id: '1-1'
}, {
    id: '1-1-2',
    menu_name: '用户管理新增',
    menu_url: 'setting.permission.user_add',
    parent_id: '1-1'
}, {
    id: '1-1-3',
    menu_name: '角色管理列表',
    menu_url: 'setting.permission.role_list',
    parent_id: '1-1'
}, {
    id: '1-2',
    menu_name: '菜单设置',
    menu_url: 'setting.menu',
    parent_id: '1'
}, {
    id: '1-2-1',
    menu_name: '菜单列表',
    menu_url: 'setting.menu.menu_list',
    parent_id: '1-2'
}, {
    id: '1-2-2',
    menu_name: '菜单添加',
    menu_url: 'setting.menu.menu_add',
    parent_id: '1-2'
}, {
    id: '2',
    menu_name: '订单',
    menu_url: 'order',
    parent_id: 0
}, {
    id: '2-1',
    menu_name: '报单审核',
    menu_url: 'order.orderreview',
    parent_id: '2'
}, {
    id: '2-2',
    menu_name: '退款管理',
    menu_url: 'order.refundmanagement',
    parent_id: '2'
}]


function arrayToTreeReduce(list) {
    //将id做为对象的键名，整个对象做为键值 来生成新的数组
    let treeList = list.reduce((prev, cur) => {
        prev[cur['id']] = cur;
        return prev
    }, {})

    //通过引用类型原理实现  
    return list.reduce((prev, cur) => {
        let pid = cur.parent_id;
        // pid为0的就找不到父对象，找到当前cur的父对象
        // 对象的浅拷贝，引用关系存在，在后面处理parent的时候也会导致cur的改变，达到递归的效果
        let parent = treeList[pid]
        // console.log(parent,1)
        // 如果父对象存在，就将cur压到父对象的children属性中
        if (parent) {
            // parent和cur存在引用关系
            parent.children ? parent.children.push(cur) : parent.children = [cur]
        } else if (pid === 0) {
            // 没有父对象，则此cur为树的根元素
            prev.push(cur)
        }
        return prev
    }, [])
}



console.log(JSON.stringify(arrayToTreeReduce(list), null, 4));


